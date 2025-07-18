import { useState, useEffect } from 'react';
import { useBranding } from '../contexts/BrandingContext';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const branding = useBranding();

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Auto-show prompt after 30 seconds if not iOS and not standalone
    const timer = setTimeout(() => {
      if (!iOS && !standalone && !localStorage.getItem('pwa-install-dismissed')) {
        setShowInstallPrompt(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  return (
    <>
      {/* Install Banner */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${
        branding.variant === 'festival' 
          ? 'bg-gradient-to-r from-festival-primary to-festival-secondary' 
          : 'bg-gradient-to-r from-primary-600 to-secondary-500'
      } text-white shadow-lg transform transition-transform duration-300 ease-in-out`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Installa MOVIEBOLI</p>
              <p className="text-xs opacity-90">
                {isIOS 
                  ? 'Tocca Condividi e "Aggiungi a Home"' 
                  : 'Accesso rapido dalla schermata home'
                }
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isIOS && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 bg-white text-movieboli-primary-900 rounded-md text-sm font-medium hover:bg-movieboli-neutral-100 transition-colors"
              >
                Installa
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Chiudi"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {isIOS && showInstallPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2h1a3 3 0 003-3h2a3 3 0 003 3h1a2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 10-1.414 1.414L8.586 11H3V5z" />
                  <path d="M11 16a1 1 0 100 2h1a2 2 0 002-2v-1a1 1 0 10-2 0v1h-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Installa MOVIEBOLI
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Per installare questa app sul tuo iPhone:
              </p>
              <div className="text-left space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-sm">Tocca il pulsante Condividi</span>
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-sm">Seleziona "Aggiungi a Home"</span>
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="w-full bg-movieboli-primary-600 text-white py-2 px-4 rounded-md hover:bg-movieboli-primary-700 transition-colors"
              >
                Ho capito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;