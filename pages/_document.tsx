import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it-IT">
      {/* Viewport meta tag moved to Html to avoid Next.js warning */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="description" content="MOVIEBOLI - Associazione culturale per il cinema, festival e podcast Ciliegie" />
        <meta name="keywords" content="movieboli, festival, cinema, podcast, ciliegie, cultura, associazione, eventi" />
        <meta name="author" content="MOVIEBOLI" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="MOVIEBOLI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MOVIEBOLI" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#1E3A5F" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#1E3A5F" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MOVIEBOLI - Associazione Culturale" />
        <meta property="og:description" content="Festival del Cinema, Podcast Ciliegie e attività culturali" />
        <meta property="og:site_name" content="MOVIEBOLI" />
        <meta property="og:url" content="https://movieboli.it" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        <meta property="og:locale" content="it_IT" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MOVIEBOLI - Associazione Culturale" />
        <meta name="twitter:description" content="Festival del Cinema, Podcast Ciliegie e attività culturali" />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
        
        {/* Favicons and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-apple-touch.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-apple-touch.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/icons/icon-192x192.png" as="image" type="image/png" />
        
        {/* Security */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}