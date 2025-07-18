import { motion } from 'framer-motion';
import CinematicGradient from './CinematicGradient';

/**
 * Componente Section che implementa una sezione con sfondo alternato e animazioni
 * @param {Object} props - Le proprietà del componente
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno della sezione
 * @param {string} props.className - Classi CSS aggiuntive
 * @param {boolean} props.isEven - Se la sezione è pari (influenza lo sfondo)
 * @param {string} props.id - ID della sezione per navigazione
 * @param {string} props.from - Colore di partenza del gradiente (se useGradient è true)
 * @param {string} props.via - Colore intermedio del gradiente (se useGradient è true)
 * @param {string} props.to - Colore finale del gradiente (se useGradient è true)
 * @param {boolean} props.useGradient - Se utilizzare un gradiente come sfondo
 * @param {boolean} props.usePattern - Se aggiungere un pattern geometrico di sfondo
 * @returns {JSX.Element} - Il componente sezione
 */
const Section = ({ 
  children, 
  className = '', 
  isEven = false,
  id,
  from = 'primary',
  via = 'cream',
  to = 'secondary',
  useGradient = false,
  usePattern = false
}) => {
  // Animazione per l'entrata della sezione
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  // Determina lo sfondo in base a isEven e useGradient
  let backgroundClasses = '';
  if (useGradient) {
    // Il gradiente viene gestito dal componente CinematicGradient
    backgroundClasses = '';
  } else {
    backgroundClasses = isEven ? 'bg-movieboli-crema' : 'bg-white';
  }

  // Pattern geometrico di sfondo
  const patternStyle = usePattern ? {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5a623' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  } : {};

  // Renderizza la sezione con o senza gradiente
  if (useGradient) {
    return (
      <CinematicGradient
        from={from}
        via={via}
        to={to}
        className={`py-16 md:py-24 relative ${className}`}
        motionProps={{
          variants: sectionVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" }
        }}
      >
        <div 
          id={id} 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={patternStyle}
        >
          {children}
        </div>
      </CinematicGradient>
    );
  }

  return (
    <motion.section
      id={id}
      className={`${backgroundClasses} py-16 md:py-24 relative ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={patternStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;