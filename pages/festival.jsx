'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/**
 * Pagina Festival - MoviEboli Film Festival 2025
 * Design: cinematografico, potente, contenutisticamente completa
 * Struttura: Hero + Slider Eventi + Prenota + Vota + Footer dedicato
 */
const FestivalPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // Eventi del festival
  const festivalEvents = [
    {
      id: 1,
      title: 'Film in Concorso',
      description: 'Lungometraggi indipendenti da tutto il mondo in competizione per il premio principale.',
      image: '/placeholder-film.jpg',
      category: 'Concorso',
      link: '/programma#film'
    },
    {
      id: 2,
      title: 'Corti in Gara',
      description: 'Cortometraggi selezionati dalla giuria internazionale. Vota il tuo preferito!',
      image: '/placeholder-corti.jpg',
      category: 'Concorso',
      link: '/vota'
    },
    {
      id: 3,
      title: 'Ospiti Speciali',
      description: 'Registi, attori e produttori internazionali per incontri esclusivi.',
      image: '/placeholder-ospiti.jpg',
      category: 'Incontri',
      link: '/programma#ospiti'
    },
    {
      id: 4,
      title: 'Masterclass',
      description: 'Workshop e laboratori con professionisti del cinema per aspiranti filmmaker.',
      image: '/placeholder-masterclass.jpg',
      category: 'Formazione',
      link: '/programma#masterclass'
    },
    {
      id: 5,
      title: 'Proiezioni Speciali',
      description: 'Anteprime, documentari e film cult in programmazione fuori concorso.',
      image: '/placeholder-speciali.jpg',
      category: 'Speciali',
      link: '/programma#speciali'
    }
  ]

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>MoviEboli Film Festival 2025 | Festival del Cinema Indipendente</title>
        <meta name="description" content="MoviEboli Film Festival 2025 - Cinema indipendente, cultura pop, emozione collettiva. Scopri il programma, prenota i biglietti e vota i tuoi corti preferiti." />
        <meta name="keywords" content="festival cinema, eboli, campania, film indipendente, cortometraggi, movieboli" />
        <meta property="og:title" content="MoviEboli Film Festival 2025" />
        <meta property="og:description" content="Cinema indipendente, cultura pop, emozione collettiva." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar fissa con background dinamico */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
              <span className="font-poppins font-bold text-xl text-movieboli-pink">
                FESTIVAL 2025
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/programma" className="font-poppins font-semibold text-white hover:text-movieboli-pink transition-colors">
                Programma
              </Link>
              <Link href="/prenota" className="font-poppins font-semibold text-white hover:text-movieboli-pink transition-colors">
                Biglietti
              </Link>
              <Link href="/vota" className="font-poppins font-semibold text-white hover:text-movieboli-pink transition-colors">
                Vota
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-movieboli-black flex items-center justify-center overflow-hidden">
          {/* Background parallax */}
          <motion.div 
            style={{ y }}
            className="absolute inset-0 opacity-20"
          >
            <div className="w-full h-full bg-gradient-to-br from-movieboli-pink/30 via-transparent to-movieboli-bordeaux/30"></div>
          </motion.div>
          
          {/* Placeholder background image */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[url('/placeholder-festival-bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1 className="font-poppins font-bold text-4xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                MoviEboli
                <span className="block text-movieboli-pink">Film Festival</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-semibold">2025</span>
              </h1>
              
              <p className="font-poppins text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Cinema indipendente. Cultura pop. Emozione collettiva.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Link
                  href="/programma"
                  className="inline-block bg-movieboli-pink text-movieboli-black font-poppins font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Scopri il Programma
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-movieboli-pink rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-movieboli-pink rounded-full mt-2"
              ></motion.div>
            </div>
          </motion.div>
        </section>

        {/* Slider Eventi */}
        <section className="py-20 bg-movieboli-crema">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-movieboli-black mb-6">
                Gli Eventi del Festival
              </h2>
              <p className="font-poppins text-xl text-movieboli-black/80 max-w-3xl mx-auto">
                Cinque giorni di cinema, cultura e incontri indimenticabili
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                className="festival-swiper"
              >
                {festivalEvents.map((event) => (
                  <SwiperSlide key={event.id}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                    >
                      <div className="relative h-48 bg-movieboli-black/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-movieboli-pink/20 to-movieboli-bordeaux/20"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-movieboli-pink text-movieboli-black font-poppins font-semibold text-sm px-3 py-1 rounded-full">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-poppins font-bold text-xl text-movieboli-black mb-3">
                          {event.title}
                        </h3>
                        <p className="font-poppins text-movieboli-black/70 mb-6 leading-relaxed">
                          {event.description}
                        </p>
                        <Link
                          href={event.link}
                          className="inline-block bg-movieboli-black text-white font-poppins font-semibold px-6 py-3 rounded-full hover:bg-movieboli-bordeaux transition-colors duration-300"
                        >
                          Scopri di più
                        </Link>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </section>

        {/* Sezione Prenota */}
        <section className="py-20 bg-movieboli-pink">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-movieboli-black mb-6">
                Prenota i tuoi Biglietti
              </h2>
              <p className="font-poppins text-xl text-movieboli-black/80 mb-8 leading-relaxed">
                Non perdere l'opportunità di vivere il cinema indipendente più emozionante della Campania. 
                Biglietti disponibili per singole proiezioni o abbonamenti festival completi.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/prenota"
                  className="inline-block bg-movieboli-black text-white font-poppins font-bold text-lg px-10 py-4 rounded-full hover:bg-movieboli-bordeaux transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Prenota Ora
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sezione Vota */}
        <section className="py-20 bg-movieboli-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-movieboli-pink mb-6">
                Vota il tuo Cortometraggio Preferito
              </h2>
              <p className="font-poppins text-xl text-white/90 mb-8 leading-relaxed">
                Partecipa alla selezione del Premio del Pubblico. Guarda i cortometraggi in concorso 
                e vota quello che ti ha colpito di più.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/vota"
                  className="inline-block bg-movieboli-pink text-movieboli-black font-poppins font-bold text-lg px-10 py-4 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vota Ora
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer dedicato Festival */}
        <footer className="bg-movieboli-bordeaux text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Info Festival */}
              <div>
                <h3 className="font-poppins font-bold text-2xl text-movieboli-pink mb-6">
                  MoviEboli Film Festival 2025
                </h3>
                <p className="font-poppins text-white/90 mb-4">
                  <strong>Date:</strong> 15-19 Agosto 2025
                </p>
                <p className="font-poppins text-white/90 mb-4">
                  <strong>Luogo:</strong> Cinema Vittoria, Eboli (SA)
                </p>
                <p className="font-poppins text-white/90">
                  <strong>Organizzato da:</strong> MOVIEBOLI Associazione Culturale
                </p>
              </div>

              {/* Contatti Stampa */}
              <div>
                <h3 className="font-poppins font-bold text-xl text-movieboli-pink mb-6">
                  Ufficio Stampa
                </h3>
                <p className="font-poppins text-white/90 mb-2">
                  <strong>Email:</strong> stampa@movieboli.it
                </p>
                <p className="font-poppins text-white/90 mb-2">
                  <strong>Tel:</strong> +39 328 123 4567
                </p>
                <p className="font-poppins text-white/90">
                  <strong>Accrediti:</strong> accrediti@movieboli.it
                </p>
              </div>

              {/* Info Biglietti e Social */}
              <div>
                <h3 className="font-poppins font-bold text-xl text-movieboli-pink mb-6">
                  Biglietti e Social
                </h3>
                <p className="font-poppins text-white/90 mb-4">
                  <strong>Biglietti:</strong> info@movieboli.it
                </p>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/movieboli" className="text-white/70 hover:text-movieboli-pink transition-colors">
                    Instagram
                  </a>
                  <a href="https://facebook.com/movieboli" className="text-white/70 hover:text-movieboli-pink transition-colors">
                    Facebook
                  </a>
                  <a href="https://youtube.com/@movieboli" className="text-white/70 hover:text-movieboli-pink transition-colors">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 pt-8 text-center">
              <p className="font-poppins text-white/70">
                © 2025 MoviEboli Film Festival - MOVIEBOLI Associazione Culturale
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .festival-swiper .swiper-pagination-bullet {
          background: #f5a6a6;
        }
        .festival-swiper .swiper-pagination-bullet-active {
          background: #8b0000;
        }
        .festival-swiper .swiper-button-next,
        .festival-swiper .swiper-button-prev {
          color: #f5a6a6;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  )
}

export default FestivalPage