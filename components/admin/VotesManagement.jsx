import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  TrashIcon,
  StarIcon,
  CalendarIcon,
  UserIcon,
  FilmIcon
} from '@heroicons/react/24/outline';
import { getAllVotesDetailed, deleteVote } from '../../lib/supabase';

const VotesManagement = ({ searchQuery }) => {
  const [votes, setVotes] = useState([]);
  const [filteredVotes, setFilteredVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    rating: '',
    film: '',
    dateFrom: '',
    dateTo: '',
    user: ''
  });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedVotes, setSelectedVotes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadVotes();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [votes, filters, sortBy, sortOrder, searchQuery]);

  const loadVotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const votesData = await getAllVotesDetailed();
      setVotes(votesData || []);
    } catch (err) {
      console.error('Errore nel caricamento voti:', err);
      setError('Errore nel caricamento dei voti');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...votes];

    // Applica filtri
    if (filters.rating) {
      filtered = filtered.filter(vote => vote.rating === parseInt(filters.rating));
    }
    if (filters.film) {
      filtered = filtered.filter(vote => 
        vote.film_title?.toLowerCase().includes(filters.film.toLowerCase()) ||
        vote.film_id?.toString().includes(filters.film)
      );
    }
    if (filters.user) {
      filtered = filtered.filter(vote => 
        vote.user_email?.toLowerCase().includes(filters.user.toLowerCase())
      );
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(vote => 
        new Date(vote.created_at) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(vote => 
        new Date(vote.created_at) <= new Date(filters.dateTo)
      );
    }

    // Applica ricerca globale
    if (searchQuery) {
      filtered = filtered.filter(vote =>
        vote.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vote.film_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vote.rating?.toString().includes(searchQuery)
      );
    }

    // Applica ordinamento
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'created_at') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredVotes(filtered);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDeleteVote = async (voteId) => {
    if (!confirm('Sei sicuro di voler eliminare questo voto?')) return;
    
    try {
      await deleteVote(voteId);
      setVotes(votes.filter(vote => vote.id !== voteId));
      setSelectedVotes(selectedVotes.filter(id => id !== voteId));
    } catch (err) {
      console.error('Errore nell\'eliminazione del voto:', err);
      alert('Errore nell\'eliminazione del voto');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVotes.length === 0) return;
    if (!confirm(`Sei sicuro di voler eliminare ${selectedVotes.length} voti?`)) return;
    
    try {
      await Promise.all(selectedVotes.map(id => deleteVote(id)));
      setVotes(votes.filter(vote => !selectedVotes.includes(vote.id)));
      setSelectedVotes([]);
    } catch (err) {
      console.error('Errore nell\'eliminazione multipla:', err);
      alert('Errore nell\'eliminazione dei voti');
    }
  };

  const toggleVoteSelection = (voteId) => {
    setSelectedVotes(prev => 
      prev.includes(voteId) 
        ? prev.filter(id => id !== voteId)
        : [...prev, voteId]
    );
  };

  const selectAllVotes = () => {
    if (selectedVotes.length === filteredVotes.length) {
      setSelectedVotes([]);
    } else {
      setSelectedVotes(filteredVotes.map(vote => vote.id));
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded"></div>
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
            onClick={loadVotes}
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
          <h2 className="text-2xl font-bold text-slate-900">Gestione Voti</h2>
          <p className="text-slate-600">Gestisci e analizza tutti i voti ricevuti</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showFilters 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <FunnelIcon className="w-5 h-5" />
            <span>Filtri</span>
          </button>
          {selectedVotes.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Elimina ({selectedVotes.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filtri */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tutti i rating</option>
                  <option value="1">1 stella</option>
                  <option value="2">2 stelle</option>
                  <option value="3">3 stelle</option>
                  <option value="4">4 stelle</option>
                  <option value="5">5 stelle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Film</label>
                <input
                  type="text"
                  placeholder="Nome o ID film"
                  value={filters.film}
                  onChange={(e) => setFilters({...filters, film: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Utente</label>
                <input
                  type="text"
                  placeholder="Email utente"
                  value={filters.user}
                  onChange={(e) => setFilters({...filters, user: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Data da</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Data a</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({ rating: '', film: '', dateFrom: '', dateTo: '', user: '' })}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancella filtri
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FilmIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Voti totali</p>
              <p className="text-xl font-bold text-slate-900">{filteredVotes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <StarIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Rating medio</p>
              <p className="text-xl font-bold text-slate-900">
                {filteredVotes.length > 0 
                  ? (filteredVotes.reduce((sum, vote) => sum + vote.rating, 0) / filteredVotes.length).toFixed(1)
                  : '0'
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Utenti unici</p>
              <p className="text-xl font-bold text-slate-900">
                {new Set(filteredVotes.map(vote => vote.user_id)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Oggi</p>
              <p className="text-xl font-bold text-slate-900">
                {filteredVotes.filter(vote => 
                  new Date(vote.created_at).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabella voti */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedVotes.length === filteredVotes.length && filteredVotes.length > 0}
                    onChange={selectAllVotes}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('user_email')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Utente</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('film_title')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Film</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('rating')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Rating</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('created_at')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Data</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredVotes.map((vote, index) => (
                <motion.tr
                  key={vote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-slate-50 transition-colors ${
                    selectedVotes.includes(vote.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedVotes.includes(vote.id)}
                      onChange={() => toggleVoteSelection(vote.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {vote.user_email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{vote.user_email}</p>
                        <p className="text-xs text-slate-500">ID: {vote.user_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {vote.film_title || `Film ${vote.film_id}`}
                      </p>
                      <p className="text-xs text-slate-500">ID: {vote.film_id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(vote.rating)}
                      <span className="ml-2 text-sm font-medium text-slate-900">{vote.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-slate-900">
                        {new Date(vote.created_at).toLocaleDateString('it-IT')}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(vote.created_at).toLocaleTimeString('it-IT')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Visualizza dettagli"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVote(vote.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Elimina voto"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredVotes.length === 0 && (
          <div className="text-center py-12">
            <FilmIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Nessun voto trovato</h3>
            <p className="text-slate-500">
              {searchQuery || Object.values(filters).some(f => f) 
                ? 'Prova a modificare i filtri di ricerca'
                : 'Non ci sono ancora voti nel sistema'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotesManagement;