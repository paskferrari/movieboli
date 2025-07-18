import { motion } from 'framer-motion';

/**
 * Componente GlassEffect che implementa un effetto vetro cinematografico
 * @param {Object} props - Le proprietà del componente
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno dell'effetto vetro
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {Object} props.motionProps - Proprietà aggiuntive per l'animazione con Framer Motion
 * @returns {JSX.Element} - Il componente con effetto vetro
 */
const GlassEffect = ({ children, className = '', motionProps = {} }) => {
  const defaultMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
    ...motionProps
  };

  return (
    <motion.div
      {...defaultMotionProps}
      className={`bg-white/20 backdrop-blur-lg border border-white/30 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassEffect;