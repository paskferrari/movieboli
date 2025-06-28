import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Image from 'next/image'

const Programma = () => {
  const [selectedCategory, setSelectedCategory] = useState('tutti')

  // Dati di esempio per i film
  const films = [
    {
      id: 1,
      title: "La Strada del Cinema",
      director: "Marco Rossi",
      time: "20:30",
      date: "15 Luglio",
      category: "lungometraggi",
      image: "/api/placeholder/300/400"
    },
    {
      id: 2,
      title: "Luci della Città",
      director: "Anna Bianchi",
      time: "18:00",
      date: "16 Luglio",
      category: "lungometraggi",
      image: "/api/placeholder/300/400"
    },
    {
      id: 3,
      title: "Il Sogno",
      director: "Giuseppe Verdi",
      time: "21:00",
      date: "17 Luglio",
      category: "lungometraggi",
      image: "/api/placeholder/300/400"
    }
  ]

  // Dati di esempio per i cortometraggi
  const shorts = [
    {
      id: 4,
      title: "Frammenti",
      director: "Laura Neri",
      time: "16:30",
      date: "15 Luglio",
      category: "corti",
      inCompetition: true,
      image: "/api/placeholder/300/400"
    },
    {
      id: 5,
      title: "Oltre il Tempo",
      director: "Fabio Conti",
      time: "17:00",
      date: "16 Luglio",
      category: "corti",
      inCompetition: true,
      image: "/api/placeholder/300/400"
    },
    {
      id: 6,
      title: "Memorie",
      director: "Sofia Greco",
      time: "19:30",
      date: "17 Luglio",
      category: "corti",
      inCompetition: true,
      image: "/api/placeholder/300/400"
    },
    {
      id: 7,
      title: "Riflessi",
      director: "Andrea Mancini",
      time: "20:00",
      date: "18 Luglio",
      category: "corti",
      inCompetition: true,
      image: "/api/placeholder/300/400"
    }
  ]

  // Dati di esempio per eventi e ospiti
  const events = [
    {
      id: 1,
      title: "Masterclass con Roberto Benigni",
      date: "15 Luglio",
      time: "15:00",
      location: "Teatro Comunale",
      guest: "Roberto Benigni",
      type: "masterclass"
    },
    {
      id: 2,
      title: "Tavola Rotonda: Il Cinema del Sud",
      date: "16 Luglio",
      time: "11:00",
      location: "Sala Conferenze",
      guest: "Vari ospiti",
      type: "dibattito"
    },
    {
      id: 3,
      title: "Premiazione Corti in Gara",
      date: "18 Luglio",
      time: "22:00",
      location: "Piazza Centrale",
      guest: "Giuria del Festival",
      type: "cerimonia"
    },
    {
      id: 4,
      title: "Workshop di Regia",
      date: "17 Luglio",
      time: "10:00",
      location: "Aula Magna",
      guest: "Matteo Garrone",
      type: "workshop"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-movieboli-bordeaux/20 to-movieboli-pink/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-movieboli-pink to-movieboli-cream bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Il Programma del Festival
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-movieboli-cream/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Film, cortometraggi, ospiti e appuntamenti imperdibili
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-movieboli-pink to-movieboli-cream mx-auto" />
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione Film */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-black to-movieboli-bordeaux/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movieboli-pink">
              Lungometraggi
            </h2>
            <p className="text-movieboli-cream/80 text-lg max-w-2xl mx-auto">
              Una selezione di opere cinematografiche che raccontano storie uniche e coinvolgenti
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {films.map((film) => (
              <motion.div
                key={film.id}
                className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-pink/20 hover:border-movieboli-pink/50 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-movieboli-pink/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                    <div className="text-center text-movieboli-cream/60">
                      <div className="w-16 h-16 mx-auto mb-2 bg-movieboli-pink/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                      </div>
                      <p className="text-sm">Poster Film</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full bg-movieboli-pink hover:bg-movieboli-pink/80 text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                      Dettagli
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-movieboli-cream group-hover:text-movieboli-pink transition-colors duration-200">
                    {film.title}
                  </h3>
                  <p className="text-movieboli-cream/70 mb-3">
                    Regia di {film.director}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-movieboli-pink font-semibold">
                      {film.date}
                    </span>
                    <span className="text-movieboli-cream/80">
                      ore {film.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione Corti in Gara */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-movieboli-bordeaux/10 to-movieboli-pink/5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movieboli-pink">
              Cortometraggi in Gara
            </h2>
            <p className="text-movieboli-cream/80 text-lg max-w-2xl mx-auto">
              I migliori cortometraggi in competizione per il premio del pubblico e della giuria
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {shorts.map((short) => (
              <motion.div
                key={short.id}
                className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-pink/20 hover:border-movieboli-pink/50 transition-all duration-300 relative"
                variants={cardVariants}
                whileHover="hover"
              >
                {short.inCompetition && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-movieboli-pink text-black text-xs font-bold px-2 py-1 rounded-full">
                      IN GARA
                    </span>
                  </div>
                )}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-movieboli-pink/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                    <div className="text-center text-movieboli-cream/60">
                      <div className="w-12 h-12 mx-auto mb-2 bg-movieboli-pink/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                      </div>
                      <p className="text-xs">Poster</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full bg-movieboli-pink hover:bg-movieboli-pink/80 text-black font-semibold py-1.5 px-3 rounded text-sm transition-colors duration-200">
                      Dettagli
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-movieboli-cream group-hover:text-movieboli-pink transition-colors duration-200">
                    {short.title}
                  </h3>
                  <p className="text-movieboli-cream/70 text-sm mb-2">
                    {short.director}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-movieboli-pink font-semibold">
                      {short.date}
                    </span>
                    <span className="text-movieboli-cream/80">
                      {short.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione Eventi e Ospiti */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-movieboli-pink/5 to-black"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movieboli-pink">
              Eventi e Ospiti
            </h2>
            <p className="text-movieboli-cream/80 text-lg max-w-2xl mx-auto">
              Masterclass, workshop e incontri con i protagonisti del cinema
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={containerVariants}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="group bg-movieboli-bordeaux/20 rounded-2xl p-6 md:p-8 border border-movieboli-pink/20 hover:border-movieboli-pink/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-movieboli-cream group-hover:text-movieboli-pink transition-colors duration-200">
                        {event.title}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        event.type === 'masterclass' ? 'bg-movieboli-pink/20 text-movieboli-pink' :
                        event.type === 'workshop' ? 'bg-movieboli-bordeaux/30 text-movieboli-cream' :
                        event.type === 'dibattito' ? 'bg-movieboli-cream/20 text-movieboli-cream' :
                        'bg-movieboli-pink/30 text-movieboli-pink'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-movieboli-cream/80">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-movieboli-pink" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{event.date} - {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-movieboli-pink" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-movieboli-pink" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{event.guest}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="bg-movieboli-pink hover:bg-movieboli-pink/80 text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                      Partecipa
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default Programma