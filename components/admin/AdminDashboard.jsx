import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllVotesStats, getAllUsers, getAdvancedVotesStats, subscribeToVoteUpdates } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import FilmStatsCard from './FilmStatsCard';
import UserStatsCard from './UserStatsCard';
import DemographicsChart from './DemographicsChart';
import RealTimeStatsCard, { RealTimeStatsCardOld } from './RealTimeStatsCard';
import VotingTrendsChart from './VotingTrendsChart';
import RecentActivityFeed from './RecentActivityFeed';
import AdvancedAnalyticsSection from './AdvancedAnalyticsSection';
import FilmAnalyticsDetail from './FilmAnalyticsDetail';
import ExportDataButton from './ExportDataButton';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [votesStats, setVotesStats] = useState({});
  const [advancedStats, setAdvancedStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('realtime');
  const [realtimeUpdates, setRealtimeUpdates] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error, setError] = useState(null);
  
  // Ref per gestire cleanup e debounce
  const subscriptionRef = useRef(null);
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);
  const debounceRef = useRef(null);

  // Carica i dati delle statistiche (ottimizzato con error handling)
  const loadData = useCallback(async () => {
    if (!mountedRef.current) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Carica i dati con timeout ridotto per evitare hang
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout di caricamento')), 8000)
      );
      
      const [statsResult, usersResult, advancedResult] = await Promise.allSettled([
        Promise.race([getAllVotesStats(), timeout]),
        Promise.race([getAllUsers(), timeout]),
        Promise.race([getAdvancedVotesStats(), timeout])
      ]);
      
      if (!mountedRef.current) return;
      
      // Gestisci i risultati con fallback
      if (statsResult.status === 'fulfilled') {
        setVotesStats(statsResult.value || {});
      } else {
        console.warn('Errore caricamento statistiche voti:', statsResult.reason);
        setVotesStats({});
      }
      
      if (usersResult.status === 'fulfilled') {
        setUsers(usersResult.value || []);
      } else {
        console.warn('Errore caricamento utenti:', usersResult.reason);
        setUsers([]);
      }
      
      if (advancedResult.status === 'fulfilled') {
        setAdvancedStats(advancedResult.value || {});
      } else {
        console.warn('Errore caricamento statistiche avanzate:', advancedResult.reason);
        setAdvancedStats({});
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Errore generale nel caricamento dati:', error);
      if (mountedRef.current) {
        setError('Errore nel caricamento dei dati');
        setVotesStats({});
        setUsers([]);
        setAdvancedStats({});
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscription ottimizzata con debounce migliorato
  useEffect(() => {
    let subscription = null;
    
    const setupSubscription = () => {
      try {
        subscription = subscribeToVoteUpdates((newVote) => {
          if (!mountedRef.current) return;
          
          console.log('Nuovo voto ricevuto:', newVote);
          
          // Debounce degli aggiornamenti UI
          setRealtimeUpdates(prev => {
            const newUpdate = {
              id: `${Date.now()}-${Math.random()}`,
              type: 'new_vote',
              data: newVote,
              timestamp: new Date()
            };
            return [newUpdate, ...prev.slice(0, 9)];
          });
          
          // Debounce del reload dei dati
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          debounceRef.current = setTimeout(() => {
            if (mountedRef.current) {
              loadData();
            }
          }, 3000); // Aumentato a 3 secondi
        });
        
        subscriptionRef.current = subscription;
      } catch (error) {
        console.error('Errore nella subscription:', error);
      }
    };

    setupSubscription();

    return () => {
      if (subscriptionRef.current) {
        try {
          subscriptionRef.current.unsubscribe();
        } catch (error) {
          console.error('Errore nella pulizia subscription:', error);
        }
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [loadData]);

  // Auto-refresh ridotto (ogni 3 minuti)
  useEffect(() => {
    const interval = setInterval(() => {
      if (mountedRef.current && !loading) {
        loadData();
      }
    }, 180000); // 3 minuti

    return () => clearInterval(interval);
  }, [loadData, loading]);

  // Cleanup al dismount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Calcola statistiche generali
  const totalVotes = Object.values(votesStats).reduce((sum, stats) => sum + (stats?.totalVotes || 0), 0);
  const totalUsers = users.length;
  const averageAge = users.length > 0 ? users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length : 0;

  const tabs = [
    { id: 'realtime', label: 'Tempo Reale', icon: '⚡' },
    { id: 'overview', label: 'Panoramica', icon: '📊' },
    { id: 'films', label: 'Cortometraggi', icon: '🎬' },
    { id: 'users', label: 'Utenti', icon: '👥' },
    { id: 'demographics', label: 'Demografia', icon: '📈' },
    { id: 'trends', label: 'Tendenze', icon: '📈' }
  ];

  if (loading && !advancedStats) {
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

  // Nel render, gestisco l'assenza di utente
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600">
                {user ? `Benvenuto, ${user?.user_metadata?.full_name}` : 'Dashboard Pubblica'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ultimo aggiornamento</p>
              <p className="text-sm font-medium text-gray-900">
                {lastUpdate.toLocaleTimeString('it-IT')}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Header con indicatori tempo reale */}
      <div className="bg-movieboli-nero/50 backdrop-blur-sm border-b border-movieboli-violaPrincipale/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-movieboli-crema flex items-center space-x-3">
                <span>Dashboard Amministrativa</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </h1>
              <p className="text-movieboli-crema/70 mt-1">
                Benvenuto, {user?.user_metadata?.firstName || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-6">
              {/* Indicatori rapidi */}
              <div className="text-center">
                <p className="text-2xl font-bold text-movieboli-violaPrincipale">{totalVotes}</p>
                <p className="text-xs text-movieboli-crema/60">Voti Totali</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-movieboli-violaPrincipale">{realtimeUpdates.length}</p>
                <p className="text-xs text-movieboli-crema/60">Aggiornamenti</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-movieboli-crema/60">Ultimo aggiornamento</p>
                <p className="text-movieboli-crema font-medium">
                  {lastUpdate.toLocaleTimeString('it-IT')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-movieboli-nero/30 p-1 rounded-xl overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-movieboli-violaPrincipale text-movieboli-crema shadow-lg'
                  : 'text-movieboli-crema/70 hover:text-movieboli-crema hover:bg-movieboli-nero/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.id === 'realtime' && realtimeUpdates.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {realtimeUpdates.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tab Tempo Reale */}
        {activeTab === 'realtime' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealTimeStatsCardOld 
                stats={advancedStats} 
                realtimeUpdates={realtimeUpdates}
              />
              <RecentActivityFeed 
                activities={realtimeUpdates}
                onClearAll={() => setRealtimeUpdates([])}
              />
            </div>
            
            {advancedStats?.topFilms && (
              <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
                <h3 className="text-xl font-bold text-movieboli-crema mb-4">🏆 Classifica Live</h3>
                <div className="space-y-3">
                  {advancedStats.topFilms.map((film, index) => (
                    <motion.div
                      key={film.filmId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-movieboli-neroProfondo/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-movieboli-violaPrincipale/20 text-movieboli-crema'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-movieboli-crema">{film.title}</p>
                          <p className="text-sm text-movieboli-crema/70">
                            {film.totalVotes} voti • ⭐ {film.averageRating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(film.averageRating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab Tendenze */}
        {activeTab === 'trends' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-movieboli-crema">📈 Analisi Tendenze</h2>
            <VotingTrendsChart trends={advancedStats?.votingTrends || []} />
          </motion.div>
        )}

        {/* Altri tab esistenti */}
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