import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/solid';

const RecentActivityFeed = ({ activities = [], maxItems = 10 }) => {
  const [displayedActivities, setDisplayedActivities] = useState([]);

  useEffect(() => {
    setDisplayedActivities(activities.slice(0, maxItems));
  }, [activities, maxItems]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ora';
    if (diffInMinutes < 60) return `${diffInMinutes}m fa`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h fa`;
    return `${Math.floor(diffInMinutes / 1440)}g fa`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'vote':
        return <StarIcon className="w-4 h-4 text-yellow-500" />;
      case 'user':
        return <UserIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Attività Recente</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {displayedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.user_name}
                  </p>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                
                {activity.type === 'vote' && activity.rating && (
                  <div className="flex items-center space-x-1 mt-2">
                    {getRatingStars(activity.rating)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({activity.rating}/5)
                    </span>
                  </div>
                )}
                
                {activity.film_title && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {activity.film_title}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {displayedActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ClockIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>Nessuna attività recente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityFeed;