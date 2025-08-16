import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ShortFilmCard from '../../components/festival/ShortFilmCard';
import ProgressiveUnlockCard from '../../components/festival/ProgressiveUnlockCard';
import Footer from '../../components/Footer';
import { Dirent } from 'fs';
import CortoDetailsModal from '../../components/festival/CortoDetailsModal';
import { useContent } from '../../contexts/ContentContext';
import EditableText from '../../components/ui/EditableText';

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
  sbloccato: boolean; // Nuovo attributo per controllare la visibilità
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
  { title: "The Rock Tensions", date: new Date(2024, 6, 22, 13, 0, 0) }, // 22/07/2024 13:00 - SPOSTATO AL PRIMO GIORNO
  { title: "Father's Letters", date: new Date(2024, 6, 23, 13, 0, 0) }, // 23/07/2024 13:00
  { title: "Jus d'orange", date: new Date(2024, 6, 23, 13, 0, 0) }, // 23/07/2024 13:00
  { title: "Place under the sun", date: new Date(2024, 6, 24, 13, 0, 0) }, // 24/07/2024 13:00
  { title: "SHARING IS CARING", date: new Date(2024, 6, 27, 13, 0, 0) }, // 27/07/2024 13:00
  { title: "Ya Hanouni", date: new Date(2024, 6, 28, 13, 0, 0) }, // 28/07/2024 13:00
];

// Componente principale della pagina
// Gestione errori migliorata per useContent
function FestivalPage(props: FestivalPageProps) {
  // Aggiungi controllo di sicurezza per useContent
  let getContent: (key: string, defaultValue?: string) => string
  
  try {
    const contentContext = useContent()
    getContent = contentContext.getContent
  } catch (error) {
    console.warn('ContentContext not available, using fallback')
    getContent = (key: string, defaultValue: string = '') => defaultValue
  }
  
  // Stato per il modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCorto, setSelectedCorto] = React.useState<Cortometraggio | null>(null);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  
  // Stato per il caricamento della pagina
  const [pageLoading, setPageLoading] = React.useState(true);
  
  // Stato per tenere traccia dei cortometraggi sbloccati
  const [unlockedShorts, setUnlockedShorts] = React.useState<Record<string, boolean>>({});
  
  // Stato per la navbar
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  // Gestione scroll per navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      // Sblocca "DIECI SECONDI" e "APPUNTAMENTO A MEZZOGIORNO"
      unlocked["DIECI SECONDI"] = true;
      unlocked["APPUNTAMENTO A MEZZOGIORNO"] = true;
      
      // Imposta tutti gli altri cortometraggi come bloccati
      unlockDates.forEach(item => {
        if (item.title !== "DIECI SECONDI" && item.title !== "APPUNTAMENTO A MEZZOGIORNO") {
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
        <title>
          <EditableText 
            contentKey="festival.meta.title"
            defaultValue="Cortometraggi in Concorso | MOVIEBOLI Festival"
            tag="span"
          />
        </title>
        <meta name="description" content={
          getContent('festival.meta.description', 'Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli')
        } />
        <meta property="og:title" content="Cortometraggi in Concorso | MOVIEBOLI Festival" />
        <meta property="og:description" content="Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli" />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {/* Navbar Festival Standardizzata */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo-movieboli.png"
                  alt="MOVIEBOLI Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
                <EditableText 
                  contentKey="festival.nav.title"
                  defaultValue="FESTIVAL 2025"
                  tag="span"
                />
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.program"
                  defaultValue="Programma"
                  tag="span"
                />
              </Link>
              <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.shorts"
                  defaultValue="Cortometraggi"
                  tag="span"
                />
              </Link>
              <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.films"
                  defaultValue="Film"
                  tag="span"
                />
              </Link>
              <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.guests"
                  defaultValue="Ospiti"
                  tag="span"
                />
              </Link>
              <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.about"
                  defaultValue="Info"
                  tag="span"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">
              <EditableText 
                contentKey="festival.loading.title"
                defaultValue="MoviEboli Festival"
                tag="span"
              />
            </h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">
              <EditableText 
                contentKey="festival.loading.message"
                defaultValue="Caricamento cortometraggi..."
                tag="span"
              />
            </p>
          </div>
        </div>
      )}
      
      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema">
        {/* Contenuto principale */}
        <section className="py-10 sm:py-16 bg-movieboli-nero">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-movieboli-rosaPastello to-movieboli-violaPrincipale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EditableText 
                contentKey="festival.shorts.title"
                defaultValue="Cortometraggi in Concorso"
                tag="span"
              />
            </motion.h2>
            
            {/* Grid dei cortometraggi */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.05 }}
            >
              {cortometraggi.map((corto: Cortometraggio, index: number) => {
              // Rimuovi queste variabili non più necessarie:
              // const isUnlocked = unlockedShorts[corto.titolo] || false;
              // const unlockDate = getUnlockDate(corto.titolo);
              
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
                    // Rimuovi queste due props:
                    // isUnlocked={isUnlocked}
                    // unlockDate={unlockDate}
                  />
                </motion.div>
              );
              })}
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        {/* <Footer /> */}
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