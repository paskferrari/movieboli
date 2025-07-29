import '../styles/globals.css'
import '../styles/movieboli-design-system.css'
import '../styles/optimizations.css'
import '../styles/mobile-optimizations.css'
import { BrandingProvider } from '../contexts/BrandingContext'
import { AuthProvider } from '../contexts/AuthContext'
import Head from 'next/head'
import PWAInstallPrompt from '../components/PWAInstallPrompt'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#7968fa" />
      </Head>
      <BrandingProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </BrandingProvider>
    </>
  )
}