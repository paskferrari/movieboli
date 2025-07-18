import { motion } from 'framer-motion';
import { useBranding, useBrandingClasses, BrandingSection } from '../../contexts/BrandingContext';
import Button from '../ui/Button';

/**
 * Hero section per l'associazione MOVIEBOLI
 */
const AssociationHero = () => {
  const branding = useBranding();
  const classes = useBrandingClasses();
  
  // Animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-movieboli-primary to-movieboli-primary-dark py-20 md:py-32">
      {/* Pattern di sfondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-display font-serif font-semibold leading-tight mb-6">
              MOVIEBOLI
              <span className="block text-2xl md:text-3xl mt-2 font-sans font-normal text-white/80">
                Associazione Culturale
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Promuoviamo cinema, podcast, eventi e formazione culturale per la comunità.
            Un punto di riferimento per la cultura cinematografica e l'espressione artistica.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              variant="terracotta" 
              size="lg"
              href="/chi-siamo"
              icon={<span>👋</span>}
            >
              Scopri chi siamo
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg"
              href="/attivita"
            >
              Le nostre attività
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Sezione Festival */}
      <div className="mt-24">
        <BrandingSection variant="festival" className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="festival-section p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-2/3">
                    <span className="festival-badge mb-4">Evento in evidenza</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-movieboli-primary">
                      MOVIEBOLI Festival
                    </h2>
                    <p className="text-movieboli-neutral-700 mb-6">
                      La nuova edizione del festival cinematografico più atteso dell'anno.
                      Scopri il programma, gli ospiti e prenota i tuoi posti.
                    </p>
                    <Button variant="festival" href="/festival">
                      Esplora il Festival
                    </Button>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-festival-gold">
                      <div className="w-full h-full bg-gradient-to-br from-movieboli-primary to-festival-gold flex items-center justify-center text-white text-5xl font-bold">
                        2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BrandingSection>
      </div>
    </section>
  );
};

export default AssociationHero;