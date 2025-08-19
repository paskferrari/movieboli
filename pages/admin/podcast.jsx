import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminRoute from '../../components/auth/AdminRoute';
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

  // Carica dati
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/podcast/admin');
      const data = await response.json();
      
      if (data.success) {
        setPrenotazioni(data.prenotazioni);
        setEventi(data.eventi);
        setStatistiche(data.statistiche);
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
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-movieboli-crema text-lg">Caricamento dashboard podcast...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero">
        {/* Header */}
        <div className="bg-movieboli-nero/50 backdrop-blur-sm border-b border-movieboli-violaPrincipale/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-movieboli-crema">Dashboard Podcast</h1>
                <p className="text-movieboli-crema/70">
                  Gestione prenotazioni - {user?.user_metadata?.full_name}
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                + Nuova Prenotazione
              </button>
            </div>
          </div>
        </div>

        {/* Statistiche */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-movieboli-crema/70 text-sm font-medium">Prenotazioni Totali</p>
                  <p className="text-3xl font-bold text-movieboli-crema">{statistiche.totalePrenotazioni || 0}</p>
                </div>
                <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎧</span>
                </div>
              </div>
            </div>
            
            <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-movieboli-crema/70 text-sm font-medium">Prenotazioni Oggi</p>
                  <p className="text-3xl font-bold text-movieboli-crema">{statistiche.prenotazioniOggi || 0}</p>
                </div>
                <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
            
            <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-movieboli-crema/70 text-sm font-medium">Eventi Attivi</p>
                  <p className="text-3xl font-bold text-movieboli-crema">{eventi.length}</p>
                </div>
                <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎪</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filtri */}
          <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl p-6 border border-movieboli-violaPrincipale/20 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Cerca</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome, email o telefono..."
                  className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale"
                />
              </div>
              
              <div>
                <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Evento</label>
                <select
                  value={filterEvento}
                  onChange={(e) => setFilterEvento(e.target.value)}
                  className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                >
                  <option value="">Tutti gli eventi</option>
                  {eventi.map(evento => (
                    <option key={evento.evento_id} value={evento.evento_id}>
                      {evento.titolo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Stato</label>
                <select
                  value={filterStato}
                  onChange={(e) => setFilterStato(e.target.value)}
                  className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                >
                  <option value="">Tutti gli stati</option>
                  <option value="confermata">Confermata</option>
                  <option value="annullata">Annullata</option>
                  <option value="in_attesa">In Attesa</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterEvento('');
                    setFilterStato('');
                  }}
                  className="w-full px-4 py-2 bg-movieboli-violaPrincipale/20 hover:bg-movieboli-violaPrincipale/30 text-movieboli-crema rounded-lg transition-colors"
                >
                  Reset Filtri
                </button>
              </div>
            </div>
          </div>

          {/* Tabella Prenotazioni */}
          <div className="bg-movieboli-nero/40 backdrop-blur-sm rounded-xl border border-movieboli-violaPrincipale/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-movieboli-nero/60">
                  <tr>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Nome</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Email</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Telefono</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Evento</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Data</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Stato</th>
                    <th className="px-6 py-4 text-left text-movieboli-crema font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrenotazioni.map((prenotazione, index) => (
                    <tr key={prenotazione.id} className={index % 2 === 0 ? 'bg-movieboli-nero/20' : 'bg-transparent'}>
                      <td className="px-6 py-4 text-movieboli-crema">{prenotazione.nome}</td>
                      <td className="px-6 py-4 text-movieboli-crema">{prenotazione.email}</td>
                      <td className="px-6 py-4 text-movieboli-crema">{prenotazione.telefono}</td>
                      <td className="px-6 py-4 text-movieboli-crema">
                        {prenotazione.podcast_eventi?.titolo || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-movieboli-crema">
                        {new Date(prenotazione.data_prenotazione).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prenotazione.stato === 'confermata' ? 'bg-green-500/20 text-green-400' :
                          prenotazione.stato === 'annullata' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {prenotazione.stato}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(prenotazione)}
                            className="text-movieboli-violaPrincipale hover:text-movieboli-violaPrincipale/80 transition-colors"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(prenotazione.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPrenotazioni.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-movieboli-crema/70">Nessuna prenotazione trovata</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Crea/Modifica */}
        <AnimatePresence>
          {(showCreateForm || editingPrenotazione) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowCreateForm(false);
                setEditingPrenotazione(null);
                resetForm();
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-movieboli-nero/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-md border border-movieboli-violaPrincipale/20"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-movieboli-crema mb-6">
                  {editingPrenotazione ? 'Modifica Prenotazione' : 'Nuova Prenotazione'}
                </h3>
                
                <form onSubmit={editingPrenotazione ? handleUpdate : handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Evento</label>
                    <select
                      value={formData.evento_id}
                      onChange={(e) => setFormData({...formData, evento_id: e.target.value})}
                      required
                      className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                    >
                      <option value="">Seleziona evento</option>
                      {eventi.map(evento => (
                        <option key={evento.evento_id} value={evento.evento_id}>
                          {evento.titolo} ({evento.posti_disponibili} posti disponibili)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                      className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Telefono</label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      required
                      className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Note</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                    />
                  </div>
                  
                  {editingPrenotazione && (
                    <div>
                      <label className="block text-movieboli-crema/70 text-sm font-medium mb-2">Stato</label>
                      <select
                        value={formData.stato}
                        onChange={(e) => setFormData({...formData, stato: e.target.value})}
                        className="w-full px-3 py-2 bg-movieboli-nero/50 border border-movieboli-violaPrincipale/30 rounded-lg text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale"
                      >
                        <option value="confermata">Confermata</option>
                        <option value="annullata">Annullata</option>
                        <option value="in_attesa">In Attesa</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      {editingPrenotazione ? 'Aggiorna' : 'Crea'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false);
                        setEditingPrenotazione(null);
                        resetForm();
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Annulla
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminRoute>
  );
};

export default PodcastAdminDashboard;