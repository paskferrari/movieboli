import React from 'react';
import { motion } from 'framer-motion';

const BehaviorAnalysisCard = ({ behavior = {} }) => {
  const { peakHours = [], votingPatterns = {}, engagementMetrics = {} } = behavior;

  const topPeakHours = peakHours.slice(0, 5);
  const topActiveUsers = votingPatterns.mostActiveUsers?.slice(0, 5) || [];

  return (
    <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
      <h3 className="text-xl font-bold text-movieboli-crema mb-4">🧠 Analisi Comportamentale</h3>
      
      <div className="space-y-6">
        {/* Orari di Picco */}
        <div>
          <h4 className="text-lg font-semibold text-movieboli-crema mb-3">⏰ Orari di Picco</h4>
          <div className="space-y-2">
            {topPeakHours.map((hourData, index) => {
              const maxCount = topPeakHours[0]?.count || 1;
              const percentage = (hourData.count / maxCount) * 100;
              
              return (
                <motion.div
                  key={hourData.hour}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-movieboli-crema/70 w-12 text-sm">
                    {hourData.hour.toString().padStart(2, '0')}:00
                  </span>
                  <div className="flex-1 bg-movieboli-nero/50 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="bg-movieboli-violaPrincipale h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-movieboli-crema text-sm w-8">{hourData.count}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Metriche di Engagement */}
        <div>
          <h4 className="text-lg font-semibold text-movieboli-crema mb-3">📊 Metriche Engagement</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-movieboli-neroProfondo/50 rounded-lg p-3">
              <p className="text-movieboli-crema/70 text-sm">Voti per Sessione</p>
              <p className="text-xl font-bold text-movieboli-crema">
                {engagementMetrics.averageVotesPerSession?.toFixed(1) || '0'}
              </p>
            </div>
            <div className="bg-movieboli-neroProfondo/50 rounded-lg p-3">
              <p className="text-movieboli-crema/70 text-sm">Tasso Engagement</p>
              <p className="text-xl font-bold text-movieboli-crema">
                {engagementMetrics.engagementRate?.toFixed(1) || '0'}%
              </p>
            </div>
          </div>
        </div>

        {/* Utenti Più Attivi */}
        {topActiveUsers.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-movieboli-crema mb-3">🏆 Utenti Più Attivi</h4>
            <div className="space-y-2">
              {topActiveUsers.map((user, index) => {
                const maxVotes = topActiveUsers[0]?.voteCount || 1;
                const percentage = (user.voteCount / maxVotes) * 100;
                
                return (
                  <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-movieboli-violaPrincipale/20 text-movieboli-crema'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-movieboli-crema/70 text-sm flex-1">
                      Utente {user.userId.substring(0, 8)}...
                    </span>
                    <div className="flex-1 bg-movieboli-nero/50 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="bg-green-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                    <span className="text-movieboli-crema text-sm w-8">{user.voteCount}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pattern di Voto */}
        <div>
          <h4 className="text-lg font-semibold text-movieboli-crema mb-3">📈 Pattern di Voto</h4>
          <div className="bg-movieboli-neroProfondo/50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-movieboli-crema/70 text-sm">Media Voti per Utente:</span>
              <span className="text-movieboli-crema font-medium">
                {votingPatterns.averageVotesPerUser?.toFixed(1) || '0'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorAnalysisCard;