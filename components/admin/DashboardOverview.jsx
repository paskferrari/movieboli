import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FilmIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { getAllVotesStats, getAllUsers, getVotesDashboardStats } from '../../lib/supabase';

const DashboardOverview = ({ searchQuery }) => {
  const [stats, setStats] = useState({
    totalVotes: 0,
    totalUsers: 0,
    averageRating: 0,
    totalFilms: 0,
    recentVotes: [],
    topRatedFilm: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [votesStats, users, dashboardStats] = await Promise.all([
        getAllVotesStats(),
        getAllUsers(),
        getVotesDashboardStats()
      ]);

      // Calcola le statistiche aggregate
      const totalVotes = dashboardStats?.totalVotes || 0;
      const averageRating = dashboardStats?.averageRating || 0;
      const filmStats = dashboardStats?.filmStats || [];
      const recentVotes = dashboardStats?.recentVotes || [];
      
      // Trova il film con rating più alto
      const topRatedFilm = filmStats.length > 0 
        ? filmStats.reduce((prev, current) => 
            (prev.averageRating > current.averageRating) ? prev : current
          )
        : null;

      setStats({
        totalVotes,
        totalUsers: users?.length || 0,
        averageRating: parseFloat(averageRating).toFixed(1),
        totalFilms: filmStats.length,
        recentVotes: recentVotes.slice(0, 5),
        topRatedFilm
      });
    } catch (err) {
      console.error('Errore nel caricamento dati dashboard:', err);
      setError('Errore nel caricamento dei dati');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </motion.div>
    );
  };

  const RecentVoteItem = ({ vote, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {vote.user_email?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{vote.film_title || `Film ${vote.film_id}`}</p>
          <p className="text-xs text-slate-500">{vote.user_email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-slate-900">{vote.rating}</span>
        </div>
        <span className="text-xs text-slate-500">
          {new Date(vote.created_at).toLocaleDateString('it-IT')}
        </span>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 h-32 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-200 h-64 rounded-xl"></div>
            <div className="bg-slate-200 h-64 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-900 mb-2">Errore nel caricamento</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Panoramica Dashboard</h2>
        <p className="text-slate-600">Statistiche generali del Festival MovieBoli</p>
      </div>

      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={FilmIcon}
          title="Voti Totali"
          value={stats.totalVotes.toLocaleString()}
          subtitle="Voti ricevuti"
          color="blue"
        />
        <StatCard
          icon={UsersIcon}
          title="Utenti Registrati"
          value={stats.totalUsers.toLocaleString()}
          subtitle="Utenti attivi"
          color="green"
        />
        <StatCard
          icon={StarIcon}
          title="Rating Medio"
          value={stats.averageRating}
          subtitle="Su 5 stelle"
          color="yellow"
        />
        <StatCard
          icon={TrophyIcon}
          title="Cortometraggi"
          value={stats.totalFilms}
          subtitle="In concorso"
          color="purple"
        />
        <StatCard
          icon={ClockIcon}
          title="Voti Recenti"
          value={stats.recentVotes.length}
          subtitle="Ultimi 5 voti"
          color="orange"
        />
        {stats.topRatedFilm && (
          <StatCard
            icon={TrophyIcon}
            title="Miglior Film"
            value={stats.topRatedFilm.averageRating?.toFixed(1) || 'N/A'}
            subtitle={stats.topRatedFilm.title || `Film ${stats.topRatedFilm.film_id}`}
            color="red"
          />
        )}
      </div>

      {/* Sezioni dettagliate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voti recenti */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Voti Recenti</h3>
            <ChartBarIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-1">
            {stats.recentVotes.length > 0 ? (
              stats.recentVotes.map((vote, index) => (
                <RecentVoteItem key={vote.id || index} vote={vote} index={index} />
              ))
            ) : (
              <div className="text-center py-8">
                <ClockIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nessun voto recente</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistiche rapide */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Statistiche Rapide</h3>
            <ChartBarIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Media voti per film</span>
              <span className="text-sm font-bold text-slate-900">
                {stats.totalFilms > 0 ? (stats.totalVotes / stats.totalFilms).toFixed(1) : '0'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Media voti per utente</span>
              <span className="text-sm font-bold text-slate-900">
                {stats.totalUsers > 0 ? (stats.totalVotes / stats.totalUsers).toFixed(1) : '0'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Tasso di partecipazione</span>
              <span className="text-sm font-bold text-slate-900">
                {stats.totalUsers > 0 ? ((stats.totalVotes / (stats.totalUsers * stats.totalFilms)) * 100).toFixed(1) : '0'}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;