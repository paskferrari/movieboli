'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

/**
 * Sezione Le nostre attività - Griglia di cards con eventi e progetti
 * Design: sfondo crema/bianco, cards con hover effects
 * Layout: griglia responsive con animazioni staggered
 */
const Attivita = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  // Dati delle attività (placeholder realistici)
  const attivita = [
    {
      id: 1,
      titolo: "Workshop di Regia",
      descrizione: "Corsi pratici per aspiranti registi con professionisti del settore. Impara le tecniche di base della regia cinematografica.",
      link: "/attivita/workshop-regia",
      icona: "🎬"
    },
    {
      id: 2,
      titolo: "Cineforum Mensile",
      descrizione: "Proiezioni e dibattiti su film d'autore, cinema indipendente e opere contemporanee. Ogni primo venerdì del mese.",
      link: "/attivita/cineforum",
      icona: "🎭"
    },
    {
      id: 3,
      titolo: "Laboratorio di Sceneggiatura",
      descrizione: "Impara l'arte della scrittura cinematografica con sceneggiatori professionisti. Dalla prima idea al copione finale.",
      link: "/attivita/sceneggiatura",
      icona: "✍️"
    },
    {
      id: 4,
      titolo: "Rassegna Cinema Sociale",
      descrizione: "Film e documentari che affrontano tematiche sociali contemporanee. Cinema come strumento di riflessione.",
      link: "/attivita/cinema-sociale",
      icona: "🌍"
    },
    {
      id: 5,
      titolo: "Masterclass con Registi",
      descrizione: "Incontri esclusivi con registi, attori e professionisti del cinema per condividere esperienze e tecniche.",
      link: "/attivita/masterclass",
      icona: "🎓"
    },
    {
      id: 6,
      titolo: "Concorso Cortometraggi",
      descrizione: "Competizione annuale per giovani filmmaker. Premi, riconoscimenti e opportunità di distribuzione.",
      link: "/attivita/concorso",
      icona: "🏆"
    }
  ]

  return (
    <section 
      ref={ref}
      id="attivita" 
      className="min-h-screen bg-movieboli-cream py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intestazione sezione */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-movieboli-black mb-6">
            Le nostre attività
          </h2>
          <p className="font-poppins text-xl md:text-2xl text-movieboli-bordeaux max-w-3xl mx-auto leading-relaxed">
            Durante tutto l'anno organizziamo eventi, workshop e progetti 
            per promuovere la cultura cinematografica e artistica.
          </p>
        </motion.div>

        {/* Griglia delle attività */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attivita.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-movieboli-pink/10 hover:border-movieboli-pink/30">
                {/* Header della card */}
                <div className="bg-gradient-to-r from-movieboli-black to-movieboli-bordeaux p-6 text-center">
                  <div className="text-4xl mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    🎬
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-white group-hover:text-movieboli-pink transition-colors duration-300">
                    {item.titolo}
                  </h3>
                </div>

                {/* Contenuto della card */}
                <div className="p-6 flex flex-col h-full">
                  <p className="font-poppins text-movieboli-black leading-relaxed mb-6 flex-grow">
                    {item.descrizione}
                  </p>
                  
                  {/* Bottone di azione */}
                  <Link
                    href={item.link}
                    className="inline-flex items-center justify-center bg-movieboli-pink text-movieboli-black font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-movieboli-black hover:text-movieboli-pink transition-all duration-300 group-hover:scale-105"
                  >
                    Scopri di più
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action finale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/attivita"
            className="inline-flex items-center bg-movieboli-black text-movieboli-pink font-poppins font-bold text-lg py-4 px-8 rounded-lg hover:bg-movieboli-bordeaux hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Vedi tutte le attività
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Attivita