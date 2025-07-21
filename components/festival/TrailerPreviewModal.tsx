import { useEffect, memo, useState } from 'react';
import { motion } from 'framer-motion';

interface TrailerPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
  title: string;
}

const TrailerPreviewModal = ({ isOpen, onClose, trailerUrl, title }: TrailerPreviewModalProps) => {
  const [trailerLoading, setTrailerLoading] = useState(true);
  
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

  if (!isOpen || !trailerUrl) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-movieboli-nero/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative bg-movieboli-nero border border-movieboli-violaPrincipale/30 rounded-xl overflow-hidden max-w-4xl w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bottone di chiusura */}
        <motion.button 
          className="absolute top-3 right-3 z-10 bg-movieboli-nero/80 text-movieboli-crema p-2 rounded-full"
          onClick={onClose}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        
        {/* Titolo del trailer */}
        <div className="p-4 bg-movieboli-violaPrincipale/10 border-b border-movieboli-violaPrincipale/20">
          <h3 className="text-xl font-bold text-movieboli-crema">
            Trailer: {title}
          </h3>
        </div>
        
        {/* Contenitore del trailer */}
        <div className="aspect-video bg-movieboli-bordeaux/20 relative">
          {trailerLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-movieboli-nero/50 z-10">
              <div className="w-12 h-12 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            </div>
          )}
          <iframe 
            src={trailerUrl} 
            className="w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            loading="lazy"
            title={`Trailer di ${title}`}
            onLoad={() => setTrailerLoading(false)}
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(TrailerPreviewModal);