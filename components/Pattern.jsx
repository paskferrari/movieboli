import { motion } from 'framer-motion';

/**
 * Componente Pattern che aggiunge pattern geometrici in trasparenza per dare profondità visiva
 * @param {Object} props - Le proprietà del componente
 * @param {string} props.type - Il tipo di pattern (dots, grid, waves, circles, triangles)
 * @param {string} props.color - Il colore del pattern
 * @param {string} props.opacity - L'opacità del pattern
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {Object} props.motionProps - Proprietà aggiuntive per l'animazione con Framer Motion
 * @returns {JSX.Element} - Il componente pattern
 */
const Pattern = ({ 
  type = 'dots', 
  color = 'currentColor',
  opacity = '0.05',
  className = '',
  motionProps = {}
}) => {
  // Proprietà di animazione predefinite
  const defaultMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
    ...motionProps
  };

  // Funzione per generare il pattern SVG in base al tipo
  const renderPattern = () => {
    switch (type) {
      case 'dots':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.5" fill={color} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots)`} opacity={opacity} />
          </svg>
        );
      case 'grid':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid)`} opacity={opacity} />
          </svg>
        );
      case 'waves':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waves" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#waves)`} opacity={opacity} />
          </svg>
        );
      case 'circles':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circles" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="20" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#circles)`} opacity={opacity} />
          </svg>
        );
      case 'triangles':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="triangles" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0 0 L25 43.3 L50 0 Z" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#triangles)`} opacity={opacity} />
          </svg>
        );
      default:
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="default" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.5" fill={color} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#default)`} opacity={opacity} />
          </svg>
        );
    }
  };

  return (
    <motion.div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      {...defaultMotionProps}
    >
      {renderPattern()}
    </motion.div>
  );
};

export default Pattern;