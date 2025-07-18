import { motion } from 'framer-motion';

/**
 * Componente CinematicGradient che implementa un gradiente verticale cinematografico
 * @param {Object} props - Le proprietà del componente
 * @param {string} props.from - Colore di partenza del gradiente
 * @param {string} props.via - Colore intermedio del gradiente
 * @param {string} props.to - Colore finale del gradiente
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del gradiente
 * @param {Object} props.motionProps - Proprietà aggiuntive per l'animazione con Framer Motion
 * @returns {JSX.Element} - Il componente con gradiente cinematografico
 */
const CinematicGradient = ({ 
  from = 'primary', 
  via = 'cream', 
  to = 'secondary',
  className = '',
  children,
  motionProps = {}
 }) => {
  // Mappa dei colori predefiniti
  const colorMap = {
    primary: 'from-primary',
    secondary: 'from-secondary',
    accent: 'from-accent',
    cream: 'from-movieboli-crema',
    white: 'from-white',
    terracotta: 'from-movieboli-rossoTerra',
  };

  const viaMap = {
    primary: 'via-primary',
    secondary: 'via-secondary',
    accent: 'via-accent',
    cream: 'via-movieboli-crema',
    white: 'via-white',
    terracotta: 'via-movieboli-rossoTerra',
  };

  const toMap = {
    primary: 'to-primary',
    secondary: 'to-secondary',
    accent: 'to-accent',
    cream: 'to-movieboli-crema',
    white: 'to-white',
    terracotta: 'to-movieboli-rossoTerra',
  };

  const fromClass = colorMap[from] || `from-${from}`;
  const viaClass = viaMap[via] || `via-${via}`;
  const toClass = toMap[to] || `to-${to}`;

  const defaultMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
    ...motionProps
  };

  return (
    <motion.div
      {...defaultMotionProps}
      className={`bg-gradient-to-b ${fromClass} ${viaClass} ${toClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default CinematicGradient;