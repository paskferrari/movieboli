import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useBranding } from '../contexts/BrandingContext';

const OfflinePage = () => {
  const [isOnline, setIsOnline] = useState(true);
  const branding = useBranding();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Offline - MOVIEBOLI</title>
        <meta name="description" content="Sei offline. Controlla la tua connessione internet." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
        <div className="max-w-md w-full text-center">
          {/* Offline Icon */}
          <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
            branding.variant === 'festival' 
              ? 'bg-festival-primary bg-opacity-10' 
              : 'bg-primary-100'
          }`}>
            <svg 
              className={`w-12 h-12 ${
                branding.variant === 'festival' ? 'text-festival-primary' : 'text-primary-600'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" 
              />
            </svg>
          </div>

          {/* Status Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              {isOnline ? 'Connessione ripristinata!' : 'Sei offline'}
            </h1>
            <p className="text-neutral-600 mb-2">
              {isOnline 
                ? 'La tua connessione internet è stata ripristinata.' 
                : 'Controlla la tua connessione internet e riprova.'
              }
            </p>
            <p className="text-sm text-neutral-500">
              Alcune funzionalità potrebbero non essere disponibili offline.
            </p>
          </div>

          {/* Connection Status Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              isOnline ? 'bg-success-500' : 'bg-error-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              isOnline ? 'text-success-600' : 'text-error-600'
            }`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={!isOnline}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                isOnline
                  ? branding.variant === 'festival'
                    ? 'bg-festival-primary hover:bg-festival-secondary text-white shadow-lg hover:shadow-xl'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {isOnline ? 'Ricarica pagina' : 'In attesa di connessione...'}
            </button>
            
            <button
              onClick={handleGoHome}
              className={`w-full py-3 px-6 rounded-lg font-medium border-2 transition-all duration-200 ${
                branding.variant === 'festival'
                  ? 'border-festival-primary text-festival-primary hover:bg-festival-primary hover:text-white'
                  : 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
              }`}
            >
              Torna alla home
            </button>
          </div>

          {/* Cached Content Notice */}
          <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-neutral-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-neutral-700 mb-1">
                  Contenuti offline disponibili
                </p>
                <p className="text-xs text-neutral-600">
                  Puoi ancora navigare nelle pagine visitate di recente grazie alla cache del browser.
                </p>
              </div>
            </div>
          </div>

          {/* MOVIEBOLI Branding */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                branding.variant === 'festival' ? 'bg-festival-primary' : 'bg-primary-600'
              }`}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-700">
                MOVIEBOLI
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfflinePage;