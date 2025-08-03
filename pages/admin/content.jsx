import React, { useState, useEffect } from 'react';
import AdminRoute from '../../components/auth/AdminRoute';
import { useContent } from '../../contexts/ContentContext';
import { supabase, isDemoMode } from '../../lib/supabase';

const ContentManagement = () => {
  const { content, updateContent, loadContent } = useContent();
  const [contentList, setContentList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newContent, setNewContent] = useState({ key: '', value: '', description: '', category: '', page: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState({ category: '', page: '' });

  // Carica lista completa contenuti
  const loadFullContentList = async () => {
    if (isDemoMode) {
      const demoList = Object.entries(content).map(([key, value]) => ({
        key,
        value,
        description: `Contenuto demo: ${key}`,
        category: key.split('.')[0],
        page: 'demo'
      }));
      setContentList(demoList);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });
      
      if (error) throw error;
      setContentList(data || []);
    } catch (error) {
      console.error('Errore nel caricamento contenuti:', error);
    }
  };

  useEffect(() => {
    loadFullContentList();
  }, [content]);

  // Filtra contenuti
  const filteredContent = contentList.filter(item => {
    return (!filter.category || item.category === filter.category) &&
           (!filter.page || item.page === filter.page);
  });

  // Ottieni categorie e pagine uniche
  const categories = [...new Set(contentList.map(item => item.category).filter(Boolean))];
  const pages = [...new Set(contentList.map(item => item.page).filter(Boolean))];

  const handleSave = async (key, value) => {
    const success = await updateContent(key, value);
    if (success) {
      setEditingItem(null);
      loadFullContentList();
    }
  };

  const handleAddNew = async () => {
    if (!newContent.key || !newContent.value) return;
    
    const success = await updateContent(newContent.key, newContent.value);
    if (success) {
      setNewContent({ key: '', value: '', description: '', category: '', page: '' });
      setShowAddForm(false);
      loadFullContentList();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestione Contenuti Sito</h1>
          <p className="text-gray-600">Modifica tutti i contenuti testuali del sito MovieBoli</p>
        </div>

        {/* Filtri */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select 
                value={filter.category} 
                onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Tutte le categorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pagina</label>
              <select 
                value={filter.page} 
                onChange={(e) => setFilter(prev => ({ ...prev, page: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Tutte le pagine</option>
                {pages.map(page => (
                  <option key={page} value={page}>{page}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Aggiungi Contenuto
              </button>
            </div>
          </div>
        </div>

        {/* Form aggiunta nuovo contenuto */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Aggiungi Nuovo Contenuto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Chiave (es: hero.title)"
                value={newContent.key}
                onChange={(e) => setNewContent(prev => ({ ...prev, key: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Categoria"
                value={newContent.category}
                onChange={(e) => setNewContent(prev => ({ ...prev, category: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <textarea
                placeholder="Valore del contenuto"
                value={newContent.value}
                onChange={(e) => setNewContent(prev => ({ ...prev, value: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2 col-span-full"
                rows={3}
              />
              <input
                type="text"
                placeholder="Pagina"
                value={newContent.page}
                onChange={(e) => setNewContent(prev => ({ ...prev, page: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Descrizione"
                value={newContent.description}
                onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddNew}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Salva
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Lista contenuti */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chiave</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valore</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagina</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map((item) => (
                  <tr key={item.key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {editingItem === item.key ? (
                        <textarea
                          defaultValue={item.value}
                          onBlur={(e) => handleSave(item.key, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey) {
                              handleSave(item.key, e.target.value);
                            }
                            if (e.key === 'Escape') {
                              setEditingItem(null);
                            }
                          }}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                          rows={2}
                          autoFocus
                        />
                      ) : (
                        <div className="max-w-xs truncate" title={item.value}>
                          {item.value}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.page}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setEditingItem(item.key)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Modifica
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nessun contenuto trovato con i filtri selezionati.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ContentManagementPage = () => {
  return (
    <AdminRoute>
      <ContentManagement />
    </AdminRoute>
  );
};

export default ContentManagementPage;