import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Componenti
import Navbar from '../Navbar';
import Footer from '../Footer';
import ShortFilmCard from './ShortFilmCard';

// Caricamento dinamico del modal per migliorare le performance
const CortoDetailsModal = dynamic(() => import('./CortoDetailsModal'), {
  ssr: true,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero/80 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
    </div>
  )
});

const FestivalPage = ({ cortometraggi }) => {
  // Stato per il cortometraggio selezionato e la visibilità del modal
  const [selectedCorto, setSelectedCorto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Funzione per aprire il modal con i dettagli del cortometraggio
  const openCortoDetails = useCallback((corto) => {
    setSelectedCorto(corto);
    setIsModalLoading(true);
    setIsModalOpen(true);
    
    // Simulazione di caricamento per migliorare UX
    setTimeout(() => {
      setIsModalLoading(false);
    }, 200);
  }, []);

  // Funzione per chiudere il modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Reset del cortometraggio selezionato dopo la chiusura del modal
    setTimeout(() => setSelectedCorto(null), 300);
  }, []);

  // Gestione dello scroll del body quando il modal è aperto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Definizione delle varianti di animazione per il container
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
        duration: 0.3
      }
    }
  }), []);

  // Definizione delle varianti di animazione per gli elementi
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);
  
  // Definizione della transizione separata dalle varianti
  const itemTransition = useMemo(() => ({
    duration: 0.5,
    ease: "easeOut",
    type: "spring",
    stiffness: 300,
    damping: 20
  }), []);

  // Stato per il caricamento iniziale della pagina
  const [pageLoading, setPageLoading] = useState(true);

  // Effetto per simulare il caricamento iniziale
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300); // Ridotto da 800ms a 300ms per un caricamento più veloce

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-movieboli-nero text-movieboli-crema">
      <Navbar />
      
      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-movieboli-crema">MoviEboli Festival</h2>
            <p className="text-movieboli-crema/80">Caricamento cortometraggi...</p>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-movieboli-nero via-movieboli-bordeaux/20 to-movieboli-nero overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Particelle animate in background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => {
            // Utilizziamo valori predeterminati basati sull'indice invece di Math.random()
            // per evitare discrepanze tra server e client
            const topPos = (index * 5) % 100;
            const leftPos = ((index * 7) + 3) % 100;
            const xOffset = ((index * 11) % 100) - 50;
            const yOffset = ((index * 13) % 100) - 50;
            const scaleMax = 1 + ((index % 5) * 0.4) + 0.5;
            const duration = 10 + ((index % 10) * 2);
            
            return (
              <motion.div
                key={index}
                className="absolute w-2 h-2 rounded-full bg-movieboli-violaPrincipale/30"
                style={{
                  top: `${topPos}%`,
                  left: `${leftPos}%`,
                }}
                animate={{
                  x: [0, xOffset],
                  y: [0, yOffset],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, scaleMax, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-movieboli-nero/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-crema bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Festival MoviEboli
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-movieboli-crema/80 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Scopri i cortometraggi in concorso
          </motion.p>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/festival" className="inline-block">
              <motion.button 
                className="py-3 px-8 rounded-xl font-bold bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-movieboli-nero transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Torna al Festival
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-movieboli-nero to-transparent" />
      </motion.section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Sezione Cortometraggi in Concorso */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-movieboli-crema">Cortometraggi in Concorso</h2>
            <p className="text-movieboli-crema/80 max-w-2xl mx-auto">
              Esplora i cortometraggi selezionati per l'edizione 2024 del Festival MoviEboli.
              Clicca su una card per scoprire maggiori dettagli e guardare il trailer.
            </p>
          </div>
          
          {/* Grid di cortometraggi */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cortometraggi && cortometraggi.map((corto, index) => (
              <ShortFilmCard 
                key={`${corto.id || corto.titolo}-${index}`}
                corto={corto}
                onClick={openCortoDetails}
                index={index}
                variants={itemVariants}
                transition={itemTransition}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Modal per i dettagli del cortometraggio */}
      <AnimatePresence>
        {isModalOpen && selectedCorto && (
          <CortoDetailsModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            corto={selectedCorto}
            isLoading={isModalLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FestivalPage;