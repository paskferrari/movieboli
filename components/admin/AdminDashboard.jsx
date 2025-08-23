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
import VotesDetailedSection from './VotesDetailedSection';


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

  // Definizione tabs
  const tabs = [
    { id: 'realtime', label: 'Tempo Reale', icon: '⚡' },
    { id: 'overview', label: 'Panoramica', icon: '📊' },
    { id: 'votes', label: 'Voti Dettagliati', icon: '🗳️' },
    { id: 'films', label: 'Cortometraggi', icon: '🎬' },
    { id: 'users', label: 'Utenti', icon: '👥' },
    { id: 'demographics', label: 'Demografia', icon: '📈' },
    { id: 'trends', label: 'Tendenze', icon: '📈' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-movieboli-violaPrincipale mx-auto mb-4"></div>
          <p className="text-movieboli-crema text-lg">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-movieboli-crema mb-2">Dashboard Amministratore</h1>
          <p className="text-movieboli-crema/70">Ultimo aggiornamento: {lastUpdate.toLocaleTimeString()}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-movieboli-violaPrincipale text-white'
                    : 'bg-movieboli-nero/40 text-movieboli-crema/70 hover:bg-movieboli-violaPrincipale/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeTab === 'realtime' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-movieboli-crema">⚡ Statistiche in Tempo Reale</h2>
              <RealTimeStatsCard 
                updates={realtimeUpdates} 
                totalVotes={totalVotes}
                totalUsers={totalUsers}
                lastUpdate={lastUpdate}
              />
              <RecentActivityFeed updates={realtimeUpdates} />
            </motion.div>
          )}

          {activeTab === 'votes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-movieboli-crema">🗳️ Analisi Dettagliata Voti</h2>
              <VotesDetailedSection />
            </motion.div>
          )}

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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
