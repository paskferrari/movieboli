import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      newVotes: true,
      newUsers: true,
      systemAlerts: true,
      weeklyReports: false
    },
    security: {
      requireEmailVerification: true,
      enableRateLimit: true,
      logUserActions: true,
      sessionTimeout: 30
    },
    display: {
      itemsPerPage: 20,
      defaultDateRange: 7,
      showUserEmails: true,
      enableRealTimeUpdates: true
    },
    export: {
      maxRecords: 10000,
      allowedFormats: ['csv'],
      includePersonalData: true
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Simula il salvataggio delle impostazioni
  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In un'implementazione reale, qui salveresti le impostazioni nel database
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      setSaveStatus({ type: 'success', message: 'Impostazioni salvate con successo!' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Errore nel salvataggio delle impostazioni' });
    } finally {
      setIsSaving(false);
    }
  };

  // Carica le impostazioni salvate
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Errore nel caricamento delle impostazioni:', error);
      }
    }
  }, []);

  // Funzione per aggiornare le impostazioni
  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Cog6ToothIcon className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Impostazioni Admin</h2>
            <p className="text-gray-600">Configura le impostazioni della dashboard amministrativa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifiche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BellIcon className="h-5 w-5 mr-2 text-blue-600" />
            Notifiche
          </h3>
          
          <div className="space-y-4">
            {[
              { key: 'newVotes', label: 'Nuovi Voti', desc: 'Ricevi notifiche per ogni nuovo voto' },
              { key: 'newUsers', label: 'Nuovi Utenti', desc: 'Notifica quando si registra un nuovo utente' },
              { key: 'systemAlerts', label: 'Avvisi Sistema', desc: 'Notifiche per errori e problemi tecnici' },
              { key: 'weeklyReports', label: 'Report Settimanali', desc: 'Riepilogo settimanale delle attività' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{notification.label}</div>
                  <div className="text-sm text-gray-500">{notification.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[notification.key]}
                    onChange={(e) => updateSetting('notifications', notification.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sicurezza */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-600" />
            Sicurezza
          </h3>
          
          <div className="space-y-4">
            {[
              { key: 'requireEmailVerification', label: 'Verifica Email Obbligatoria', desc: 'Gli utenti devono verificare l\'email per votare' },
              { key: 'enableRateLimit', label: 'Limite Velocità', desc: 'Limita il numero di richieste per utente' },
              { key: 'logUserActions', label: 'Log Azioni Utente', desc: 'Registra tutte le azioni degli utenti' }
            ].map((security) => (
              <div key={security.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{security.label}</div>
                  <div className="text-sm text-gray-500">{security.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security[security.key]}
                    onChange={(e) => updateSetting('security', security.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
            
            {/* Timeout Sessione */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeout Sessione (minuti)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Visualizzazione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <EyeIcon className="h-5 w-5 mr-2 text-blue-600" />
            Visualizzazione
          </h3>
          
          <div className="space-y-4">
            {/* Items per pagina */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elementi per Pagina
              </label>
              <select
                value={settings.display.itemsPerPage}
                onChange={(e) => updateSetting('display', 'itemsPerPage', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            {/* Range date predefinito */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Range Date Predefinito (giorni)
              </label>
              <select
                value={settings.display.defaultDateRange}
                onChange={(e) => updateSetting('display', 'defaultDateRange', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={7}>7 giorni</option>
                <option value={30}>30 giorni</option>
                <option value={90}>90 giorni</option>
                <option value={365}>1 anno</option>
              </select>
            </div>
            
            {/* Opzioni visualizzazione */}
            {[
              { key: 'showUserEmails', label: 'Mostra Email Utenti', desc: 'Visualizza le email nelle tabelle utenti' },
              { key: 'enableRealTimeUpdates', label: 'Aggiornamenti Real-time', desc: 'Aggiorna automaticamente i dati' }
            ].map((display) => (
              <div key={display.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{display.label}</div>
                  <div className="text-sm text-gray-500">{display.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.display[display.key]}
                    onChange={(e) => updateSetting('display', display.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Export */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-600" />
            Export Dati
          </h3>
          
          <div className="space-y-4">
            {/* Limite record */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Massimo Record per Export
              </label>
              <input
                type="number"
                min="100"
                max="100000"
                step="100"
                value={settings.export.maxRecords}
                onChange={(e) => updateSetting('export', 'maxRecords', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Opzioni export */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">Includi Dati Personali</div>
                <div className="text-sm text-gray-500">Permetti export di email e dati sensibili</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.export.includePersonalData}
                  onChange={(e) => updateSetting('export', 'includePersonalData', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Informazioni Admin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="h-5 w-5 mr-2 text-blue-600" />
          Informazioni Amministratore
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{user?.email || 'N/A'}</div>
            <div className="text-sm text-gray-500">Email Admin</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('it-IT') : 'N/A'}
            </div>
            <div className="text-sm text-gray-500">Ultimo Accesso</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Attivo</div>
            <div className="text-sm text-gray-500">Stato Account</div>
          </div>
        </div>
      </motion.div>

      {/* Azioni */}
      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const savedSettings = localStorage.getItem('adminSettings');
            if (savedSettings) {
              setSettings(JSON.parse(savedSettings));
              setSaveStatus({ type: 'success', message: 'Impostazioni ripristinate!' });
            }
          }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Ripristina
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Salvando...</span>
            </>
          ) : (
            <span>Salva Impostazioni</span>
          )}
        </motion.button>
      </div>

      {/* Status Salvataggio */}
      {saveStatus && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg border ${
            saveStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            {saveStatus.type === 'success' ? (
              <ShieldCheckIcon className="h-5 w-5" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5" />
            )}
            <p className="font-medium">{saveStatus.message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminSettings;