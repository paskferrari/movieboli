import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Componente per visualizzare un ospite del festival
 * Design: card con immagine, nome, ruolo e biografia
 * Stile allineato con ProgressiveUnlockCard per coerenza visiva
 */
const GuestCard = ({ 
  name, 
  role, 
  bio, 
  image, 
  onClick,
  className = "",
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Genera un placeholder blur per l'immagine
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTI0MDYxIiBzdG9wLW9wYWNpdHk9IjAuMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZkMDkxOSIgc3RvcC1vcGFjaXR5PSIwLjMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+';
  
  // Reset dello stato quando cambia l'ospite
  useEffect(() => {
    if (image) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [image]);

  return (
    <motion.div
      className={`group bg-movieboli-bordeaux/20 rounded-xl sm:rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 transition-all duration-300 relative cursor-pointer shadow-lg h-full flex flex-col ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge Ospite */}
      <motion.div 
        className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
          OSPITE
        </span>
      </motion.div>

      {/* Immagine dell'ospite */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {image && !imageError ? (
          <div className="w-full h-full relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-movieboli-bordeaux/20 z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
              </div>
            )}
            <div className="relative w-full h-full">
              <Image 
                src={image}
                alt={`Foto di ${name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-all duration-500 ${imageLoaded ? 'scale-100' : 'scale-105'}`}
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
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
            <div className="text-center text-movieboli-crema/60">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <p className="text-sm">Foto non disponibile</p>
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
          {name}
        </motion.h3>
        <motion.div 
          className="mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-movieboli-violaPrincipale/80 text-movieboli-nero">
            {role}
          </span>
        </motion.div>
        <p className="text-movieboli-crema/80 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 flex-grow">
          {bio}
        </p>
        
        {/* Bottone Dettagli */}
        <motion.button
          className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold transition-all duration-300 bg-movieboli-violaPrincipale text-movieboli-nero text-sm sm:text-base mt-auto"
          whileTap={{ 
            scale: 0.98, 
            transition: { duration: 0.1 } 
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Scopri di più</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GuestCard;