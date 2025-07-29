import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllVotesStats, getAllUsers } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import FilmStatsCard from './FilmStatsCard';
import UserStatsCard from './UserStatsCard';
import DemographicsChart from './DemographicsChart';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [votesStats, setVotesStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Carica i dati delle statistiche
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, usersData] = await Promise.all([
          getAllVotesStats(),
          getAllUsers()
        ]);
        
        setVotesStats(statsData || {});
        setUsers(usersData || []);
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calcola statistiche generali
  const totalVotes = Object.values(votesStats).reduce((sum, stats) => sum + (stats?.totalVotes || 0), 0);
  const totalUsers = users.length;
  const averageAge = users.length > 0 ? users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length : 0;

  const tabs = [
    { id: 'overview', label: 'Panoramica', icon: '📊' },
    { id: 'films', label: 'Cortometraggi', icon: '🎬' },
    { id: 'users', label: 'Utenti', icon: '👥' },
    { id: 'demographics', label: 'Demografia', icon: '📈' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-movieboli-crema text-lg">Caricamento dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero">
      {/* Header */}
      <div className="bg-movieboli-nero/50 backdrop-blur-sm border-b border-movieboli-violaPrincipale/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-movieboli-crema">
                Dashboard Amministrativa
              </h1>
              <p className="text-movieboli-crema/70 mt-1">
                Benvenuto, {user?.user_metadata?.firstName || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-movieboli-crema/60">Ultimo aggiornamento</p>
                <p className="text-movieboli-crema font-medium">
                  {new Date().toLocaleString('it-IT')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-movieboli-nero/30 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-movieboli-violaPrincipale text-movieboli-crema shadow-lg'
                  : 'text-movieboli-crema/70 hover:text-movieboli-crema hover:bg-movieboli-nero/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-movieboli-crema/70 text-sm font-medium">Voti Totali</p>
                    <p className="text-3xl font-bold text-movieboli-crema">{totalVotes}</p>
                  </div>
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🗳️</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-movieboli-crema/70 text-sm font-medium">Utenti Registrati</p>
                    <p className="text-3xl font-bold text-movieboli-crema">{totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-movieboli-crema/70 text-sm font-medium">Età Media</p>
                    <p className="text-3xl font-bold text-movieboli-crema">{Math.round(averageAge)}</p>
                  </div>
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Film Stats */}
            <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
              <h3 className="text-xl font-bold text-movieboli-crema mb-4">Top Cortometraggi per Voti</h3>
              <div className="space-y-3">
                {Object.entries(votesStats)
                  .sort(([,a], [,b]) => (b?.totalVotes || 0) - (a?.totalVotes || 0))
                  .slice(0, 5)
                  .map(([filmId, stats]) => (
                    <div key={filmId} className="flex items-center justify-between p-3 bg-movieboli-neroProfondo/50 rounded-lg">
                      <div>
                        <p className="font-medium text-movieboli-crema">{filmId}</p>
                        <p className="text-sm text-movieboli-crema/70">
                          Media: {stats?.averageRating || 0}/5
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-movieboli-violaPrincipale">
                          {stats?.totalVotes || 0}
                        </p>
                        <p className="text-xs text-movieboli-crema/60">voti</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'films' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-movieboli-crema">Statistiche Cortometraggi</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(votesStats).map(([filmId, stats]) => (
                <FilmStatsCard key={filmId} filmId={filmId} stats={stats} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-movieboli-crema">Gestione Utenti</h2>
            <UserStatsCard users={users} />
          </motion.div>
        )}

        {activeTab === 'demographics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-movieboli-crema">Analisi Demografica</h2>
            <DemographicsChart users={users} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;