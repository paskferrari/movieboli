import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MinusIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowTrendingDownIcon as TrendingDownIcon
} from '@heroicons/react/24/outline';

const RealTimeStatsCardOld = ({ stats, realtimeUpdates }) => {
  const recentVotes = realtimeUpdates.filter(update => update.type === 'new_vote').length;
  const votesPerHour = stats?.hourlyStats?.reduce((sum, hour) => sum + hour.votes, 0) || 0;
  
  return (
    <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-movieboli-crema flex items-center space-x-2">
          <span>⚡</span>
          <span>Statistiche Live</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">Aggiornamento automatico</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-movieboli-neroProfondo/50 rounded-lg">
          <p className="text-3xl font-bold text-movieboli-violaPrincipale">{recentVotes}</p>
          <p className="text-sm text-movieboli-crema/70">Nuovi voti (sessione)</p>
        </div>
        
        <div className="text-center p-4 bg-movieboli-neroProfondo/50 rounded-lg">
          <p className="text-3xl font-bold text-movieboli-violaPrincipale">{votesPerHour}</p>
          <p className="text-sm text-movieboli-crema/70">Voti/ora (oggi)</p>
        </div>
        
        <div className="text-center p-4 bg-movieboli-neroProfondo/50 rounded-lg">
          <p className="text-3xl font-bold text-movieboli-violaPrincipale">
            {stats?.averageRating?.toFixed(1) || '0.0'}
          </p>
          <p className="text-sm text-movieboli-crema/70">Media generale</p>
        </div>
        
        <div className="text-center p-4 bg-movieboli-neroProfondo/50 rounded-lg">
          <p className="text-3xl font-bold text-movieboli-violaPrincipale">
            {stats?.totalUsers || 0}
          </p>
          <p className="text-sm text-movieboli-crema/70">Utenti attivi</p>
        </div>
      </div>
      
      {/* Grafico a barre orizzontali per voti per ora */}
      {stats?.hourlyStats && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-movieboli-crema/80 mb-3">Attività nelle ultime 24h</h4>
          <div className="space-y-1">
            {stats.hourlyStats.slice(-12).map((hour, index) => (
              <div key={hour.hour} className="flex items-center space-x-2">
                <span className="text-xs text-movieboli-crema/60 w-8">{hour.hour}h</span>
                <div className="flex-1 bg-movieboli-neroProfondo/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(hour.votes / 10) * 100}%` }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full bg-movieboli-violaPrincipale rounded-full"
                  />
                </div>
                <span className="text-xs text-movieboli-crema/60 w-6">{hour.votes}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RealTimeStatsCard = ({ title, value, subtitle, trend, trendValue, icon: Icon, color = 'blue' }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (value !== displayValue) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsUpdating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
      default:
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600'
  };

  return (
    <motion.div
      className={`p-6 rounded-xl border-2 ${colorClasses[color]} transition-all duration-300 ${
        isUpdating ? 'ring-2 ring-blue-300 ring-opacity-50' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClasses[color].replace('border-', 'bg-').replace('-200', '-100')}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {isUpdating && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="space-y-2">
        <motion.div
          key={displayValue}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-gray-900"
        >
          {displayValue}
        </motion.div>
        
        {subtitle && (
          <p className="text-sm text-gray-600">{subtitle}</p>
        )}
        
        {trend && trendValue !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trendValue > 0 ? '+' : ''}{trendValue}%
            </span>
            <span className="text-xs text-gray-500">vs precedente</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { RealTimeStatsCardOld };
export default RealTimeStatsCard;