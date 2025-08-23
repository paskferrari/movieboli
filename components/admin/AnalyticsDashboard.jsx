import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon, // ✅ Cambia da TrendingUpIcon
  CalendarIcon,
  FilmIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { getVotesDashboardStats, getAllVotesDetailed } from '../../lib/supabase';
import { StatCard } from '../ui/AdaptiveCard'; // ✅ Keep this
import { LineChart, BarChart } from '../ui/Charts';



const AnalyticsDashboard = ({ searchQuery }) => {
  const [stats, setStats] = useState(null);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [chartData, setChartData] = useState({
    ratingDistribution: [],
    votesOverTime: [],
    filmRankings: [],
    hourlyDistribution: []
  });

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [dashboardStats, allVotes] = await Promise.all([
        getVotesDashboardStats(),
        getAllVotesDetailed()
      ]);
      
      setStats(dashboardStats);
      setVotes(allVotes || []);
      
      // Processa i dati per i grafici
      processChartData(allVotes || [], selectedPeriod);
      
    } catch (err) {
      console.error('Errore nel caricamento analytics:', err);
      setError('Errore nel caricamento dei dati analytics');
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (votesData, period) => {
    const now = new Date();
    const periodDays = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const cutoffDate = new Date(now.getTime() - (periodDays[period] * 24 * 60 * 60 * 1000));
    const filteredVotes = votesData.filter(vote => new Date(vote.created_at) >= cutoffDate);
    
    // Distribuzione rating
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredVotes.forEach(vote => {
      ratingCounts[vote.rating] = (ratingCounts[vote.rating] || 0) + 1;
    });
    
    const ratingDistribution = Object.entries(ratingCounts).map(([rating, count]) => ({
      rating: `${rating} stella${rating > 1 ? 'e' : ''}`,
      count,
      percentage: filteredVotes.length > 0 ? ((count / filteredVotes.length) * 100).toFixed(1) : 0
    }));
    
    // Voti nel tempo
    const votesOverTime = [];
    for (let i = periodDays[period] - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const dayVotes = filteredVotes.filter(vote => 
        new Date(vote.created_at).toDateString() === date.toDateString()
      );
      
      votesOverTime.push({
        date: date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' }),
        votes: dayVotes.length,
        averageRating: dayVotes.length > 0 
          ? (dayVotes.reduce((sum, vote) => sum + vote.rating, 0) / dayVotes.length).toFixed(1)
          : 0
      });
    }
    
    // Classifica film
    const filmStats = {};
    filteredVotes.forEach(vote => {
      const filmKey = vote.film_title || `Film ${vote.film_id}`;
      if (!filmStats[filmKey]) {
        filmStats[filmKey] = { votes: 0, totalRating: 0, filmId: vote.film_id };
      }
      filmStats[filmKey].votes++;
      filmStats[filmKey].totalRating += vote.rating;
    });
    
    const filmRankings = Object.entries(filmStats)
      .map(([title, data]) => ({
        title,
        votes: data.votes,
        averageRating: (data.totalRating / data.votes).toFixed(1),
        filmId: data.filmId
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 10);
    
    // Distribuzione oraria
    const hourlyStats = {};
    for (let i = 0; i < 24; i++) {
      hourlyStats[i] = 0;
    }
    
    filteredVotes.forEach(vote => {
      const hour = new Date(vote.created_at).getHours();
      hourlyStats[hour]++;
    });
    
    const hourlyDistribution = Object.entries(hourlyStats).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count
    }));
    
    setChartData({
      ratingDistribution,
      votesOverTime,
      filmRankings,
      hourlyDistribution
    });
  };

  const BarChart = ({ data, xKey, yKey, title, color = 'blue' }) => {
    const maxValue = Math.max(...data.map(item => item[yKey]));
    
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-slate-600 truncate">
                {item[xKey]}
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item[yKey] / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${
                    color === 'blue' ? 'from-blue-500 to-blue-600' :
                    color === 'green' ? 'from-green-500 to-green-600' :
                    color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } rounded-full flex items-center justify-end pr-2`}
                >
                  <span className="text-white text-xs font-medium">
                    {item[yKey]}
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title }) => {
    const maxVotes = Math.max(...data.map(item => item.votes));
    
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
        <div className="h-64 flex items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.votes / maxVotes) * 200}px` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm min-h-[4px] relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.votes} voti - Rating: {item.averageRating}
                </div>
              </motion.div>
              <div className="text-xs text-slate-600 mt-2 transform -rotate-45 origin-left">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // DELETE THIS ENTIRE BLOCK (lines 209-244):
  // const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = 'blue' }) => {
  //   const colorClasses = {
  //     blue: 'from-blue-500 to-blue-600',
  //     green: 'from-green-500 to-green-600',
  //     purple: 'from-purple-500 to-purple-600',
  //     orange: 'from-orange-500 to-orange-600'
  //   };
  //
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
  //     >
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <p className="text-sm font-medium text-slate-600">{title}</p>
  //           <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  //           {subtitle && (
  //             <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
  //           )}
  //           {trend && (
  //             <div className={`flex items-center mt-2 text-sm ${
  //               trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-slate-600'
  //             }`}>
  //               <TrendingUpIcon className={`w-4 h-4 mr-1 ${
  //                 trend < 0 ? 'transform rotate-180' : ''
  //               }`} />
  //               {Math.abs(trend)}% vs periodo precedente
  //             </div>
  //           )}
  //         </div>
  //         <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
  //           <Icon className="w-6 h-6 text-white" />
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
  // };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-medium text-red-900 mb-2">Errore nel caricamento</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadAnalyticsData}
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
          <p className="text-slate-600">Analisi dettagliate dei voti e delle tendenze</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
            <option value="90d">Ultimi 90 giorni</option>
            <option value="1y">Ultimo anno</option>
          </select>
        </div>
      </div>

      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={ChartBarIcon}
          title="Voti Totali"
          value={stats?.totalVotes?.toLocaleString() || '0'}
          subtitle={`Periodo: ${selectedPeriod}`}
          color="blue"
        />
        <StatCard
          icon={StarIcon}
          title="Rating Medio"
          value={stats?.averageRating || '0'}
          subtitle="Su 5 stelle"
          color="green"
        />
        <StatCard
          icon={FilmIcon}
          title="Film Votati"
          value={chartData.filmRankings.length}
          subtitle="Cortometraggi"
          color="purple"
        />
        // Trova e sostituisci TrendingUpIcon con ArrowTrendingUpIcon
        <StatCard
          icon={ArrowTrendingUpIcon} // ✅ Aggiorna qui
          title="Voti Oggi"
          value={votes.filter(vote => 
            new Date(vote.created_at).toDateString() === new Date().toDateString()
          ).length}
          subtitle="Nelle ultime 24h"
          color="orange"
        />
      </div>

      {/* Grafici */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LineChart 
          data={chartData.votesOverTime} 
          title="Andamento Voti nel Tempo"
        />
        <BarChart 
          data={chartData.ratingDistribution}
          xKey="rating"
          yKey="count"
          title="Distribuzione Rating"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={chartData.filmRankings}
          xKey="title"
          yKey="votes"
          title="Classifica Film per Numero Voti"
          color="purple"
        />
        <BarChart 
          data={chartData.hourlyDistribution.filter(item => item.count > 0)}
          xKey="hour"
          yKey="count"
          title="Distribuzione Oraria Voti"
          color="orange"
        />
      </div>

      {/* Tabella dettagliata film */}
      <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Classifica Dettagliata Film</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Posizione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Film
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Voti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Rating Medio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Stelle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {chartData.filmRankings.map((film, index) => (
                <motion.tr
                  key={film.filmId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-slate-400' :
                      index === 2 ? 'bg-orange-600' :
                      'bg-slate-300 text-slate-700'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{film.title}</p>
                      <p className="text-xs text-slate-500">ID: {film.filmId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {film.votes} voti
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900">{film.averageRating}/5</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(film.averageRating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;