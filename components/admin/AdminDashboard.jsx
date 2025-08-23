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
  MagnifyingGlassIcon,
  XMarkIcon
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default false per mobile
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when section changes on mobile
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

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
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">Dashboard Admin</h1>
              <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Gestione Festival MovieBoli</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on small mobile */}
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cerca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32 lg:w-auto"
              />
            </div>

            {/* Mobile Search Button */}
            <button className="sm:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-600" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors touch-manipulation">
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900">Admin</p>
                <p className="text-xs text-slate-600 truncate max-w-24">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar - Mobile Optimized */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: isMobile ? -300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isMobile ? -300 : -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${
                isMobile 
                  ? 'fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw]' 
                  : 'w-80'
              } bg-white shadow-lg border-r border-slate-200 min-h-screen`}
            >
              {/* Mobile Close Button */}
              {isMobile && (
                <div className="flex justify-end p-4 border-b border-slate-200">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-slate-600" />
                  </button>
                </div>
              )}

              <nav className="p-4 sm:p-6">
                <div className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionChange(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 group touch-manipulation ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                        }`} />
                        <div className="text-left min-w-0 flex-1">
                          <p className={`font-medium truncate ${
                            isActive ? 'text-white' : 'text-slate-900'
                          }`}>
                            {section.name}
                          </p>
                          <p className={`text-xs truncate ${
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

        {/* Main Content - Mobile Optimized */}
        <main className={`flex-1 transition-all duration-300 min-w-0 ${
          !isMobile && sidebarOpen ? 'ml-0' : 'ml-0'
        }`}>
          <div className="p-3 sm:p-6">
            {/* Breadcrumb - Mobile Optimized */}
            <div className="mb-4 sm:mb-6">
              <nav className="flex items-center space-x-2 text-sm text-slate-600">
                <span className="hidden sm:inline">Dashboard</span>
                <span className="hidden sm:inline">/</span>
                <span className="text-slate-900 font-medium truncate">{currentSection?.name}</span>
              </nav>
            </div>

            {/* Content Container - Mobile Optimized */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 min-h-[500px] sm:min-h-[600px] overflow-hidden"
              >
                {CurrentComponent ? (
                  <CurrentComponent searchQuery={searchQuery} />
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center p-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Cog6ToothIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">Sezione in sviluppo</h3>
                      <p className="text-sm sm:text-base text-slate-600">Questa sezione sarà disponibile a breve.</p>
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
