'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

/**
 * Sezione Contattaci - Call to action finale per collaborazioni
 * Design: sfondo nero, testo rosa, bottone prominente
 * Layout: centrato con effetti cinematografici
 */
const Contattaci = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section 
      ref={ref}
      className="relative bg-movieboli-neroProfondo py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Effetti di sfondo cinematografici */}
      <div className="absolute inset-0">
        {/* Gradiente radiale */}
        <div className="absolute inset-0 bg-gradient-to-br from-movieboli-neroProfondo via-movieboli-bordeauxCinema/20 to-movieboli-neroProfondo opacity-90"></div>
        
        {/* Particelle luminose animate */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-movieboli-rosaPastello rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-movieboli-rosaPastello rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-movieboli-rosaPastello rounded-full blur-sm"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Contenuto principale */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Icona decorativa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-movieboli-rosaPastello rounded-full mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-movieboli-neroProfondo" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </motion.div>

            {/* Titolo principale */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-movieboli-cremaChiaro mb-4 sm:mb-6 text-center"
            >
              Hai un'idea o vuoi collaborare?
            </motion.h2>

            {/* Sottotitolo descrittivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-10"
            >
              <p className="font-poppins text-base sm:text-lg md:text-xl text-movieboli-cremaChiaro/80 text-center max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
                Siamo sempre alla ricerca di nuove collaborazioni, 
                progetti innovativi e persone appassionate di cinema e cultura.
              </p>
              <p className="font-poppins text-sm sm:text-base md:text-lg text-movieboli-cremaChiaro/70 leading-relaxed max-w-2xl mx-auto px-2">
                Che tu sia un filmmaker, un artista, un'organizzazione culturale 
                o semplicemente qualcuno con una grande idea, 
                ci piacerebbe sentirti.
              </p>
            </motion.div>

            {/* Opzioni di contatto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto"
            >
              <div className="text-center p-4 sm:p-6 bg-movieboli-neroProfondo/50 rounded-lg sm:rounded-xl border border-movieboli-rosaPastello/20 hover:border-movieboli-rosaPastello/50 transition-all duration-300">
                <div className="text-movieboli-rosaPastello text-xl sm:text-2xl mb-2 sm:mb-3">💡</div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base text-movieboli-cremaChiaro mb-1 sm:mb-2">Progetti Creativi</h3>
                <p className="font-poppins text-movieboli-cremaChiaro/60 text-xs sm:text-sm">Proposte artistiche e culturali</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-movieboli-neroProfondo/50 rounded-lg sm:rounded-xl border border-movieboli-rosaPastello/20 hover:border-movieboli-rosaPastello/50 transition-all duration-300">
                <div className="text-movieboli-rosaPastello text-xl sm:text-2xl mb-2 sm:mb-3">🤝</div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base text-movieboli-cremaChiaro mb-1 sm:mb-2">Collaborazioni</h3>
                <p className="font-poppins text-movieboli-cremaChiaro/60 text-xs sm:text-sm">Partnership e sponsorizzazioni</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-movieboli-neroProfondo/50 rounded-lg sm:rounded-xl border border-movieboli-rosaPastello/20 hover:border-movieboli-rosaPastello/50 transition-all duration-300">
                <div className="text-movieboli-rosaPastello text-xl sm:text-2xl mb-2 sm:mb-3">📧</div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base text-movieboli-cremaChiaro mb-1 sm:mb-2">Informazioni</h3>
                <p className="font-poppins text-movieboli-cremaChiaro/60 text-xs sm:text-sm">Domande e richieste generali</p>
              </div>
            </motion.div>

            {/* Call to action principale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <Link
                href="/contatti"
                className="group inline-flex items-center bg-movieboli-rosaPastello text-movieboli-neroProfondo font-poppins font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl hover:bg-movieboli-cremaChiaro hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Scrivici
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>

              {/* Contatto diretto */}
              <div className="text-center">
                <p className="font-poppins text-movieboli-cremaChiaro/60 text-xs sm:text-sm mb-1 sm:mb-2">Oppure scrivici direttamente:</p>
                <a 
                  href="mailto:info@movieboli.it" 
                  className="font-poppins text-movieboli-rosaPastello hover:text-movieboli-cremaChiaro transition-colors duration-300 font-semibold text-sm sm:text-base"
                >
                  info@movieboli.it
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorazioni cinematografiche */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-movieboli-rosaPastello to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-movieboli-rosaPastello to-transparent opacity-30"></div>
    </section>
  )
}

export default Contattaci