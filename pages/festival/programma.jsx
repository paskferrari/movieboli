'use client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'

// Import dei dati
import filmUnificatiData from '../../public/json-folders/film_unificati.json'
import ospitiDataRaw from '../../public/images/ospiti/ospiti.json'
import filmData from './film/film.json'

// Crea la mappa dei film PRIMA del componente
const filmDataMap = filmData.reduce((map, film) => {
  map[film.nome] = {
    foto: film.foto,
    bio: film.bio
  }
  return map
}, {})

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
        poster: filmDataMap["Mixed by Erry"]?.foto,
        descrizione: filmDataMap["Mixed by Erry"]?.bio || "Proiezione del film di Sydney Sibilia"
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
        poster: filmDataMap["Fuori"]?.foto,
        descrizione: filmDataMap["Fuori"]?.bio || "Proiezione del film di Mario Martone"
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

  // Component for short film icons with error handling
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
    <>
      <Head>
        <title>Programma Festival | MoviEboli Film Festival 2025</title>
        <meta name="description" content="Programma completo del MoviEboli Film Festival 2025 - 22-24 Agosto. Cortometraggi, ospiti speciali e eventi." />
        <meta name="keywords" content="programma festival, movieboli, eboli, cortometraggi, agosto 2025" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-movieboli-crema/20 via-white to-movieboli-crema/50">
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
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeDay}-${activeCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredEvents(activeDay).length > 0 ? (
                  filteredEvents(activeDay).map((evento, index) => (
                    <motion.div
                      key={`${evento.orario}-${evento.titolo}`}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-movieboli-crema/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Time and Type Badge */}
                        <div className="lg:w-48 p-6 bg-gradient-to-br from-movieboli-crema/30 to-movieboli-crema/10 flex flex-col justify-center">
                          <div className="text-3xl font-bold text-movieboli-nero mb-2">
                            {evento.orario}
                          </div>
                          <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider ${getEventColor(evento.tipo)}`}>
                            {getEventLabel(evento.tipo)}
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
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
                                
                                {evento.luogo && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-movieboli-crema px-2 py-1 rounded text-xs font-bold text-movieboli-nero">
                                      LUOGO
                                    </span>
                                    <span className="text-movieboli-nero font-medium">{evento.luogo}</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Description */}
                              {evento.descrizione && (
                                <p className="text-movieboli-nero/70 mb-4">
                                  {evento.descrizione}
                                </p>
                              )}
                              
                              {/* Guests */}
                              {(evento.ospite || evento.relatori) && (
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="text-sm font-semibold text-movieboli-nero">Ospiti:</span>
                                  <div className="flex items-center gap-2">
                                    {evento.ospite && (
                                      <>
                                        <GuestAvatar nome={evento.ospite} />
                                        <span className="text-sm text-movieboli-nero">{evento.ospite}</span>
                                      </>
                                    )}
                                    {evento.relatori && evento.relatori.map((relatore, idx) => (
                                      <div key={idx} className="flex items-center gap-1">
                                        <GuestAvatar nome={relatore} />
                                        <span className="text-sm text-movieboli-nero">{relatore}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Short Films */}
                              {evento.cortometraggi && (
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-movieboli-nero">Cortometraggi in programma:</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {evento.cortometraggi.map((corto, idx) => (
                                      <div key={idx} className="flex items-center gap-3 p-3 bg-movieboli-crema/20 rounded-lg">
                                        <ShortFilmIcon titolo={corto.titolo} />
                                        <div className="flex-1">
                                          <div className="font-medium text-movieboli-nero text-sm">
                                            {corto.titolo}
                                          </div>
                                          <div className="text-xs text-movieboli-nero/60">
                                            {corto.regista} • {corto.paese} • {corto.durata}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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
                    <div className="w-16 h-16 mx-auto mb-4 bg-movieboli-violaPrincipale/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-movieboli-nero mb-2">
                      Nessun evento trovato
                    </h3>
                    <p className="text-movieboli-nero/60">
                      Non ci sono eventi per questa categoria nel giorno selezionato.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Sezione "Nessun evento" - Versione Professionale */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-movieboli-violaPrincipale/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10h6V6H9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-movieboli-nero mb-2">
              Nessun evento trovato
            </h3>
            <p className="text-movieboli-nero/60">
              Non ci sono eventi per questa categoria nel giorno selezionato.
            </p>
          </motion.div>
        )}

        {/* Download Program Section - Versione Professionale */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-movieboli-nero to-movieboli-bordeaux">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Programma Completo
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Scarica il programma dettagliato del festival in formato PDF
              </p>
              <button className="bg-movieboli-violaPrincipale text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-movieboli-violaPrincipale/90 transition-all duration-300 flex items-center gap-3 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Scarica PDF
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer Festival Standardizzato */}
        <footer className="bg-movieboli-bordeaux text-movieboli-crema">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {/* Info Festival */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/logo-movieboli.png"
                      alt="MOVIEBOLI Logo"
                      fill
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h3 className="font-poppins font-semibold text-2xl text-movieboli-violaPrincipale">
                    MoviEboli
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="font-poppins text-movieboli-crema/95">
                    Date: 22-24 Agosto 2025
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Luogo: Cinema Vittoria, Eboli (SA)
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Organizzato da: MOVIEBOLI Associazione Culturale
                  </p>
                </div>
              </div>

              {/* Contatti */}
              <div>
                <h3 className="font-poppins font-medium text-xl text-movieboli-violaPrincipale mb-6">
                  Contatti
                </h3>
                <div className="space-y-3">
                  <p className="font-poppins text-movieboli-crema/95">
                    Email: info@movieboli.it
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Stampa: stampa@movieboli.it
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Biglietti: Cinema Vittoria Eboli
                  </p>
                </div>
              </div>

              {/* Social e Links */}
              <div>
                <h3 className="font-poppins font-medium text-xl text-movieboli-violaPrincipale mb-6">
                  Seguici
                </h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <a href="https://instagram.com/movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    Instagram
                  </a>
                  <a href="https://facebook.com/movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    Facebook
                  </a>
                </div>
                <div className="space-y-2">
                  <Link href="/festival" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    Festival Home
                  </Link>
                  <Link href="/chi-siamo" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    Chi Siamo
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-movieboli-crema/20 mt-16 pt-8 text-center">
              <p className="font-poppins text-movieboli-crema/80">
                © 2025 MoviEboli Film Festival - MOVIEBOLI Associazione Culturale
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default ProgrammaPage