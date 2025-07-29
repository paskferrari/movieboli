'use client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'
import FestivalFooter from '../components/festival/FestivalFooter'

// Import dei dati
import filmUnificatiData from '../public/json-folders/film_unificati.json'
import ospitiDataRaw from '../public/images/ospiti/ospiti.json'

const ProgrammaPage = () => {
  const [activeDay, setActiveDay] = useState('Giovedì 22 Agosto')
  const [activeCategory, setActiveCategory] = useState('tutti')
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Create data objects for short films and guests with error handling
  const cortometraggiData = filmUnificatiData?.reduce((acc, film) => {
    if (film?.titolo) {
      acc[film.titolo.toUpperCase().trim()] = film.immagine
    }
    return acc
  }, {}) || {}

  const ospitiData = ospitiDataRaw?.reduce((acc, ospite) => {
    if (ospite?.nome) {
      acc[ospite.nome] = ospite.foto
    }
    return acc
  }, {}) || {}

  // Initialize visibility and scroll handlers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(true)
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Festival data updated for new dates August 22-23-24
  const programmaData = {
    "Giovedì 22 Agosto": [
      {
        orario: "20:00",
        titolo: "Proiezione Cortometraggi",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Cinema Vittoria",
        descrizione: "Proiezione di cortometraggi con interviste ai registi (5 minuti ciascuna)",
        cortometraggi: [
          { titolo: "DIECI SECONDI", regista: "Roberta Palmieri", paese: "Italia", durata: "11:40 min" },
          { titolo: "PLACE UNDER THE SUN", regista: "Vlad Bolgarin", paese: "Moldavia", durata: "20:00 min" },
          { titolo: "YA HANOUNI", regista: "Lyna Tadount", paese: "Francia/Algeria", durata: "3:00 min" },
          { titolo: "APPUNTAMENTO A MEZZOGIORNO", regista: "Antonio Passaro", paese: "Italia", durata: "14:00 min" }
        ]
      },
      {
        orario: "21:00",
        titolo: "Intervista Ospiti",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        relatori: ["Emanuele Palumbo", "Giuseppe Arena", "Luigi D'Oriano"],
        descrizione: "Incontro con gli ospiti del festival"
      },
      {
        orario: "21:30",
        titolo: "Mixed by Erry",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Cinema Vittoria",
        regista: "Sydney Sibilia",
        film: "Mixed by Erry",
        durata: "110 min",
        descrizione: "Proiezione del film di Sydney Sibilia"
      }
    ],
    "Venerdì 23 Agosto": [
      {
        orario: "20:00",
        titolo: "Proiezione Cortometraggi",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Cinema Vittoria",
        descrizione: "Proiezione di cortometraggi con interviste ai registi (5 minuti ciascuna)",
        cortometraggi: [
          { titolo: "JUS D'ORANGE", regista: "Alexandre Athané", paese: "Francia", durata: "13:45 min" },
          { titolo: "SHARING IS CARING", regista: "Vincenzo Mauro", paese: "Italia", durata: "15:00 min" },
          { titolo: "FATHER'S LETTERS", regista: "Alexey Evstigneev", paese: "Russia", durata: "12:10 min" },
          { titolo: "ROCK TENSIONS", regista: "Markus Lehtokumpu", paese: "Finlandia", durata: "4:03 min" }
        ]
      },
      {
        orario: "21:00",
        titolo: "Intervista con Mario Martone",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        ospite: "Mario Martone",
        descrizione: "Incontro esclusivo con il regista Mario Martone"
      },
      {
        orario: "21:30",
        titolo: "Fuori",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Cinema Vittoria",
        regista: "Mario Martone",
        film: "Fuori",
        durata: "110 min",
        descrizione: "Proiezione del film di Mario Martone"
      }
    ],
    "Sabato 24 Agosto": [
      {
        orario: "20:15",
        titolo: "Premiazione Cortometraggi Vincitori",
        tipo: "premiazione",
        categoria: "evento",
        luogo: "Cinema Vittoria",
        descrizione: "Cerimonia di premiazione dei cortometraggi vincitori del festival"
      },
      {
        orario: "21:00",
        titolo: "Intervista con Alessandro Rak",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        ospite: "Alessandro Rak",
        descrizione: "Incontro esclusivo con il regista e animatore Alessandro Rak"
      },
      {
        orario: "21:30",
        titolo: "Momento di Musica dal Vivo",
        tipo: "evento",
        categoria: "evento",
        luogo: "Cinema Vittoria",
        descrizione: "Momento musicale per celebrare le colonne sonore cinematografiche"
      },
      {
        orario: "21:45",
        titolo: "L'Arte della Felicità",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Cinema Vittoria",
        regista: "Alessandro Rak",
        film: "L'Arte della Felicità",
        durata: "105 min",
        descrizione: "Proiezione del film di Alessandro Rak"
      }
    ]
  }

  // Event categories for filtering
  const categorie = [
    { id: 'tutti', label: 'Tutti gli eventi' },
    { id: 'proiezione', label: 'Proiezioni' },
    { id: 'formazione', label: 'Masterclass & Talk' },
    { id: 'evento', label: 'Eventi Speciali' }
  ]

  // Consistent colors for event types with error handling
  const getEventColor = (tipo) => {
    if (!tipo) return "bg-movieboli-violaPrincipale"

    const colors = {
      apertura: "bg-movieboli-violaPrincipale",
      film: "bg-movieboli-bordeaux",
      cortometraggi: "bg-movieboli-violaScuro",
      talk: "bg-movieboli-violaPrincipale",
      panel: "bg-movieboli-violaPrincipale",
      masterclass: "bg-movieboli-bordeaux",
      workshop: "bg-movieboli-bordeaux",
      incontro: "bg-movieboli-violaPrincipale",
      aperitivo: "bg-movieboli-bordeaux",
      premiazione: "bg-movieboli-violaScuro",
      festa: "bg-movieboli-violaScuro",
      evento: "bg-movieboli-bordeaux"
    }
    return colors[tipo] || "bg-movieboli-violaPrincipale"
  }

  // Component for circular guest icons with error handling
  const GuestAvatar = ({ nome }) => {
    if (!nome) return null
    const foto = ospitiData[nome]
    if (!foto) return null
    
    return (
      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
        <Image
          src={foto}
          alt={nome}
          fill
          sizes="32px"
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/default-avatar.jpg'
          }}
        />
      </div>
    )
  }

  // Filter events based on selected category with error handling
  const filteredEvents = (day) => {
    if (!programmaData[day]) return []
    if (activeCategory === 'tutti') {
      return programmaData[day]
    }
    return programmaData[day].filter(evento => evento?.categoria === activeCategory)
  }

  // Get event label with error handling
  const getEventLabel = (tipo) => {
    if (!tipo) return "EVENTO"

    const labels = {
      apertura: "APERTURA",
      film: "FILM",
      cortometraggi: "CORTI",
      talk: "TALK",
      panel: "PANEL",
      masterclass: "MASTER",
      workshop: "WORKSHOP",
      incontro: "INCONTRO",
      aperitivo: "APERITIVO",
      premiazione: "PREMI",
      festa: "FESTA",
      evento: "EVENTO"
    }
    return labels[tipo] || "EVENTO"
  }

  // Component for short film labels with error handling - now uses images
  const ShortFilmLabel = ({ titolo }) => {
    if (!titolo) return null
    
    const immagine = cortometraggiData[titolo.toUpperCase()]
    
    if (immagine) {
      // Use image if available
      return (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md flex-shrink-0">
          <Image
            src={immagine}
            alt={titolo}
            fill
            sizes="64px"
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/default-film.jpg'
            }}
          />
        </div>
      )
    }
    
    // Fallback to text label if no image
    return (
      <div className="px-2 py-1 bg-movieboli-violaPrincipale rounded-md flex-shrink-0">
        <span className="text-white text-xs font-bold tracking-wider">CORTO</span>
      </div>
    )
  }

  // Component for circular short film icons with error handling - made larger
  const ShortFilmIcon = ({ titolo }) => {
    if (!titolo) return null
    const immagine = cortometraggiData[titolo.toUpperCase()]
    
    if (!immagine) {
      return (
        <div className="w-10 h-10 bg-movieboli-violaPrincipale rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </div>
      )
    }
    
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
        <Image
          src={immagine}
          alt={titolo}
          fill
          sizes="40px"
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/default-film.jpg'
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <ErrorBoundary>
        <Head>
          <title>Programma Festival 2025 - MOVIEBOLI</title>
          <meta name="description" content="Programma completo del MOVIEBOLI Film Festival 2025. Tre giorni di cinema, cortometraggi e ospiti speciali dal 22 al 24 agosto." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="Programma Festival 2025 - MOVIEBOLI" />
          <meta property="og:description" content="Programma completo del MOVIEBOLI Film Festival 2025. Tre giorni di cinema, cortometraggi e ospiti speciali dal 22 al 24 agosto." />
          <meta property="og:image" content="/images/og-programma.jpg" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-movieboli-crema/20 via-white to-movieboli-crema/50">
          {/* Fixed Navbar */}
          <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-movieboli-violaPrincipale rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-movieboli-nero font-bold text-xl">MOVIEBOLI</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                    Home
                  </Link>
                  <Link href="/programma" className="text-movieboli-violaPrincipale font-semibold">
                    Programma
                  </Link>
                  <Link href="/cortometraggi" className="text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                    Cortometraggi
                  </Link>
                  <Link href="/ospiti" className="text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                    Ospiti
                  </Link>
                  <Link href="/info" className="text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                    Info
                  </Link>
                </div>

                {/* Mobile menu button */}
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`bg-movieboli-nero block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`}></span>
                    <span className={`bg-movieboli-nero block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                    <span className={`bg-movieboli-nero block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="md:hidden bg-white border-t border-movieboli-crema"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 py-4 space-y-4">
                    <Link href="/" className="block text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                      Home
                    </Link>
                    <Link href="/programma" className="block text-movieboli-violaPrincipale font-semibold">
                      Programma
                    </Link>
                    <Link href="/cortometraggi" className="block text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                      Cortometraggi
                    </Link>
                    <Link href="/ospiti" className="block text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                      Ospiti
                    </Link>
                    <Link href="/info" className="block text-movieboli-nero hover:text-movieboli-violaPrincipale transition-colors">
                      Info
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Hero Section */}
          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-movieboli-nero mb-6">
                  Programma <span className="text-movieboli-violaPrincipale">Festival</span>
                </h1>
                <p className="text-xl text-movieboli-nero/70 max-w-3xl mx-auto">
                  Tre giorni di cinema, cortometraggi e ospiti speciali dal 22 al 24 agosto 2025
                </p>
              </motion.div>

              {/* Day Navigation */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {Object.keys(programmaData).map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeDay === day
                        ? 'bg-movieboli-violaPrincipale text-white shadow-lg transform scale-105'
                        : 'bg-white text-movieboli-nero hover:bg-movieboli-violaPrincipale/10 border border-movieboli-crema'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </motion.div>

              {/* Category Filters */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {categorie.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setActiveCategory(categoria.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === categoria.id
                        ? 'bg-movieboli-bordeaux text-white'
                        : 'bg-white text-movieboli-nero hover:bg-movieboli-bordeaux/10 border border-movieboli-crema'
                    }`}
                  >
                    {categoria.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Events Section */}
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay + activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {filteredEvents(activeDay).length > 0 ? (
                    filteredEvents(activeDay).map((evento, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-movieboli-crema/30"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="p-6 md:p-8">
                          <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Time and Type Badge */}
                            <div className="flex-shrink-0">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="bg-movieboli-violaPrincipale text-white px-4 py-2 rounded-xl font-bold text-lg">
                                  {evento.orario}
                                </div>
                                <div className={`${getEventColor(evento.tipo)} text-white px-3 py-1 rounded-lg`}>
                                  <span className="text-xs font-bold tracking-wider">
                                    {getEventLabel(evento.tipo)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="flex-grow">
                              <h3 className="text-2xl font-bold text-movieboli-nero mb-3">
                                {evento.titolo}
                              </h3>
                              
                              {/* Event Info */}
                              <div className="space-y-2 mb-4">
                                {evento.regista && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                      REGIA
                                    </span>
                                    <span className="text-movieboli-nero font-medium">{evento.regista}</span>
                                  </div>
                                )}
                                
                                {evento.durata && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                      DURATA
                                    </span>
                                    <span className="text-movieboli-nero font-medium">{evento.durata}</span>
                                  </div>
                                )}
                                
                                {evento.film && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                      FILM
                                    </span>
                                    <span className="text-movieboli-nero font-medium">{evento.film}</span>
                                  </div>
                                )}
                                
                                {evento.ospite && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                      OSPITE
                                    </span>
                                    <span className="text-movieboli-nero font-medium">{evento.ospite}</span>
                                    <GuestAvatar nome={evento.ospite} />
                                  </div>
                                )}
                                
                                {evento.relatori && (
                                  <div className="flex items-start gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                      RELATORI
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                      {evento.relatori.map((relatore, idx) => (
                                        <div key={idx} className="flex items-center gap-1">
                                          <span className="text-movieboli-nero font-medium">{relatore}</span>
                                          <GuestAvatar nome={relatore} />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-2">
                                  <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                    LUOGO
                                  </span>
                                  <span className="text-movieboli-nero font-medium">{evento.luogo}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-semibold text-movieboli-nero">
                                    TIPOLOGIA
                                  </span>
                                  <span className="text-movieboli-nero font-medium capitalize">{evento.tipo}</span>
                                </div>
                              </div>

                              {/* Short Films */}
                              {evento.cortometraggi && (
                                <div className="mb-4">
                                  <h4 className="text-lg font-semibold text-movieboli-nero mb-3">Cortometraggi in programma:</h4>
                                  <div className="grid gap-3">
                                    {evento.cortometraggi.map((corto, idx) => (
                                      <div key={idx} className="bg-movieboli-crema/30 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                          <ShortFilmLabel titolo={corto.titolo} />
                                          <div className="flex-grow">
                                            <h5 className="font-bold text-movieboli-nero mb-1">{corto.titolo}</h5>
                                            <div className="text-sm text-movieboli-nero/70 space-y-1">
                                              <div><strong>Regia:</strong> {corto.regista}</div>
                                              <div><strong>Paese:</strong> {corto.paese}</div>
                                              <div><strong>Durata:</strong> {corto.durata}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Description */}
                              <p className="text-movieboli-nero/80 leading-relaxed mb-6">
                                {evento.descrizione}
                              </p>

                              {/* Add to Calendar Button */}
                              <button className="bg-movieboli-violaPrincipale text-white px-6 py-3 rounded-xl font-semibold hover:bg-movieboli-violaPrincipale/90 transition-colors">
                                Aggiungi al calendario
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-6xl mb-4">🎬</div>
                      <h3 className="text-2xl font-bold text-movieboli-nero mb-2">
                        Nessun evento trovato
                      </h3>
                      <p className="text-movieboli-nero/70">
                        Non ci sono eventi per questa categoria nel giorno selezionato.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* Download Program Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-movieboli-violaPrincipale">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Scarica il Programma Completo
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Porta con te tutti i dettagli del festival in formato PDF
                </p>
                <button className="bg-white text-movieboli-violaPrincipale px-8 py-4 rounded-xl font-bold text-lg hover:bg-movieboli-crema transition-colors">
                  📄 Scarica PDF
                </button>
              </motion.div>
            </div>
          </section>

          {/* Footer Unificato Festival */}
          <FestivalFooter />
        </div>  {/* Cambiare da </main> a </div> - CORREZIONE NECESSARIA */}
      </ErrorBoundary>
    </div>
  )
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-movieboli-nero mb-4">
              Qualcosa è andato storto
            </h1>
            <p className="text-movieboli-nero/70 mb-6">
              Ci scusiamo per l'inconveniente. Ricarica la pagina per riprovare.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-movieboli-violaPrincipale text-white px-6 py-3 rounded-xl"
            >
              Ricarica
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ProgrammaPage