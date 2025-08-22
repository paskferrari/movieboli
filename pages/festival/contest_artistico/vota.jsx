import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../../components/Footer'
import ProtectedRoute from '../../../components/auth/ProtectedRoute'
import { useAuth } from '../../../contexts/AuthContext'
import { useContent } from '../../../contexts/ContentContext'
import EditableText from '../../../components/ui/EditableText'
import { supabase } from '../../../lib/supabase';
import opereArtisti from './opereArtisti.json'

const VotaContestArtistico = () => {
  const { getContent } = useContent()
  const { user, isAuthenticated } = useAuth()
  const [selectedOpera, setSelectedOpera] = useState(null)
  const [showThankYou, setShowThankYou] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [enlargedImage, setEnlargedImage] = useState(null)

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
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Carica il voto dell'utente dal database
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserVote()
    }
  }, [isAuthenticated, user])

  const loadUserVote = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch('/api/contest/voti', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.hasVoted && data.voto) {
          // Trova l'indice dell'opera nel nostro array locale
          const operaIndex = opereArtisti.findIndex(opera => 
            opera.autore === data.voto.contest_opere.autore &&
            opera.nome_film_ispirato === data.voto.contest_opere.nome_film_ispirato
          )
          if (operaIndex !== -1) {
            setSelectedOpera(`${opera.autore}-${operaIndex}`)
            setHasVoted(true)
          }
        }
      }
    } catch (error) {
      console.error('Errore nel caricamento del voto:', error)
    }
  }

  // Gestisce la selezione di un'opera
  const handleOperaSelection = async (operaId) => {
    if (!isAuthenticated || !user || isSaving) {
      return
    }

    setIsSaving(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('Sessione scaduta. Ricarica la pagina.')
        return
      }

      // Estrai l'indice dell'opera dall'ID
      const operaIndex = parseInt(operaId.split('-').pop())
      
      // Salva nel database
      const response = await fetch('/api/contest/voti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          opera_id: operaIndex + 1 // Gli ID nel database partono da 1
        })
      })

      if (response.ok) {
        setSelectedOpera(operaId)
        setHasVoted(true)
        
        // Mantieni anche il localStorage come backup
        localStorage.setItem(`contest-artistico-vote-${user.id}`, operaId)
        
        // Mostra messaggio di conferma
        setShowThankYou(true)
        setTimeout(() => {
          setShowThankYou(false)
        }, 3000)
      } else {
        const errorData = await response.json()
        alert(`Errore nel salvataggio: ${errorData.error}`)
      }
      
    } catch (error) {
      console.error('Errore nel salvare il voto:', error)
      alert('Errore nel salvataggio del voto. Riprova.')
    } finally {
      setIsSaving(false)
    }
  }

  // Gestione ingrandimento immagine
  const handleImageClick = (e, imageUrl, author, filmName) => {
    e.stopPropagation() // Previene il click sul card
    setEnlargedImage({ url: imageUrl, author, filmName })
  }

  const closeEnlargedImage = () => {
    setEnlargedImage(null)
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
            contentKey="contest.vote.meta.title"
            defaultValue="Vota il Contest Artistico | MOVIEBOLI Festival"
            tag="span"
          />
        </title>
        <meta name="description" content={
          getContent('contest.vote.meta.description', 'Vota la tua opera d\'arte preferita ispirata ai film del MOVIEBOLI Festival')
        } />
        <meta property="og:title" content="Vota il Contest Artistico | MOVIEBOLI Festival" />
        <meta property="og:description" content="Partecipa al contest artistico del festival." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {/* Navbar Festival Standardizzata */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo-movieboli.png"
                  alt="MOVIEBOLI Logo"
                  fill
                  className={`object-contain transition-all duration-300 ${
                    isScrolled ? 'filter brightness-0 invert' : 'filter brightness-0 invert'
                  }`}
                  priority
                />
              </div>
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

      {/* Contenuto principale con sfondo chiaro */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 pt-20">
        {pageLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">MOVIEBOLI Festival 2025</h2>
              <p className="text-sm sm:text-base text-gray-600">
                <EditableText 
                  contentKey="contest.vote.loading"
                  defaultValue="Caricamento contest artistico..."
                  tag="span"
                />
              </p>
            </div>
          </div>
        )}

        {/* Messaggio di ringraziamento */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div 
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Voto salvato con successo!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-movieboli-violaPrincipale/10 via-movieboli-rosaPastello/5 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-violaPrincipale via-movieboli-bordeaux to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
                <EditableText 
                  contentKey="contest.vote.title"
                  defaultValue="Contest Artistico MOVIEBOLI 2025"
                  tag="span"
                />
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                <EditableText 
                  contentKey="contest.vote.subtitle"
                  defaultValue="Vota la tua opera d'arte preferita ispirata ai film. Puoi scegliere una sola opera e il tuo voto contribuirà a determinare il vincitore del contest."
                  tag="span"
                />
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <EditableText 
                      contentKey="contest.vote.single_vote"
                      defaultValue="Un voto per utente"
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
                      contentKey="contest.vote.changeable"
                      defaultValue="Voto modificabile"
                      tag="span"
                    />
                  </span>
                </div>
              </div>
              <Link href="/festival" legacyBehavior passHref>
                <motion.a
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-white font-bold transition-all duration-300 hover:bg-movieboli-violaSecondario"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <EditableText 
                    contentKey="contest.vote.back_to_festival"
                    defaultValue="Torna al Festival"
                    tag="span"
                  />
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sezione Opere d'Arte */}
        <motion.section 
          className="py-20 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {opereArtisti.map((opera, index) => {
                const operaId = `${opera.autore}-${index}`
                const isSelected = selectedOpera === operaId
                
                return (
                  <motion.div
                    key={operaId}
                    className={`group bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'border-movieboli-violaPrincipale shadow-lg shadow-movieboli-violaPrincipale/20' 
                        : 'border-gray-200 hover:border-movieboli-violaPrincipale/50'
                    } ${isSaving ? 'pointer-events-none opacity-70' : ''}`}
                    variants={cardVariants}
                    whileHover={!isSaving ? "hover" : {}}
                    onClick={() => handleOperaSelection(operaId)}
                  >
                    {/* Badge Contest */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-movieboli-violaPrincipale text-white text-xs font-bold px-3 py-1 rounded-full">
                        CONTEST 2025
                      </span>
                    </div>

                    {/* Indicatore di selezione */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-green-500 text-white rounded-full p-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Immagine dell'opera */}
                    <div 
                      className="relative h-64 overflow-hidden cursor-pointer"
                      onClick={(e) => handleImageClick(e, opera.link_photo, opera.autore, opera.nome_film_ispirato)}
                    >
                      <Image
                        src={opera.link_photo}
                        alt={`Opera di ${opera.autore} ispirata a ${opera.nome_film_ispirato}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Icona di ingrandimento */}
                      <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Informazioni dell'opera */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-movieboli-violaPrincipale transition-colors duration-300">
                          {opera.autore}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          <span className="font-medium">Ispirato a:</span> {opera.nome_film_ispirato}
                        </p>
                      </div>

                      {/* Pulsante di voto */}
                      <motion.button
                        className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-green-500 text-white'
                            : 'bg-movieboli-violaPrincipale text-white hover:bg-movieboli-violaSecondario'
                        } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        whileTap={!isSaving ? { scale: 0.95 } : {}}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Salvando...</span>
                          </div>
                        ) : isSelected ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Selezionata</span>
                          </div>
                        ) : (
                          'Vota questa opera'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Informazioni aggiuntive */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <EditableText 
                contentKey="contest.vote.info.title"
                defaultValue="Come funziona il contest"
                tag="span"
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-movieboli-violaPrincipale rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Scegli la tua opera preferita</h3>
                <p className="text-gray-600">Esplora tutte le opere d'arte ispirate ai film e seleziona quella che ti colpisce di più.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-movieboli-violaPrincipale rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Esprimi il tuo voto</h3>
                <p className="text-gray-600">Clicca sull'opera per votarla. Puoi cambiare idea e modificare il tuo voto in qualsiasi momento.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-movieboli-violaPrincipale rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Contribuisci alla vittoria</h3>
                <p className="text-gray-600">Il tuo voto aiuterà a determinare l'opera vincitrice del contest artistico MOVIEBOLI 2025.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal per immagine ingrandita */}
        <AnimatePresence>
          {enlargedImage && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEnlargedImage}
            >
              <motion.div 
                className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Pulsante chiudi */}
                <button 
                  onClick={closeEnlargedImage}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Immagine ingrandita */}
                <div className="relative">
                  <Image
                    src={enlargedImage.url}
                    alt={`Opera di ${enlargedImage.author} ispirata a ${enlargedImage.filmName}`}
                    width={800}
                    height={600}
                    className="object-contain w-full h-auto max-h-[80vh]"
                  />
                  
                  {/* Informazioni dell'opera */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{enlargedImage.author}</h3>
                    <p className="text-gray-300">Ispirato a: {enlargedImage.filmName}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </ProtectedRoute>
  )
}

export default VotaContestArtistico