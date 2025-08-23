import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrophyIcon,
  StarIcon,
  UsersIcon,
  ChartBarIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const ContestArtisticoManagement = ({ searchQuery }) => {
  const [stats, setStats] = useState({
    statistiche: [],
    totale_voti: 0,
    totale_opere: 0,
    aggiornato_il: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('numero_voti');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadContestStats();
  }, []);

  const loadContestStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/contest/statistiche');
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle statistiche');
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Errore nel caricamento delle statistiche del contest:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtra e ordina le opere in base alla ricerca
  const filteredStats = stats.statistiche
    .filter(opera => 
      !searchQuery || 
      opera.nome_film_ispirato?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opera.autore?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy] || 0;
      const bValue = b[sortBy] || 0;
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl h-32"></div>
            ))}
          </div>
          <div className="bg-slate-200 rounded-xl h-96"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-medium text-red-900 mb-2">Errore nel caricamento</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadContestStats}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">🎨 Contest Artistico</h2>
          <p className="text-sm sm:text-base text-slate-600">
            Gestione e statistiche delle opere d'arte in concorso
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <CalendarIcon className="w-4 h-4" />
          <span>
            Aggiornato: {stats.aggiornato_il ? new Date(stats.aggiornato_il).toLocaleString('it-IT') : 'N/A'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Opere Totali</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.totale_opere}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Voti Totali</p>
              <p className="text-2xl sm:text-3xl font-bold">{stats.totale_voti}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Partecipazione Media</p>
              <p className="text-2xl sm:text-3xl font-bold">
                {stats.totale_opere > 0 ? Math.round((stats.totale_voti / stats.totale_opere) * 10) / 10 : 0}
              </p>
              <p className="text-green-100 text-xs">voti per opera</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Classifica Opere */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900">🏆 Classifica Opere</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSort('numero_voti')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'numero_voti'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Voti {sortBy === 'numero_voti' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('titolo')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'titolo'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Titolo {sortBy === 'titolo' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('nome_film_ispirato')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'nome_film_ispirato'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Titolo {sortBy === 'nome_film_ispirato' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
              <button
                onClick={() => handleSort('autore')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'autore'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Artista {sortBy === 'autore' && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredStats.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Nessuna opera trovata</h3>
              <p className="text-slate-600">
                {searchQuery ? 'Prova a modificare i criteri di ricerca.' : 'Non ci sono ancora opere nel contest.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredStats.map((opera, index) => {
                const isTop3 = index < 3;
                const position = index + 1;
                
                return (
                  <motion.div
                    key={opera.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 sm:p-6 hover:bg-slate-50 transition-colors ${
                      isTop3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Posizione */}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                        position === 1 ? 'bg-yellow-500 text-white' :
                        position === 2 ? 'bg-gray-400 text-white' :
                        position === 3 ? 'bg-orange-600 text-white' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {position}
                      </div>

                      {/* Info Opera */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {opera.nome_film_ispirato || 'Titolo non disponibile'}
                            </h4>
                            <p className="text-sm text-slate-600 truncate">
                              {opera.autore || 'Artista non disponibile'}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4 flex-shrink-0">
                            {/* Numero Voti */}
                            <div className="text-center">
                              <p className="text-lg sm:text-xl font-bold text-slate-900">
                                {opera.numero_voti || 0}
                              </p>
                              <p className="text-xs text-slate-500">voti</p>
                            </div>
                            
                            {/* Badge Top 3 */}
                            {isTop3 && (
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                position === 1 ? 'bg-yellow-100 text-yellow-800' :
                                position === 2 ? 'bg-gray-100 text-gray-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {position === 1 ? '🥇 Primo' : position === 2 ? '🥈 Secondo' : '🥉 Terzo'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={loadContestStats}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Aggiorna Dati</span>
        </button>
      </div>
    </div>
  );
};

export default ContestArtisticoManagement;