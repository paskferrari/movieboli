import React from 'react';
import { motion } from 'framer-motion';
import VotingTrendsChart from './VotingTrendsChart';
import FilmComparisonChart from './FilmComparisonChart';
import DemographicsChart from './DemographicsChart';
import BehaviorAnalysisCard from './BehaviorAnalysisCard';

const AdvancedAnalyticsSection = ({ analytics, onFilmSelect, selectedFilm }) => {
  const { overview, filmStats, trends, demographics, behavior } = analytics;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Voti Totali</p>
              <p className="text-3xl font-bold text-white">{overview.totalVotes}</p>
              <p className="text-blue-300 text-xs mt-1">Periodo: {overview.timeframe}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🗳️</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">Utenti Attivi</p>
              <p className="text-3xl font-bold text-white">{overview.uniqueUsers}</p>
              <p className="text-green-300 text-xs mt-1">Partecipanti unici</p>
            </div>
            <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm font-medium">Rating Medio</p>
              <p className="text-3xl font-bold text-white">{overview.averageRating.toFixed(1)}</p>
              <p className="text-yellow-300 text-xs mt-1">Su 5 stelle</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Engagement</p>
              <p className="text-3xl font-bold text-white">
                {(overview.totalVotes / overview.uniqueUsers).toFixed(1)}
              </p>
              <p className="text-purple-300 text-xs mt-1">Voti per utente</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VotingTrendsChart trends={trends} />
        <FilmComparisonChart filmStats={filmStats} onFilmSelect={onFilmSelect} />
      </div>

      {/* Demographics and Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DemographicsChart demographics={demographics} />
        <BehaviorAnalysisCard behavior={behavior} />
      </div>

      {/* Film Details */}
      {selectedFilm && filmStats[selectedFilm] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20"
        >
          <h3 className="text-xl font-bold text-movieboli-crema mb-4">
            📊 Analisi Dettagliata: {selectedFilm}
          </h3>
          <FilmAnalyticsDetail filmStats={filmStats[selectedFilm]} />
        </motion.div>
      )}
    </div>
  );
};

export default AdvancedAnalyticsSection;