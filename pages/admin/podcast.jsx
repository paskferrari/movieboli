import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Rimosso AdminRoute import
// import AdminRoute from '../../components/auth/AdminRoute';
import { useAuth } from '../../contexts/AuthContext';

const PodcastAdminDashboard = () => {
  const { user } = useAuth();
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [statistiche, setStatistiche] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('prenotazioni');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPrenotazione, setEditingPrenotazione] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEvento, setFilterEvento] = useState('');
  const [filterStato, setFilterStato] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    evento_id: '',
    nome: '',
    email: '',
    telefono: '',
    note: '',
    stato: 'confermata'
  });

  // Carica dati con seeding automatico se necessario
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/podcast/admin');
      const data = await response.json();
      
      if (data.success) {
        // Se non ci sono eventi, popola automaticamente il database
        if (!data.eventi || data.eventi.length === 0) {
          console.log('Nessun evento trovato, popolamento automatico del database...');
          try {
            const seedResponse = await fetch('/api/podcast/seed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            });
            
            if (seedResponse.ok) {
              console.log('Database popolato con successo');
              // Ricarica i dati dopo il seeding
              const reloadResponse = await fetch('/api/podcast/admin');
              const reloadData = await reloadResponse.json();
              
              if (reloadData.success) {
                setPrenotazioni(reloadData.prenotazioni);
                setEventi(reloadData.eventi);
                setStatistiche(reloadData.statistiche);
              }
            }
          } catch (seedError) {
            console.error('Errore nel popolamento automatico:', seedError);
          }
        } else {
          setPrenotazioni(data.prenotazioni);
          setEventi(data.eventi);
          setStatistiche(data.statistiche);
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Aggiornamento automatico ogni 30 secondi
    const interval = setInterval(() => {
      loadData();
    }, 30000); // 30 secondi
    
    // Cleanup dell'interval quando il componente viene smontato
    return () => clearInterval(interval);
  }, []);

  // Crea prenotazione
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/podcast/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        await loadData();
        setShowCreateForm(false);
        resetForm();
        alert('Prenotazione creata con successo!');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Errore nella creazione della prenotazione');
      console.error(err);
    }
  };

  // Aggiorna prenotazione
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/podcast/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: editingPrenotazione.id })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await loadData();
        setEditingPrenotazione(null);
        resetForm();
        alert('Prenotazione aggiornata con successo!');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Errore nell\'aggiornamento della prenotazione');
      console.error(err);
    }
  };

  // Elimina prenotazione
  const handleDelete = async (id) => {
    if (!confirm('Sei sicuro di voler eliminare questa prenotazione?')) return;
    
    try {
      const response = await fetch(`/api/podcast/admin?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        await loadData();
        alert('Prenotazione eliminata con successo!');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Errore nell\'eliminazione della prenotazione');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      evento_id: '',
      nome: '',
      email: '',
      telefono: '',
      note: '',
      stato: 'confermata'
    });
  };

  const startEdit = (prenotazione) => {
    setEditingPrenotazione(prenotazione);
    setFormData({
      evento_id: prenotazione.evento_id,
      nome: prenotazione.nome,
      email: prenotazione.email,
      telefono: prenotazione.telefono,
      note: prenotazione.note || '',
      stato: prenotazione.stato
    });
  };

  // Filtra prenotazioni
  const filteredPrenotazioni = prenotazioni.filter(p => {
    const matchSearch = !searchTerm || 
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.telefono.includes(searchTerm);
    
    const matchEvento = !filterEvento || p.evento_id === filterEvento;
    const matchStato = !filterStato || p.stato === filterStato;
    
    return matchSearch && matchEvento && matchStato;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-primary-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-movieboli-accent/30 border-t-movieboli-accent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-movieboli-podcast/20 border-b-movieboli-podcast rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-movieboli-neutral-100 text-lg sm:text-xl font-medium">Caricamento dashboard podcast...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-primary-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-movieboli-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-movieboli-podcast/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-movieboli-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-movieboli-white/10 backdrop-blur-xl border border-movieboli-white/20 rounded-2xl mb-6 sm:mb-8 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 sm:py-8 gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-movieboli-accent via-movieboli-secondary-300 to-movieboli-podcast bg-clip-text text-transparent mb-2">
                  🎧 Dashboard Podcast
                </h1>
                <p className="text-movieboli-neutral-200 text-sm sm:text-base lg:text-lg">
                  Gestione prenotazioni - <span className="text-movieboli-accent font-medium">{user?.user_metadata?.full_name}</span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-movieboli-accent to-movieboli-secondary-400 hover:from-movieboli-accent/90 hover:to-movieboli-secondary-500 text-movieboli-primary-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-movieboli-accent/25 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
              >
                <span className="text-lg sm:text-xl">✨</span>
                <span className="hidden sm:inline">Nuova Prenotazione</span>
                <span className="sm:hidden">Nuova</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Statistiche */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-movieboli-accent/20 to-movieboli-secondary-400/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-movieboli-white/20 shadow-xl hover:shadow-movieboli-accent/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-movieboli-neutral-200 text-xs sm:text-sm font-medium mb-1">Prenotazioni Totali</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-movieboli-white">{statistiche.totalePrenotazioni || 0}</p>
                  <p className="text-movieboli-accent text-xs sm:text-sm mt-1">📈 +12% questo mese</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-movieboli-accent to-movieboli-secondary-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ml-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">🎧</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-movieboli-podcast/20 to-movieboli-primary-600/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-movieboli-white/20 shadow-xl hover:shadow-movieboli-podcast/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-movieboli-neutral-200 text-xs sm:text-sm font-medium mb-1">Prenotazioni Oggi</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-movieboli-white">{statistiche.prenotazioniOggi || 0}</p>
                  <p className="text-movieboli-podcast text-xs sm:text-sm mt-1">🔥 Trend positivo</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-movieboli-podcast to-movieboli-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ml-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">📅</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-movieboli-secondary-400/20 to-movieboli-secondary-600/20 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-movieboli-white/20 shadow-xl hover:shadow-movieboli-secondary/20 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-movieboli-neutral-200 text-xs sm:text-sm font-medium mb-1">Eventi Attivi</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-movieboli-white">{eventi.length}</p>
                  <p className="text-movieboli-secondary-300 text-xs sm:text-sm mt-1">🎪 Live ora</p>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-movieboli-secondary-400 to-movieboli-secondary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ml-3">
                  <span className="text-xl sm:text-2xl lg:text-3xl">🎪</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filtri */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-movieboli-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-movieboli-white/20 mb-6 sm:mb-8 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <label className="block text-movieboli-neutral-100 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🔍 <span className="hidden sm:inline">Cerca</span>
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome, email o telefono..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white placeholder-movieboli-white/50 focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-movieboli-neutral-100 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  🎯 <span className="hidden sm:inline">Evento</span>
                </label>
                <select
                  value={filterEvento}
                  onChange={(e) => setFilterEvento(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                >
                  <option value="" className="bg-movieboli-primary-800 text-movieboli-white">Tutti gli eventi</option>
                  {eventi.map(evento => (
                    <option key={evento.evento_id} value={evento.evento_id} className="bg-movieboli-primary-800 text-movieboli-white">
                      {evento.titolo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-movieboli-neutral-100 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  📊 <span className="hidden sm:inline">Stato</span>
                </label>
                <select
                  value={filterStato}
                  onChange={(e) => setFilterStato(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                >
                  <option value="" className="bg-movieboli-primary-800 text-movieboli-white">Tutti gli stati</option>
                  <option value="confermata" className="bg-movieboli-primary-800 text-movieboli-white">Confermata</option>
                  <option value="annullata" className="bg-movieboli-primary-800 text-movieboli-white">Annullata</option>
                  <option value="in_attesa" className="bg-movieboli-primary-800 text-movieboli-white">In Attesa</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setFilterEvento('');
                    setFilterStato('');
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-movieboli-neutral-600 to-movieboli-neutral-700 hover:from-movieboli-neutral-500 hover:to-movieboli-neutral-600 text-movieboli-white rounded-lg sm:rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  🔄 <span className="hidden sm:inline">Reset</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tabella Prenotazioni */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-movieboli-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-movieboli-white/20 overflow-hidden shadow-2xl"
          >
            {/* Mobile Card View */}
            <div className="block lg:hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-movieboli-white mb-4 flex items-center gap-2">
                  📋 Prenotazioni ({filteredPrenotazioni.length})
                </h3>
                <div className="space-y-4">
                  {filteredPrenotazioni.map((prenotazione, index) => (
                    <motion.div
                      key={prenotazione.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-movieboli-white/5 rounded-xl p-4 border border-movieboli-white/10 hover:bg-movieboli-white/10 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-movieboli-white font-semibold text-base">{prenotazione.nome}</h4>
                          <p className="text-movieboli-neutral-300 text-sm">{prenotazione.email}</p>
                          <p className="text-movieboli-neutral-300 text-sm">{prenotazione.telefono}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          prenotazione.stato === 'confermata' ? 'bg-movieboli-success/20 text-green-300 border border-movieboli-success/30' :
                          prenotazione.stato === 'annullata' ? 'bg-movieboli-error/20 text-red-300 border border-movieboli-error/30' :
                          'bg-movieboli-warning/20 text-yellow-300 border border-movieboli-warning/30'
                        }`}>
                          {prenotazione.stato === 'confermata' ? '✅' :
                           prenotazione.stato === 'annullata' ? '❌' : '⏳'}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-movieboli-neutral-200 text-sm">
                          <span className="font-medium">Evento:</span> {prenotazione.podcast_eventi?.titolo || 'N/A'}
                        </p>
                        <p className="text-movieboli-neutral-200 text-sm">
                          <span className="font-medium">Data:</span> {new Date(prenotazione.data_prenotazione).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startEdit(prenotazione)}
                          className="flex-1 bg-movieboli-podcast/20 hover:bg-movieboli-podcast/30 text-movieboli-podcast border border-movieboli-podcast/30 rounded-lg py-2 px-3 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          ✏️ Modifica
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(prenotazione.id)}
                          className="flex-1 bg-movieboli-error/20 hover:bg-movieboli-error/30 text-red-300 border border-movieboli-error/30 rounded-lg py-2 px-3 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          🗑️ Elimina
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-movieboli-accent/20 to-movieboli-secondary-400/20">
                  <tr>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">👤 Nome</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">📧 Email</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">📱 Telefono</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">🎪 Evento</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">📅 Data</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">📊 Stato</th>
                    <th className="px-6 py-5 text-left text-movieboli-white font-semibold text-sm uppercase tracking-wider">⚙️ Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrenotazioni.map((prenotazione, index) => (
                    <motion.tr 
                      key={prenotazione.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`${index % 2 === 0 ? 'bg-movieboli-white/5' : 'bg-transparent'} hover:bg-movieboli-white/10 transition-all duration-300 border-b border-movieboli-white/10`}
                    >
                      <td className="px-6 py-4 text-movieboli-white font-medium">{prenotazione.nome}</td>
                      <td className="px-6 py-4 text-movieboli-neutral-200">{prenotazione.email}</td>
                      <td className="px-6 py-4 text-movieboli-neutral-200">{prenotazione.telefono}</td>
                      <td className="px-6 py-4 text-movieboli-neutral-200">
                        {prenotazione.podcast_eventi?.titolo || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-movieboli-neutral-200">
                        {new Date(prenotazione.data_prenotazione).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                          prenotazione.stato === 'confermata' ? 'bg-movieboli-success/20 text-green-300 border border-movieboli-success/30' :
                          prenotazione.stato === 'annullata' ? 'bg-movieboli-error/20 text-red-300 border border-movieboli-error/30' :
                          'bg-movieboli-warning/20 text-yellow-300 border border-movieboli-warning/30'
                        }`}>
                          {prenotazione.stato === 'confermata' ? '✅ Confermata' :
                           prenotazione.stato === 'annullata' ? '❌ Annullata' :
                           '⏳ In Attesa'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => startEdit(prenotazione)}
                            className="w-8 h-8 bg-movieboli-podcast/20 hover:bg-movieboli-podcast/30 text-movieboli-podcast rounded-lg transition-all duration-300 flex items-center justify-center border border-movieboli-podcast/30"
                          >
                            ✏️
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(prenotazione.id)}
                            className="w-8 h-8 bg-movieboli-error/20 hover:bg-movieboli-error/30 text-red-300 rounded-lg transition-all duration-300 flex items-center justify-center border border-movieboli-error/30"
                          >
                            🗑️
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredPrenotazioni.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <p className="text-movieboli-neutral-200 text-lg sm:text-xl">Nessuna prenotazione trovata</p>
                <p className="text-movieboli-neutral-300 text-sm sm:text-base mt-2">Prova a modificare i filtri di ricerca</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal Crea/Modifica */}
      <AnimatePresence>
        {(showCreateForm || editingPrenotazione) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowCreateForm(false);
              setEditingPrenotazione(null);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-movieboli-primary-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md border border-movieboli-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-3xl sm:text-4xl mb-3">{editingPrenotazione ? '✏️' : '✨'}</div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-movieboli-accent to-movieboli-secondary-300 bg-clip-text text-transparent">
                  {editingPrenotazione ? 'Modifica Prenotazione' : 'Nuova Prenotazione'}
                </h3>
              </div>
              
              <form onSubmit={editingPrenotazione ? handleUpdate : handleCreate} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    🎯 Evento
                  </label>
                  <select
                    value={formData.evento_id}
                    onChange={(e) => setFormData({...formData, evento_id: e.target.value})}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                  >
                    <option value="" className="bg-movieboli-primary-800 text-movieboli-white">Seleziona evento</option>
                    {eventi.map(evento => (
                      <option key={evento.evento_id} value={evento.evento_id} className="bg-movieboli-primary-800 text-movieboli-white">
                        {evento.titolo} ({evento.posti_disponibili} posti disponibili)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    👤 Nome
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    📱 Telefono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    📝 Note
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 resize-none text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-movieboli-neutral-100 text-sm font-semibold mb-2 flex items-center gap-2">
                    📊 Stato
                  </label>
                  <select
                    value={formData.stato}
                    onChange={(e) => setFormData({...formData, stato: e.target.value})}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-movieboli-white/10 border border-movieboli-white/30 rounded-lg sm:rounded-xl text-movieboli-white focus:outline-none focus:border-movieboli-accent focus:ring-2 focus:ring-movieboli-accent/20 transition-all duration-300 text-sm sm:text-base"
                  >
                    <option value="confermata" className="bg-movieboli-primary-800 text-movieboli-white">Confermata</option>
                    <option value="annullata" className="bg-movieboli-primary-800 text-movieboli-white">Annullata</option>
                    <option value="in_attesa" className="bg-movieboli-primary-800 text-movieboli-white">In Attesa</option>
                  </select>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-movieboli-accent to-movieboli-secondary-400 hover:from-movieboli-accent/90 hover:to-movieboli-secondary-500 text-movieboli-primary-900 py-3 px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base"
                  >
                    {editingPrenotazione ? '💾 Aggiorna' : '✨ Crea'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingPrenotazione(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gradient-to-r from-movieboli-neutral-600 to-movieboli-neutral-700 hover:from-movieboli-neutral-500 hover:to-movieboli-neutral-600 text-movieboli-white py-3 px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    ❌ Annulla
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PodcastAdminDashboard;