import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { useAuth } from '../../contexts/AuthContext'
// Rimuovi l'import delle funzioni dirette
// import { saveVote, getUserVotes } from '../../lib/supabase'
import { useContent } from '../../contexts/ContentContext'
import EditableText from '../../components/ui/EditableText'

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

  const handleHalfStarClick = (starIndex, isLeftHalf) => {
    if (!readonly && onRatingChange && !isSaving) {
      const newRating = isLeftHalf ? starIndex - 0.5 : starIndex
      onRatingChange(newRating)
    }
  }

  const handleHalfStarHover = (starIndex, isLeftHalf) => {
    if (!readonly && !isSaving) {
      const newRating = isLeftHalf ? starIndex - 0.5 : starIndex
      setHoverRating(newRating)
    }
  }

  const getStarDisplay = (starIndex, currentRating) => {
    if (currentRating >= starIndex) {
      return 'full' // Stella piena
    } else if (currentRating >= starIndex - 0.5) {
      return 'half' // Mezza stella
    } else {
      return 'empty' // Stella vuota
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => {
          const currentRating = hoverRating || rating
          const starDisplay = getStarDisplay(star, currentRating)
          
          return (
            <motion.div
              key={star}
              className="relative cursor-pointer"
              whileHover={!readonly && !isSaving ? { scale: 1.1 } : {}}
              whileTap={!readonly && !isSaving ? { scale: 0.95 } : {}}
            >
              {/* Stella con gestione mezzi voti */}
              {/* Stella di base (vuota) */}
              <div className={`text-2xl transition-all duration-200 ${
                readonly || isSaving ? 'cursor-default' : 'cursor-pointer'
              } text-movieboli-crema/30 ${
                isSaving ? 'opacity-50' : ''
              }`}>
                ★
              </div>
              
              {/* Overlay per mezza stella (sinistra) */}
              {starDisplay === 'half' && (
                <div 
                  className="absolute inset-0 overflow-hidden text-2xl text-movieboli-violaPrincipale transition-all duration-200"
                  style={{ width: '50%' }}
                >
                  ★
                </div>
              )}
              
              {/* Overlay per stella piena */}
              {starDisplay === 'full' && (
                <div className="absolute inset-0 text-2xl text-movieboli-violaPrincipale transition-all duration-200">
                  ★
                </div>
              )}
              
              {/* Area cliccabile per mezza stella sinistra */}
              <button
                type="button"
                className="absolute left-0 top-0 w-1/2 h-full z-10"
                onClick={() => handleHalfStarClick(star, true)}
                onMouseEnter={() => handleHalfStarHover(star, true)}
                disabled={readonly || isSaving}
              />
              
              {/* Area cliccabile per stella intera */}
              <button
                type="button"
                className="absolute right-0 top-0 w-1/2 h-full z-10"
                onClick={() => handleHalfStarClick(star, false)}
                onMouseEnter={() => handleHalfStarHover(star, false)}
                disabled={readonly || isSaving}
              />
            </motion.div>
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

// Funzioni API per gestire i voti
const getUserVotesFromAPI = async (token) => {
  const response = await fetch('/api/votes', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    throw new Error('Errore nel caricamento dei voti')
  }
  
  return await response.json()
}

const saveVoteToAPI = async (token, filmId, rating) => {
  const response = await fetch('/api/votes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ film_id: filmId, rating })
  })
  
  if (!response.ok) {
    throw new Error('Errore nel salvare il voto')
  }
  
  return await response.json()
}

const Vota = ({ cortometraggi = [], error = null }) => {
  const { getContent } = useContent()
  const { user, session, isAuthenticated } = useAuth() // Aggiungi session
  const [ratings, setRatings] = useState({})
  const [showThankYou, setShowThankYou] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [savingVotes, setSavingVotes] = useState(new Set())
  const [isScrolled, setIsScrolled] = useState(false)
  const [loadingVotes, setLoadingVotes] = useState(false)
  const [voteError, setVoteError] = useState(null)

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Carica i voti dell'utente dall'API
  useEffect(() => {
    const loadUserVotes = async () => {
      if (isAuthenticated && session?.access_token) {
        setLoadingVotes(true)
        try {
          const response = await getUserVotesFromAPI(session.access_token)
          const votesMap = {}
          // Correzione: accedere a response.votes invece di response direttamente
          const userVotes = response.votes || []
          userVotes.forEach(vote => {
            votesMap[vote.film_id] = vote.rating
          })
          setRatings(votesMap)
          setVoteError(null)
        } catch (error) {
          console.error('Errore nel caricamento dei voti:', error)
          setVoteError('Errore nel caricamento dei voti')
          // Fallback al localStorage per compatibilità
          const savedRatings = localStorage.getItem('movieboli-ratings')
          if (savedRatings) {
            try {
              setRatings(JSON.parse(savedRatings))
            } catch (e) {
              console.error('Errore nel caricamento dei voti dal localStorage:', e)
            }
          }
        } finally {
          setLoadingVotes(false)
        }
      }
    }

    loadUserVotes()
  }, [isAuthenticated, session])

  // Gestisce il cambio di rating per un cortometraggio
  const handleRatingChange = async (cortoId, newRating) => {
    if (!isAuthenticated || !session?.access_token) {
      console.error('Utente non autenticato')
      setVoteError('Devi essere autenticato per votare')
      return
    }

    // Aggiorna immediatamente l'UI
    const previousRatings = { ...ratings }
    const newRatings = { ...ratings, [cortoId]: newRating }
    setRatings(newRatings)
    
    // Indica che stiamo salvando questo voto
    setSavingVotes(prev => new Set([...prev, cortoId]))
    setVoteError(null)
    
    try {
      // Salva tramite API
      const response = await saveVoteToAPI(session.access_token, cortoId, newRating)
      
      // Verifica che il salvataggio sia andato a buon fine
      if (!response.success) {
        throw new Error(response.error || 'Errore nel salvare il voto')
      }
      
      // Salva anche nel localStorage come backup
      localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings))
      
      // Mostra messaggio di conferma
      setShowThankYou(cortoId)
      setTimeout(() => {
        setShowThankYou(null)
      }, 3000)
    } catch (error) {
      console.error('Errore nel salvare il voto:', error)
      setVoteError(`Errore nel salvare il voto: ${error.message}`)
      // In caso di errore, ripristina il voto precedente
      setRatings(previousRatings)
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
        <title>
          <EditableText 
            contentKey="vote.meta.title"
            defaultValue="Vota i Cortometraggi | MOVIEBOLI Festival"
            tag="span"
          />
        </title>
        <meta name="description" content={
          getContent('vote.meta.description', 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival')
        } />
        <meta property="og:title" content="Vota i Cortometraggi | MOVIEBOLI Festival" />
        <meta property="og:description" content="Partecipa alla giuria popolare del festival." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {/* Navbar Festival Standardizzata */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo-movieboli.png"
                  alt="MOVIEBOLI Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
              <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
                <EditableText 
                  contentKey="festival.nav.title"
                  defaultValue="FESTIVAL 2025"
                  tag="span"
                />
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.program"
                  defaultValue="Programma"
                  tag="span"
                />
              </Link>
              <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.shorts"
                  defaultValue="Cortometraggi"
                  tag="span"
                />
              </Link>
              <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.films"
                  defaultValue="Film"
                  tag="span"
                />
              </Link>
              <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.guests"
                  defaultValue="Ospiti"
                  tag="span"
                />
              </Link>
              <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.vote"
                  defaultValue="Vota"
                  tag="span"
                />
              </Link>
              <Link href="/festival/contest_artistico/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.contest"
                  defaultValue="Contest"
                  tag="span"
                />
              </Link>
              <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.about"
                  defaultValue="Info"
                  tag="span"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenuto principale con padding-top per compensare navbar fissa */}
      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema pt-20">
        {pageLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-neroProfondo">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
              <p className="text-sm sm:text-base text-movieboli-crema/80">
                <EditableText 
                  contentKey="vote.loading"
                  defaultValue="Caricamento sistema di votazione..."
                  tag="span"
                />
              </p>
            </div>
          </div>
        )}

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
                  <EditableText 
                    contentKey="vote.title"
                    defaultValue="Vota i Cortometraggi del Festival 2025"
                    tag="span"
                  />
                </h1>
                <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
                  <EditableText 
                    contentKey="vote.subtitle"
                    defaultValue="Esprimi il tuo giudizio sui cortometraggi in competizione utilizzando il nostro sistema di rating a stelle. Puoi votare e modificare i tuoi voti in qualsiasi momento."
                    tag="span"
                  />
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-movieboli-crema/70 mb-8">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <EditableText 
                        contentKey="vote.how_to_vote"
                        defaultValue="Clicca sulle stelle per votare da 0.5 a 5"
                        tag="span"
                      />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <EditableText 
                        contentKey="vote.modify_votes"
                        defaultValue="Puoi modificare i tuoi voti in qualsiasi momento"
                        tag="span"
                      />
                    </span>
                  </div>
                </div>
                
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
              {/* Rimuovo il secondo pulsante "Torna al Festival" prima della griglia */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true }}
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
                              <h3 className="text-xl font-bold mb-2">
                                <EditableText 
                                  contentKey="vote.success_title"
                                  defaultValue="Voto registrato!"
                                  tag="span"
                                />
                              </h3>
                              <p className="text-sm opacity-80">
                                <EditableText 
                                  contentKey="vote.success_message"
                                  defaultValue="Grazie per la tua valutazione"
                                  tag="span"
                                />
                              </p>
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
                              {currentRating > 0 ? (
                                <span className="flex items-center gap-2">
                                  <span>La tua valutazione:</span>
                                  <span className="text-movieboli-violaPrincipale font-bold">
                                    {currentRating}/10 ★
                                  </span>
                                </span>
                              ) : (
                                getContent('vote.rating.label', 'Valuta questo cortometraggio')
                              )}
                            </span>
                            {currentRating > 0 && (
                               <button
                                 onClick={() => handleRatingChange(cortoId, 0)}
                                 className="text-xs text-movieboli-crema/60 hover:text-movieboli-violaPrincipale transition-colors duration-200 flex items-center gap-1"
                               >
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                 </svg>
                                 <EditableText 
                                   contentKey="vote.remove_vote"
                                   defaultValue="Rimuovi"
                                   tag="span"
                                 />
                               </button>
                             )}
                          </div>
                          {currentRating > 0 && (
                            <div className="mb-2 text-xs text-movieboli-crema/60">
                              <EditableText 
                                contentKey="vote.can_modify"
                                defaultValue="Clicca sulle stelle per modificare il tuo voto"
                                tag="span"
                              />
                            </div>
                          )}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>
                              <EditableText 
                                contentKey="vote.watch_trailer"
                                defaultValue="Guarda Trailer"
                                tag="span"
                              />
                            </span>
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
                            <div className="text-center mt-16 mb-8">
                <Link href="/festival" legacyBehavior passHref>
                  <motion.a
                    className="inline-flex items-center px-8 py-4 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300 hover:bg-movieboli-violaPrincipale/90 shadow-lg hover:shadow-xl"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <EditableText 
                      contentKey="vote.back_to_festival"
                      defaultValue="Torna al Festival"
                      tag="span"
                    />
                  </motion.a>
                </Link>
              </div>
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
    const allCortometraggi = JSON.parse(fileContents)

    // Lista dei primi 5 cortometraggi del programma del 22 agosto (venerdì)
    const cortometraggiVotabili = [
      'DIECI SECONDI',
      'Place under the sun',  // Corretto: era 'PLACE UNDER THE SUN'
      'The Rock Tensions',
      'APPUNTAMENTO A MEZZOGIORNO',
      'Ya Hanouni'
    ]

    // Filtra solo i cortometraggi votabili del 22 agosto
    const cortometraggi = allCortometraggi
      .filter(corto => cortometraggiVotabili.includes(corto.titolo))
      .sort((a, b) => {
        // Ordina secondo l'ordine del programma del 22 agosto
        const indexA = cortometraggiVotabili.indexOf(a.titolo)
        const indexB = cortometraggiVotabili.indexOf(b.titolo)
        return indexA - indexB
      })

    return {
      props: {
        cortometraggi,
      },
      revalidate: 3600, // Ricarica ogni ora
    }
  } catch (error) {
    // ... existing code ...
    console.error('Errore nel caricamento dei cortometraggi:', error)
    return {
      props: {
        cortometraggi: [],
        error: 'Errore nel caricamento dei cortometraggi'
      },
    }
  }
}

export default Vota