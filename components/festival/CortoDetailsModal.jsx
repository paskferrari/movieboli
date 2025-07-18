import { useEffect, memo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * CortoDetailsModal - Modal per visualizzare i dettagli di un cortometraggio
 * 
 * @param {Function} onClose - Funzione per chiudere il modal
 * @param {Object} corto - Dati del cortometraggio
 */
const CortoDetailsModal = ({ onClose, corto }) => {
  // Stato per il caricamento del trailer e dell'immagine
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Genera un placeholder blur per l'immagine
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTI0MDYxIiBzdG9wLW9wYWNpdHk9IjAuMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZkMDkxOSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+';
  
  // Gestione della chiusura del modal con il tasto ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Blocca lo scroll quando il modal è aperto
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      // Ripristina lo scroll quando il modal è chiuso
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  // Reset dello stato quando cambia il cortometraggio
  useEffect(() => {
    if (corto) {
      setImageLoaded(false);
      setImageError(false);
      if (corto.trailer) {
        setTrailerLoading(true);
      }
    }
  }, [corto]);

  if (!corto) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-movieboli-nero/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative bg-movieboli-nero border border-movieboli-violaPrincipale/30 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bottone di chiusura */}
        <motion.button 
          className="absolute top-4 right-4 z-10 bg-movieboli-nero/80 text-movieboli-crema p-2 rounded-full"
          onClick={onClose}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        
        <div className="flex flex-col md:flex-row">
          {/* Immagine del cortometraggio */}
          <div className="md:w-2/5 relative">
            <div className="aspect-[3/4] relative">
              {corto.immagine && !imageError ? (
                <div className="relative w-full h-full">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-movieboli-bordeaux/20 z-10">
                      <div className="w-12 h-12 border-4 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
                    </div>
                  )}
                  <Image 
                    src={corto.immagine}
                    alt={`Locandina di ${corto.titolo}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className={`object-cover transition-all duration-500 ${imageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
                    priority
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageLoaded(true);
                      setImageError(true);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                  <div className="text-center text-movieboli-crema/60">
                    <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <p className="text-sm">Poster del Film</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Dettagli del cortometraggio */}
          <div className="md:w-3/5 p-6 md:p-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-2 text-movieboli-violaPrincipale"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {corto.titolo}
            </motion.h2>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-movieboli-bordeaux/20 px-3 py-1 rounded-full text-sm text-movieboli-crema/80">
                Regia: {corto.regista}
              </div>
              <div className="bg-movieboli-bordeaux/20 px-3 py-1 rounded-full text-sm text-movieboli-crema/80">
                Durata: {corto.durata}
              </div>
              {corto.anno && (
                <div className="bg-movieboli-bordeaux/20 px-3 py-1 rounded-full text-sm text-movieboli-crema/80">
                  Anno: {corto.anno}
                </div>
              )}
            </motion.div>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-movieboli-crema">Sinossi</h3>
              <p className="text-movieboli-crema/80 leading-relaxed">
                {corto.sinossi}
              </p>
            </motion.div>
            
            {/* Biografia del regista */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-movieboli-crema">Il Regista</h3>
              <p className="text-movieboli-crema/80 leading-relaxed">
                {corto.biografia_regista ? (
                  corto.biografia_regista
                ) : (
                  `Biografia di ${corto.regista} non disponibile.`
                )}
              </p>
            </motion.div>
            
            {/* Trailer del cortometraggio */}
            {corto.trailer && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-movieboli-crema">Trailer</h3>
                <div className="aspect-video bg-movieboli-bordeaux/20 rounded-xl overflow-hidden relative">
                  {trailerLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-movieboli-nero/50 z-10">
                      <div className="w-12 h-12 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
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
              </motion.div>
            )}
            
            {/* Bottone per tornare alla lista */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="py-3 px-6 rounded-xl font-bold transition-all duration-300 bg-movieboli-violaPrincipale text-movieboli-nero"
                whileTap={{ 
                  scale: 0.95, 
                  transition: { duration: 0.1 } 
                }}
                onClick={onClose}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// Utilizzo di memo per evitare re-render non necessari
export default memo(CortoDetailsModal);