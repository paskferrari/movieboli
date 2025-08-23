import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  TrashIcon,
  UserIcon,
  CalendarIcon,
  EnvelopeIcon,
  ChartBarIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { getAllUsers, getUserVotes, deleteUser } from '../../lib/supabase';

const UsersManagement = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    hasVoted: '',
    email: ''
  });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userStats, setUserStats] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [users, filters, sortBy, sortOrder, searchQuery]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await getAllUsers();
      
      // Carica le statistiche per ogni utente
      const usersWithStats = await Promise.all(
        (usersData || []).map(async (user) => {
          try {
            const votes = await getUserVotes(user.id);
            return {
              ...user,
              votesCount: votes?.length || 0,
              lastVote: votes?.length > 0 ? votes[votes.length - 1].created_at : null,
              averageRating: votes?.length > 0 
                ? (votes.reduce((sum, vote) => sum + vote.rating, 0) / votes.length).toFixed(1)
                : 0
            };
          } catch (err) {
            return {
              ...user,
              votesCount: 0,
              lastVote: null,
              averageRating: 0
            };
          }
        })
      );
      
      setUsers(usersWithStats);
      
      // Calcola statistiche generali
      const stats = {
        totalUsers: usersWithStats.length,
        activeUsers: usersWithStats.filter(u => u.votesCount > 0).length,
        averageVotesPerUser: usersWithStats.length > 0 
          ? (usersWithStats.reduce((sum, u) => sum + u.votesCount, 0) / usersWithStats.length).toFixed(1)
          : 0,
        newUsersToday: usersWithStats.filter(u => 
          new Date(u.created_at).toDateString() === new Date().toDateString()
        ).length
      };
      setUserStats(stats);
      
    } catch (err) {
      console.error('Errore nel caricamento utenti:', err);
      setError('Errore nel caricamento degli utenti');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...users];

    // Applica filtri
    if (filters.email) {
      filtered = filtered.filter(user => 
        user.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.hasVoted !== '') {
      const hasVoted = filters.hasVoted === 'true';
      filtered = filtered.filter(user => 
        hasVoted ? user.votesCount > 0 : user.votesCount === 0
      );
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(user => 
        new Date(user.created_at) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(user => 
        new Date(user.created_at) <= new Date(filters.dateTo)
      );
    }

    // Applica ricerca globale
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id?.toString().includes(searchQuery)
      );
    }

    // Applica ordinamento
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'created_at' || sortBy === 'lastVote') {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Sei sicuro di voler eliminare questo utente? Questa azione eliminerà anche tutti i suoi voti.')) return;
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } catch (err) {
      console.error('Errore nell\'eliminazione dell\'utente:', err);
      alert('Errore nell\'eliminazione dell\'utente');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (!confirm(`Sei sicuro di voler eliminare ${selectedUsers.length} utenti?`)) return;
    
    try {
      await Promise.all(selectedUsers.map(id => deleteUser(id)));
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (err) {
      console.error('Errore nell\'eliminazione multipla:', err);
      alert('Errore nell\'eliminazione degli utenti');
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const showUserDetails = async (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const exportUsersData = () => {
    const csvData = filteredUsers.map(user => ({
      ID: user.id,
      Email: user.email,
      'Data Registrazione': new Date(user.created_at).toLocaleDateString('it-IT'),
      'Numero Voti': user.votesCount,
      'Rating Medio': user.averageRating,
      'Ultimo Voto': user.lastVote ? new Date(user.lastVote).toLocaleDateString('it-IT') : 'Mai'
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utenti_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
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
            onClick={loadUsers}
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
          <h2 className="text-2xl font-bold text-slate-900">Gestione Utenti</h2>
          <p className="text-slate-600">Gestisci e analizza tutti gli utenti registrati</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportUsersData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            <span>Esporta CSV</span>
          </button>
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
          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Elimina ({selectedUsers.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistiche */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Utenti totali</p>
              <p className="text-xl font-bold text-slate-900">{userStats.totalUsers || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Utenti attivi</p>
              <p className="text-xl font-bold text-slate-900">{userStats.activeUsers || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Media voti/utente</p>
              <p className="text-xl font-bold text-slate-900">{userStats.averageVotesPerUser || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Nuovi oggi</p>
              <p className="text-xl font-bold text-slate-900">{userStats.newUsersToday || 0}</p>
            </div>
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="text"
                  placeholder="Cerca per email"
                  value={filters.email}
                  onChange={(e) => setFilters({...filters, email: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ha votato</label>
                <select
                  value={filters.hasVoted}
                  onChange={(e) => setFilters({...filters, hasVoted: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tutti</option>
                  <option value="true">Ha votato</option>
                  <option value="false">Non ha votato</option>
                </select>
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
                onClick={() => setFilters({ email: '', hasVoted: '', dateFrom: '', dateTo: '' })}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancella filtri
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabella utenti */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={selectAllUsers}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Utente</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('created_at')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Registrazione</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('votesCount')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Voti</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('averageRating')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Rating Medio</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('lastVote')}
                    className="flex items-center space-x-1 hover:text-slate-700"
                  >
                    <span>Ultimo Voto</span>
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-slate-50 transition-colors ${
                    selectedUsers.includes(user.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{user.email}</p>
                        <p className="text-xs text-slate-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-slate-900">
                        {new Date(user.created_at).toLocaleDateString('it-IT')}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(user.created_at).toLocaleTimeString('it-IT')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.votesCount > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.votesCount} voti
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900">
                      {user.averageRating > 0 ? `${user.averageRating}/5` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {user.lastVote ? (
                        <>
                          <p className="text-sm text-slate-900">
                            {new Date(user.lastVote).toLocaleDateString('it-IT')}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(user.lastVote).toLocaleTimeString('it-IT')}
                          </p>
                        </>
                      ) : (
                        <span className="text-sm text-slate-500">Mai</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => showUserDetails(user)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Visualizza dettagli"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Elimina utente"
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
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Nessun utente trovato</h3>
            <p className="text-slate-500">
              {searchQuery || Object.values(filters).some(f => f) 
                ? 'Prova a modificare i filtri di ricerca'
                : 'Non ci sono ancora utenti registrati'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal dettagli utente */}
      <AnimatePresence>
        {showUserDetail && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Dettagli Utente</h3>
                  <button
                    onClick={() => setShowUserDetail(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">
                        {selectedUser.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900">{selectedUser.email}</h4>
                      <p className="text-slate-600">ID: {selectedUser.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Data registrazione</p>
                      <p className="text-lg font-medium text-slate-900">
                        {new Date(selectedUser.created_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Numero voti</p>
                      <p className="text-lg font-medium text-slate-900">{selectedUser.votesCount}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Rating medio</p>
                      <p className="text-lg font-medium text-slate-900">
                        {selectedUser.averageRating > 0 ? `${selectedUser.averageRating}/5` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">Ultimo voto</p>
                      <p className="text-lg font-medium text-slate-900">
                        {selectedUser.lastVote 
                          ? new Date(selectedUser.lastVote).toLocaleDateString('it-IT')
                          : 'Mai'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersManagement;