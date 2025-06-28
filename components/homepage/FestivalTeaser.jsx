'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

/**
 * Sezione Festival Teaser - Banner promozionale per il MoviEboli Film Festival
 * Design: sfondo rosa con blocco nero centrale, effetto cinematografico
 * Layout: banner teaser con call-to-action prominente
 */
const FestivalTeaser = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section 
      ref={ref}
      className="relative bg-movieboli-pink py-20 overflow-hidden"
    >
      {/* Effetti di sfondo */}
      <div className="absolute inset-0">
        {/* Strisce cinematografiche */}
        <div className="absolute top-0 left-0 w-full h-4 bg-movieboli-black opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-movieboli-black opacity-20"></div>
        
        {/* Pattern di pellicola */}
        <div className="absolute top-4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-movieboli-black to-transparent opacity-10"></div>
        <div className="absolute bottom-6 left-0 w-full h-2 bg-gradient-to-r from-transparent via-movieboli-black to-transparent opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Blocco centrale nero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-movieboli-black rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Effetto luce cinematografica */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-movieboli-pink to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-movieboli-pink to-transparent"></div>

            {/* Contenuto principale */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge/Etichetta */}
              <div className="inline-block bg-movieboli-pink text-movieboli-black font-poppins font-bold text-sm px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                Evento Principale
              </div>

              {/* Titolo del festival */}
              <h2 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl text-movieboli-pink mb-6 leading-tight">
                MoviEboli
                <br />
                <span className="text-white">Film Festival</span>
                <br />
                <span className="text-movieboli-pink text-3xl md:text-4xl lg:text-5xl font-normal">2025</span>
              </h2>

              {/* Sottotitolo descrittivo */}
              <p className="font-poppins text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Il festival del cinema più atteso della Campania. 
                Tre giorni di proiezioni, incontri e celebrazione dell'arte cinematografica.
              </p>

              {/* Informazioni evento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-movieboli-pink font-poppins font-bold text-2xl mb-2">📅</div>
                  <p className="text-white font-poppins font-semibold">Agosto 2025</p>
                  <p className="text-gray-400 font-poppins text-sm">Date da definire</p>
                </div>
                <div className="text-center">
                  <div className="text-movieboli-pink font-poppins font-bold text-2xl mb-2">📍</div>
                  <p className="text-white font-poppins font-semibold">Eboli, SA</p>
                  <p className="text-gray-400 font-poppins text-sm">Campania</p>
                </div>
                <div className="text-center">
                  <div className="text-movieboli-pink font-poppins font-bold text-2xl mb-2">🎬</div>
                  <p className="text-white font-poppins font-semibold">Cinema d'Autore</p>
                  <p className="text-gray-400 font-poppins text-sm">Opere selezionate</p>
                </div>
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                href="/festival"
                className="group inline-flex items-center bg-movieboli-pink text-movieboli-black font-poppins font-bold text-xl py-4 px-10 rounded-xl hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Vai alla pagina del Festival
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>

            {/* Decorazioni cinematografiche */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-movieboli-pink opacity-30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-movieboli-pink opacity-30"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-movieboli-pink opacity-30"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-movieboli-pink opacity-30"></div>
          </motion.div>
        </div>
      </div>

      {/* Effetto parallax di sfondo */}
      <motion.div
        animate={{ 
          backgroundPosition: isInView ? ['0% 0%', '100% 100%'] : '0% 0%'
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      ></motion.div>
    </section>
  )
}

export default FestivalTeaser