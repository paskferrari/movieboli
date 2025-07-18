import { useState, useEffect } from 'react';

export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Check if app is installed (standalone mode)
    const checkInstalled = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true ||
                        localStorage.getItem('pwa-installed') === 'true';
      setIsInstalled(standalone);
    };

    checkInstalled();

    // Online/Offline event listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // PWA install event listeners
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa-installed', 'true');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
      
      return outcome === 'accepted';
    }
    return false;
  };

  const shareApp = async (data = {}) => {
    const shareData = {
      title: 'MOVIEBOLI - Associazione Culturale',
      text: 'Scopri il Festival del Cinema e il Podcast Ciliegie',
      url: window.location.origin,
      ...data
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        console.log('Error sharing:', error);
        return false;
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        return true;
      } catch (error) {
        console.log('Error copying to clipboard:', error);
        return false;
      }
    }
  };

  const getInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);

    if (isIOS) {
      return {
        platform: 'iOS',
        steps: [
          'Tocca il pulsante Condividi (quadrato con freccia verso l\'alto)',
          'Scorri verso il basso e tocca "Aggiungi a Home"',
          'Tocca "Aggiungi" per confermare'
        ]
      };
    } else if (isAndroid && isChrome) {
      return {
        platform: 'Android Chrome',
        steps: [
          'Tocca il menu (tre punti) in alto a destra',
          'Seleziona "Aggiungi a schermata Home"',
          'Tocca "Aggiungi" per confermare'
        ]
      };
    } else {
      return {
        platform: 'Desktop',
        steps: [
          'Cerca l\'icona di installazione nella barra degli indirizzi',
          'Clicca sull\'icona e seleziona "Installa"',
          'Conferma l\'installazione'
        ]
      };
    }
  };

  const canInstall = () => {
    return !isInstalled && (isInstallable || /iPad|iPhone|iPod/.test(navigator.userAgent));
  };

  return {
    isOnline,
    isInstalled,
    isInstallable,
    canInstall: canInstall(),
    installApp,
    shareApp,
    getInstallInstructions
  };
};

export default usePWA;