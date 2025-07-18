import { useState, memo } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  loading?: 'eager' | 'lazy';

}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  quality = 80,
  objectFit = 'cover',
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = 'lazy'
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Gestione degli errori di caricamento
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={loading}
            className={`transition-all duration-300 ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'} ${objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : objectFit === 'fill' ? 'object-fill' : objectFit === 'none' ? 'object-none' : 'object-scale-down'}`}
            onLoad={() => setIsLoading(false)}
            onError={handleError}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-movieboli-nero/20 backdrop-blur-sm">
              <div className="w-10 h-10 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
          <div className="text-center text-movieboli-crema/60">
            <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <p className="text-sm">Immagine non disponibile</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Utilizzo di memo per evitare re-render inutili
export default memo(OptimizedImage);