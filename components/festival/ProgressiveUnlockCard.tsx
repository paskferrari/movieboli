import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Cortometraggio } from '../../pages/festival/FestivalPage';
import TrailerPreviewModal from './TrailerPreviewModal';

interface ProgressiveUnlockCardProps {
  corto: Cortometraggio;
  onClick: (corto: Cortometraggio) => void;
  index: number;
}

const ProgressiveUnlockCard = ({ corto, onClick, index }: ProgressiveUnlockCardProps) => {
  // Stato per il caricamento dell'immagine
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Stato per il modal del trailer
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  
  // Determina se il cortometraggio è sbloccato dal JSON
  const isUnlocked = corto.sbloccato === true;
  
  // Genera un placeholder blur per l'immagine
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTI0MDYxIiBzdG9wLW9wYWNpdHk9IjAuMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZkMDkxOSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+';
  
  // Reset dello stato quando cambia il cortometraggio
  useEffect(() => {
    if (corto && corto.immagine) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [corto]);
  
  // Funzione per aprire il modal del trailer
  const openTrailerModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUnlocked && (corto.trailer || corto.link)) {
      setIsTrailerModalOpen(true);
    }
  };

  // Funzione per chiudere il modal del trailer
  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };
  
  return (
    <>
      <motion.div
        className={`group bg-movieboli-bordeaux/20 rounded-xl sm:rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 transition-all duration-300 relative ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'} shadow-lg h-full flex flex-col`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => isUnlocked && onClick(corto)}
        whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
        whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
      >
        {/* Badge In Concorso */}
        <motion.div 
          className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
            IN CONCORSO
          </span>
        </motion.div>

        {/* Immagine Locandina */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {corto.immagine && !imageError ? (
            <div className="w-full h-full relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-movieboli-bordeaux/20 z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
                </div>
              )}
              <div className="relative w-full h-full">
                <Image 
                  src={corto.immagine}
                  alt={`Locandina di ${corto.titolo}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-105'} ${isUnlocked ? 'blur-0' : 'blur-md'}`}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageLoaded(true);
                    setImageError(true);
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
              
              {/* Overlay per cortometraggi bloccati */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-movieboli-neroProfondo/70 z-20">
                  <div className="bg-movieboli-violaPrincipale/90 px-4 py-3 rounded-lg text-center max-w-[90%]">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-movieboli-nero font-bold text-sm sm:text-base">Cortometraggio Bloccato</p>
                    <p className="text-movieboli-nero/80 text-xs sm:text-sm mt-1">Disponibile prossimamente</p>
                  </div>
                </div>
              )}
              
              {/* Pulsante per il trailer */}
              {isUnlocked && (corto.trailer || corto.link) && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
                  <motion.button
                    className="bg-movieboli-violaPrincipale text-movieboli-nero p-2 rounded-full shadow-lg hover:bg-movieboli-crema transition-colors duration-300"
                    whileTap={{ scale: 0.9 }}
                    onClick={openTrailerModal}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
              <div className="text-center text-movieboli-crema/60">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <p className="text-sm">Poster del Film</p>
              </div>
            </div>
          )}
        </div>

        {/* Contenuto Card */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <motion.h3 
            className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-movieboli-crema transition-colors duration-300 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {corto.titolo}
          </motion.h3>
          <motion.p 
            className="text-movieboli-crema/70 mb-2 sm:mb-3 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Regia di {corto.regista}
          </motion.p>
          <div className="flex justify-between items-center text-xs sm:text-sm text-movieboli-crema/60 mb-3 sm:mb-4">
            <span>{corto.durata}</span>
            {corto.anno && <span>{corto.anno}</span>}
          </div>
          <p className="text-movieboli-crema/80 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 flex-grow">
            {isUnlocked ? corto.sinossi : "Contenuto bloccato. Disponibile prossimamente."}
          </p>
          
          {/* Bottone Dettagli */}
          <motion.button
            className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold transition-all duration-300 ${isUnlocked ? 'bg-movieboli-violaPrincipale text-movieboli-nero' : 'bg-movieboli-violaPrincipale/30 text-movieboli-nero/70 cursor-not-allowed'} text-sm sm:text-base mt-auto`}
            whileTap={{ 
              scale: isUnlocked ? 0.98 : 1, 
              transition: { duration: 0.1 } 
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isUnlocked) {
                onClick(corto);
              }
            }}
            disabled={!isUnlocked}
          >
            <div className="flex items-center justify-center space-x-2">
              {isUnlocked ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Scopri di più</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Bloccato</span>
                </>
              )}
            </div>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Modal per la preview del trailer */}
      <AnimatePresence>
        {isTrailerModalOpen && (
          <TrailerPreviewModal
            isOpen={isTrailerModalOpen}
            onClose={closeTrailerModal}
            trailerUrl={corto.trailer || corto.link || ''}
            title={corto.titolo}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Utilizzo di memo per evitare re-render non necessari
export default memo(ProgressiveUnlockCard);