import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GuestCard from '../../components/festival/GuestCard';

/**
 * Pagina Ospiti - MoviEboli Film Festival 2025
 * Design: cinematografico, elegante, informativo
 * Organizzazione: 3 ospiti per 3 sere del festival
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

  // Dati degli ospiti organizzati per sera
  const guestsByEvening = {
    prima: {
      date: "Venerdì 7 Marzo 2025",
      title: "Prima Serata - Apertura Festival",
      guest: {
        id: 1,
        name: "Marco Bellocchio",
        role: "Regista e Maestro del Cinema",
        bio: "Uno dei più grandi maestri del cinema italiano contemporaneo. Vincitore della Palma d'Oro onoraria a Cannes 2021, ha diretto capolavori come 'I pugni in tasca' e 'Buongiorno, notte'. Aprirà il festival con una masterclass sulla regia.",
        image: "/images/ospiti/bellocchio.jpg"
      }
    },
    seconda: {
      date: "Sabato 8 Marzo 2025",
      title: "Seconda Serata - Focus Giovani Talenti",
      guest: {
        id: 2,
        name: "Alice Rohrwacher",
        role: "Regista e Sceneggiatrice",
        bio: "Regista visionaria del nuovo cinema italiano. Vincitrice del Premio della Giuria a Cannes per 'Le meraviglie' e 'Lazzaro felice'. Condurrà un workshop sulla scrittura cinematografica e presenterà il suo ultimo progetto.",
        image: "/images/ospiti/rohrwacher.jpg"
      }
    },
    terza: {
      date: "Domenica 9 Marzo 2025",
      title: "Terza Serata - Chiusura e Premiazioni",
      guest: {
        id: 3,
        name: "Matteo Garrone",
        role: "Regista e Produttore",
        bio: "Regista di fama internazionale, vincitore del Gran Premio della Giuria a Cannes per 'Gomorra' e candidato all'Oscar per 'Pinocchio'. Presiederà la giuria del festival e consegnerà i premi della serata finale.",
        image: "/images/ospiti/garrone.jpg"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Ospiti del Festival 2025 | MOVIEBOLI Festival</title>
        <meta name="description" content="Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: Marco Bellocchio, Alice Rohrwacher e Matteo Garrone, tre maestri del cinema italiano." />
        <meta property="og:title" content="Ospiti del Festival 2025 | MOVIEBOLI Festival" />
        <meta property="og:description" content="Tre serate con i grandi maestri del cinema italiano contemporaneo." />
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
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-6 max-w-3xl mx-auto">
                Tre serate indimenticabili con i grandi maestri del cinema italiano contemporaneo
              </p>
              <p className="text-base md:text-lg text-movieboli-violaPrincipale font-semibold mb-10">
                7-9 Marzo 2025 • Cinema Comunale di Eboli
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
        
        {/* Contenuto principale - Ospiti per sera */}
        <section className="py-10 sm:py-16 bg-movieboli-nero">
          <div className="container mx-auto px-4">
            {Object.entries(guestsByEvening).map(([key, evening], eveningIndex) => (
              <motion.div
                key={key}
                className="mb-16 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: eveningIndex * 0.2 }}
              >
                {/* Header della serata */}
                <div className="text-center mb-8 sm:mb-12">
                  <motion.div
                    className="inline-block px-4 py-2 rounded-full bg-movieboli-violaPrincipale/20 border border-movieboli-violaPrincipale/40 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: eveningIndex * 0.2 + 0.1 }}
                  >
                    <span className="text-movieboli-violaPrincipale font-semibold text-sm sm:text-base">
                      {evening.date}
                    </span>
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-movieboli-rosaPastello to-movieboli-violaPrincipale">
                    {evening.title}
                  </h2>
                </div>
                
                {/* Card dell'ospite */}
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <GuestCard
                      name={evening.guest.name}
                      role={evening.guest.role}
                      bio={evening.guest.bio}
                      image={evening.guest.image}
                      onClick={() => console.log(`Clicked on ${evening.guest.name}`)}
                      index={eveningIndex}
                    />
                  </div>
                </div>
                
                {/* Separatore tra le serate */}
                {eveningIndex < Object.keys(guestsByEvening).length - 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-movieboli-violaPrincipale/50 to-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Sezione informazioni aggiuntive */}
            <motion.div
              className="mt-20 text-center bg-movieboli-bordeaux/10 rounded-2xl p-8 border border-movieboli-violaPrincipale/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-movieboli-violaPrincipale">
                Informazioni Incontri
              </h3>
              <p className="text-movieboli-crema/80 mb-6 max-w-2xl mx-auto">
                Ogni serata prevede la proiezione di cortometraggi selezionati seguita da un incontro con l'ospite speciale. 
                Gli incontri includono masterclass, Q&A con il pubblico e momenti di networking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Orario</div>
                  <div className="text-movieboli-crema/80">20:30 - 23:00</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Luogo</div>
                  <div className="text-movieboli-crema/80">Cinema Comunale</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Ingresso</div>
                  <div className="text-movieboli-crema/80">Gratuito</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OspitiPage;