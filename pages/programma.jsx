'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Image from 'next/image'
// Importa i dati dei film
import filmData from './festival/film/film.json'

// Crea la mappa dei film PRIMA del componente
const filmDataMap = filmData.reduce((map, film) => {
  map[film.nome] = {
    foto: film.foto,
    bio: film.bio
  }
  return map
}, {})

// Componente Modal generico
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Dettagli</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const Programma = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDay, setActiveDay] = useState('Giovedì 22 Agosto')
  const [activeCategory, setActiveCategory] = useState('tutti')
  const [imageErrors, setImageErrors] = useState({})
  // Nuovi stati per i popup
  const [selectedOspite, setSelectedOspite] = useState(null)
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [selectedCorto, setSelectedCorto] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Rimuovi questa definizione duplicata di filmDataMap
  // const filmDataMap = { ... } 

  // Dati degli ospiti con foto
  const ospiti = {
    "Emanuele Palumbo": {
      foto: "https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg",
      ruolo: "Regista e Videomaker",
      bio: "Regista e videomaker italiano specializzato in videoclip musicali e cortometraggi"
    },
    "Giuseppe Arena": {
      foto: "https://i.ibb.co/WWDttfmZ/GIUSEPPE-ARENA.jpg",
      ruolo: "Compositore e Musicista",
      bio: "Compositore di colonne sonore per cinema e teatro"
    },
    "Luigi D'Oriano": {
      foto: "https://i.ibb.co/zyMGPT9/LUIGI-D-ORIANO.jpg",
      ruolo: "Montatore Cinematografico",
      bio: "Montatore esperto in film d'autore e documentari"
    },
    "Mario Martone": {
      foto: "https://i.ibb.co/VptMKV2X/licensed-image.jpg",
      ruolo: "Regista e Drammaturgo",
      bio: "Maestro del cinema d'autore italiano contemporaneo"
    },
    "Alessandro Rak": {
      foto: "https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg",
      ruolo: "Regista e Animatore",
      bio: "Regista di film d'animazione acclamati come 'Gatta Cenerentola'"
    }
  }

  // Dati dei cortometraggi aggiornati dai JSON
  const cortometraggi = {
    "DIECI SECONDI": {
      locandina: "https://i.ibb.co/9HPc0DNr/POSTER-DIECI-SECONDI.jpg",
      regista: "Roberta Palmieri",
      paese: "Italia",
      durata: "11:40 min",
      sinossi: "Una bambina gioca a nascondino con la sua famiglia, quando esce allo scoperto però niente è come più prima."
    },
    "PLACE UNDER THE SUN": {
      locandina: "https://i.ibb.co/F4vnXKtX/Poster-Place-under-the-sun-EN.png",
      regista: "Vlad Bolgarin",
      paese: "Moldavia",
      durata: "20:00 min",
      sinossi: "Un talentuoso pianista e il suo figlio di 8 anni lottano per trovare un posto dove vendere verdura nel più grande mercato della Moldavia."
    },
    "YA HANOUNI": {
      locandina: "https://i.ibb.co/fVzv5nGM/Ya-Hanouni.jpg",
      regista: "Lyna Tadount, Sofian Chouaib",
      paese: "Francia/Algeria",
      durata: "3:00 min",
      sinossi: "Mentre la mamma e il papà cercano di addormentare il loro bambino, una competizione tra loro si verifica: chi dei due riuscirà a fargli dire la prima parola?"
    },
    "APPUNTAMENTO A MEZZOGIORNO": {
      locandina: "https://i.ibb.co/JwTHkgND/AAM-DEF-hires.jpg",
      regista: "Antonio Passaro",
      paese: "Italia",
      durata: "14:00 min",
      sinossi: "Un cortometraggio che esplora temi profondi attraverso una narrazione coinvolgente."
    },
    "JUS D'ORANGE": {
      locandina: "https://i.ibb.co/4R33c5Ty/JO-Poster-Vertical-60-2x45-2-20230917.png",
      regista: "Alexandre Athané",
      paese: "Francia",
      durata: "13:45 min",
      sinossi: "Una storia che cattura l'essenza della vita quotidiana attraverso dettagli poetici."
    },
    "SHARING IS CARING": {
      locandina: "https://i.ibb.co/qMFNV9YW/LOCANDINA-SHARINGISCARIGN.jpg",
      regista: "Vincenzo Mauro",
      paese: "Italia",
      durata: "15:00 min",
      sinossi: "Marco, un aspirante cryptotrader, noleggia un'auto e attiva 'Sharing is Caring', un servizio che premia gli utenti per la condivisione dei propri dati."
    },
    "FATHER'S LETTERS": {
      locandina: "https://i.ibb.co/35fWHz1b/FL-Poster-CHOIX-DISTRIB-EN-min.jpg",
      regista: "Alexey Evstigneev",
      paese: "Russia",
      durata: "12:10 min",
      sinossi: "Nel 1934, il professor Vangengheim viene condannato al Gulag nelle isole Solovki. Fingendo di partire per un grande viaggio di esplorazione, scrive lettere fantasiose a sua figlia Eleonora."
    },
    "ROCK TENSIONS": {
      locandina: "https://i.ibb.co/99wFKywB/locandina-2.png",
      regista: "Markus Lehtokumpu",
      paese: "Finlandia",
      durata: "4:03 min",
      sinossi: "Un'esplorazione visiva e sonora delle tensioni moderne attraverso il linguaggio cinematografico."
    }
  }

  // Dati del festival con palette colori armoniosa
  const programmaData = {
    "Giovedì 22 Agosto": [
      {
        orario: "20:00",
        titolo: "Serata di Apertura",
        sottotitolo: "Cortometraggi Internazionali",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Arena di Sant'Antonio",
        descrizione: "Una selezione di cortometraggi che aprono il festival con storie intense e coinvolgenti",
        cortometraggi: [
          { titolo: "DIECI SECONDI", regista: "Roberta Palmieri", paese: "Italia", durata: "11:40 min" },
          { titolo: "PLACE UNDER THE SUN", regista: "Vlad Bolgarin", paese: "Moldavia", durata: "20:00 min" },
          { titolo: "YA HANOUNI", regista: "Lyna Tadount", paese: "Francia/Algeria", durata: "3:00 min" },
          { titolo: "APPUNTAMENTO A MEZZOGIORNO", regista: "Antonio Passaro", paese: "Italia", durata: "14:00 min" }
        ]
      },
      {
        orario: "21:00",
        titolo: "Incontro con i Maestri",
        sottotitolo: "Talk con i Professionisti",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Arena di Sant'Antonio",
        relatori: ["Emanuele Palumbo", "Giuseppe Arena", "Luigi D'Oriano"],
        descrizione: "Dialogo esclusivo con tre professionisti che raccontano il loro percorso nel cinema contemporaneo"
      },
      {
        orario: "21:30",
        titolo: "Mixed by Erry",
        sottotitolo: "Film di Sydney Sibilia",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Arena di Sant'Antonio",
        regista: "Sydney Sibilia",
        film: "Mixed by Erry",
        durata: "110 min",
        poster: filmDataMap["Mixed by Erry"]?.foto || "/images/default-film.jpg",
        descrizione: filmDataMap["Mixed by Erry"]?.bio || "Il film che ha conquistato il pubblico italiano, una storia di musica e passione"
      }
    ],
    "Venerdì 23 Agosto": [
      {
        orario: "20:00",
        titolo: "Seconda Serata",
        sottotitolo: "Cortometraggi d'Autore",
        tipo: "cortometraggi",
        categoria: "proiezione",
        luogo: "Arena di Sant'Antonio",
        descrizione: "Cortometraggi che esplorano temi profondi attraverso linguaggi cinematografici innovativi",
        cortometraggi: [
          { titolo: "JUS D'ORANGE", regista: "Alexandre Athané", paese: "Francia", durata: "13:45 min" },
          { titolo: "SHARING IS CARING", regista: "Vincenzo Mauro", paese: "Italia", durata: "15:00 min" },
          { titolo: "FATHER'S LETTERS", regista: "Alexey Evstigneev", paese: "Russia", durata: "12:10 min" },
          { titolo: "ROCK TENSIONS", regista: "Markus Lehtokumpu", paese: "Finlandia", durata: "4:03 min" }
        ]
      },
      {
        orario: "21:00",
        titolo: "Masterclass",
        sottotitolo: "con Mario Martone",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Arena di Sant'Antonio",
        ospite: "Mario Martone",
        descrizione: "Un'occasione unica per ascoltare uno dei più grandi registi del cinema italiano contemporaneo"
      },
      {
        orario: "21:30",
        titolo: "Fuori",
        sottotitolo: "Film di Mario Martone",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Arena di Sant'Antonio",
        regista: "Mario Martone",
        film: "Fuori",
        durata: "110 min",
        poster: filmDataMap["Fuori"]?.foto || "/images/default-film.jpg",
        descrizione: filmDataMap["Fuori"]?.bio || "L'ultimo capolavoro di Mario Martone, una riflessione profonda sulla condizione umana"
      }
    ],
    "Sabato 24 Agosto": [
      {
        orario: "20:15",
        titolo: "Cerimonia di Premiazione",
        sottotitolo: "Cortometraggi Vincitori",
        tipo: "premiazione",
        categoria: "evento",
        luogo: "Arena di Sant'Antonio",
        descrizione: "La serata finale con la premiazione dei cortometraggi vincitori del concorso internazionale"
      },
      {
        orario: "21:00",
        titolo: "Incontro Speciale",
        sottotitolo: "con Alessandro Rak",
        tipo: "incontro",
        categoria: "formazione",
        luogo: "Arena di Sant'Antonio",
        ospite: "Alessandro Rak",
        descrizione: "Il maestro dell'animazione italiana racconta il suo universo creativo"
      },
      {
        orario: "21:30",
        titolo: "Momento Musicale",
        sottotitolo: "Tributo alle Colonne Sonore",
        tipo: "evento",
        categoria: "evento",
        luogo: "Arena di Sant'Antonio",
        descrizione: "Un tributo alle colonne sonore che hanno fatto la storia del cinema"
      },
      {
        orario: "21:45",
        titolo: "L'Arte della Felicità",
        sottotitolo: "Film di Alessandro Rak",
        tipo: "film",
        categoria: "proiezione",
        luogo: "Arena di Sant'Antonio",
        regista: "Alessandro Rak",
        film: "L'Arte della Felicità",
        durata: "105 min",
        poster: filmDataMap["L'arte della felicità"]?.foto || "/images/default-film.jpg",
        descrizione: filmDataMap["L'arte della felicità"]?.bio || "Il film d'animazione che ha rivoluzionato il cinema italiano, chiusura perfetta del festival"
      }
    ]
  }

  // Categorie semplificate
  const categorie = [
    { id: 'tutti', label: 'Tutti gli eventi', color: 'from-slate-600 to-slate-700' },
    { id: 'proiezione', label: 'Proiezioni', color: 'from-blue-600 to-blue-700' },
    { id: 'formazione', label: 'Masterclass & Talk', color: 'from-emerald-600 to-emerald-700' },
    { id: 'evento', label: 'Eventi Speciali', color: 'from-amber-600 to-amber-700' }
  ]

  const getFilteredEvents = (events) => {
    if (activeCategory === 'tutti') return events
    return events.filter(event => event.categoria === activeCategory)
  }

  const handleImageError = (imageKey) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }))
  }

  // Popup Ospite
  const OspitePopup = ({ ospite, nome }) => (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-200">
        {!imageErrors[`popup-ospite-${nome}`] ? (
          <Image
            src={ospite.foto}
            alt={nome}
            fill
            className="object-cover"
            onError={() => handleImageError(`popup-ospite-${nome}`)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-slate-400 text-4xl">👤</span>
          </div>
        )}
      </div>
      <h4 className="text-2xl font-bold text-slate-900 mb-2">{nome}</h4>
      <p className="text-blue-600 font-semibold mb-4">{ospite.ruolo}</p>
      <p className="text-slate-600 leading-relaxed">{ospite.bio}</p>
    </div>
  )

  // Popup Film
  const FilmPopup = ({ evento }) => (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            {!imageErrors[`popup-film-${evento.film}`] ? (
              <Image
                src={evento.poster}
                alt={evento.film}
                fill
                className="object-cover"
                onError={() => handleImageError(`popup-film-${evento.film}`)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <span className="text-slate-400 text-4xl">🎬</span>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-2/3">
          <h4 className="text-2xl font-bold text-slate-900 mb-4">{evento.film}</h4>
          <div className="space-y-3 mb-6">
            <p className="text-slate-700"><span className="font-semibold">Regia:</span> {evento.regista}</p>
            <p className="text-slate-700"><span className="font-semibold">Durata:</span> {evento.durata}</p>
            <p className="text-slate-700"><span className="font-semibold">Orario:</span> {evento.orario}</p>
            <p className="text-slate-700"><span className="font-semibold">Luogo:</span> {evento.luogo}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900 mb-2">Trama</h5>
            <p className="text-slate-600 leading-relaxed">{evento.descrizione}</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Popup Cortometraggio
  const CortoPopup = ({ cortometraggio, cortoData }) => (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            {!imageErrors[`popup-corto-${cortometraggio.titolo}`] ? (
              <Image
                src={cortoData.locandina}
                alt={cortometraggio.titolo}
                fill
                className="object-cover"
                onError={() => handleImageError(`popup-corto-${cortometraggio.titolo}`)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <span className="text-slate-400 text-4xl">🎬</span>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-2/3">
          <h4 className="text-2xl font-bold text-slate-900 mb-4">{cortometraggio.titolo}</h4>
          <div className="space-y-3 mb-6">
            <p className="text-slate-700"><span className="font-semibold">Regia:</span> {cortometraggio.regista}</p>
            <p className="text-slate-700"><span className="font-semibold">Paese:</span> {cortometraggio.paese}</p>
            <p className="text-slate-700"><span className="font-semibold">Durata:</span> {cortometraggio.durata}</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900 mb-2">Sinossi</h5>
            <p className="text-slate-600 leading-relaxed">{cortoData.sinossi}</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente ospite migliorato con click
  const OspiteCard = ({ nome }) => {
    const ospite = ospiti[nome]
    if (!ospite) return null

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="group flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300 cursor-pointer"
        onClick={() => setSelectedOspite({ nome, ospite })}
      >
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-slate-200 group-hover:border-slate-300 transition-colors duration-300 flex-shrink-0">
          {!imageErrors[`ospite-${nome}`] ? (
            <Image
              src={ospite.foto}
              alt={nome}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => handleImageError(`ospite-${nome}`)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-xl">👤</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-slate-700 transition-colors">{nome}</p>
          <p className="text-slate-600 text-xs mt-1">{ospite.ruolo}</p>
          <p className="text-slate-500 text-xs mt-1 line-clamp-2">{ospite.bio}</p>
        </div>
        <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    )
  }

  // Componente cortometraggio migliorato con click
  const CortometraggioCard = ({ cortometraggio }) => {
    const corto = cortometraggi[cortometraggio.titolo]
    if (!corto) return null

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-slate-300 cursor-pointer"
        onClick={() => setSelectedCorto({ cortometraggio, cortoData: corto })}
      >
        <div className="flex">
          <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden">
            {!imageErrors[`corto-${cortometraggio.titolo}`] ? (
              <Image
                src={corto.locandina}
                alt={cortometraggio.titolo}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => handleImageError(`corto-${cortometraggio.titolo}`)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-lg">🎬</span>
              </div>
            )}
          </div>
          <div className="flex-1 p-4">
            <h5 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-slate-700 transition-colors">
              {cortometraggio.titolo}
            </h5>
            <p className="text-slate-600 text-xs mb-1">di {cortometraggio.regista}</p>
            <p className="text-slate-500 text-xs mb-2">{cortometraggio.paese} • {cortometraggio.durata}</p>
            {corto.sinossi && (
              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{corto.sinossi}</p>
            )}
          </div>
          <div className="flex items-center pr-4">
            <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <Head>
        <title>Programma Festival 2025 | MOVIEBOLI</title>
        <meta name="description" content="Scopri il programma completo del MOVIEBOLI Film Festival 2025: cortometraggi, ospiti speciali e proiezioni dal 22 al 24 agosto." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
                Programma Festival 2025
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                Tre giorni di cinema d'autore con <span className="font-semibold text-blue-600">cortometraggi internazionali</span> e <span className="font-semibold text-emerald-600">grandi maestri</span> del cinema italiano
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-slate-600">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200">
                  <span className="text-xl">📅</span>
                  <span className="font-medium">22-24 Agosto 2025</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200">
                  <span className="text-xl">📍</span>
                  <span className="font-medium">Arena di Sant'Antonio, Eboli</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200">
                  <span className="text-xl">🎬</span>
                  <span className="font-medium">8 Cortometraggi in Concorso</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filtri - Design più elegante */}
        <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-20 z-40">
          <div className="container mx-auto px-4">
            {/* Selezione Giorno */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Seleziona il Giorno</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.keys(programmaData).map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeDay === day
                        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg shadow-slate-300'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Selezione Categoria */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Filtra per Categoria</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categorie.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setActiveCategory(categoria.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeCategory === categoria.id
                        ? `bg-gradient-to-r ${categoria.color} text-white shadow-lg`
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {categoria.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline degli Eventi - Design più chiaro e dettagliato */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay + activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                  {activeDay}
                </h2>

                <div className="space-y-8">
                  {getFilteredEvents(programmaData[activeDay]).map((evento, index) => {
                    const categoriaColor = categorie.find(c => c.id === evento.categoria)?.color || 'from-slate-600 to-slate-700'
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300"
                      >
                        {/* Header dell'evento - Colori armonizzati */}
                        <div className={`p-6 bg-gradient-to-r ${categoriaColor} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30">
                                  <span className="text-white font-bold text-lg">{evento.orario}</span>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30">
                                  <span className="text-white text-sm font-medium capitalize">{evento.tipo}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-white/90">
                                <span className="text-lg">📍</span>
                                <span className="text-sm font-medium">{evento.luogo}</span>
                              </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{evento.titolo}</h3>
                            {evento.sottotitolo && (
                              <p className="text-white/90 text-lg mb-3">{evento.sottotitolo}</p>
                            )}
                            <p className="text-white/80 leading-relaxed">{evento.descrizione}</p>
                          </div>
                        </div>

                        {/* Contenuto dell'evento */}
                        <div className="p-6">
                          {/* Cortometraggi */}
                          {evento.tipo === 'cortometraggi' && evento.cortometraggi && (
                            <div>
                              <h4 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                <span className="text-2xl mr-3">🎬</span>
                                Cortometraggi in Programma
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {evento.cortometraggi.map((corto, idx) => (
                                  <CortometraggioCard key={idx} cortometraggio={corto} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Ospiti/Relatori */}
                          {(evento.relatori || evento.ospite) && (
                            <div className="mt-6">
                              <h4 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                                <span className="text-2xl mr-3">👥</span>
                                {evento.relatori ? 'Relatori' : 'Ospite Speciale'}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {evento.relatori ? (
                                  evento.relatori.map((relatore, idx) => (
                                    <OspiteCard key={idx} nome={relatore} />
                                  ))
                                ) : (
                                  <OspiteCard nome={evento.ospite} />
                                )}
                              </div>
                            </div>
                          )}

                          {/* Film */}
                          {evento.tipo === 'film' && (
                            <div className="mt-6">
                              <div 
                                className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer hover:shadow-md"
                                onClick={() => setSelectedFilm(evento)}
                              >
                                <div className="flex flex-col md:flex-row gap-6">
                                  <div className="md:w-1/3">
                                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                                      {!imageErrors[`film-${evento.film}`] ? (
                                        <Image
                                          src={evento.poster}
                                          alt={evento.film}
                                          fill
                                          className="object-cover transition-transform duration-300 hover:scale-105"
                                          onError={() => handleImageError(`film-${evento.film}`)}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                          <span className="text-slate-400 text-4xl">🎬</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="md:w-2/3">
                                    <h5 className="text-2xl font-bold text-slate-900 mb-3">{evento.film}</h5>
                                    <div className="space-y-2 mb-4">
                                      <p className="text-slate-700"><span className="font-semibold">Regia:</span> {evento.regista}</p>
                                      <p className="text-slate-700"><span className="font-semibold">Durata:</span> {evento.durata}</p>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{evento.descrizione}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Messaggio se non ci sono eventi */}
                {getFilteredEvents(programmaData[activeDay]).length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Nessun evento trovato</h3>
                    <p className="text-slate-600">Non ci sono eventi per la categoria selezionata in questo giorno.</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Sezione Download Programma */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Scarica il Programma Completo</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Porta sempre con te il programma del festival. Scarica la versione PDF completa con tutti gli orari, 
                le informazioni sui film e gli ospiti.
              </p>
              <motion.a
                href="/MOVIEBOLI 70X100 programma stampa.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-xl">📄</span>
                <span>Scarica PDF</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Note finali */}
        <section className="py-8 bg-slate-100">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-600 text-sm">
              * Il programma potrebbe subire variazioni. Segui i nostri canali social per aggiornamenti in tempo reale.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Modal per Ospiti */}
      <Modal isOpen={!!selectedOspite} onClose={() => setSelectedOspite(null)}>
        {selectedOspite && (
          <OspitePopup ospite={selectedOspite.ospite} nome={selectedOspite.nome} />
        )}
      </Modal>

      {/* Modal per Film */}
      <Modal isOpen={!!selectedFilm} onClose={() => setSelectedFilm(null)}>
        {selectedFilm && (
          <FilmPopup evento={selectedFilm} />
        )}
      </Modal>

      {/* Modal per Cortometraggi */}
      <Modal isOpen={!!selectedCorto} onClose={() => setSelectedCorto(null)}>
        {selectedCorto && (
          <CortoPopup cortometraggio={selectedCorto.cortometraggio} cortoData={selectedCorto.cortoData} />
        )}
      </Modal>
    </>
  )
}

export default Programma