'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Programma = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Dati del festival 2023
  const programmaData = {
    "Venerdì 11 Agosto": [
      {
        orario: "19:00",
        titolo: "Apertura festival e saluti",
        tipo: "apertura",
        descrizione: "Cerimonia di apertura ufficiale del MOVIEBOLI Film Festival 2023"
      },
      {
        orario: "20:00",
        titolo: "Marcel The Shell",
        tipo: "film",
        anno: "2021",
        regista: "Dean Fleischer Camp",
        descrizione: "Proiezione film di apertura"
      },
      {
        orario: "22:00",
        titolo: "Cortometraggi in concorso - Selezione 1",
        tipo: "cortometraggi",
        descrizione: "Prima selezione di cortometraggi in concorso",
        cortometraggi: [
          { titolo: "Laika & Nemo", festival: "Lago Film Fest" },
          { titolo: "Amore Cane", festival: "Piano di Sorrento Film Festival" },
          { titolo: "Gianfranco il Re", festival: "Festival del Cinema Ibrido" },
          { titolo: "Morning Commute", festival: "Corto Dorico" },
          { titolo: "Il Prescelto", festival: "Corto Lover" },
          { titolo: "Basmati", festival: "Short Out" },
          { titolo: "La Grande Onda", festival: "Periferie Creative" }
        ]
      }
    ],
    "Sabato 12 Agosto": [
      {
        orario: "18:00",
        titolo: "La distribuzione dei corti in Italia",
        tipo: "talk",
        descrizione: "Talk con ospiti del settore cinematografico"
      },
      {
        orario: "19:30",
        titolo: "Aperitivo musicale con DJ set",
        tipo: "aperitivo",
        descrizione: "Momento di convivialità con musica dal vivo"
      },
      {
        orario: "21:00",
        titolo: "Cortometraggi in concorso - Selezione 2",
        tipo: "cortometraggi",
        descrizione: "Seconda selezione di cortometraggi in concorso",
        cortometraggi: [
          { titolo: "La Grande Onda" },
          { titolo: "Sottopelle" },
          { titolo: "La casa di Ester" },
          { titolo: "Sulle Nuvole" },
          { titolo: "Big" }
        ]
      },
      {
        orario: "23:00",
        titolo: "Aftersun",
        tipo: "film",
        anno: "2022",
        regista: "Charlotte Wells",
        descrizione: "Proiezione serale"
      }
    ],
    "Domenica 13 Agosto": [
      {
        orario: "18:30",
        titolo: "Cerimonia di premiazione",
        tipo: "premiazione",
        descrizione: "Assegnazione dei premi ai migliori cortometraggi"
      },
      {
        orario: "19:30",
        titolo: "Proiezione vincitore giuria",
        tipo: "film",
        descrizione: "Cortometraggio vincitore del premio della giuria"
      },
      {
        orario: "20:00",
        titolo: "Proiezione vincitore pubblico",
        tipo: "film",
        descrizione: "Cortometraggio vincitore del premio del pubblico"
      },
      {
        orario: "21:00",
        titolo: "Le Pupille",
        tipo: "film",
        anno: "2022",
        regista: "Alice Rohrwacher",
        descrizione: "Film di chiusura del festival"
      }
    ]
  }

  const getEventIcon = (tipo) => {
    const icons = {
      apertura: "🎬",
      film: "🎭",
      cortometraggi: "🎪",
      talk: "💬",
      aperitivo: "🥂",
      premiazione: "🏆"
    }
    return icons[tipo] || "⏰"
  }

  return (
    <>
      <Head>
        <title>Programma Festival 2023 | MOVIEBOLI Film Festival</title>
        <meta name="description" content="Programma completo del MOVIEBOLI Film Festival 2023: tre giorni di cinema, cortometraggi e eventi speciali dall'11 al 13 agosto." />
        <meta name="keywords" content="programma festival, movieboli 2023, cortometraggi, cinema eboli, eventi" />
        <meta property="og:title" content="Programma Festival 2023 - MOVIEBOLI" />
        <meta property="og:description" content="Scopri il programma completo del festival con proiezioni, talk e premiazioni." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white font-['Poppins']">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#191f1a] mb-6">
                Programma Festival 2023
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#f7bbc6] to-[#7968fa] mx-auto mb-8"></div>
              <p className="text-xl text-[#1d1d1d]/80 max-w-2xl mx-auto leading-relaxed">
                MOVIEBOLI Film Festival • 11-13 Agosto 2023 • Eboli, Piazza della Repubblica
              </p>
            </motion.div>
          </div>
        </section>

        {/* Program Content */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            {Object.entries(programmaData).map(([day, events], dayIndex) => (
              <motion.div 
                key={day}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
                className="mb-16"
              >
                {/* Day Header */}
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#191f1a] mb-4">
                    {day}
                  </h2>
                  <div className="w-16 h-0.5 bg-[#f7bbc6]"></div>
                </div>
                
                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {events.map((evento, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                      transition={{ duration: 0.6, delay: (dayIndex * 0.2) + (index * 0.1) }}
                      className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Event Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-[#f7bbc6]/10 rounded-full">
                          <span className="text-xl">{getEventIcon(evento.tipo)}</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-[#7968fa]">
                            {evento.orario}
                          </div>
                          <div className="text-sm text-[#1d1d1d]/60 capitalize">
                            {evento.tipo}
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Title */}
                      <h3 className="text-xl font-semibold text-[#191f1a] mb-3">
                        {evento.titolo}
                        {evento.anno && (
                          <span className="text-[#1d1d1d]/60 font-normal"> ({evento.anno})</span>
                        )}
                      </h3>
                      
                      {/* Event Details */}
                      {evento.regista && (
                        <p className="text-[#1d1d1d]/70 mb-2">
                          <span className="font-medium">Regia:</span> {evento.regista}
                        </p>
                      )}
                      
                      {evento.descrizione && (
                        <p className="text-[#1d1d1d]/70 mb-4 leading-relaxed">
                          {evento.descrizione}
                        </p>
                      )}
                      
                      {/* Cortometraggi List */}
                      {evento.cortometraggi && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-[#191f1a] mb-3 text-sm uppercase tracking-wide">
                            Cortometraggi in programma
                          </h4>
                          <div className="space-y-2">
                            {evento.cortometraggi.map((corto, cortoIndex) => (
                              <div key={cortoIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                                <div className="w-2 h-2 bg-[#7968fa] rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="font-medium text-[#191f1a] text-sm">
                                    {corto.titolo}
                                  </div>
                                  {corto.festival && (
                                    <div className="text-xs text-[#1d1d1d]/60 mt-1">
                                      {corto.festival}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="w-32 h-0.5 bg-gradient-to-r from-[#f7bbc6] to-[#7968fa] mx-auto mb-6"></div>
              <p className="text-sm text-[#1d1d1d]/60 italic">
                * Programma soggetto a variazioni
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