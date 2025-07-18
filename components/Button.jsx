import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Componente Button che implementa un bottone con effetti visivi cinematografici
 * @param {Object} props - Le proprietà del componente
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del bottone
 * @param {string} props.href - URL di destinazione (se presente, renderizza un Link invece di un button)
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {boolean} props.primary - Se il bottone è primario (oro)
 * @param {boolean} props.secondary - Se il bottone è secondario (blu)
 * @param {boolean} props.outline - Se il bottone è outline
 * @param {boolean} props.small - Se il bottone è piccolo
 * @param {boolean} props.large - Se il bottone è grande
 * @param {boolean} props.disabled - Se il bottone è disabilitato
 * @param {Function} props.onClick - Funzione da eseguire al click
 * @param {Object} props.motionProps - Proprietà aggiuntive per l'animazione con Framer Motion
 * @returns {JSX.Element} - Il componente bottone
 */
const Button = ({ 
  children, 
  href, 
  className = '', 
  primary = false,
  secondary = false,
  outline = false,
  small = false,
  large = false,
  disabled = false,
  onClick,
  motionProps = {},
  ...props
}) => {
  // Determina le classi di base in base alle props
  const sizeClasses = small ? 'px-4 py-2 text-sm' : large ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base';
  
  // Classi per i diversi tipi di bottone
  let variantClasses = '';
  
  if (disabled) {
    variantClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  } else if (primary) {
    variantClasses = outline 
      ? 'bg-transparent text-[#f5a623] border-2 border-[#f5a623] hover:bg-[#f5a623] hover:text-white' 
      : 'bg-gradient-to-r from-[#f5a623] to-[#f7b955] text-white hover:shadow-[0_0_15px_rgba(245,166,35,0.5)]';
  } else if (secondary) {
    variantClasses = outline 
      ? 'bg-transparent text-[#1E3A5F] border-2 border-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white' 
      : 'bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8f] text-white hover:shadow-[0_0_15px_rgba(30,58,95,0.5)]';
  } else {
    variantClasses = outline 
      ? 'bg-transparent text-movieboli-nero1 border-2 border-movieboli-nero1/20 hover:border-movieboli-nero1/50 hover:bg-movieboli-nero1/5' 
      : 'bg-movieboli-nero1/10 text-movieboli-nero1 hover:bg-movieboli-nero1/20';
  }
  
  // Classi comuni per tutti i bottoni
  const baseClasses = `
    inline-flex items-center justify-center
    font-inter font-semibold
    rounded-full
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 ${primary ? 'focus:ring-[#f5a623]' : secondary ? 'focus:ring-[#1E3A5F]' : 'focus:ring-movieboli-nero1/30'}
    ${disabled ? '' : 'transform hover:scale-[1.03] active:scale-[0.98]'}
    ${className}
  `;
  
  // Proprietà di animazione predefinite
  const defaultMotionProps = {
    whileHover: disabled ? {} : { 
      boxShadow: primary 
        ? '0 0 15px rgba(245, 166, 35, 0.5)' 
        : secondary 
          ? '0 0 15px rgba(30, 58, 95, 0.5)' 
          : '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    ...motionProps
  };

  // Contenuto del bottone
  const buttonContent = (
    <>
      {children}
      {primary && !disabled && (
        <motion.span 
          className="absolute inset-0 -z-10 rounded-full opacity-0 bg-[#f5a623] blur-xl"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
        />
      )}
    </>
  );

  // Renderizza un Link se è presente href
  if (href && !disabled) {
    return (
      <Link href={href} legacyBehavior passHref>
        <motion.a
          className={`${baseClasses} ${sizeClasses} ${variantClasses} relative`}
          {...defaultMotionProps}
          {...props}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }

  // Altrimenti renderizza un button
  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} relative`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...defaultMotionProps}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;