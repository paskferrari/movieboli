import '../styles/globals.css'
// import '../styles/movieboli-design-system.css' // Temporaneamente disabilitato per debug
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { BrandingProvider } from '../contexts/BrandingContext'
import PWAInstallPrompt from '../components/PWAInstallPrompt'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle PWA install prompt
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      // Hide install prompt if shown
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1E3A5F" />
        <link rel="icon" href="/favicon.ico" />
        {/* Preload dei font critici */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <BrandingProvider>
        <Component {...pageProps} />
        <PWAInstallPrompt />
      </BrandingProvider>
    </>
  )
}