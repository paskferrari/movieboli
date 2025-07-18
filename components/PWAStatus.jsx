import { usePWA } from '../hooks/usePWA';
import { useBranding } from '../contexts/BrandingContext';

const PWAStatus = ({ showInstallButton = true, showShareButton = true, className = '' }) => {
  const { isOnline, isInstalled, canInstall, installApp, shareApp } = usePWA();
  const branding = useBranding();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      // Optional: Show success message
      console.log('App installed successfully!');
    }
  };

  const handleShare = async () => {
    const success = await shareApp();
    if (success) {
      // Optional: Show success message
      console.log('Shared successfully!');
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          isOnline ? 'bg-success-500' : 'bg-error-500'
        }`}></div>
        <span className={`text-xs font-medium ${
          isOnline ? 'text-success-600' : 'text-error-600'
        }`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Install Status */}
      {isInstalled && (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-success-600">
            Installata
          </span>
        </div>
      )}

      {/* Install Button */}
      {showInstallButton && canInstall && (
        <button
          onClick={handleInstall}
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            branding.variant === 'festival'
              ? 'bg-festival-primary hover:bg-festival-secondary text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Installa
        </button>
      )}

      {/* Share Button */}
      {showShareButton && (
        <button
          onClick={handleShare}
          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
            branding.variant === 'festival'
              ? 'border-festival-primary text-festival-primary hover:bg-festival-primary hover:text-white'
              : 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
          }`}
        >
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Condividi
        </button>
      )}
    </div>
  );
};

export default PWAStatus;