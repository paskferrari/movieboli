'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Sezione Chi Siamo - Missione dell'associazione MOVIEBOLI
 * Design: sfondo rosa, testo centrale con immagine placeholder
 * Layout: responsive con testo e immagine affiancati
 */
const ChiSiamo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section 
      ref={ref}
      id="chi-siamo" 
      className="min-h-screen bg-movieboli-rosaPastello flex items-center py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenuto testuale */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-movieboli-neroProfondo mb-8">
              Chi siamo
            </h2>
            
            <div className="space-y-6 text-movieboli-neroProfondo">
              <p className="font-poppins text-lg md:text-xl leading-relaxed font-medium">
                <strong>MOVIEBOLI</strong> è un'associazione culturale che nasce dalla passione per il cinema 
                e l'arte contemporanea. La nostra missione è promuovere la cultura cinematografica 
                attraverso eventi, festival e progetti formativi.
              </p>
              
              <p className="font-poppins text-lg md:text-xl leading-relaxed">
                Organizziamo il <strong>MoviEboli Film Festival</strong>, ma la nostra attività 
                non si ferma qui: durante tutto l'anno proponiamo workshop, 
                proiezioni speciali, incontri con registi e attività educative.
              </p>
              
              <p className="font-poppins text-lg md:text-xl leading-relaxed">
                Crediamo nel potere del cinema come strumento di crescita culturale 
                e sociale, capace di unire persone e comunità attraverso storie 
                che emozionano e fanno riflettere.
              </p>
            </div>

            {/* Valori chiave */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              <div className="text-center">
                <div className="bg-movieboli-neroProfondo text-movieboli-rosaPastello font-poppins font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  C
                </div>
                <p className="font-poppins font-semibold text-movieboli-neroProfondo">Cinema</p>
              </div>
              <div className="text-center">
                <div className="bg-movieboli-neroProfondo text-movieboli-rosaPastello font-poppins font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  C
                </div>
                <p className="font-poppins font-semibold text-movieboli-neroProfondo">Cultura</p>
              </div>
              <div className="text-center">
                <div className="bg-movieboli-neroProfondo text-movieboli-rosaPastello font-poppins font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  C
                </div>
                <p className="font-poppins font-semibold text-movieboli-neroProfondo">Creatività</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Immagine/Illustrazione placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-movieboli-neroProfondo rounded-2xl overflow-hidden shadow-2xl aspect-square">
              {/* Placeholder cinematografico */}
              <div className="absolute inset-0 bg-gradient-to-br from-movieboli-neroProfondo to-gray-800 flex items-center justify-center">
                <div className="text-center text-movieboli-rosaPastello">
                  {/* Icona cinema */}
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                  </svg>
                  <p className="font-poppins font-semibold text-lg">Immagine Associazione</p>
                  <p className="font-poppins text-sm opacity-70">Placeholder</p>
                </div>
              </div>
              
              {/* Effetto pellicola */}
              <div className="absolute top-0 left-0 w-full h-2 bg-movieboli-rosaPastello opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-movieboli-rosaPastello opacity-20"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ChiSiamo