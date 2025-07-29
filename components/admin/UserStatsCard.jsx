import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UserStatsCard = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filtra e ordina gli utenti
  const filteredAndSortedUsers = users
    .filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let aValue = a[sortBy] || '';
      let bValue = b[sortBy] || '';
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const getGenderLabel = (gender) => {
    const labels = {
      'M': 'Maschio',
      'F': 'Femmina',
      'Altro': 'Altro',
      'Preferisco non rispondere': 'Non specificato'
    };
    return labels[gender] || gender;
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'bg-red-500' : 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Statistiche Generali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">{users.length}</p>
            <p className="text-movieboli-crema/70 text-sm">Utenti Totali</p>
          </div>
        </div>
        
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-movieboli-crema/70 text-sm">Amministratori</p>
          </div>
        </div>
        
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">
              {users.length > 0 ? Math.round(users.reduce((sum, user) => sum + (user.age || 0), 0) / users.length) : 0}
            </p>
            <p className="text-movieboli-crema/70 text-sm">Età Media</p>
          </div>
        </div>
        
        <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-4 border border-movieboli-violaPrincipale/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-movieboli-violaPrincipale">
              {users.filter(u => u.gender === 'F').length}
            </p>
            <p className="text-movieboli-crema/70 text-sm">Utenti Femmine</p>
          </div>
        </div>
      </div>

      {/* Controlli di Ricerca e Ordinamento */}
      <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cerca per nome, cognome o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
            >
              <option value="firstName">Nome</option>
              <option value="lastName">Cognome</option>
              <option value="email">Email</option>
              <option value="age">Età</option>
              <option value="gender">Genere</option>
              <option value="role">Ruolo</option>
            </select>
          </div>
        </div>

        {/* Tabella Utenti */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-movieboli-violaPrincipale/20">
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('firstName')}
                >
                  Nome {getSortIcon('firstName')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('lastName')}
                >
                  Cognome {getSortIcon('lastName')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('email')}
                >
                  Email {getSortIcon('email')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('age')}
                >
                  Età {getSortIcon('age')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('gender')}
                >
                  Genere {getSortIcon('gender')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-movieboli-crema/80 font-medium cursor-pointer hover:text-movieboli-crema transition-colors"
                  onClick={() => handleSort('role')}
                >
                  Ruolo {getSortIcon('role')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map((user, index) => (
                <motion.tr
                  key={user.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-movieboli-violaPrincipale/10 hover:bg-movieboli-neroProfondo/30 transition-colors"
                >
                  <td className="py-3 px-4 text-movieboli-crema">
                    {user.firstName || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-movieboli-crema">
                    {user.lastName || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-movieboli-crema/80 text-sm">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-movieboli-crema">
                    {user.age || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-movieboli-crema">
                    {getGenderLabel(user.gender)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getRoleColor(user.role)}`}>
                      {user.role === 'admin' ? 'Admin' : 'Utente'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-movieboli-crema/60">
                {searchTerm ? 'Nessun utente trovato per la ricerca.' : 'Nessun utente disponibile.'}
              </p>
            </div>
          )}
        </div>
        
        {/* Risultati della ricerca */}
        {searchTerm && (
          <div className="mt-4 text-sm text-movieboli-crema/70">
            Mostrando {filteredAndSortedUsers.length} di {users.length} utenti
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatsCard;