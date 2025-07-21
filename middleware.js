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
  // Se non siamo in modalità manutenzione, continua normalmente
  if (!MAINTENANCE_MODE) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  
  // Controlla se il percorso è tra quelli consentiti
  const isAllowedPath = ALLOWED_PATHS.some(path => pathname.startsWith(path));
  
  // Se siamo già nella pagina di manutenzione o il percorso è consentito, continua
  if (pathname === '/maintenance' || isAllowedPath) {
    return NextResponse.next();
  }
  
  // Altrimenti, reindirizza alla pagina di manutenzione
  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  
  return NextResponse.redirect(url);
}

// Configura il middleware per essere eseguito su tutte le richieste
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};