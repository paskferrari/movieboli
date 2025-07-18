import { useEffect, memo, useState } from 'react';
import { motion } from 'framer-motion';

interface Cortometraggio {
  titolo: string;
  regista: string;
  durata: string;
  sinossi: string;
  immagine: string;
  folderPath?: string;
  anno?: string;
  trailer?: string;
  bioRegista?: string;
}

interface CortoDetailsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  corto: Cortometraggio;
  isLoading?: boolean;
}

const CortoDetailsModal = ({ isOpen, onClose, corto, isLoading }: CortoDetailsModalProps) => {
  // Stato per il caricamento del trailer e dell'immagine
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Gestione della chiusura del modal con il tasto ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  // Gestione dello scroll del body quando il modal è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Reset dello stato di caricamento quando cambia il cortometraggio
  useEffect(() => {
    if (corto) {
      setImageLoaded(false);
      setImageError(false);
      if (corto.trailer) {
        setTrailerLoading(true);
      }
    }
  }, [corto]);

  if (!isOpen || !corto) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-movieboli-nero/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative bg-movieboli-nero border border-movieboli-violaPrincipale/30 rounded-lg sm:rounded-2xl overflow-hidden max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring' as const, damping: 30, stiffness: 350, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-movieboli-nero/70 backdrop-blur-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
          </div>
        )}
        {/* Bottone di chiusura */}
        <motion.button 
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-movieboli-nero/80 text-movieboli-crema p-1.5 sm:p-2 rounded-full"
          onClick={onClose}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        
        <div className="flex flex-col md:flex-row">
          {/* Immagine del cortometraggio */}
          <div className="md:w-2/5 relative">
            <div className="aspect-[3/4] relative">
              {corto.immagine && !imageError ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-movieboli-bordeaux/20">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img 
                    src={corto.immagine}
                    alt={corto.titolo}
                    className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageLoaded(true);
                      setImageError(true);
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                  <div className="text-center text-movieboli-crema/60">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm">Poster del Film</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Dettagli del cortometraggio */}
          <div className="md:w-3/5 p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-movieboli-violaPrincipale">
              {corto.titolo}
            </h2>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-movieboli-bordeaux/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm text-movieboli-crema/80">
                Regia: {corto.regista}
              </div>
              <div className="bg-movieboli-bordeaux/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm text-movieboli-crema/80">
                Durata: {corto.durata}
              </div>
              {corto.anno && (
                <div className="bg-movieboli-bordeaux/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm text-movieboli-crema/80">
                  Anno: {corto.anno}
                </div>
              )}
            </div>
            
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 text-movieboli-crema">Sinossi</h3>
              <p className="text-sm sm:text-base text-movieboli-crema/80 leading-relaxed">
                {corto.sinossi}
              </p>
            </div>
            
            {/* Biografia del regista */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 text-movieboli-crema">Il Regista</h3>
              <p className="text-sm sm:text-base text-movieboli-crema/80 leading-relaxed">
                {corto.bioRegista ? (
                  corto.bioRegista
                ) : (
                  `Biografia di ${corto.regista} non disponibile.`
                )}
              </p>
            </div>
            
            {/* Trailer del cortometraggio */}
            {corto.trailer && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 text-movieboli-crema">Trailer</h3>
                <div className="aspect-video bg-movieboli-bordeaux/20 rounded-lg sm:rounded-xl overflow-hidden relative">
                  {trailerLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-movieboli-nero/50 z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
                    </div>
                  )}
                  <iframe 
                    src={corto.trailer} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    loading="lazy"
                    title={`Trailer di ${corto.titolo}`}
                    onLoad={() => setTrailerLoading(false)}
                  ></iframe>
                </div>
              </div>
            )}
            
            {/* Bottone per tornare alla lista */}
            <motion.div 
              className="mt-4 sm:mt-6 md:mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold transition-all duration-300 bg-movieboli-violaPrincipale text-movieboli-nero text-sm sm:text-base"
                whileTap={{ 
                  scale: 0.95, 
                  transition: { duration: 0.1 } 
                }}
                onClick={onClose}
              >
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Torna alla lista</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Utilizzo di memo per evitare re-render inutili
export default memo(CortoDetailsModal);