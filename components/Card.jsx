import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassEffect from './GlassEffect';

const Card = ({ 
  title, 
  description, 
  image, 
  buttonText = "Scopri", 
  buttonLink = "#", 
  category, 
  date, 
  duration,
  director,
  rating,
  isVotable = false,
  onVote,
  className = "",
  useGlass = false,
  isSpecial = false,
  motionProps = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted && onVote) {
      setHasVoted(true);
      onVote();
    }
  };
  
  // Proprietà di animazione predefinite
  const defaultMotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    ...motionProps
  };

  // Classi base per tutte le card
  const baseClasses = `group relative rounded-2xl overflow-hidden border ${isSpecial ? 'border-movieboli-oro1/30' : 'border-movieboli-oro1/20'} ${className}`;
  
  // Classi per card normali (non glass)
  const regularClasses = `bg-movieboli-sfondo/50 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1`;
  
  // Contenuto della card
  const cardContent = (
    <>
      {/* Image Container */}
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-movieboli-highlight1/30 to-movieboli-highlight2/30 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-movieboli-primario1/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎬</span>
              </div>
              <p className="font-poppins text-sm text-movieboli-nero1/60">Immagine non disponibile</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-poppins font-semibold bg-movieboli-primario1/90 text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-movieboli-oro1/90 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              <span className="text-xs">⭐</span>
              <span className="font-poppins text-xs font-semibold">{rating}</span>
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        {(date || duration || director) && (
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-poppins text-movieboli-nero1/60">
            {date && (
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>{date}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{duration}</span>
              </div>
            )}
            {director && (
              <div className="flex items-center space-x-1">
                <span>🎭</span>
                <span>{director}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-poppins text-xl font-bold text-movieboli-nero2 mb-3 leading-tight group-hover:text-movieboli-primario1 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="font-poppins text-sm text-movieboli-nero1/80 mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Main Action Button */}
          <Link
            href={buttonLink}
            className="flex-1 group/btn relative inline-flex items-center justify-center px-6 py-3 font-poppins font-semibold text-sm bg-gradient-to-r from-movieboli-primario1 to-movieboli-primario2 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">{buttonText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-movieboli-primario2 to-movieboli-primario1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          {/* Vote Button */}
          {isVotable && (
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`flex items-center justify-center px-6 py-3 font-poppins font-semibold text-sm rounded-full border-2 transition-all duration-300 transform hover:scale-105 ${
                hasVoted
                  ? 'bg-movieboli-oro1 text-white border-movieboli-oro1 cursor-not-allowed'
                  : 'bg-transparent text-movieboli-oro1 border-movieboli-oro1 hover:bg-movieboli-oro1 hover:text-white'
              }`}
            >
              {hasVoted ? (
                <>
                  <span className="mr-2">✓</span>
                  Votato
                </>
              ) : (
                <>
                  <span className="mr-2">👍</span>
                  Vota
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-movieboli-primario1/50 transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </>
  );
  
  // Renderizza con o senza effetto vetro
  if (useGlass) {
    return (
      <GlassEffect 
        className={baseClasses}
        motionProps={defaultMotionProps}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardContent}
      </GlassEffect>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${regularClasses}`}
      {...defaultMotionProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardContent}
    </motion.div>
  );
};

// Componente per griglia di card responsive
export const CardGrid = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Componente per sezione con card
export const CardSection = ({ title, subtitle, children, className = "", useGradient = false }) => {
  // Classe per il gradiente di sfondo, se richiesto
  const gradientClass = useGradient ? 'bg-gradient-to-b from-movieboli-sfondo via-white to-movieboli-primario1/10' : '';
  
  return (
    <motion.section 
      className={`py-16 ${gradientClass} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title && (
              <motion.h2 
                className="font-poppins text-3xl md:text-4xl font-bold text-movieboli-nero2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                className="font-poppins text-lg text-movieboli-nero1/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
};

export default Card;