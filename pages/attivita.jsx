'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Pagina Attività - MOVIEBOLI Associazione Culturale
 * Design: responsive, fluido, con filtri per categorie
 * Struttura: Hero + Eventi recenti + Filtri + Call to action
 */
const AttivitaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tutte')
  const [isScrolled, setIsScrolled] = useState(false)

  // Categorie di attività
  const categories = ['Tutte', 'Laboratorio', 'Rassegna', 'Mostra', 'Incontro', 'Workshop']

  // Attività dell'associazione
  const activities = [
    {
      id: 1,
      title: 'Laboratorio di Regia Cinematografica',
      category: 'Laboratorio',
      description: 'Corso intensivo di 8 settimane per apprendere le basi della regia cinematografica con professionisti del settore.',
      image: '/placeholder-laboratorio-regia.jpg',
      date: '15 Marzo 2025',
      status: 'Prossimamente',
      link: '/attivita/laboratorio-regia'
    },
    {
      id: 2,
      title: 'Rassegna Cinema Europeo',
      category: 'Rassegna',
      description: 'Ciclo di proiezioni dedicato al cinema europeo contemporaneo con dibattiti e incontri con i registi.',
      image: '/placeholder-rassegna-europea.jpg',
      date: '22 Febbraio 2025',
      status: 'In corso',
      link: '/attivita/rassegna-europea'
    },
    {
      id: 3,
      title: 'Mostra Fotografica "Frames"',
      category: 'Mostra',
      description: 'Esposizione di fotografie di scena dai set cinematografici più iconici degli ultimi decenni.',
      image: '/placeholder-mostra-frames.jpg',
      date: '10 Gennaio 2025',
      status: 'Conclusa',
      link: '/attivita/mostra-frames'
    },
    {
      id: 4,
      title: 'Incontro con Marco Bellocchio',
      category: 'Incontro',
      description: 'Serata speciale con il maestro del cinema italiano per parlare di carriera, ispirazione e futuro del cinema.',
      image: '/placeholder-bellocchio.jpg',
      date: '5 Dicembre 2024',
      status: 'Conclusa',
      link: '/attivita/incontro-bellocchio'
    },
    {
      id: 5,
      title: 'Workshop Sceneggiatura',
      category: 'Workshop',
      description: 'Laboratorio pratico di scrittura cinematografica: dalle idee alla sceneggiatura finale.',
      image: '/placeholder-workshop-sceneggiatura.jpg',
      date: '20 Aprile 2025',
      status: 'Prossimamente',
      link: '/attivita/workshop-sceneggiatura'
    },
    {
      id: 6,
      title: 'Rassegna Documentari Sociali',
      category: 'Rassegna',
      description: 'Ciclo di documentari che raccontano storie di cambiamento sociale e impegno civile.',
      image: '/placeholder-documentari-sociali.jpg',
      date: '8 Maggio 2025',
      status: 'Prossimamente',
      link: '/attivita/rassegna-documentari'
    },
    {
      id: 7,
      title: 'Laboratorio Montaggio Video',
      category: 'Laboratorio',
      description: 'Corso pratico di editing video con software professionali e tecniche avanzate di post-produzione.',
      image: '/placeholder-laboratorio-montaggio.jpg',
      date: '12 Giugno 2025',
      status: 'Prossimamente',
      link: '/attivita/laboratorio-montaggio'
    },
    {
      id: 8,
      title: 'Mostra "Cinema e Territorio"',
      category: 'Mostra',
      description: 'Esposizione fotografica sui luoghi del cinema in Campania e il loro impatto culturale.',
      image: '/placeholder-mostra-territorio.jpg',
      date: '25 Luglio 2025',
      status: 'Prossimamente',
      link: '/attivita/mostra-territorio'
    }
  ]

  // Filtra attività per categoria
  const filteredActivities = selectedCategory === 'Tutte' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory)

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Funzione per determinare il colore dello status
  const getStatusColor = (status) => {
    switch (status) {
      case 'In corso':
        return 'bg-green-500'
      case 'Prossimamente':
        return 'bg-movieboli-violaPrincipale'
      case 'Conclusa':
        return 'bg-gray-500'
      default:
        return 'bg-movieboli-bordeaux'
    }
  }

  return (
    <>
      <Head>
        <title>Le Nostre Attività | MOVIEBOLI Associazione Culturale</title>
        <meta name="description" content="Scopri tutte le attività di MOVIEBOLI: laboratori, rassegne cinematografiche, mostre, incontri e workshop durante tutto l'anno." />
        <meta name="keywords" content="laboratori cinema, rassegne cinematografiche, mostre, workshop, movieboli, eboli, attività culturali" />
        <meta property="og:title" content="Le Nostre Attività - MOVIEBOLI" />
        <meta property="og:description" content="Laboratori, eventi, incontri e progetti culturali tutto l'anno." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar fissa minimal */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-rosaSfondo/95 backdrop-blur-md shadow-lg' : 'bg-movieboli-rosaSfondo/80'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo-movieboli.png"
                  alt="MOVIEBOLI Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-poppins font-bold text-lg text-movieboli-nero">
                ATTIVITÀ
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="font-poppins font-semibold text-movieboli-nero hover:text-movieboli-crema transition-colors">
                Home
              </Link>
              <Link href="/festival" className="font-poppins font-semibold text-movieboli-nero hover:text-movieboli-crema transition-colors">
                Festival
              </Link>
              <Link href="/contatti" className="font-poppins font-semibold text-movieboli-nero hover:text-movieboli-crema transition-colors">
                Contatti
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-movieboli-rosaSfondo via-movieboli-rosaSfondo/90 to-movieboli-bordeaux overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[url('/placeholder-pattern.svg')] bg-repeat"></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1 className="font-poppins font-bold text-4xl sm:text-6xl lg:text-7xl text-movieboli-nero mb-6 leading-tight">
                Le Nostre
                <span className="block text-white">Attività</span>
              </h1>
              
              <p className="font-poppins text-xl sm:text-2xl text-movieboli-nero/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Laboratori, eventi, incontri e progetti culturali tutto l'anno
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtri per categorie */}
        <section className="py-12 bg-movieboli-crema">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="font-poppins font-bold text-2xl text-movieboli-nero mb-6">
                Filtra per Categoria
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`font-poppins font-semibold px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-movieboli-nero text-movieboli-crema shadow-lg'
                        : 'bg-movieboli-crema text-movieboli-nero hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero border border-movieboli-nero/20'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Griglia Eventi */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-movieboli-crema rounded-2xl shadow-lg overflow-hidden border border-movieboli-violaPrincipale/20 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Immagine */}
                    <div className="relative h-48 bg-movieboli-nero/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-semibold text-sm px-3 py-1 rounded-full">
                          {activity.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`${getStatusColor(activity.status)} text-white font-poppins font-semibold text-xs px-2 py-1 rounded-full`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>

                    {/* Contenuto */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="font-poppins text-sm text-movieboli-bordeaux font-semibold">
                          {activity.date}
                        </span>
                      </div>
                      
                      <h3 className="font-poppins font-bold text-xl text-movieboli-nero mb-3 leading-tight">
                        {activity.title}
                      </h3>
                      
                      <p className="font-poppins text-movieboli-nero/70 mb-6 leading-relaxed text-sm">
                        {activity.description}
                      </p>
                      
                      <Link
                        href={activity.link}
                        className="inline-block bg-movieboli-nero text-movieboli-crema font-poppins font-semibold px-6 py-3 rounded-full hover:bg-movieboli-bordeaux transition-colors duration-300 text-sm"
                      >
                        Scopri di più
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Messaggio se nessuna attività */}
            {filteredActivities.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="font-poppins text-xl text-movieboli-nero/60">
                  Nessuna attività trovata per questa categoria.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action finale */}
        <section className="py-20 bg-movieboli-nero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-movieboli-violaPrincipale mb-6">
                Vuoi Collaborare con Noi?
              </h2>
              <p className="font-poppins text-xl text-movieboli-crema mb-8 leading-relaxed">
                Hai un'idea per un evento, un laboratorio o una collaborazione? 
                Siamo sempre aperti a nuove proposte e partnership creative.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contatti"
                  className="inline-block bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-bold text-lg px-10 py-4 rounded-full hover:bg-movieboli-crema transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contattaci
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

export default AttivitaPage