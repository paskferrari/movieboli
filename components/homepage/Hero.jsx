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
    <section className="min-h-screen bg-movieboli-black flex items-center justify-center relative overflow-hidden">
      {/* Effetto di sfondo cinematografico */}
      <div className="absolute inset-0 bg-gradient-to-br from-movieboli-black via-movieboli-black to-gray-900 opacity-90"></div>
      
      {/* Contenuto principale */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo e titolo principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="font-poppins font-bold text-6xl md:text-8xl lg:text-9xl text-movieboli-pink mb-4 tracking-tight">
            MOVIEBOLI
          </h1>
        </motion.div>

        {/* Sottotitolo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="font-poppins text-xl md:text-2xl lg:text-3xl text-white font-light tracking-wide">
            Cinema. Cultura. Creatività.
          </p>
        </motion.div>

        {/* Bottoni di azione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Bottone principale - Festival */}
          <Link
            href="/festival"
            className="group relative overflow-hidden bg-movieboli-pink text-movieboli-black font-poppins font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl min-w-[200px]"
          >
            <span className="relative z-10">Scopri il Festival</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>

          {/* Bottone secondario - Attività */}
          <Link
            href="/attivita"
            className="group border-2 border-movieboli-pink text-movieboli-pink font-poppins font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:bg-movieboli-pink hover:text-movieboli-black hover:scale-105 min-w-[200px]"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-movieboli-pink rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-movieboli-pink rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero