import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon, 
  UsersIcon, 
  FilmIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

// Importa i nuovi componenti che creeremo
import DashboardOverview from './DashboardOverview';
import VotesManagement from './VotesManagement';
import UsersManagement from './UsersManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import DataExport from './DataExport';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Configurazione delle sezioni della dashboard
  const sections = [
    {
      id: 'overview',
      name: 'Panoramica',
      icon: HomeIcon,
      component: DashboardOverview,
      description: 'Vista generale delle statistiche'
    },
    {
      id: 'votes',
      name: 'Gestione Voti',
      icon: FilmIcon,
      component: VotesManagement,
      description: 'Gestisci voti e cortometraggi'
    },
    {
      id: 'users',
      name: 'Gestione Utenti',
      icon: UsersIcon,
      component: UsersManagement,
      description: 'Gestisci utenti e profili'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: ChartBarIcon,
      component: AnalyticsDashboard,
      description: 'Analisi avanzate e grafici'
    },
    {
      id: 'export',
      name: 'Export Dati',
      icon: DocumentArrowDownIcon,
      component: DataExport,
      description: 'Esporta dati in vari formati'
    },
    {
      id: 'settings',
      name: 'Impostazioni',
      icon: Cog6ToothIcon,
      component: AdminSettings,
      description: 'Configurazioni sistema'
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);
  const CurrentComponent = currentSection?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Admin</h1>
              <p className="text-sm text-slate-600">Gestione Festival MovieBoli</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Barra di ricerca */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cerca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifiche */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <BellIcon className="w-6 h-6 text-slate-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Profilo utente */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900">Admin</p>
                <p className="text-xs text-slate-600">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-80 bg-white shadow-lg border-r border-slate-200 min-h-screen"
            >
              <nav className="p-6">
                <div className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                        }`} />
                        <div className="text-left">
                          <p className={`font-medium ${
                            isActive ? 'text-white' : 'text-slate-900'
                          }`}>
                            {section.name}
                          </p>
                          <p className={`text-xs ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {section.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Contenuto principale */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-0' : 'ml-0'
        }`}>
          <div className="p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-slate-900 font-medium">{currentSection?.name}</span>
              </nav>
            </div>

            {/* Contenuto della sezione */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px]"
              >
                {CurrentComponent ? (
                  <CurrentComponent searchQuery={searchQuery} />
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Cog6ToothIcon className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Sezione in sviluppo</h3>
                      <p className="text-slate-600">Questa sezione sarà disponibile a breve.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
