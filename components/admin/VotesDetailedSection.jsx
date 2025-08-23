import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllVotesDetailed, getVotesDashboardStats } from '../../lib/supabase';

const VotesDetailedSection = () => {
  const [votesData, setVotesData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVotesData();
  }, []);

  const loadVotesData = async () => {
    try {
      setLoading(true);
      const [votes, stats] = await Promise.all([
        getAllVotesDetailed(),
        getVotesDashboardStats()
      ]);
      setVotesData(votes);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Errore nel caricamento dati voti:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVotes = votesData.filter(vote => {
    if (activeFilter !== 'all' && vote.film_id !== activeFilter) return false;
    if (searchTerm && !vote.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sortedVotes = [...filteredVotes].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'rating':
        return b.rating - a.rating;
      case 'film':
        return a.film_id.localeCompare(b.film_id);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-movieboli-violaPrincipale"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con statistiche rapide */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <h3 className="text-movieboli-crema/70 text-sm font-medium">Voti Totali</h3>
          <p className="text-2xl font-bold text-movieboli-crema">{dashboardStats?.totalVotes || 0}</p>
        </div>
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <h3 className="text-movieboli-crema/70 text-sm font-medium">Media Generale</h3>
          <p className="text-2xl font-bold text-movieboli-crema">{dashboardStats?.averageRating || 0}/5</p>
        </div>
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <h3 className="text-movieboli-crema/70 text-sm font-medium">Film Più Votato</h3>
          <p className="text-lg font-bold text-movieboli-crema">
            {dashboardStats?.filmStats ? 
              Object.values(dashboardStats.filmStats)
                .sort((a, b) => b.totalVotes - a.totalVotes)[0]?.titolo || 'N/A'
              : 'N/A'
            }
          </p>
        </div>
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <h3 className="text-movieboli-crema/70 text-sm font-medium">Voti Oggi</h3>
          <p className="text-2xl font-bold text-movieboli-crema">
            {dashboardStats?.votesPerDay?.slice(-1)[0]?.count || 0}
          </p>
        </div>
      </div>

      {/* Filtri e controlli */}
      <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <select 
              value={activeFilter} 
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-movieboli-neroProfondo border border-movieboli-violaPrincipale/30 rounded-lg px-3 py-2 text-movieboli-crema"
            >
              <option value="all">Tutti i Film</option>
              {dashboardStats?.filmStats && Object.values(dashboardStats.filmStats).map(film => (
                <option key={film.id} value={film.id}>{film.titolo}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-movieboli-neroProfondo border border-movieboli-violaPrincipale/30 rounded-lg px-3 py-2 text-movieboli-crema"
            >
              <option value="date">Data</option>
              <option value="rating">Voto</option>
              <option value="film">Film</option>
            </select>
          </div>
          
          <input
            type="text"
            placeholder="Cerca per nome utente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-movieboli-neroProfondo border border-movieboli-violaPrincipale/30 rounded-lg px-3 py-2 text-movieboli-crema placeholder-movieboli-crema/50"
          />
        </div>
      </div>

      {/* Tabella voti */}
      <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl border border-movieboli-violaPrincipale/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-movieboli-neroProfondo/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-movieboli-crema/70 uppercase tracking-wider">Utente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-movieboli-crema/70 uppercase tracking-wider">Film</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-movieboli-crema/70 uppercase tracking-wider">Voto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-movieboli-crema/70 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-movieboli-crema/70 uppercase tracking-wider">Demografia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-movieboli-violaPrincipale/20">
              {sortedVotes.map((vote, index) => (
                <motion.tr 
                  key={vote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-movieboli-violaPrincipale/10 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-movieboli-crema">
                        {vote.user_profiles?.full_name || 'Utente Anonimo'}
                      </div>
                      <div className="text-sm text-movieboli-crema/60">
                        {vote.user_profiles?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-movieboli-crema">
                      {dashboardStats?.filmStats[vote.film_id]?.titolo || vote.film_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < vote.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-movieboli-crema">{vote.rating}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-movieboli-crema/70">
                    {new Date(vote.created_at).toLocaleDateString('it-IT', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-movieboli-crema/70">
                    {vote.user_profiles?.age && `${vote.user_profiles.age} anni`}
                    {vote.user_profiles?.gender && ` • ${vote.user_profiles.gender}`}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedVotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-movieboli-crema/60">Nessun voto trovato con i filtri selezionati</p>
          </div>
        )}
      </div>

      {/* Distribuzione rating */}
      {dashboardStats?.ratingDistribution && (
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
          <h3 className="text-xl font-bold text-movieboli-crema mb-4">Distribuzione Voti</h3>
          <div className="grid grid-cols-5 gap-4">
            {dashboardStats.ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="text-center">
                <div className="text-2xl font-bold text-movieboli-crema">{count}</div>
                <div className="text-sm text-movieboli-crema/70">{rating} ⭐</div>
                <div className="text-xs text-movieboli-crema/50">{percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VotesDetailedSection;