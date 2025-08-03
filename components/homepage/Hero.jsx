'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import EditableText from '../ui/EditableText'; // Correggi questo import

const Hero = () => {
  return (
    <section className="min-h-screen bg-movieboli-neroProfondo flex items-center justify-center relative overflow-hidden">
      {/* Effetto di sfondo cinematografico */}
      <div className="absolute inset-0 bg-gradient-to-br from-movieboli-neroProfondo/80 via-movieboli-bordeauxCinema/60 to-movieboli-neroProfondo/90"></div>
      
      {/* Contenuto principale */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16 sm:pt-0">
        {/* Logo e titolo principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl sm:text-8xl font-bebas text-movieboli-crema mb-4 tracking-wider">
            <EditableText 
              contentKey="hero.title"
              defaultValue="MOVIEBOLI"
              tag="span"
            />
          </h1>
          <p className="text-xl sm:text-2xl font-poppins text-movieboli-rosaPastello font-light tracking-wide">
            <EditableText 
              contentKey="hero.subtitle"
              defaultValue="Cinema. Cultura. Creatività."
              tag="span"
            />
          </p>
        </motion.div>

        {/* Pulsanti CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Link href="/festival" className="group border-2 border-movieboli-rosaPastello text-movieboli-rosaPastello font-poppins font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-movieboli-rosaPastello hover:text-movieboli-neroProfondo hover:scale-105">
            <EditableText 
              contentKey="hero.button.festival"
              defaultValue="Scopri il Festival"
              tag="span"
            />
          </Link>
          
          <Link href="/attivita" className="group border-2 border-movieboli-crema text-movieboli-crema font-poppins font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-movieboli-crema hover:text-movieboli-neroProfondo hover:scale-105">
            <EditableText 
              contentKey="hero.button.activities"
              defaultValue="Le nostre attività"
              tag="span"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


