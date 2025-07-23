'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Image from 'next/image'

const Programma = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDay, setActiveDay] = useState('Mercoledì 13 Agosto')
  const [activeCategory, setActiveCategory] = useState('tutti')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Dati del festival 2025
  const programmaData = {
    "Mercoledì 13 Agosto": [
      {
        orario: "18:00",
        titolo: "Cerimonia di Apertura",
        tipo: "apertura",
        categoria: "evento",
        luogo: "Piazza della Repubblica",
        descrizione: "Cerimonia di apertura ufficiale del MOVIEBOLI Film Festival 2025 con la partecipazione delle autorità locali e ospiti speciali."
      },
      {
        orario: "19:30",
        titolo: "Cocktail di Benvenuto",
        tipo: "aperitivo",
        categoria: "evento",
        luogo: "Terrazza Panoramica",
        descrizione: "Aperitivo di networking con i partecipanti al festival, registi e ospiti speciali."
      },
      {
        orario: "21:00",
        titolo: "Film di Apertura - 'Nuovo Orizzonte'",
        tipo: "film",
        categoria: "proiezione",
        anno: "2024",
        regista: "Marco Bellocchio",
        luogo: "Arena Centrale",
        durata: "118 min",
        descrizione: "Anteprima nazionale del nuovo film di Marco Bellocchio, un'opera che esplora i confini tra realtà e immaginazione."
      }
    ],
    "Giovedì 14 Agosto": [
      {
        orario: "10:00",
        titolo: "Masterclass: La Direzione della Fotografia",
        tipo: "masterclass",
        categoria: "formazione",
        luogo: "Sala Workshop",
        relatore: "Daria D'Antonio",
        descrizione: "Masterclass con la pluripremiata direttrice della fotografia Daria D'Antonio sui segreti dell'illuminazione cinematografica."
      },
      {
        orario: "15:00",
        titolo: "Cortometraggi in concorso - Selezione 1",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Sala Proiezioni A",
        descrizione: "Prima selezione di cortometraggi in concorso internazionale",
        cortometraggi: [
          { titolo: "The Last Light", regista: "Emma Thompson", paese: "Regno Unito", durata: "15 min" },
          { titolo: "Oltre il Silenzio", regista: "Paolo Sorrentino", paese: "Italia", durata: "12 min" },
          { titolo: "Fragments", regista: "Jean-Pierre Jeunet", paese: "Francia", durata: "18 min" },
          { titolo: "Echi del Passato", regista: "Valeria Golino", paese: "Italia", durata: "14 min" },
          { titolo: "The Observer", regista: "Christopher Nolan", paese: "USA", durata: "20 min" }
        ]
      },
      {
        orario: "18:30",
        titolo: "Panel: Il Futuro del Cinema Indipendente",
        tipo: "talk",
        categoria: "formazione",
        luogo: "Auditorium",
        relatori: ["Paolo Sorrentino", "Alice Rohrwacher", "Jonas Carpignano"],
        descrizione: "Discussione con registi di fama internazionale sulle sfide e le opportunità del cinema indipendente nell'era digitale."
      },
      {
        orario: "21:00",
        titolo: "Retrospettiva: Classici Restaurati",
        tipo: "film",
        categoria: "proiezione",
        anno: "1960",
        regista: "Federico Fellini",
        film: "La Dolce Vita",
        luogo: "Arena Centrale",
        durata: "174 min",
        descrizione: "Proiezione speciale della versione restaurata in 4K del capolavoro di Federico Fellini."
      }
    ],
    "Venerdì 15 Agosto": [
      {
        orario: "10:00",
        titolo: "Workshop: Sceneggiatura Innovativa",
        tipo: "workshop",
        categoria: "formazione",
        luogo: "Sala Workshop",
        relatore: "Francesca Archibugi",
        descrizione: "Workshop pratico sulla scrittura di sceneggiature non convenzionali e strutture narrative innovative."
      },
      {
        orario: "15:00",
        titolo: "Cortometraggi in concorso - Selezione 2",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Sala Proiezioni A",
        descrizione: "Seconda selezione di cortometraggi in concorso internazionale",
        cortometraggi: [
          { titolo: "Memories of Tomorrow", regista: "Sofia Coppola", paese: "USA", durata: "17 min" },
          { titolo: "Il Confine dell'Anima", regista: "Matteo Garrone", paese: "Italia", durata: "14 min" },
          { titolo: "Lumière", regista: "Michel Gondry", paese: "Francia", durata: "11 min" },
          { titolo: "Vento del Sud", regista: "Pietro Marcello", paese: "Italia", durata: "19 min" },
          { titolo: "The Silent Room", regista: "Ava DuVernay", paese: "USA", durata: "16 min" }
        ]
      },
      {
        orario: "18:00",
        titolo: "Incontro con l'Autore: Visioni Contemporanee",
        tipo: "incontro",
        categoria: "evento",
        luogo: "Piazza della Repubblica",
        ospite: "Pedro Almodóvar",
        descrizione: "Conversazione con il maestro del cinema spagnolo Pedro Almodóvar sui temi della sua filmografia e le sfide creative contemporanee."
      },
      {
        orario: "21:00",
        titolo: "Anteprima Nazionale",
        tipo: "film",
        categoria: "proiezione",
        anno: "2025",
        regista: "Paolo Sorrentino",
        film: "L'Immensità del Tempo",
        luogo: "Arena Centrale",
        durata: "135 min",
        descrizione: "Anteprima esclusiva del nuovo film di Paolo Sorrentino, con la presenza del regista e del cast principale."
      }
    ],
    "Sabato 16 Agosto": [
      {
        orario: "10:00",
        titolo: "Masterclass: Regia e Visione Artistica",
        tipo: "masterclass",
        categoria: "formazione",
        luogo: "Sala Workshop",
        relatore: "Luca Guadagnino",
        descrizione: "Masterclass con il regista Luca Guadagnino sulla costruzione di un linguaggio visivo personale e la direzione degli attori."
      },
      {
        orario: "14:00",
        titolo: "Focus: Cinema Mediterraneo",
        tipo: "panel",
        categoria: "formazione",
        luogo: "Auditorium",
        relatori: ["Nadine Labaki", "Ferzan Özpetek", "Fatih Akin"],
        descrizione: "Panel dedicato alle nuove voci del cinema mediterraneo e alle tematiche sociali emergenti."
      },
      {
        orario: "17:00",
        titolo: "Cortometraggi in concorso - Selezione 3",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Sala Proiezioni A",
        descrizione: "Terza selezione di cortometraggi in concorso internazionale",
        cortometraggi: [
          { titolo: "The Last Day", regista: "Denis Villeneuve", paese: "Canada", durata: "18 min" },
          { titolo: "Riflessi", regista: "Alice Rohrwacher", paese: "Italia", durata: "15 min" },
          { titolo: "Le Temps Perdu", regista: "Céline Sciamma", paese: "Francia", durata: "13 min" },
          { titolo: "Mare Nostrum", regista: "Jonas Carpignano", paese: "Italia", durata: "21 min" },
          { titolo: "Whispers", regista: "Barry Jenkins", paese: "USA", durata: "16 min" }
        ]
      },
      {
        orario: "21:00",
        titolo: "Serata di Gala: Cinema e Musica",
        tipo: "evento",
        categoria: "evento",
        luogo: "Arena Centrale",
        descrizione: "Serata speciale con proiezioni accompagnate da un'orchestra dal vivo che eseguirà colonne sonore iconiche del cinema italiano e internazionale."
      }
    ],
    "Domenica 17 Agosto": [
      {
        orario: "11:00",
        titolo: "Cinema per Famiglie",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Sala Proiezioni B",
        film: "Avventure Fantastiche",
        anno: "2024",
        regista: "Gabriele Salvatores",
        durata: "95 min",
        descrizione: "Proiezione speciale dedicata alle famiglie con un film di animazione italiano."
      },
      {
        orario: "15:00",
        titolo: "Tavola Rotonda: Cinema e Sostenibilità",
        tipo: "talk",
        categoria: "formazione",
        luogo: "Auditorium",
        relatori: ["Emma Watson", "Leonardo DiCaprio", "Valeria Golino"],
        descrizione: "Discussione sul ruolo del cinema nella sensibilizzazione alle tematiche ambientali e le pratiche sostenibili nell'industria cinematografica."
      },
      {
        orario: "18:00",
        titolo: "Cerimonia di Premiazione",
        tipo: "premiazione",
        categoria: "evento",
        luogo: "Arena Centrale",
        descrizione: "Cerimonia di chiusura con assegnazione dei premi ai migliori cortometraggi e riconoscimenti speciali."
      },
      {
        orario: "20:30",
        titolo: "Film di Chiusura",
        tipo: "film",
        categoria: "proiezione",
        anno: "2025",
        regista: "Nanni Moretti",
        film: "Il Tempo Ritrovato",
        luogo: "Arena Centrale",
        durata: "127 min",
        descrizione: "Proiezione del film di chiusura del festival, seguito da un incontro con il regista Nanni Moretti."
      },
      {
        orario: "23:00",
        titolo: "Festa di Chiusura",
        tipo: "festa",
        categoria: "evento",
        luogo: "Terrazza Panoramica",
        descrizione: "Festa di chiusura del festival con musica dal vivo e celebrazione del cinema indipendente."
      }
    ]
  }

  // Categorie di eventi per il filtro
  const categorie = [
    { id: 'tutti', label: 'Tutti gli eventi' },
    { id: 'proiezione', label: 'Proiezioni' },
    { id: 'formazione', label: 'Masterclass & Talk' },
    { id: 'evento', label: 'Eventi Speciali' }
  ]

  // Icone per i tipi di eventi
  const getEventIcon = (tipo) => {
    const icons = {
      apertura: "🎬",
      film: "🎭",
      cortometraggi: "🎪",
      talk: "💬",
      panel: "👥",
      masterclass: "🎓",
      workshop: "✏️",
      incontro: "🗣️",
      aperitivo: "🥂",
      premiazione: "🏆",
      festa: "🎉",
      evento: "✨"
    }
    return icons[tipo] || "⏰"
  }

  // Colori per i tipi di eventi
  const getEventColor = (tipo) => {
    const colors = {
      apertura: "bg-movieboli-violaPrincipale",
      film: "bg-movieboli-bordeaux",
      cortometraggi: "bg-movieboli-violaScuro",
      talk: "bg-movieboli-rosaSfondo",
      panel: "bg-movieboli-rosaSfondo",
      masterclass: "bg-movieboli-violaChiaro",
      workshop: "bg-movieboli-violaChiaro",
      incontro: "bg-movieboli-bordeaux",
      aperitivo: "bg-movieboli-crema",
      premiazione: "bg-movieboli-violaPrincipale",
      festa: "bg-movieboli-violaScuro",
      evento: "bg-movieboli-bordeaux"
    }
    return colors[tipo] || "bg-gray-400"
  }

  // Filtra gli eventi in base alla categoria selezionata
  const filteredEvents = (day) => {
    if (activeCategory === 'tutti') {
      return programmaData[day]
    }
    return programmaData[day].filter(evento => evento.categoria === activeCategory)
  }

  return (
    <>
      <Head>
        <title>Programma Festival 2025 | MOVIEBOLI Film Festival</title>
        <meta name="description" content="Programma completo del MOVIEBOLI Film Festival 2025: cinque giorni di cinema, cortometraggi, masterclass e eventi speciali dal 13 al 17 agosto." />
        <meta name="keywords" content="programma festival, movieboli 2025, cortometraggi, cinema eboli, eventi" />
        <meta property="og:title" content="Programma Festival 2025 - MOVIEBOLI" />
        <meta property="og:description" content="Scopri il programma completo del festival con proiezioni, talk e premiazioni." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white font-poppins">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-movieboli-nero to-movieboli-nero/90 text-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-bordeaux">
                  Programma
                </span>
                <span className="block text-white">Festival 2025</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-bordeaux mx-auto mb-8"></div>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                MOVIEBOLI Film Festival • 13-17 Agosto 2025 • Eboli
              </p>
            </motion.div>

            {/* Decorative elements */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 0.15 : 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute top-32 right-10 hidden lg:block"
            >
              <div className="relative w-64 h-64">
                <Image
                  src="/images/bacio.png"
                  alt="Immagine decorativa bacio"
                  fill
                  sizes="256px"
                  className="object-contain" // Rimosso il filtro brightness-0 invert
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Days Tabs */}
        <section className="py-8 bg-movieboli-nero/5 sticky top-0 z-30 backdrop-blur-md border-b border-movieboli-violaPrincipale/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-nowrap overflow-x-auto hide-scrollbar pb-2 gap-2 md:gap-4">
              {Object.keys(programmaData).map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 font-semibold ${activeDay === day 
                    ? 'bg-movieboli-violaPrincipale text-white shadow-lg shadow-movieboli-violaPrincipale/20 scale-105' 
                    : 'bg-white text-movieboli-nero border border-gray-200 hover:border-movieboli-violaPrincipale/30'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              {categorie.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${activeCategory === cat.id 
                    ? 'bg-movieboli-nero text-white font-medium' 
                    : 'bg-gray-100 text-movieboli-nero/70 hover:bg-gray-200'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Program Content */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay + activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-0 md:left-[9.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-movieboli-violaPrincipale via-movieboli-bordeaux to-movieboli-violaScuro hidden md:block"></div>
                  
                  {/* Events */}
                  <div className="space-y-8">
                    {filteredEvents(activeDay).length > 0 ? (
                      filteredEvents(activeDay).map((evento, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col md:flex-row gap-6 relative"
                        >
                          {/* Time */}
                          <div className="md:w-40 flex md:justify-end items-start">
                            <div className="bg-white md:pr-6 py-2 relative z-10">
                              <div className="text-xl font-bold text-movieboli-violaPrincipale">
                                {evento.orario}
                              </div>
                              <div className="text-sm text-movieboli-nero/60 capitalize">
                                {evento.luogo}
                              </div>
                            </div>
                          </div>
                          
                          {/* Circle connector */}
                          <div className={`absolute left-0 md:left-[9.5rem] top-3 w-4 h-4 rounded-full border-2 border-white z-20 hidden md:block ${getEventColor(evento.tipo)}`}>
                          </div>
                          
                          {/* Event Card */}
                          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="flex flex-col h-full">
                              {/* Card Header */}
                              <div className="p-6 pb-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getEventColor(evento.tipo)} text-white`}>
                                    <span className="text-lg">{getEventIcon(evento.tipo)}</span>
                                  </div>
                                  <div>
                                    <span className="inline-block px-3 py-1 bg-movieboli-nero/5 text-movieboli-nero/70 text-xs font-medium rounded-full">
                                      {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                                    </span>
                                  </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-movieboli-nero mb-2">
                                  {evento.titolo}
                                  {evento.anno && (
                                    <span className="text-movieboli-nero/60 font-normal ml-2">({evento.anno})</span>
                                  )}
                                </h3>
                                
                                {/* Event Details */}
                                {evento.regista && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Regia:</span> {evento.regista}
                                  </p>
                                )}
                                
                                {evento.film && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Film:</span> {evento.film}
                                  </p>
                                )}
                                
                                {evento.durata && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Durata:</span> {evento.durata}
                                  </p>
                                )}
                                
                                {evento.relatore && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Condotto da:</span> {evento.relatore}
                                  </p>
                                )}
                                
                                {evento.relatori && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Ospiti:</span> {evento.relatori.join(', ')}
                                  </p>
                                )}
                                
                                {evento.ospite && (
                                  <p className="text-movieboli-nero/70 text-sm mb-1">
                                    <span className="font-medium">Ospite:</span> {evento.ospite}
                                  </p>
                                )}
                                
                                {evento.descrizione && (
                                  <p className="text-movieboli-nero/80 mt-3 leading-relaxed">
                                    {evento.descrizione}
                                  </p>
                                )}
                              </div>
                              
                              {/* Cortometraggi List */}
                              {evento.cortometraggi && (
                                <div className="mt-auto p-6 pt-0">
                                  <div className="pt-4 border-t border-gray-100">
                                    <h4 className="font-semibold text-movieboli-nero mb-3 text-sm uppercase tracking-wide">
                                      Cortometraggi in programma
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {evento.cortometraggi.map((corto, cortoIndex) => (
                                        <div key={cortoIndex} className="flex items-start gap-3 p-3 bg-movieboli-nero/5 rounded-lg">
                                          <div className="w-2 h-2 bg-movieboli-violaPrincipale rounded-full mt-2 flex-shrink-0"></div>
                                          <div className="flex-1">
                                            <div className="font-medium text-movieboli-nero">
                                              {corto.titolo}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 text-xs text-movieboli-nero/60 mt-1">
                                              {corto.regista && <span>{corto.regista}</span>}
                                              {corto.paese && <span>{corto.paese}</span>}
                                              {corto.durata && <span>{corto.durata}</span>}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Action Button */}
                              <div className="p-6 pt-0 mt-auto">
                                <button className="mt-4 inline-flex items-center text-sm font-medium text-movieboli-violaPrincipale hover:text-movieboli-bordeaux transition-colors">
                                  <span>Aggiungi al calendario</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-movieboli-nero mb-2">Nessun evento trovato</h3>
                        <p className="text-movieboli-nero/70">Nessun evento corrisponde ai filtri selezionati.</p>
                        <button 
                          onClick={() => setActiveCategory('tutti')} 
                          className="mt-4 px-4 py-2 bg-movieboli-violaPrincipale text-white rounded-md hover:bg-movieboli-bordeaux transition-colors"
                        >
                          Mostra tutti gli eventi
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Download Program */}
        <section className="py-16 px-4 bg-movieboli-nero/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-movieboli-nero mb-6">
                Scarica il Programma Completo
              </h2>
              <p className="text-movieboli-nero/70 mb-8 max-w-2xl mx-auto">
                Porta sempre con te il programma completo del MOVIEBOLI Film Festival 2025. 
                Scarica la versione PDF per consultarlo anche offline.
              </p>
              <a 
                href="/MOVIEBOLI 70X100 programma stampa.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-movieboli-violaPrincipale text-white font-medium py-3 px-6 rounded-lg hover:bg-movieboli-bordeaux transition-colors shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Scarica PDF
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-32 h-0.5 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-bordeaux mx-auto mb-6"></div>
              <p className="text-sm text-movieboli-nero/60 italic">
                * Il programma potrebbe subire variazioni. Controlla regolarmente per aggiornamenti.
              </p>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  )
}

export default Programma