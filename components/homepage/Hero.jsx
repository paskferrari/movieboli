'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Hero Section - Sezione principale a schermo intero
 * Design: sfondo nero, testo centrale MOVIEBOLI, sottotitolo e due bottoni
 * Effetti: animazioni soft con framer-motion
 */
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-poppins font-bold text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-movieboli-rosaPastello mb-4 tracking-tight">
            MOVIEBOLI
          </h1>
        </motion.div>

        {/* Sottotitolo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-8 sm:mb-12"
        >
          <p className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl text-movieboli-cremaChiaro font-light tracking-wide">
            Cinema. Cultura. Creatività.
          </p>
        </motion.div>

        {/* Bottoni di azione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          {/* Bottone principale - Festival */}
          <Link
            href="/festival"
            className="group relative overflow-hidden bg-movieboli-rosaPastello text-movieboli-neroProfondo font-poppins font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:min-w-[200px]"
          >
            <span className="relative z-10">Scopri il Festival</span>
            <div className="absolute inset-0 bg-movieboli-cremaChiaro transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>

          {/* Bottone secondario - Attività */}
          <Link
            href="/attivita"
            className="group border-2 border-movieboli-rosaPastello text-movieboli-rosaPastello font-poppins font-semibold text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:bg-movieboli-rosaPastello hover:text-movieboli-neroProfondo hover:scale-105 sm:min-w-[200px]"
          >
            Le nostre attività
          </Link>
        </motion.div>
      </div>

      {/* Indicatore di scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-movieboli-rosaPastello rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 sm:h-3 bg-movieboli-rosaPastello rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero