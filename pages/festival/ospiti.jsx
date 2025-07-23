import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GuestCard from '../../components/festival/GuestCard';

/**
 * Pagina Ospiti - MoviEboli Film Festival 2025
 * Design: cinematografico, elegante, informativo
 * Stile allineato con la pagina dei cortometraggi
 */
const OspitiPage = () => {
  // Stato per il caricamento della pagina
  const [pageLoading, setPageLoading] = useState(true);
  
  // Simulazione del caricamento iniziale ottimizzata
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Dati mockati degli ospiti del festival
  const guests = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Regista",
      bio: "Regista pluripremiato con esperienza in produzioni internazionali. Ha diretto 'La strada del silenzio' vincitore al Festival di Cannes nella sezione Un Certain Regard.",
      image: "/placeholder-ospite1.jpg"
    },
    {
      id: 2,
      name: "Laura Bianchi",
      role: "Attrice",
      bio: "Attrice di teatro e cinema con una carriera ventennale. Ha recitato in produzioni RAI e Netflix, vincendo il David di Donatello come miglior attrice non protagonista nel 2022.",
      image: "/placeholder-ospite2.jpg"
    },
    {
      id: 3,
      name: "Giovanni Verdi",
      role: "Sceneggiatore",
      bio: "Autore di sceneggiature per il cinema indipendente italiano. Ha collaborato con registi del calibro di Sorrentino e Garrone, contribuendo a storie che hanno fatto la storia del cinema italiano recente.",
      image: "/placeholder-ospite3.jpg"
    },
    {
      id: 4,
      name: "Sofia Marino",
      role: "Produttrice",
      bio: "Fondatrice di 'Visioni Italiane', casa di produzione specializzata in documentari e film indipendenti. Ha prodotto opere presentate ai maggiori festival internazionali.",
      image: "/placeholder-ospite4.jpg"
    },
    {
      id: 5,
      name: "Alessandro Neri",
      role: "Direttore della Fotografia",
      bio: "Maestro della luce con uno stile distintivo. Ha lavorato in produzioni internazionali e collaborato con registi visionari, creando atmosfere visive indimenticabili.",
      image: "/placeholder-ospite5.jpg"
    },
    {
      id: 6,
      name: "Claudia Ferrari",
      role: "Critica Cinematografica",
      bio: "Giornalista e critica per testate nazionali. Autrice di saggi sul cinema contemporaneo e membro di giuria in festival internazionali.",
      image: "/placeholder-ospite6.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Ospiti del Festival 2025 | MOVIEBOLI Festival</title>
        <meta name="description" content="Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: registi, attori, produttori e professionisti del cinema italiano e internazionale." />
        <meta property="og:title" content="Ospiti del Festival 2025 | MOVIEBOLI Festival" />
        <meta property="og:description" content="Incontri con i protagonisti del cinema italiano e internazionale." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MoviEboli Festival</h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">Caricamento ospiti...</p>
          </div>
        </div>
      )}
      
      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background con particelle animate */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
                Ospiti Speciali del MOVIEBOLI Film Festival 2025
              </h1>
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
                Incontri con i protagonisti del cinema italiano e internazionale: registi, attori, produttori e professionisti che arricchiranno il festival con la loro esperienza e visione.
              </p>
              <Link href="/festival" legacyBehavior passHref>
                <motion.a
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Festival
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Contenuto principale */}
        <section className="py-10 sm:py-16 bg-movieboli-nero">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-movieboli-rosaPastello to-movieboli-violaPrincipale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Ospiti del Festival
            </motion.h2>
            
            {/* Grid degli ospiti */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.05 }}
            >
              {guests.map((guest, index) => (
                <GuestCard
                  key={guest.id}
                  name={guest.name}
                  role={guest.role}
                  bio={guest.bio}
                  image={guest.image}
                  onClick={() => console.log(`Clicked on ${guest.name}`)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OspitiPage;