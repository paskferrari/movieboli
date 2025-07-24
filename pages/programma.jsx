'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Image from 'next/image'

const Programma = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDay, setActiveDay] = useState('Giovedì 22 Agosto')
  const [activeCategory, setActiveCategory] = useState('tutti')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Dati del festival aggiornati per le nuove date 22-23-24 agosto
  const programmaData = {
    "Giovedì 22 Agosto": [
      {
        orario: "18:00",
        titolo: "Cerimonia di Apertura",
        tipo: "apertura",
        categoria: "evento",
        luogo: "Cinema Vittoria",
        descrizione: "Cerimonia di apertura ufficiale del MOVIEBOLI Film Festival 2025 con la partecipazione delle autorità locali e ospiti speciali."
      },
      {
        orario: "19:30",
        titolo: "Cocktail di Benvenuto",
        tipo: "aperitivo",
        categoria: "evento",
        luogo: "Foyer Cinema Vittoria",
        descrizione: "Aperitivo di networking con i partecipanti al festival, registi e ospiti speciali."
      },
      {
        orario: "21:00",
        titolo: "Cortometraggi in concorso - Selezione 1",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Sala Principale",
        descrizione: "Prima selezione di cortometraggi in concorso internazionale",
        cortometraggi: [
          { titolo: "Ya Hanouni", regista: "Lyna Tadount, Sofian Chouaib", paese: "Francia/Algeria", durata: "15 min" },
          { titolo: "Place under the sun", regista: "Vlad Bolgarin", paese: "Moldavia", durata: "20 min" },
          { titolo: "Jus d'orange", regista: "Alexandre Athané", paese: "Francia", durata: "13:45 min" },
          { titolo: "Appuntamento a Mezzogiorno", regista: "Antonio Passaro", paese: "Italia", durata: "14 min" }
        ]
      }
    ],
    "Venerdì 23 Agosto": [
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
        titolo: "Workshop: Sceneggiatura Innovativa",
        tipo: "workshop",
        categoria: "formazione",
        luogo: "Sala Workshop",
        relatore: "Francesca Archibugi",
        descrizione: "Workshop pratico sulla scrittura di sceneggiature non convenzionali e strutture narrative innovative."
      },
      {
        orario: "18:30",
        titolo: "Panel: Il Futuro del Cinema Indipendente",
        tipo: "talk",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        relatori: ["Paolo Sorrentino", "Alice Rohrwacher", "Jonas Carpignano"],
        descrizione: "Discussione con registi di fama internazionale sulle sfide e le opportunità del cinema indipendente nell'era digitale."
      },
      {
        orario: "21:00",
        titolo: "Cortometraggi in concorso - Selezione 2",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Sala Principale",
        descrizione: "Seconda selezione di cortometraggi in concorso internazionale",
        cortometraggi: [
          { titolo: "Dieci Secondi", regista: "Alexey Evstigneev", paese: "Russia", durata: "12:10 min" },
          { titolo: "Sharing is Caring", regista: "TBD", paese: "Internazionale", durata: "15 min" },
          { titolo: "The Rock Tensions", regista: "TBD", paese: "Internazionale", durata: "18 min" },
          { titolo: "Fathers Letters", regista: "TBD", paese: "Internazionale", durata: "16 min" }
        ]
      }
    ],
    "Sabato 24 Agosto": [
      {
        orario: "11:00",
        titolo: "Focus: Cinema Mediterraneo",
        tipo: "panel",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        relatori: ["Nadine Labaki", "Ferzan Özpetek", "Fatih Akin"],
        descrizione: "Panel dedicato alle nuove voci del cinema mediterraneo e alle tematiche sociali emergenti."
      },
      {
        orario: "15:00",
        titolo: "Tavola Rotonda: Cinema e Sostenibilità",
        tipo: "talk",
        categoria: "formazione",
        luogo: "Cinema Vittoria",
        relatori: ["Emma Watson", "Leonardo DiCaprio", "Valeria Golino"],
        descrizione: "Discussione sul ruolo del cinema nella sensibilizzazione alle tematiche ambientali e le pratiche sostenibili nell'industria cinematografica."
      },
      {
        orario: "18:00",
        titolo: "Cerimonia di Premiazione",
        tipo: "premiazione",
        categoria: "evento",
        luogo: "Cinema Vittoria",
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
        luogo: "Cinema Vittoria",
        durata: "127 min",
        descrizione: "Proiezione del film di chiusura del festival, seguito da un incontro con il regista Nanni Moretti."
      },
      {
        orario: "23:00",
        titolo: "Festa di Chiusura",
        tipo: "festa",
        categoria: "evento",
        luogo: "Foyer Cinema Vittoria",
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
        <meta name="description" content="Programma completo del MOVIEBOLI Film Festival 2025: tre giorni di cinema, cortometraggi, masterclass e eventi speciali dal 22 al 24 agosto." />
        <meta name="keywords" content="programma festival, movieboli 2025, cortometraggi, cinema eboli, eventi" />
        <meta property="og:title" content="Programma Festival 2025 - MOVIEBOLI" />
        <meta property="og:description" content="Scopri il programma completo del festival con proiezioni, talk e premiazioni." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white font-poppins">
        <Navbar />
        
        {/* Hero Section con background migliorato */}
        <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-movieboli-nero via-movieboli-nero/95 to-movieboli-bordeaux/80 text-white overflow-hidden">
          {/* Background con pistola.png */}
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/images/pistola.png"
              alt="Background decorativo"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-movieboli-nero/90 via-movieboli-nero/85 to-movieboli-bordeaux/70"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-crema">
                  Programma
                </span>
                <span className="block text-white mt-2">Festival 2025</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-bordeaux mx-auto mb-8"></div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                MOVIEBOLI Film Festival • 22-23-24 Agosto 2025 • Cinema Vittoria, Eboli
              </p>
            </motion.div>

            {/* Decorative elements migliorati */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 0.15 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="absolute top-20 right-10 hidden lg:block"
            >
              <div className="relative w-80 h-80">
                <Image
                  src="/leoni.png"
                  alt="Leoni decorativi"
                  fill
                  sizes="320px"
                  className="object-contain filter brightness-110 sepia-[0.2]"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 0.12 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute bottom-10 left-10 hidden lg:block"
            >
              <div className="relative w-64 h-64">
                <Image
                  src="/images/bacio.png"
                  alt="Bacio decorativo"
                  fill
                  sizes="256px"
                  className="object-contain filter brightness-110 sepia-[0.3]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Days Tabs con ottimizzazioni mobile complete */}
        <section className="py-4 md:py-6 bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-movieboli-violaPrincipale/20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex overflow-x-auto hide-scrollbar pb-2 gap-2 md:gap-3 justify-start md:justify-center">
              {Object.keys(programmaData).map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl whitespace-nowrap transition-all duration-300 font-semibold shadow-sm flex-shrink-0 min-w-fit text-sm md:text-base touch-target ${
                    activeDay === day 
                      ? 'bg-movieboli-violaPrincipale text-white shadow-lg shadow-movieboli-violaPrincipale/30 scale-105' 
                      : 'bg-white text-movieboli-nero border border-gray-200 hover:border-movieboli-violaPrincipale/40 hover:shadow-md'
                  }`}
                >
                  <span className="block md:hidden">
                    {day.split(' ')[1]} {day.split(' ')[2]}
                  </span>
                  <span className="hidden md:block">
                    {day}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filters con spaziatura migliorata */}
        <section className="py-8 bg-movieboli-crema/30 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categorie.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm transition-all duration-300 font-medium shadow-sm ${
                    activeCategory === cat.id 
                      ? 'bg-movieboli-nero text-white shadow-md' 
                      : 'bg-white text-movieboli-nero/80 hover:bg-movieboli-violaPrincipale/10 hover:text-movieboli-nero border border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Program Content con margini corretti */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-movieboli-crema/20">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay + activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Timeline migliorata */}
                <div className="relative">
                  {/* Vertical line con gradiente migliorato */}
                  <div className="absolute left-0 md:left-[9.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-movieboli-violaPrincipale via-movieboli-bordeaux to-movieboli-violaScuro hidden md:block rounded-full shadow-sm"></div>
                  
                  {/* Events con spaziatura migliorata */}
                  <div className="space-y-12">
                    {filteredEvents(activeDay).length > 0 ? (
                      filteredEvents(activeDay).map((evento, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col md:flex-row gap-8 relative"
                        >
                          {/* Time con margini corretti */}
                          <div className="md:w-40 flex md:justify-end items-start">
                            <div className="bg-white md:pr-8 py-3 relative z-10">
                              <div className="text-2xl font-bold text-movieboli-violaPrincipale">
                                {evento.orario}
                              </div>
                              <div className="text-sm text-movieboli-nero/60 capitalize font-medium mt-1">
                                {evento.luogo}
                              </div>
                            </div>
                          </div>
                          
                          {/* Circle connector migliorato */}
                          <div className={`absolute left-0 md:left-[9.2rem] top-4 w-5 h-5 rounded-full border-3 border-white z-20 hidden md:block shadow-md ${getEventColor(evento.tipo)}`}>
                          </div>
                          
                          {/* Event Card con margini e padding migliorati */}
                          <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

        {/* Download Program con background migliorato */}
        <section className="py-20 px-4 bg-gradient-to-br from-movieboli-nero/5 via-movieboli-crema/30 to-movieboli-violaPrincipale/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-movieboli-nero mb-8">
                Scarica il Programma Completo
              </h2>
              <p className="text-movieboli-nero/70 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Porta sempre con te il programma completo del MOVIEBOLI Film Festival 2025. 
                Scarica la versione PDF per consultarlo anche offline.
              </p>
              <a 
                href="/MOVIEBOLI 70X100 programma stampa.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-movieboli-violaPrincipale text-white font-semibold py-4 px-8 rounded-xl hover:bg-movieboli-bordeaux transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Scarica PDF
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer Note con margini corretti */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-32 h-0.5 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-bordeaux mx-auto mb-8"></div>
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