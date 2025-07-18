import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Vota = () => {
  const [votedShorts, setVotedShorts] = useState(new Set())
  const [showThankYou, setShowThankYou] = useState(null)

  // Cortometraggi in gara (dati di esempio)
  const cortometraggi = [
    {
      id: 1,
      titolo: "Frammenti",
      regista: "Laura Neri",
      durata: "12 min",
      anno: "2024",
      sinossi: "Un viaggio emotivo attraverso i ricordi di una donna anziana che riscopre la sua giovinezza.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 2,
      titolo: "Oltre il Tempo",
      regista: "Fabio Conti",
      durata: "8 min",
      anno: "2024",
      sinossi: "Una storia di fantascienza che esplora il concetto di tempo e destino.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 3,
      titolo: "Memorie",
      regista: "Sofia Greco",
      durata: "15 min",
      anno: "2024",
      sinossi: "Un dramma familiare che racconta tre generazioni attraverso oggetti del passato.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 4,
      titolo: "Riflessi",
      regista: "Andrea Mancini",
      durata: "10 min",
      anno: "2024",
      sinossi: "Una riflessione poetica sulla natura umana attraverso immagini suggestive.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 5,
      titolo: "L'Ultimo Treno",
      regista: "Marco Rossi",
      durata: "18 min",
      anno: "2024",
      sinossi: "Un thriller psicologico ambientato in una stazione ferroviaria deserta.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 6,
      titolo: "Colori del Sud",
      regista: "Giulia Bianchi",
      durata: "14 min",
      anno: "2024",
      sinossi: "Un documentario che celebra le tradizioni e i paesaggi del Sud Italia.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 7,
      titolo: "Silenzio",
      regista: "Roberto Verdi",
      durata: "9 min",
      anno: "2024",
      sinossi: "Un cortometraggio sperimentale che esplora la comunicazione non verbale.",
      image: "/api/placeholder/400/600"
    },
    {
      id: 8,
      titolo: "Nuove Strade",
      regista: "Elena Russo",
      durata: "16 min",
      anno: "2024",
      sinossi: "La storia di un giovane che lascia il suo paese per inseguire i suoi sogni.",
      image: "/api/placeholder/400/600"
    }
  ]

  const handleVote = async (shortId) => {
    // Simula chiamata API
    try {
      // Qui andrà la chiamata API reale
      console.log(`Voto per cortometraggio ID: ${shortId}`)
      
      // Simula delay API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Aggiorna stato locale
      setVotedShorts(prev => new Set([...prev, shortId]))
      setShowThankYou(shortId)
      
      // Nasconde messaggio dopo 3 secondi
      setTimeout(() => {
        setShowThankYou(null)
      }, 3000)
      
    } catch (error) {
      console.error('Errore durante la votazione:', error)
    }
  }

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
    hidden: { opacity: 0, y: 30 },
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
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-movieboli-nero text-movieboli-crema">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-movieboli-nero via-movieboli-bordeaux/20 to-movieboli-nero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-movieboli-nero/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-crema bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vota il tuo corto preferito
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-movieboli-crema/80 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Le votazioni sono aperte fino al 15 agosto!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-movieboli-crema/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{cortometraggi.length} cortometraggi in gara</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Votazioni aperte fino al 15 agosto</span>
            </div>
          </motion.div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-crema mx-auto" />
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione Cortometraggi */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-movieboli-nero via-movieboli-bordeaux/5 to-movieboli-nero"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movieboli-violaPrincipale">
              Cortometraggi in Gara
            </h2>
            <p className="text-movieboli-crema/80 text-lg max-w-2xl mx-auto">
              Scopri tutti i cortometraggi in competizione e vota il tuo preferito
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {cortometraggi.map((corto) => {
              const hasVoted = votedShorts.has(corto.id)
              const showingThankYou = showThankYou === corto.id
              
              return (
                <motion.div
                  key={corto.id}
                  className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Badge In Gara */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
                      IN GARA
                    </span>
                  </div>

                  {/* Messaggio Thank You */}
                  {showingThankYou && (
                    <motion.div 
                      className="absolute inset-0 bg-movieboli-violaPrincipale/95 flex items-center justify-center z-20 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="text-center text-movieboli-nero">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        >
                          <div className="w-16 h-16 bg-movieboli-crema rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Grazie per il tuo voto!</h3>
                        <p className="text-sm opacity-80">Il tuo voto è stato registrato</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Immagine Placeholder */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                      <div className="text-center text-movieboli-crema/60">
                        <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        </div>
                        <p className="text-sm">Poster del Film</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
                  </div>

                  {/* Contenuto Card */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
                      {corto.titolo}
                    </h3>
                    <p className="text-movieboli-crema/70 mb-3">
                      Regia di {corto.regista}
                    </p>
                    <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-4">
                      <span>{corto.durata}</span>
                      <span>{corto.anno}</span>
                    </div>
                    <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
                      {corto.sinossi}
                    </p>
                    
                    {/* Bottone Vota */}
                    <motion.button
                      onClick={() => !hasVoted && handleVote(corto.id)}
                      disabled={hasVoted}
                      className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                        hasVoted
                          ? 'bg-green-600 text-movieboli-crema cursor-not-allowed'
                          : 'bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-movieboli-nero hover:scale-105'
                      }`}
                      whileHover={!hasVoted ? { scale: 1.02 } : {}}
                      whileTap={!hasVoted ? { scale: 0.98 } : {}}
                    >
                      {hasVoted ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Votato</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>Vota</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Informazioni Votazione */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="bg-movieboli-bordeaux/20 rounded-2xl p-8 max-w-3xl mx-auto border border-movieboli-violaPrincipale/20">
              <h3 className="text-2xl font-bold text-movieboli-violaPrincipale mb-4">
                Come Funziona la Votazione
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-movieboli-crema/80">
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-movieboli-violaPrincipale font-bold text-lg">1</span>
                  </div>
                  <p className="text-sm">Guarda tutti i cortometraggi in gara</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-movieboli-violaPrincipale font-bold text-lg">2</span>
                  </div>
                  <p className="text-sm">Clicca "Vota" sul tuo preferito</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-movieboli-violaPrincipale font-bold text-lg">3</span>
                  </div>
                  <p className="text-sm">Il vincitore sarà annunciato il 18 agosto</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-movieboli-violaPrincipale/10 rounded-xl">
                <p className="text-sm text-movieboli-crema/70">
                  <strong>Nota:</strong> Puoi votare più cortometraggi. Le votazioni sono aperte al pubblico fino al 15 agosto 2024.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default Vota