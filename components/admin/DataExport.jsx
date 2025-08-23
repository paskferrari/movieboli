import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  CalendarIcon,
  FunnelIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { getAllVotesDetailed, getAllUsers, getVotesDashboardStats } from '../../lib/supabase';

const DataExport = () => {
  const [exportType, setExportType] = useState('votes');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filters, setFilters] = useState({
    includeUserDetails: true,
    includeFilmDetails: true,
    includeTimestamps: true,
    minRating: '',
    maxRating: ''
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // Funzione per convertire dati in CSV
  const convertToCSV = (data, headers) => {
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Gestisce valori con virgole o caratteri speciali
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    );
    return [csvHeaders, ...csvRows].join('\n');
  };

  // Funzione per scaricare file
  const downloadFile = (content, filename, type = 'text/csv') => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Funzione per preparare i dati dei voti
  const prepareVotesData = async () => {
    const votes = await getAllVotesDetailed();
    
    return votes
      .filter(vote => {
        // Filtro per data
        if (dateRange.start && new Date(vote.created_at) < new Date(dateRange.start)) return false;
        if (dateRange.end && new Date(vote.created_at) > new Date(dateRange.end)) return false;
        
        // Filtro per rating
        if (filters.minRating && vote.rating < parseInt(filters.minRating)) return false;
        if (filters.maxRating && vote.rating > parseInt(filters.maxRating)) return false;
        
        return true;
      })
      .map(vote => {
        const baseData = {
          'ID Voto': vote.id,
          'Rating': vote.rating,
          'Film': vote.film_title || vote.film_id
        };

        if (filters.includeUserDetails) {
          baseData['Email Utente'] = vote.user_email || 'N/A';
          baseData['Nome Utente'] = vote.user_name || 'N/A';
        }

        if (filters.includeTimestamps) {
          baseData['Data Creazione'] = new Date(vote.created_at).toLocaleString('it-IT');
        }

        if (filters.includeFilmDetails) {
          baseData['ID Film'] = vote.film_id;
        }

        return baseData;
      });
  };

  // Funzione per preparare i dati degli utenti
  const prepareUsersData = async () => {
    const users = await getAllUsers();
    
    return users
      .filter(user => {
        // Filtro per data registrazione
        if (dateRange.start && new Date(user.created_at) < new Date(dateRange.start)) return false;
        if (dateRange.end && new Date(user.created_at) > new Date(dateRange.end)) return false;
        
        return true;
      })
      .map(user => ({
        'ID Utente': user.id,
        'Email': user.email,
        'Nome': user.full_name || 'N/A',
        'Data Registrazione': new Date(user.created_at).toLocaleString('it-IT'),
        'Ultimo Accesso': user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('it-IT') : 'N/A',
        'Numero Voti': user.vote_count || 0,
        'Rating Medio': user.average_rating ? parseFloat(user.average_rating).toFixed(2) : 'N/A'
      }));
  };

  // Funzione per preparare le statistiche
  const prepareStatsData = async () => {
    const stats = await getVotesDashboardStats();
    
    const statsArray = [
      { 'Metrica': 'Voti Totali', 'Valore': stats.totalVotes },
      { 'Metrica': 'Rating Medio', 'Valore': stats.averageRating },
      { 'Metrica': 'Film con più Voti', 'Valore': stats.topFilm?.title || 'N/A' },
      { 'Metrica': 'Voti Top Film', 'Valore': stats.topFilm?.votes || 'N/A' }
    ];

    // Aggiungi distribuzione rating
    if (stats.ratingDistribution) {
      Object.entries(stats.ratingDistribution).forEach(([rating, count]) => {
        statsArray.push({
          'Metrica': `Rating ${rating} stelle`,
          'Valore': count
        });
      });
    }

    return statsArray;
  };

  // Funzione principale di export
  const handleExport = async (format = 'csv') => {
    setIsExporting(true);
    setExportStatus(null);

    try {
      let data, headers, filename;

      switch (exportType) {
        case 'votes':
          data = await prepareVotesData();
          headers = data.length > 0 ? Object.keys(data[0]) : [];
          filename = `voti_export_${new Date().toISOString().split('T')[0]}.${format}`;
          break;
        
        case 'users':
          data = await prepareUsersData();
          headers = data.length > 0 ? Object.keys(data[0]) : [];
          filename = `utenti_export_${new Date().toISOString().split('T')[0]}.${format}`;
          break;
        
        case 'stats':
          data = await prepareStatsData();
          headers = data.length > 0 ? Object.keys(data[0]) : [];
          filename = `statistiche_export_${new Date().toISOString().split('T')[0]}.${format}`;
          break;
        
        default:
          throw new Error('Tipo di export non valido');
      }

      if (data.length === 0) {
        setExportStatus({ type: 'warning', message: 'Nessun dato trovato con i filtri selezionati' });
        return;
      }

      if (format === 'csv') {
        const csvContent = convertToCSV(data, headers);
        downloadFile(csvContent, filename);
      }

      setExportStatus({ 
        type: 'success', 
        message: `Export completato! ${data.length} record esportati in ${filename}` 
      });

    } catch (error) {
      console.error('Errore durante l\'export:', error);
      setExportStatus({ 
        type: 'error', 
        message: 'Errore durante l\'export: ' + error.message 
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Funzione per generare anteprima
  const generatePreview = async () => {
    try {
      let data;
      switch (exportType) {
        case 'votes':
          data = await prepareVotesData();
          break;
        case 'users':
          data = await prepareUsersData();
          break;
        case 'stats':
          data = await prepareStatsData();
          break;
        default:
          data = [];
      }
      setPreviewData(data.slice(0, 10)); // Mostra solo i primi 10 record
      setShowPreview(true);
    } catch (error) {
      console.error('Errore generazione anteprima:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export Dati</h2>
            <p className="text-gray-600">Esporta dati in formato CSV per analisi esterne</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configurazione Export */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tipo di Export */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TableCellsIcon className="h-5 w-5 mr-2 text-blue-600" />
              Tipo di Dati
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'votes', name: 'Voti', desc: 'Tutti i voti con dettagli utente e film' },
                { id: 'users', name: 'Utenti', desc: 'Dati utenti e statistiche voti' },
                { id: 'stats', name: 'Statistiche', desc: 'Metriche aggregate e KPI' }
              ].map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExportType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    exportType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm opacity-75 mt-1">{type.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Filtri Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
              Filtri Temporali
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Inizio
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Fine
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Filtri Specifici per Voti */}
          {exportType === 'votes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FunnelIcon className="h-5 w-5 mr-2 text-blue-600" />
                Filtri Avanzati
              </h3>
              
              <div className="space-y-4">
                {/* Filtri Rating */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating Minimo
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRating: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Tutti</option>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} stella{rating > 1 ? 'e' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating Massimo
                    </label>
                    <select
                      value={filters.maxRating}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxRating: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Tutti</option>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} stella{rating > 1 ? 'e' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Opzioni Inclusione Dati */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Includi nei Dati:</h4>
                  {[
                    { key: 'includeUserDetails', label: 'Dettagli Utente (email, nome)' },
                    { key: 'includeFilmDetails', label: 'Dettagli Film (ID, titolo)' },
                    { key: 'includeTimestamps', label: 'Timestamp (data e ora)' }
                  ].map((option) => (
                    <label key={option.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters[option.key]}
                        onChange={(e) => setFilters(prev => ({ 
                          ...prev, 
                          [option.key]: e.target.checked 
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pannello Azioni */}
        <div className="space-y-6">
          {/* Azioni Export */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Azioni</h3>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generatePreview}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Genera Anteprima
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExport('csv')}
                disabled={isExporting}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Esportando...</span>
                  </>
                ) : (
                  <>
                    <DocumentArrowDownIcon className="h-4 w-4" />
                    <span>Esporta CSV</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Status Export */}
          {exportStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg border ${
                exportStatus.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : exportStatus.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {exportStatus.type === 'success' ? (
                  <CheckCircleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{exportStatus.message}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Anteprima Dati */}
      {showPreview && previewData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Anteprima Dati</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {previewData.length > 0 && Object.keys(previewData[0]).map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Mostrando i primi 10 record. L'export completo includerà tutti i dati filtrati.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DataExport;