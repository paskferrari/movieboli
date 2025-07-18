import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

interface Cortometraggio {
  titolo: string;
  regista: string;
  durata: string;
  sinossi: string;
  immagine: string;
  folderPath: string;
  anno?: string;
  trailer?: string;
  bioRegista?: string;
}

interface CortoCardProps {
  corto: Cortometraggio;
  onClick: (corto: Cortometraggio) => void;
  index: number;
  variants: any;
  transition: any;
}

const CortoCard = ({ corto, onClick, index, variants, transition }: CortoCardProps) => {
  // Stato per il caricamento dell'immagine
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Reset dello stato quando cambia il cortometraggio
  useEffect(() => {
    if (corto && corto.immagine) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [corto]);
  
  return (
    <motion.div
      key={index}
      className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-200 relative cursor-pointer"
      variants={variants}
      transition={transition}
      whileHover={{ scale: 1.03, transition: { duration: 0.2, type: "spring" as const, stiffness: 300 } }}
      onClick={() => onClick(corto)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Badge In Concorso */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
          IN CONCORSO
        </span>
      </div>

      {/* Immagine Locandina */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {corto.immagine && !imageError ? (
          <div className="w-full h-full relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-movieboli-bordeaux/20 z-10">
                <div className="w-10 h-10 border-3 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={corto.immagine}
              alt={corto.titolo}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
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

      {/* Contenuto Card */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
          {corto.titolo}
        </h3>
        <p className="text-movieboli-crema/70 mb-3">
          Regia di {corto.regista}
        </p>
        <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-4">
          <span>{corto.durata}</span>
        </div>
        <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
          {corto.sinossi}
        </p>
        
        {/* Bottone Dettagli */}
        <motion.button
          className="w-full py-3 px-6 rounded-xl font-bold transition-all duration-150 bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-movieboli-nero"
          whileHover={{ scale: 1.02, transition: { duration: 0.15, type: "spring" as const, stiffness: 400 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(corto);
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Scopri di più</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Utilizzo di memo per evitare re-render non necessari
export default memo(CortoCard);