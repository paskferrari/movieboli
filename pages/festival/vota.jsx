import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../../components/Footer'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { useAuth } from '../../contexts/AuthContext'
import { saveVote, getUserVotes } from '../../lib/supabase'


// Componente per le stelle di rating
const StarRating = ({ rating, onRatingChange, readonly = false, isSaving = false }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const handleStarClick = (starValue) => {
    if (!readonly && onRatingChange && !isSaving) {
      onRatingChange(starValue)
    }
  }

  const handleStarHover = (starValue) => {
    if (!readonly && !isSaving) {
      setHoverRating(starValue)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly && !isSaving) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoverRating || rating)
          return (
            <motion.button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              disabled={readonly || isSaving}
              className={`text-2xl transition-all duration-200 ${
                readonly || isSaving ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              } ${isFilled ? 'text-movieboli-violaPrincipale' : 'text-movieboli-crema/30'} ${
                isSaving ? 'opacity-50' : ''
              }`}
              whileHover={!readonly && !isSaving ? { scale: 1.1 } : {}}
              whileTap={!readonly && !isSaving ? { scale: 0.95 } : {}}
            >
              ★
            </motion.button>
          )
        })}
      </div>
      
      {/* Indicatore di salvataggio */}
      {isSaving && (
        <div className="flex items-center gap-1 text-movieboli-violaPrincipale text-sm">
          <div className="w-4 h-4 border-2 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
          <span>Salvando...</span>
        </div>
      )}
    </div>
  )
}

const Vota = ({ cortometraggi = [], error = null }) => {
  const { user, isAuthenticated } = useAuth()
  const [ratings, setRatings] = useState({})
  const [showThankYou, setShowThankYou] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [savingVotes, setSavingVotes] = useState(new Set())

  // Inizializza i dati e termina il caricamento
  useEffect(() => {
    if (cortometraggi.length > 0) {
      setPageLoading(false)
    } else {
      const timer = setTimeout(() => {
        setPageLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [cortometraggi])

  // Carica i voti dell'utente da Supabase
  useEffect(() => {
    const loadUserVotes = async () => {
      if (isAuthenticated && user) {
        try {
          const userVotes = await getUserVotes(user.id)
          const votesMap = {}
          userVotes.forEach(vote => {
            votesMap[vote.film_id] = vote.rating
          })
          setRatings(votesMap)
        } catch (error) {
          console.error('Errore nel caricamento dei voti:', error)
          // Fallback al localStorage per compatibilità
          const savedRatings = localStorage.getItem('movieboli-ratings')
          if (savedRatings) {
            try {
              setRatings(JSON.parse(savedRatings))
            } catch (e) {
              console.error('Errore nel caricamento dei voti dal localStorage:', e)
            }
          }
        }
      }
    }

    loadUserVotes()
  }, [isAuthenticated, user])

  // Salva i voti nel localStorage
  const saveRatings = (newRatings) => {
    localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings))
  }

  // Gestisce il cambio di rating per un cortometraggio
  const handleRatingChange = async (cortoId, newRating) => {
    if (!isAuthenticated || !user) {
      console.error('Utente non autenticato')
      return
    }

    // Aggiorna immediatamente l'UI
    const newRatings = { ...ratings, [cortoId]: newRating }
    setRatings(newRatings)
    
    // Indica che stiamo salvando questo voto
    setSavingVotes(prev => new Set([...prev, cortoId]))
    
    try {
      // Salva nel database Supabase
      await saveVote(user.id, cortoId, newRating)
      
      // Salva anche nel localStorage come backup
      localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings))
      
      // Mostra messaggio di conferma
      setShowThankYou(cortoId)
      setTimeout(() => {
        setShowThankYou(null)
      }, 2000)
    } catch (error) {
      console.error('Errore nel salvare il voto:', error)
      // In caso di errore, ripristina il voto precedente
      setRatings(ratings)
    } finally {
      // Rimuovi l'indicatore di salvataggio
      setSavingVotes(prev => {
        const newSet = new Set(prev)
        newSet.delete(cortoId)
        return newSet
      })
    }
  }

  // Ottiene il rating per un cortometraggio
  const getRating = (cortoId) => {
    return ratings[cortoId] || 0
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
    <ProtectedRoute>
      <Head>
        <title>Vota i Cortometraggi | MOVIEBOLI Festival 2025</title>
        <meta name="description" content="Vota i tuoi cortometraggi preferiti del MOVIEBOLI Festival 2025 con il sistema di rating a stelle" />
        <meta property="og:title" content="Vota i Cortometraggi | MOVIEBOLI Festival 2025" />
        <meta property="og:description" content="Vota i tuoi cortometraggi preferiti del MOVIEBOLI Festival 2025 con il sistema di rating a stelle" />
      </Head>

      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-neroProfondo">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">Caricamento sistema di votazione...</p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema">
        {/* Messaggio di errore */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-md mx-auto my-4 max-w-4xl">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background con particelle animate */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
                Vota i Cortometraggi del Festival 2025
              </h1>
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
                Esprimi il tuo giudizio sui cortometraggi in competizione utilizzando il nostro sistema di rating a stelle. Puoi votare e modificare i tuoi voti in qualsiasi momento.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-movieboli-crema/70 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{cortometraggi.length} cortometraggi in gara</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Sistema di rating a 5 stelle</span>
                </div>
              </div>
              <Link href="/festival" legacyBehavior passHref>
                <motion.a
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Festival
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sezione Cortometraggi */}
        <motion.section 
          className="py-20 px-4 bg-gradient-to-b from-movieboli-neroProfondo via-movieboli-bordeaux/5 to-movieboli-neroProfondo"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario">
                Cortometraggi in Competizione
              </h2>
              <p className="text-movieboli-crema/80 text-lg max-w-2xl mx-auto">
                Vota ogni cortometraggio con un punteggio da 1 a 5 stelle. I tuoi voti vengono salvati automaticamente.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {cortometraggi.map((corto, index) => {
                const cortoId = corto.id || corto.titolo || `corto-${index}`
                const currentRating = getRating(cortoId)
                const showingThankYou = showThankYou === cortoId
                
                return (
                  <motion.div
                    key={cortoId}
                    className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    {/* Badge In Gara */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
                        FESTIVAL 2025
                      </span>
                    </div>

                    {/* Messaggio Thank You */}
                    <AnimatePresence>
                      {showingThankYou && (
                        <motion.div 
                          className="absolute inset-0 bg-movieboli-violaPrincipale/95 flex items-center justify-center z-20 rounded-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
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
                            <h3 className="text-xl font-bold mb-2">Voto registrato!</h3>
                            <p className="text-sm opacity-80">Grazie per la tua valutazione</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Immagine del Cortometraggio */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {corto.immagine ? (
                        <img 
                          src={corto.immagine} 
                          alt={`Poster di ${corto.titolo}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center" style={{ display: corto.immagine ? 'none' : 'flex' }}>
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
                        {corto.anno && <span>{corto.anno}</span>}
                      </div>
                      <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
                        {corto.sinossi}
                      </p>
                      
                      {/* Sistema di Rating con Stelle */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-movieboli-crema/80">
                            {currentRating > 0 ? `La tua valutazione: ${currentRating}/5` : 'Valuta questo cortometraggio'}
                          </span>
                          {currentRating > 0 && (
                             <button
                               onClick={() => handleRatingChange(cortoId, 0)}
                               className="text-xs text-movieboli-crema/60 hover:text-movieboli-violaPrincipale transition-colors"
                             >
                               Rimuovi voto
                             </button>
                           )}
                        </div>
                        <StarRating 
                           rating={currentRating}
                           onRatingChange={(rating) => handleRatingChange(cortoId, rating)}
                           isSaving={savingVotes.has(cortoId)}
                         />
                      </div>
                      
                      {/* Link al Trailer se disponibile */}
                      {(corto.trailer || corto.link) && (
                        <motion.a
                          href={corto.trailer || corto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-4 rounded-xl border border-movieboli-violaPrincipale/50 text-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                          <span>Guarda il Trailer</span>
                        </motion.a>
                      )}
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
                  <p className="text-sm">Esplora tutti i cortometraggi in competizione</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-movieboli-violaPrincipale font-bold text-lg">2</span>
                  </div>
                  <p className="text-sm">Valuta con stelle da 1 a 5 ogni cortometraggio</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-movieboli-violaPrincipale font-bold text-lg">3</span>
                  </div>
                  <p className="text-sm">Modifica i tuoi voti quando vuoi</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-movieboli-violaPrincipale/10 rounded-xl">
                <p className="text-sm text-movieboli-crema/70">
                  <strong>Nota:</strong> I tuoi voti vengono salvati automaticamente nel browser. Puoi valutare tutti i cortometraggi e modificare le tue valutazioni in qualsiasi momento.
                </p>
              </div>
            </div>
          </motion.div>
          </div>
        </motion.section>

        <Footer />
      </main>
    </ProtectedRoute>
  )
}

// Funzione per caricare i dati dei cortometraggi dal lato server
export async function getStaticProps() {
  try {
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'public', 'json-folders', 'film_unificati.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const cortometraggi = JSON.parse(fileContents)

    return {
      props: {
        cortometraggi,
      },
      revalidate: 3600, // Ricarica ogni ora
    }
  } catch (error) {
    console.error('Errore nel caricamento dei cortometraggi:', error)
    return {
      props: {
        cortometraggi: [],
      },
    }
  }
}

export default Vota