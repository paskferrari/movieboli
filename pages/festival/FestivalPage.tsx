import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ShortFilmCard from '../../components/festival/ShortFilmCard';
import ProgressiveUnlockCard from '../../components/festival/ProgressiveUnlockCard';
import Footer from '../../components/Footer';
import { Dirent } from 'fs';
import CortoDetailsModal from '../../components/festival/CortoDetailsModal';

const { useState, useEffect } = React;

// Interfaccia per i dati del cortometraggio
export interface Cortometraggio {
  id: string;
  titolo: string;
  regista: string;
  durata: string;
  anno?: string;
  sinossi: string;
  biografia_regista?: string;
  bio?: string; // Aggiungi questo campo
  immagine: string;
  trailer?: string;
  link?: string; // Aggiungi questo campo
  folderPath?: string;
}

// Interfaccia per le props della pagina
export interface FestivalPageProps {
  cortometraggi: Cortometraggio[];
  error?: string | null;
}

// Date di sblocco dei cortometraggi
const unlockDates = [
  { title: "DIECI SECONDI", date: new Date(2024, 6, 21, 0, 0, 0) }, // 21/07/2024 00:00
  { title: "APPUNTAMENTO A MEZZOGIORNO", date: new Date(2024, 6, 22, 13, 0, 0) }, // 22/07/2024 13:00
  { title: "Father's Letters", date: new Date(2024, 6, 23, 13, 0, 0) }, // 23/07/2024 13:00
  { title: "Jus d'orange", date: new Date(2024, 6, 23, 13, 0, 0) }, // 23/07/2024 13:00
  { title: "Place under the sun", date: new Date(2024, 6, 24, 13, 0, 0) }, // 24/07/2024 13:00
  { title: "The Rock Tensions", date: new Date(2024, 6, 25, 13, 0, 0) }, // 25/07/2024 13:00
  { title: "SHARING IS CARING", date: new Date(2024, 6, 27, 13, 0, 0) }, // 27/07/2024 13:00
  { title: "Ya Hanouni", date: new Date(2024, 6, 28, 13, 0, 0) }, // 28/07/2024 13:00
];

// Componente principale della pagina
function FestivalPage(props: FestivalPageProps) {
  // Stato per il modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCorto, setSelectedCorto] = React.useState<Cortometraggio | null>(null);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  
  // Stato per il caricamento della pagina
  const [pageLoading, setPageLoading] = React.useState(true);
  
  // Stato per tenere traccia dei cortometraggi sbloccati
  const [unlockedShorts, setUnlockedShorts] = React.useState<Record<string, boolean>>({});
  
  // Simulazione del caricamento iniziale ottimizzata
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300); // Ridotto da 1000ms a 300ms per un caricamento più veloce
    
    return () => clearTimeout(timer);
  }, []);
  
  // Controlla quali cortometraggi sono sbloccati
  React.useEffect(() => {
    const checkUnlocked = () => {
      const unlocked: Record<string, boolean> = {};
      
      // Solo "DIECI SECONDI" è sbloccato, tutti gli altri sono bloccati
      unlocked["DIECI SECONDI"] = true;
      
      // Imposta tutti gli altri cortometraggi come bloccati
      unlockDates.forEach(item => {
        if (item.title !== "DIECI SECONDI") {
          unlocked[item.title] = false;
        }
      });
      
      setUnlockedShorts(unlocked);
    };
    
    checkUnlocked();
    
    // Aggiorna lo stato ogni minuto
    const interval = setInterval(checkUnlocked, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Funzione per aprire il modal con i dettagli del cortometraggio
  function handleOpenModal(corto: Cortometraggio) {
    setSelectedCorto(corto);
    setIsModalLoading(true);
    setIsModalOpen(true);
    
    // Simulazione di caricamento per migliorare UX
    setTimeout(() => {
      setIsModalLoading(false);
    }, 200);
  }
  
  // Funzione per chiudere il modal
  function handleCloseModal() {
    setIsModalOpen(false);
    // Reset del cortometraggio selezionato dopo la chiusura del modal
    setTimeout(() => setSelectedCorto(null), 300);
  }
  
  // Gestione dello scroll del body quando il modal è aperto
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  
  const { cortometraggi, error } = props;
  
  // Funzione per ottenere la data di sblocco di un cortometraggio
  const getUnlockDate = (title: string): Date | null => {
    const unlockInfo = unlockDates.find(item => item.title === title);
    return unlockInfo ? unlockInfo.date : null;
  };
  
  return (
    <>
      <Head>
        <title>Cortometraggi in Concorso | MOVIEBOLI Festival</title>
        <meta name="description" content="Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli" />
        <meta property="og:title" content="Cortometraggi in Concorso | MOVIEBOLI Festival" />
        <meta property="og:description" content="Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MoviEboli Festival</h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">Caricamento cortometraggi...</p>
          </div>
        </div>
      )}
      
      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema">
        {/* Messaggio di errore */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-md mx-auto my-4 max-w-4xl">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-movieboli-crema">
                <span className="text-movieboli-violaPrincipale">Cortometraggi</span> in Concorso
              </h1>
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
                Scopri le opere cinematografiche selezionate per la competizione ufficiale del MOVIEBOLI Festival del Cinema di Eboli.
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
              className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-movieboli-crema"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Cortometraggi in Concorso
            </motion.h2>
            
            {/* Grid dei cortometraggi */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.05 }}
            >
              {cortometraggi.map((corto: Cortometraggio, index: number) => {
                const isUnlocked = unlockedShorts[corto.titolo] || false;
                const unlockDate = getUnlockDate(corto.titolo);
                
                return (
                  <motion.div
                    key={`${corto.id || corto.titolo}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ProgressiveUnlockCard
                      corto={corto}
                      onClick={handleOpenModal}
                      index={index}
                      isUnlocked={isUnlocked}
                      unlockDate={unlockDate}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Modal per i dettagli del cortometraggio */}
      <AnimatePresence>
        {isModalOpen && selectedCorto && (
          <CortoDetailsModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            corto={selectedCorto}
            isLoading={isModalLoading}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default FestivalPage;

// Funzione per ottenere i dati statici
// Nella funzione getStaticProps, aggiorna il mapping dei dati
export async function getStaticProps() {
  try {
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');
    
    const readdir = promisify(fs.readdir);
    const readFile = promisify(fs.readFile);
    
    // Percorso della directory contenente i dati dei cortometraggi
    const dirPath = path.join(process.cwd(), 'public', 'json-folders');
    
    // Leggi tutte le sottodirectory
    const directories = await readdir(dirPath, { withFileTypes: true });
    const cortometraggiFolders = directories.filter((dirent: Dirent) => dirent.isDirectory());
    
    // Array per i dati dei cortometraggi
    const cortometraggi = [];
    
    // Leggi i dati da ciascuna directory
    for (const folder of cortometraggiFolders) {
      try {
        const folderPath = path.join(dirPath, folder.name);
        const jsonPath = path.join(folderPath, 'cortometraggio.json');
        
        // Verifica se il file JSON esiste
        if (fs.existsSync(jsonPath)) {
          const jsonData = await readFile(jsonPath, 'utf8');
          const cortoData = JSON.parse(jsonData);
          
          // Aggiungi l'ID basato sul nome della cartella
          cortoData.id = folder.name;
          
          // Mappa i campi bio e link ai campi biografia_regista e trailer se necessario
          if (cortoData.bio && !cortoData.biografia_regista) {
            cortoData.biografia_regista = cortoData.bio;
          }
          
          if (cortoData.link && !cortoData.trailer) {
            cortoData.trailer = cortoData.link;
          }
          
          // Correggi l'URL dell'immagine se necessario
          if (cortoData.immagine && cortoData.immagine.includes('ibb.co')) {
            // Rimuovi eventuali caratteri extra nell'URL
            cortoData.immagine = cortoData.immagine.replace(/\/([a-zA-Z0-9]+)r\//, '/$1/');
            cortoData.immagine = cortoData.immagine.replace(/\/([a-zA-Z0-9]+)1\//, '/$1/');
          }
          
          cortometraggi.push(cortoData);
        }
      } catch (folderError) {
        console.error(`Errore nella lettura della cartella ${folder.name}:`, folderError);
      }
    }
    
    return {
      props: {
        cortometraggi,
      },
      // Riconvalida i dati ogni ora
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Errore nel recupero dei dati dei cortometraggi:', error);
    
    return {
      props: {
        cortometraggi: [],
      },
      revalidate: 60, // Riprova più frequentemente in caso di errore
    };
  }
}