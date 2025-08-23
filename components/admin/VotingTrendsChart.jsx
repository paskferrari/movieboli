import React from 'react';
import { motion } from 'framer-motion';

const VotingTrendsChart = ({ trends = [] }) => {
  if (!trends || trends.length === 0) {
    return (
      <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
        <h3 className="text-xl font-bold text-movieboli-crema mb-4">📈 Trend Temporali</h3>
        <div className="text-center py-8">
          <p className="text-movieboli-crema/70">Nessun dato disponibile per i trend</p>
        </div>
      </div>
    );
  }

  const maxVotes = Math.max(...trends.map(t => t.votes));
  const maxRating = Math.max(...trends.map(t => t.averageRating));

  return (
    <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
      <h3 className="text-xl font-bold text-movieboli-crema mb-4">📈 Trend Temporali</h3>
      
      <div className="space-y-4">
        {trends.map((trend, index) => {
          const votePercentage = maxVotes > 0 ? (trend.votes / maxVotes) * 100 : 0;
          const ratingPercentage = maxRating > 0 ? (trend.averageRating / maxRating) * 100 : 0;
          
          return (
            <motion.div
              key={trend.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-movieboli-neroProfondo/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-movieboli-crema font-medium">
                  {new Date(trend.date).toLocaleDateString('it-IT')}
                </span>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-movieboli-crema/70">
                    {trend.votes} voti
                  </span>
                  <span className="text-movieboli-crema/70">
                    ⭐ {trend.averageRating.toFixed(1)}
                  </span>
                  <span className="text-movieboli-crema/70">
                    🎬 {trend.uniqueFilms} film
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-movieboli-crema/60 w-12">Voti:</span>
                  <div className="flex-1 bg-movieboli-nero/50 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${votePercentage}%` }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="bg-blue-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-movieboli-crema/60 w-12">Rating:</span>
                  <div className="flex-1 bg-movieboli-nero/50 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ratingPercentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="bg-yellow-500 h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VotingTrendsChart;