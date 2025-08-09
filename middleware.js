import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
  '/donazioni',    // Pagina delle donazioni
  '/sw.js',        // Service Worker
  '/workbox-',     // Workbox (per PWA)
  '/api/',          // API routes
  '/admin'
];

// Funzione per verificare se un utente è admin nel middleware
async function isUserAdminMiddleware(request) {
  try {
    // Ottieni il token di autenticazione dai cookie
    const token = request.cookies.get('sb-access-token')?.value ||
                  request.cookies.get('supabase-auth-token')?.value;
    
    if (!token) {
      return false;
    }

    // Crea client Supabase per il middleware
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Verifica il token e ottieni l'utente
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return false;
    }

    console.log('🔍 [Middleware] Checking admin for user:', user.email);

    // Controllo email speciale per admin
    if (user.email === 'amministratoreunico@movieboli.com') {
      console.log('✅ [Middleware] Admin riconosciuto tramite email speciale');
      return true;
    }

    // Controllo user_metadata
    if (user.user_metadata?.role === 'admin') {
      console.log('✅ [Middleware] Admin riconosciuto tramite user_metadata');
      return true;
    }

    // Controllo app_metadata
    if (user.app_metadata?.role === 'admin') {
      console.log('✅ [Middleware] Admin riconosciuto tramite app_metadata');
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ [Middleware] Errore verifica admin:', error);
    return false;
  }
}

export async function middleware(request) {
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

  // Verifica se l'utente è un amministratore
  const isAdmin = await isUserAdminMiddleware(request);
  console.log('Is admin user:', isAdmin);
  
  // Se è un admin, permetti l'accesso a tutte le pagine
  if (isAdmin) {
    console.log('✅ Admin access granted to:', pathname);
    return NextResponse.next();
  }
  
  // Reindirizza tutti gli altri utenti alla pagina di manutenzione
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