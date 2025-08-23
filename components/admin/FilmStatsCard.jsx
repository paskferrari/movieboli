import React from 'react';
import { motion } from 'framer-motion';

const FilmStatsCard = ({ filmId, stats }) => {
  const { totalVotes, averageRating, ratingDistribution } = stats || {};

  // Mappa degli ID film ai titoli reali
  const filmTitles = {
    'dieci-secondi': 'DIECI SECONDI',
    'appuntamento-mezzogiorno': 'APPUNTAMENTO A MEZZOGIORNO',
    'place-under-sun': 'Place under the sun',
    'fathers-letters': "Father's Letters",
    'sharing-caring': 'SHARING IS CARING',
    'ya-hanouni': 'Ya Hanouni',
    'jus-orange': "Jus d'orange",
    'rock-tensions': 'The Rock Tensions'
  };

  const filmTitle = filmTitles[filmId] || filmId;

  // Calcola la percentuale per ogni rating
  const getPercentage = (count) => {
    if (!totalVotes || totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  // Colori per le stelle (scala 1-10)
  const getStarColor = (rating) => {
    const colors = {
      10: 'bg-green-500',
      9: 'bg-green-400', 
      8: 'bg-blue-500',
      7: 'bg-blue-400',
      6: 'bg-cyan-500',
      5: 'bg-yellow-500',
      4: 'bg-yellow-400',
      3: 'bg-orange-500',
      2: 'bg-orange-400',
      1: 'bg-red-500'
    };
    return colors[rating] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/40 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-movieboli-crema truncate">
            {filmTitle}
          </h3>
          <p className="text-movieboli-crema/70 text-sm">
            {totalVotes || 0} voti totali
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(averageRating || 0)
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
          <p className="text-xl font-bold text-movieboli-violaPrincipale">
            {averageRating?.toFixed(1) || '0.0'}
          </p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-movieboli-crema/80 mb-3">
          Distribuzione Voti
        </h4>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingDistribution?.[rating] || 0;
          const percentage = getPercentage(count);
          
          return (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-movieboli-crema/70 text-sm">{rating}</span>
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-full bg-movieboli-neroProfondo/50 rounded-full h-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: rating * 0.1 }}
                      className={`h-full ${getStarColor(rating)} rounded-full`}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-16 justify-end">
                <span className="text-movieboli-crema/70 text-sm">{count}</span>
                <span className="text-movieboli-crema/50 text-xs">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="mt-6 pt-4 border-t border-movieboli-violaPrincipale/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">
              {totalVotes || 0}
            </p>
            <p className="text-xs text-movieboli-crema/60">Voti Totali</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">
              {averageRating?.toFixed(1) || '0.0'}
            </p>
            <p className="text-xs text-movieboli-crema/60">Media</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmStatsCard;