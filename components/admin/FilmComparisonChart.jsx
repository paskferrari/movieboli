import React from 'react';
import { motion } from 'framer-motion';

const FilmComparisonChart = ({ filmStats = {}, onFilmSelect }) => {
  const films = Object.entries(filmStats)
    .sort(([,a], [,b]) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 10); // Top 10 films

  if (films.length === 0) {
    return (
      <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
        <h3 className="text-xl font-bold text-movieboli-crema mb-4">🏆 Confronto Cortometraggi</h3>
        <div className="text-center py-8">
          <p className="text-movieboli-crema/70">Nessun dato disponibile per il confronto</p>
        </div>
      </div>
    );
  }

  const maxVotes = Math.max(...films.map(([,stats]) => stats.totalVotes || 0));
  const maxRating = 5; // Rating massimo

  return (
    <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
      <h3 className="text-xl font-bold text-movieboli-crema mb-4">🏆 Confronto Cortometraggi</h3>
      
      <div className="space-y-3">
        {films.map(([filmId, stats], index) => {
          const votePercentage = maxVotes > 0 ? (stats.totalVotes / maxVotes) * 100 : 0;
          const ratingPercentage = (stats.averageRating / maxRating) * 100;
          
          return (
            <motion.div
              key={filmId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-movieboli-neroProfondo/50 rounded-lg p-4 cursor-pointer hover:bg-movieboli-neroProfondo/70 transition-colors"
              onClick={() => onFilmSelect && onFilmSelect(filmId)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500 text-black' :
                    index === 1 ? 'bg-gray-400 text-black' :
                    index === 2 ? 'bg-orange-600 text-white' :
                    'bg-movieboli-violaPrincipale/20 text-movieboli-crema'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-movieboli-crema font-medium text-sm">
                      {filmId.length > 25 ? `${filmId.substring(0, 25)}...` : filmId}
                    </h4>
                    <p className="text-movieboli-crema/60 text-xs">
                      {stats.totalVotes} voti • ⭐ {stats.averageRating?.toFixed(1)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(stats.averageRating)
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
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-movieboli-crema/60 w-16">Voti:</span>
                  <div className="flex-1 bg-movieboli-nero/50 rounded-full h-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${votePercentage}%` }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="bg-blue-500 h-1.5 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-xs text-movieboli-crema/70 w-8">{stats.totalVotes}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-movieboli-crema/60 w-16">Rating:</span>
                  <div className="flex-1 bg-movieboli-nero/50 rounded-full h-1.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ratingPercentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="bg-yellow-500 h-1.5 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-xs text-movieboli-crema/70 w-8">{stats.averageRating?.toFixed(1)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FilmComparisonChart;