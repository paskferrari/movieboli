import { NextResponse } from 'next/server';

// Configura qui la modalità manutenzione
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';

// Percorsi che saranno sempre accessibili anche in modalità manutenzione
const ALLOWED_PATHS = [
  '/maintenance',  // La pagina di manutenzione stessa
  '/_next',        // Risorse Next.js
  '/favicon.ico',  // Favicon
  '/icons',        // Icone
  '/images',       // Immagini
  '/manifest.json', // Manifest PWA
  '/json-folders', // Dati JSON per i cortometraggi
  '/festival/cortometraggi', // Pagina dei cortometraggi
  '/sw.js',        // Service Worker
  '/workbox-'      // Workbox (per PWA)
];

export function middleware(request) {
  console.log('=== MIDDLEWARE DEBUG ===');
  console.log('URL completo:', request.url);
  console.log('Pathname:', request.nextUrl.pathname);
  console.log('MAINTENANCE_MODE:', MAINTENANCE_MODE);
  
  // Se non siamo in modalità manutenzione, continua normalmente
  if (!MAINTENANCE_MODE) {
    console.log('Maintenance mode OFF - continuing normally');
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  
  // Controlla se il percorso è tra quelli consentiti
  const isAllowedPath = ALLOWED_PATHS.some(path => pathname.startsWith(path));
  console.log('Is allowed path:', isAllowedPath);
  
  // Se il percorso è consentito, continua
  if (isAllowedPath) {
    console.log('Allowing access to:', pathname);
    return NextResponse.next();
  }
  
  // Reindirizza TUTTI gli altri percorsi alla pagina di manutenzione
  console.log('Redirecting to maintenance:', pathname);
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  
  return NextResponse.redirect(url);
}

// Matcher più specifico che include esplicitamente la homepage
export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*).*)'
  ],
};