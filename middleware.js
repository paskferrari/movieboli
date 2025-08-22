import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configura qui la modalità manutenzione selettiva
const SELECTIVE_MAINTENANCE_MODE = process.env.SELECTIVE_MAINTENANCE_MODE === 'true';

// Percorsi specifici in manutenzione (come richiesto dall'utente)
const MAINTENANCE_PATHS = [
  '/attivita',              // Pagina attività
  '/archivio-festival',     // Archivi passati (tutte le sottopagine)
  '/festival/2023',         // Edizione 2023
  '/festival/2024',         // Edizione Pagina vota alternativa
];

// Percorsi che saranno sempre accessibili
const ALLOWED_PATHS = [
  '/maintenance',  // La pagina di manutenzione stessa
  '/_next',        // Risorse Next.js
  '/favicon.ico',  // Favicon
  '/icons',        // Icone
  '/images',       // Immagini
  '/manifest.json', // Manifest PWA
  '/json-folders', // Dati JSON per i cortometraggi
  '/festival/cortometraggi', // Pagina dei cortometraggi (rimane accessibile)
  '/donazioni',    // Pagina delle donazioni
  '/sw.js',        // Service Worker
  '/workbox-',     // Workbox (per PWA)
  '/api/',         // API routes
  '/admin',        // Pannello admin
  '/'              // Homepage rimane accessibile
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
  console.log('SELECTIVE_MAINTENANCE_MODE:', SELECTIVE_MAINTENANCE_MODE);
  
  const { pathname } = request.nextUrl;
  
  // Se la manutenzione selettiva è attiva
  if (SELECTIVE_MAINTENANCE_MODE) {
    // Controlla se il percorso corrente è in manutenzione
    const isMaintenancePath = MAINTENANCE_PATHS.some(path => 
      pathname === path || pathname.startsWith(path + '/')
    );
    
    console.log('Is maintenance path:', isMaintenancePath);
    
    if (isMaintenancePath) {
      // Verifica se l'utente è un amministratore
      const isAdmin = await isUserAdminMiddleware(request);
      console.log('Is admin user:', isAdmin);
      
      // Se non è admin, reindirizza alla pagina di manutenzione
      if (!isAdmin) {
        console.log('Redirecting to maintenance:', pathname);
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.redirect(url);
      }
      
      console.log('✅ Admin access granted to maintenance path:', pathname);
    }
  }
  
  // Per tutti gli altri percorsi, continua normalmente
  console.log('Allowing normal access to:', pathname);
  return NextResponse.next();
}

// Matcher più specifico che include esplicitamente la homepage
export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*).*)'
  ],
};