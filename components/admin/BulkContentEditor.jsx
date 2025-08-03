import React, { useState } from 'react';
import { useContent } from '../../contexts/ContentContext';

const BulkContentEditor = ({ category, onClose }) => {
  const { content, updateContent } = useContent();
  const [changes, setChanges] = useState({});
  const [saving, setSaving] = useState(false);

  const categoryContent = Object.entries(content)
    .filter(([key]) => key.startsWith(category + '.'))
    .sort(([a], [b]) => a.localeCompare(b));

  const handleChange = (key, value) => {
    setChanges(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(changes)) {
        await updateContent(key, value);
      }
      setChanges({});
      onClose();
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Modifica Categoria: {category}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {categoryContent.map(([key, value]) => (
            <div key={key} className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key}
              </label>
              <textarea
                value={changes[key] !== undefined ? changes[key] : value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Annulla
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving || Object.keys(changes).length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : `Salva ${Object.keys(changes).length} modifiche`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkContentEditor;