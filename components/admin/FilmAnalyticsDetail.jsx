import React from 'react';
import { motion } from 'framer-motion';

const FilmAnalyticsDetail = ({ filmStats }) => {
  if (!filmStats) return null;

  const {
    title,
    totalVotes,
    averageRating,
    medianRating,
    ratingDistribution,
    standardDeviation,
    votingVelocity,
    userEngagement,
    trendDirection
  } = filmStats;

  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (direction) => {
    switch (direction) {
      case 'increasing': return 'text-green-400';
      case 'decreasing': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Statistiche Base */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-movieboli-neroProfondo/50 rounded-lg p-4 border border-movieboli-violaPrincipale/20"
      >
        <h4 className="text-lg font-semibold text-movieboli-crema mb-3">📊 Statistiche Base</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-movieboli-crema/70">Voti Totali:</span>
            <span className="text-movieboli-crema font-medium">{totalVotes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-movieboli-crema/70">Rating Medio:</span>
            <span className="text-movieboli-crema font-medium">{averageRating}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-movieboli-crema/70">Rating Mediano:</span>
            <span className="text-movieboli-crema font-medium">{medianRating}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-movieboli-crema/70">Deviazione Standard:</span>
            <span className="text-movieboli-crema font-medium">{standardDeviation?.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Distribuzione Voti */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-movieboli-neroProfondo/50 rounded-lg p-4 border border-movieboli-violaPrincipale/20"
      >
        <h4 className="text-lg font-semibold text-movieboli-crema mb-3">⭐ Distribuzione Voti</h4>
        <div className="space-y-2">
          {Object.entries(ratingDistribution || {}).map(([rating, count]) => {
            const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
            return (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-movieboli-crema/70 w-8">{rating}★</span>
                <div className="flex-1 bg-movieboli-nero/50 rounded-full h-2">
                  <div 
                    className="bg-movieboli-violaPrincipale h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-movieboli-crema text-sm w-12">{count}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Metriche Avanzate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-movieboli-neroProfondo/50 rounded-lg p-4 border border-movieboli-violaPrincipale/20"
      >
        <h4 className="text-lg font-semibold text-movieboli-crema mb-3">🚀 Metriche Avanzate</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-movieboli-crema/70">Velocità Voti:</span>
            <span className="text-movieboli-crema font-medium">
              {votingVelocity?.toFixed(1)} voti/ora
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-movieboli-crema/70">Engagement:</span>
            <span className="text-movieboli-crema font-medium">
              {userEngagement?.toFixed(1)} voti/utente
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-movieboli-crema/70">Trend:</span>
            <span className={`font-medium flex items-center space-x-1 ${getTrendColor(trendDirection)}`}>
              <span>{getTrendIcon(trendDirection)}</span>
              <span className="capitalize">{trendDirection}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FilmAnalyticsDetail;