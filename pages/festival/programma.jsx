'use client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../../components/Footer'
import Image from 'next/image'
import EditableText from '../../components/ui/EditableText'
import Navbar from '../../components/layout/Navbar'

// Importa i dati reali
import ospiti from '../../public/images/ospiti/ospiti.json'
import filmUnificati from '../../public/json-folders/film_unificati.json'
import filmData from './film/film.json'

// Dati del programma completo aggiornato secondo la nuova timeline
const programmaData = {
  'Giovedì 22 Agosto': [
    {
      orario: '20:00 - 21:00',
      tipo: 'cortometraggi',
      categoria: 'cortometraggi',
      titolo: 'Proiezione Cortometraggi - Prima Serata',
      descrizione: 'Proiezione dei cortometraggi con interviste ai registi (5 minuti ciascuna)',
      luogo: 'Arena di Sant\'Antonio',
      cortometraggi: [
        {
          titolo: 'DIECI SECONDI',
          regista: 'Roberta Palmieri',
          durata: '11:40 minuti',
          immagine: 'https://i.ibb.co/9HPc0DNr/POSTER-DIECI-SECONDI.jpg',
          sinossi: 'Una bambina gioca a nascondino con la sua famiglia, quando esce allo scoperto però niente è come più prima.',
          intervista: true
        },
        {
          titolo: 'PLACE UNDER THE SUN',
          regista: 'Vlad Bolgarin',
          durata: '20:00 minuti',
          immagine: 'https://i.ibb.co/F4vnXKtX/Poster-Place-under-the-sun-EN.png',
          sinossi: 'Un talentuoso pianista e il suo figlio di 8 anni lottano per trovare un posto dove vendere verdura nel più grande mercato della Moldavia nei primi anni 2000.',
          intervista: false
        },
        {
          titolo: 'YA HANOUNI',
          regista: 'Lyna Tadount, Sofian Chouaib',
          durata: '3:00 minuti',
          immagine: 'https://i.ibb.co/vC6YGQv1/Ya-Hanouni.jpg',
          sinossi: 'Mentre la mamma e il papà cercano di addormentare il loro bambino, una competizione tra loro si verifica: chi dei due riuscirà a fargli dire la prima parola?',
          intervista: false
        },
        {
          titolo: 'APPUNTAMENTO A MEZZOGIORNO',
          regista: 'Antonio Passaro',
          durata: '14:00 minuti',
          immagine: 'https://i.ibb.co/JwTHkgND/AAM-DEF-hires.jpg',
          sinossi: 'Maria e Carmine sono una coppia giovane, senza figli...',
          intervista: true
        },
        {
          titolo: 'ROCK TENSIONS',
          regista: 'Markus Lehtokumpu',
          durata: '4:03 minuti',
          immagine: 'https://i.ibb.co/99wFKywB/locandina-2.png',
          sinossi: 'John, Jay e Joe formano una band e iniziano le prove nel garage di John. All\'inizio tutti suonano con calma, ma presto il volume aumenta.',
          intervista: false
        }
      ]
    },
    {
      orario: '21:00 - 21:30',
      tipo: 'ospite',
      categoria: 'ospiti',
      titolo: 'Intervista agli Ospiti',
      descrizione: 'Incontro con personaggi del cinema italiano',
      luogo: 'Arena di Sant\'Antonio',
      ospiti: [
        {
          nome: 'Emanuele Palumbo',
          immagine: 'https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg',
          bio: 'Emanuele Palumbo è un regista e videomaker italiano. I suoi lavori spaziano tra videoclip musicali, cortometraggi e documentari, con uno stile visivo diretto e coinvolgente.'
        },
        {
          nome: 'Giuseppe Arena',
          immagine: 'https://i.ibb.co/WWDttfmZ/GIUSEPPE-ARENA.jpg',
          bio: 'Giuseppe Arena è un compositore e musicista italiano, attivo nel campo delle colonne sonore per cinema e teatro. La sua musica è caratterizzata da atmosfere evocative e da una ricerca timbrica raffinata.'
        },
        {
          nome: 'Luigi D\'Oriano',
          immagine: 'https://i.ibb.co/zyMGPT9/LUIGI-D-ORIANO.jpg',
          bio: 'Luigi D\'Oriano è un montatore cinematografico italiano, con esperienza in film d\'autore e documentari. Ha lavorato con registi emergenti e affermati, curando il ritmo narrativo e l\'equilibrio visivo delle opere a cui ha partecipato.'
        }
      ]
    },
    {
      orario: '21:30 - 23:30',
      tipo: 'film',
      categoria: 'film',
      titolo: 'Mixed by Erry',
      descrizione: 'Negli anni 80, a Napoli, Enrico \'Erry\' Frattasio inizia a creare e a vendere musicassette contraffatte per i suoi amici e clienti, allargando in seguito il giro fino a dar vita a un\'impresa, che si trasforma in un\'avventura internazionale.',
      luogo: 'Arena di Sant\'Antonio',
      regista: 'Sydney Sibilia',
      immagine: 'https://i.ibb.co/FGby12B/image.png'
    }
  ],
  'Venerdì 23 Agosto': [
    {
      orario: '20:00 - 21:00',
      tipo: 'cortometraggi',
      categoria: 'cortometraggi',
      titolo: 'Proiezione Cortometraggi - Seconda Serata',
      descrizione: 'Proiezione dei cortometraggi con interviste ai registi (5 minuti ciascuna)',
      luogo: 'Arena di Sant\'Antonio',
      cortometraggi: [
        {
          titolo: 'JUS D\'ORANGE',
          regista: 'Alexandre Athané',
          durata: '13:45 minuti',
          immagine: 'https://i.ibb.co/4R33c5Ty/JO-Poster-Vertical-60-2x45-2-20230917.png',
          sinossi: 'JUS D\'ORANGE esplora i temi della memoria, della resilienza e del delicato legame tra l\'uomo e la natura, attraverso gli occhi di Toni, un coltivatore di arance.',
          intervista: true
        },
        {
          titolo: 'SHARING IS CARING',
          regista: 'Vincenzo Mauro',
          durata: '15:00 minuti',
          immagine: 'https://i.ibb.co/kg64v029/LOCANDINA-SHARINGISCARIGN.jpg',
          sinossi: 'Marco, un aspirante cryptotrader, noleggia un\'auto e attiva "Sharing is Caring", un servizio che premia gli utenti per la condivisione dei propri dati.',
          intervista: true
        },
        {
          titolo: 'FATHER\'S LETTERS',
          regista: 'Alexey Evstigneev',
          durata: '12:10 minuti',
          immagine: 'https://i.ibb.co/35fWHz1b/FL-Poster-CHOIX-DISTRIB-EN-min.jpg',
          sinossi: 'Nel 1934, il professor Vangengheim viene condannato al Gulag nelle isole Solovki. Fingendo di partire per un grande viaggio di esplorazione, scrive lettere fantasiose a sua figlia Eleonora.',
          intervista: true
        }
      ]
    },
    {
      orario: '21:00 - 21:30',
      tipo: 'ospite',
      categoria: 'ospiti',
      titolo: 'Incontro con Mario Martone',
      descrizione: "Intervista con il regista Mario Martone, regista e sceneggiatore",
      luogo: 'Arena di Sant\'Antonio',
      ospite: 'Mario Martone',
      immagine: 'https://i.ibb.co/VptMKV2X/licensed-image.jpg',
      bio: 'Mario Martone (Napoli, 1959) è uno dei più importanti registi, sceneggiatori e uomini di teatro italiani contemporanei. Esordisce nel mondo artistico fondando gruppi teatrali come Nobili di Rosa e Falso Movimento, e successivamente Teatri Uniti con Toni Servillo. Tra i suoi film più noti: \'L\'amore molesto\', \'Teatro di guerra\', \'Noi credevamo\', \'Il giovane favoloso\', \'Capri-Revolution\' e \'Nostalgia\'.'
    },
    {
      orario: '21:30 - 23:30',
      tipo: 'film',
      categoria: 'film',
      titolo: 'Fuori',
      descrizione: 'È il 1980, una scrittrice finisce in carcere per un gesto inaspettato: il furto di alcuni gioielli. In carcere, conosce altre donne con le quali nascono un\'amicizia e un legame difficili da comprendere dall\'esterno.',
      luogo: 'Arena di Sant\'Antonio',
      regista: 'Mario Martone',
      immagine: 'https://i.ibb.co/9HZ9nmx2/image.png'
    }
  ],
  'Sabato 24 Agosto': [
    {
      orario: '20:15 - 21:00',
      tipo: 'premiazione',
      categoria: 'eventi',
      titolo: 'Premiazione Cortometraggi Vincitori',
      descrizione: 'Cerimonia di premiazione dei cortometraggi vincitori del festival',
      luogo: 'Arena di Sant\'Antonio',
      immagine: '/images/logo-movieboli.png'
    },
    {
      orario: '21:00 - 21:30',
      tipo: 'ospite',
      categoria: 'ospiti',
      titolo: 'Incontro con Alessandro Rak',
      descrizione: "Intervista con il regista di animazione Alessandro Rak",
      luogo: 'Arena di Sant\'Antonio',
      ospite: 'Alessandro Rak',
      immagine: 'https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg',
      bio: 'Alessandro Rak è un regista, sceneggiatore e illustratore italiano, noto per il suo lavoro nell\'animazione. Ha co-diretto film d\'animazione come \'L\'arte della felicità\', \'Gatta Cenerentola\' e \'Yaya e Lennie - The Walking Liberty\', opere che hanno ricevuto numerosi riconoscimenti internazionali.'
    },
    {
      orario: '21:45 - 23:30',
      tipo: 'film',
      categoria: 'film',
      titolo: 'L\'arte della felicità',
      descrizione: 'Due fratelli, due continenti, due vite. Un\'unica anima. Sotto un cielo uggioso, tra premonizioni apocalittiche una Napoli al massimo della decadenza, Sergio, un tassista, riceve una notizia sconvolgente.',
      luogo: 'Arena di Sant\'Antonio',
      regista: 'Alessandro Rak',
      immagine: 'https://i.ibb.co/p6yxsqms/image.png'
    }
  ]
}

// Categorie per i filtri
const categorie = [
  { id: 'tutti', label: 'Tutti gli Eventi', color: 'from-slate-600 to-slate-70'},
  { id: 'cortometraggi', label: 'Cortometraggi', color: 'from-pink-500 to-pink-600' },
  { id: 'ospiti', label: 'Ospiti', color: 'from-yellow-500 to-yellow-600' },
  { id: 'film', label: 'Film', color: 'from-blue-500 to-blue-600' },
  { id: 'eventi', label: 'Eventi Speciali', color: 'from-purple-500 to-purple-600' }
]

export default function Programma() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDay, setActiveDay] = useState('Giovedì 22 Agosto')
  const [activeCategory, setActiveCategory] = useState('tutti')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Funzione per filtrare gli eventi
  const getFilteredEvents = (events) => {
    if (activeCategory === 'tutti') return events
    return events.filter(evento => evento.categoria === activeCategory)
  }

  // Funzione per ottenere il colore di sfondo in base al tipo
  const getEventBackgroundColor = (tipo) => {
    switch (tipo) {
      case 'ospite':
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500'
      case 'cortometraggi':
        return 'bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-500'
      case 'film':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500'
      case 'premiazione':
      case 'apertura':
        return 'bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500'
      default:
        return 'bg-gray-50 border-l-4 border-gray-400'
    }
  }

  // Funzione per ottenere l'icona in base al tipo
  const getEventIcon = (tipo) => {
    switch (tipo) {
      case 'ospite':
        return '🎤'
      case 'cortometraggi':
        return '🎬'
      case 'film':
        return '🎭'
      case 'premiazione':
        return '🏆'
      case 'apertura':
        return '🎪'
      default:
        return '📅'
    }
  }

  return (
    <>
      <Head>
        <title>Programma Festival | MoviEboli Film Festival 2025</title>
        <meta name="description" content="Programma completo del MoviEboli Film Festival 2025 - 22-24 Agosto. Cortometraggi, ospiti speciali e eventi." />
        <meta property="og:title" content="Programma Festival | MoviEboli Film Festival 2025" />
        <meta property="og:description" content="Tre giorni di cinema, cultura e spettacolo nel cuore di Eboli." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {/* Navbar Festival Standardizzata */}
      <Navbar />
      
      {/* Contenuto principale */}
      <main className="min-h-screen bg-gradient-to-br from-movieboli-nero via-slate-900 to-movieboli-nero">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-movieboli-nero/90 via-movieboli-bordeaux/80 to-movieboli-violaPrincipale/90"></div>
       
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto">
                   <div className="absolute inset-0 bg-[url('/images/festival-bg.jpg')] bg-cover bg-center opacity-20"></div>
          <br></br>
          <br></br>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Programma Festival 2025
              </h1>
   
              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-xl">📅</span>
                  <span className="font-medium">22-23-24 Agosto 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-xl">📍</span>
                  <span className="font-medium">Arena di Sant'Antonio, Eboli</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Selezione Giorno */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(programmaData).map((giorno) => (
                <button
                  key={giorno}
                  onClick={() => setActiveDay(giorno)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeDay === giorno
                      ? 'bg-movieboli-bordeaux text-white shadow-lg scale-105'
                      : 'bg-white text-movieboli-nero hover:bg-movieboli-bordeaux/10 hover:scale-105'
                  }`}
                >
                  {giorno}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filtri Categoria */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categorie.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setActiveCategory(categoria.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === categoria.id
                      ? `bg-gradient-to-r ${categoria.color} text-white shadow-md scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105'
                  }`}
                >
                  {categoria.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Eventi - Struttura Aggiornata */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay + activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {getFilteredEvents(programmaData[activeDay] || []).map((evento, index) => (
                    <motion.div
                      key={index}
                      className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${getEventBackgroundColor(evento.tipo)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Immagine */}
                          {evento.immagine && (
                            <div className="flex-shrink-0">
                              <div className="w-full lg:w-48 h-64 lg:h-72 relative rounded-lg overflow-hidden shadow-md">
                                <Image
                                  src={evento.immagine}
                                  alt={evento.titolo}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    e.target.src = '/images/logo-movieboli.png'
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          
                          {/* Contenuto */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                  <span className="text-xl">{getEventIcon(evento.tipo)}</span>
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                    {evento.titolo}
                                  </h3>
                                  {evento.ospite && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                                      👤 {evento.ospite}
                                    </span>
                                  )}
                                  {evento.regista && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white ml-2">
                                      🎬 Regia: {evento.regista}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <span className="bg-white px-4 py-2 rounded-full font-bold text-lg shadow-md">
                                  🕐 {evento.orario}
                                </span>
                                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                  📍 {evento.luogo}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                              {evento.descrizione}
                            </p>
                            
                            {evento.bio && (
                              <div className="bg-white/50 rounded-lg p-4 mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Biografia:</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{evento.bio}</p>
                              </div>
                            )}
                            
                            {/* Ospiti multipli */}
                            {evento.ospiti && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Ospiti:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {evento.ospiti.map((ospite, idx) => (
                                    <div key={idx} className="bg-white/70 rounded-lg p-4 shadow-sm">
                                      <div className="flex items-start space-x-3">
                                        {ospite.immagine && (
                                          <div className="w-16 h-20 relative rounded overflow-hidden flex-shrink-0">
                                            <Image
                                              src={ospite.immagine}
                                              alt={ospite.nome}
                                              fill
                                              className="object-cover"
                                              onError={(e) => {
                                                e.target.src = '/images/logo-movieboli.png'
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div className="flex-1">
                                          <h5 className="font-bold text-gray-900 text-sm mb-1">{ospite.nome}</h5>
                                          <p className="text-xs text-gray-700 leading-relaxed">{ospite.bio}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Cortometraggi Details */}
                            {evento.cortometraggi && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Cortometraggi in programma:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {evento.cortometraggi.map((corto, idx) => (
                                    <div key={idx} className="bg-white/70 rounded-lg p-4 shadow-sm">
                                      <div className="flex items-start space-x-3">
                                        {corto.immagine && (
                                          <div className="w-16 h-20 relative rounded overflow-hidden flex-shrink-0">
                                            <Image
                                              src={corto.immagine}
                                              alt={corto.titolo}
                                              fill
                                              className="object-cover"
                                              onError={(e) => {
                                                e.target.src = '/images/logo-movieboli.png'
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div className="flex-1">
                                          <h5 className="font-bold text-gray-900 text-sm mb-1">{corto.titolo}</h5>
                                          <p className="text-xs text-gray-600 mb-1">Regia: {corto.regista}</p>
                                          <p className="text-xs text-gray-600 mb-2">Durata: {corto.durata}</p>
                                          {corto.intervista && (
                                            <span className="inline-block bg-pink-500 text-white text-xs px-2 py-1 rounded mb-2">
                                              + Intervista al regista (5 min)
                                            </span>
                                          )}
                                          <p className="text-xs text-gray-700 leading-relaxed">{corto.sinossi}</p>
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
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {getFilteredEvents(programmaData[activeDay] || []).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 text-lg">Nessun evento trovato per questa categoria.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Riepilogo Programma */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Riepilogo del Festival
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Cortometraggi</h3>
                  <p className="text-gray-600">8+ cortometraggi internazionali in concorso</p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Ospiti</h3>
                  <p className="text-gray-600">10+ ospiti</p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎭</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Eventi</h3>
                  <p className="text-gray-600">3 lungometraggi</p>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Programma */}
        <section className="py-16 bg-gradient-to-r from-movieboli-bordeaux to-movieboli-violaPrincipale">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Programma Completo
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Scarica il programma dettagliato del festival in formato PDF
              </p>
              <a 
                href="/images/programmamovie.pdf" 
                download="programmamovie.pdf"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300 hover:bg-movieboli-violaPrincipale/90"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Scarica PDF
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}