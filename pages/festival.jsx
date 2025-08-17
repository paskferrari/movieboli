'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import EditableText from '../components/ui/EditableText';
import filmData from '../public/json-folders/film_unificati.json';
import lungometraggiData from './festival/film/film.json';

/**
 * Pagina Festival - MoviEboli Film Festival
 * Design: Professionale, cinematografico, intuitivo
 * Struttura: Hero + Navigazione Principale + Sezione Vota + Footer
 */
const FestivalPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

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
        <meta name="description" content="MoviEboli Film Festival 2025 - 15-19 Agosto, Eboli. Cinema indipendente, cortometraggi internazionali, ospiti speciali. Scopri il programma e vota i tuoi corti preferiti." />
        <meta name="keywords" content="festival cinema, eboli, campania, film indipendente, cortometraggi, movieboli, agosto 2025" />
        <meta property="og:title" content="MoviEboli Film Festival 2025" />
        <meta property="og:description" content="15-19 Agosto 2025 - Cinema indipendente, cultura pop, emozione collettiva." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar fissa professionale */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-20 h-20 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo-movieboli.png"
                  alt="MOVIEBOLI Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                  priority
                />
              </div>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.programma"
                  defaultValue="Programma"
                  tag="span"
                />
              </Link>
              <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.cortometraggi"
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
                  contentKey="festival.nav.ospiti"
                  defaultValue="Ospiti"
                  tag="span"
                />
              </Link>
              <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.vota"
                  defaultValue="Vota"
                  tag="span"
                />
              </Link>
              <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.info"
                  defaultValue="Info"
                  tag="span"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden">
        {/* Hero Section Cinematografico con Leoni */}
        <section className="relative min-h-screen bg-movieboli-nero flex items-center justify-center overflow-hidden">
          {/* Background principale con leoni.png */}
          <motion.div 
            style={{ y }}
            className="absolute inset-0 opacity-50"
          >
            <Image
              src="/leoni.png"
              alt="Leoni cinematografici background"
              fill
              sizes="100vw"
              className="object-cover object-center scale-110"
              priority
            />
          </motion.div>
          
          {/* Gradient overlay cinematografico migliorato */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-movieboli-nero/20 via-movieboli-nero/15 to-movieboli-bordeaux/10"></div> */}
          
          {/* Pistola decorativa laterale */}
          {/* Rimuovo completamente il div con pistola.png */}
          {/* 
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden xl:block"
          >
            <div className="relative w-32 h-64 opacity-15">
              <Image
                src="/images/pistola.png"
                alt="Elemento decorativo"
                fill
                sizes="128px"
                className="object-contain filter brightness-0 invert"
              />
            </div>
          </motion.div>
          */}

          {/* Content principale */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {/* Logo al posto del titolo */}
              <motion.div
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="relative w-96 h-48 sm:w-[496px] sm:h-[248px] lg:w-[595px] lg:h-[297px]">
                  <Image
                    src="/images/logoNuovo.png"
                    alt="MoviEboli Film Festival Logo"
                    fill
                    sizes="(max-width: 640px) 384px, (max-width: 1024px) 496px, 595px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
              
              <motion.p 
                className="font-poppins text-2xl sm:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <EditableText 
                  contentKey="festival.hero.subtitle"
                  defaultValue="Cinema indipendente. Cultura pop. Emozione collettiva."
                  tag="span"
                  multiline={true}
                />
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Link
                  href="/festival/programma"
                  className="inline-flex items-center bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-movieboli-crema hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <EditableText 
                    contentKey="festival.hero.cta_programma"
                    defaultValue="Scopri il Programma"
                    tag="span"
                  />
                </Link>
                <Link
                  href="/festival/cortometraggi"
                  className="inline-flex items-center border-2 border-movieboli-violaPrincipale text-movieboli-violaPrincipale font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/10"
                >
                  <EditableText 
                    contentKey="festival.hero.cta_vota"
                    defaultValue="Vota i Corti"
                    tag="span"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator elegante */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-12 border-2 border-movieboli-violaPrincipale rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-4 bg-movieboli-violaPrincipale rounded-full mt-2"
              ></motion.div>
            </div>
          </motion.div>
        </section>

        {/* Sezione Navigazione Principale - Riprogettata */}
        <section className="relative py-24 bg-gradient-to-br from-movieboli-crema via-white to-movieboli-crema/80 overflow-hidden">
          {/* Background decorativo rimosso */}
          {/* 
          <div className="absolute top-20 right-10 opacity-8 hidden lg:block">
            <div className="relative w-80 h-80">
              <Image
                src="/images/bacio.png"
                alt="Background decorativo"
                fill
                sizes="320px"
                className="object-contain filter sepia-[0.3] brightness-110"
              />
            </div>
          </div>
          */}
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header professionale */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-semibold text-5xl sm:text-6xl text-movieboli-nero mb-8">
                <EditableText 
                  contentKey="festival.explore.title"
                  defaultValue="Esplora il Festival"
                  tag="span"
                />
              </h2>
              <div className="w-24 h-1 bg-movieboli-violaPrincipale mx-auto mb-8"></div>
              <p className="font-poppins text-2xl text-movieboli-nero/80 max-w-4xl mx-auto leading-relaxed">
                <EditableText 
                  contentKey="festival.explore.subtitle"
                  defaultValue="22-23-24 Agosto 2025"
                  tag="span"
                  multiline={true}
                />
              </p>
            </motion.div>

            {/* Griglia 2x2 delle 4 Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* 1. CORTOMETRAGGI */}
              <motion.div
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {/* Header con sfondo scorrevole delle locandine */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-movieboli-violaPrincipale/40 to-movieboli-bordeaux/50">
                  {/* Sfondo scorrevole con locandine cortometraggi */}
                  <div className="absolute inset-0 flex animate-scroll">
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/vC6YGQv1/Ya-Hanouni.jpg"
                          alt="Ya Hanouni"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/F4vnXKtX/Poster-Place-under-the-sun-EN.png"
                          alt="Place under the sun"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/9HPc0DNr/POSTER-DIECI-SECONDI.jpg"
                          alt="Dieci Secondi"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                    </div>
                    {/* Duplica per loop continuo */}
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/kg64v029/LOCANDINA-SHARINGISCARIGN.jpg"
                          alt="Sharing is Caring"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/35fWHz1b/FL-Poster-CHOIX-DISTRIB-EN-min.jpg"
                          alt="Father's Letters"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/JwTHkgND/AAM-DEF-hires.jpg"
                          alt="Appuntamento a Mezzogiorno"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge e titolo */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-base px-4 py-2 rounded-full">
                      <EditableText 
                        contentKey="festival.shorts.badge"
                        defaultValue="Concorso Internazionale di Cortometraggi"
                        tag="span"
                      />
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-3">
                      <EditableText 
                        contentKey="festival.shorts.title"
                        defaultValue="Cortometraggi in Concorso"
                        tag="span"
                      />
                    </h3>
                    <p className="font-poppins text-white/95 text-lg leading-relaxed">
                      <EditableText 
                        contentKey="festival.shorts.description"
                        defaultValue="8 cortometraggi selezionati da tutto il Mondo"
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
                
                {/* Contenuto */}
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-poppins font-semibold text-lg text-movieboli-nero mb-3">
                      <EditableText 
                        contentKey="festival.shorts.list_title"
                        defaultValue="Cortometraggi in Concorso:"
                        tag="span"
                      />
                    </h4>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Ya Hanouni - Lyna Tadount</p>
                        <p className="text-movieboli-nero/70">Francia/Algeria • 3 min</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Place under the sun - Vlad Bolgarin</p>
                        <p className="text-movieboli-nero/70">Moldavia • 20 min</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Dieci Secondi - Roberta Palmieri</p>
                        <p className="text-movieboli-nero/70">Italia • 11:40 min</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/festival/cortometraggi">
                      <span className="inline-block bg-movieboli-nero text-movieboli-crema font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-bordeaux transition-all duration-300 group-hover:bg-movieboli-bordeaux group-hover:scale-105">
                        <EditableText 
                          contentKey="festival.shorts.cta_explore"
                          defaultValue="Esplora i Corti"
                          tag="span"
                        />
                      </span>
                    </Link>
                    <Link href="/festival/vota">
                      <span className="inline-block border-2 border-movieboli-nero text-movieboli-nero font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-nero hover:text-white transition-all duration-300">
                        <EditableText 
                          contentKey="festival.shorts.cta_vote"
                          defaultValue="Vota Ora"
                          tag="span"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* 2. OSPITI */}
              <motion.div
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Header con sfondo scorrevole delle foto ospiti */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-movieboli-bordeaux/40 to-movieboli-nero/50">
                  {/* Sfondo scorrevole con foto ospiti */}
                  <div className="absolute inset-0 flex animate-scroll-slow">
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg"
                          alt="Alessandro Rak"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/zyMGPT9/LUIGI-D-ORIANO.jpg"
                          alt="Luigi D'Oriano"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/WWDttfmZ/GIUSEPPE-ARENA.jpg"
                          alt="Giuseppe Arena"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                    </div>
                    {/* Duplica per loop continuo */}
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg"
                          alt="Emanuele Palumbo"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/VptMKV2X/licensed-image.jpg"
                          alt="Francesco Lettieri"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                      <div className="w-1/3 h-full relative">
                        <Image
                          src="https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg"
                          alt="Alessandro Rak"
                          fill
                          className="object-cover opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge e titolo */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-base px-4 py-2 rounded-full">
                      <EditableText 
                        contentKey="festival.guests.badge"
                        defaultValue="Ospiti Internazionali"
                        tag="span"
                      />
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-3">
                      <EditableText 
                        contentKey="festival.guests.title"
                        defaultValue="Ospiti del Festival"
                        tag="span"
                      />
                    </h3>
                    <p className="font-poppins text-white/95 text-lg leading-relaxed">
                      <EditableText 
                        contentKey="festival.guests.description"
                        defaultValue="Registi, attori e professionisti del cinema"
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
                
                {/* Contenuto */}
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-poppins font-semibold text-lg text-movieboli-nero mb-3">
                      <EditableText 
                        contentKey="festival.guests.list_title"
                        defaultValue="Ospiti Confermati:"
                        tag="span"
                      />
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Alessandro Rak</p>
                        <p className="text-movieboli-nero/70">Regista • 24 agosto 2025</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Luigi D'Oriano</p>
                        <p className="text-movieboli-nero/70">Montatore • 22 agosto 2025</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">Mario Martone</p>
                        <p className="text-movieboli-nero/70">Regista • 23 agosto 2025</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/festival/ospiti">
                    <span className="inline-block bg-movieboli-bordeaux text-white font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-nero transition-all duration-300 group-hover:scale-105">
                      <EditableText 
                        contentKey="festival.guests.cta"
                        defaultValue="Scopri gli Ospiti"
                        tag="span"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* 3. FILM */}
              <motion.div
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Header con sfondo scorrevole delle locandine film reali */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-movieboli-nero/40 to-movieboli-violaPrincipale/50">
                  {/* Sfondo scorrevole con locandine film reali */}
                  <div className="absolute inset-0 flex animate-scroll-interval">
                    <div className="flex min-w-full">
                      {lungometraggiData.map((film, index) => (
                        <div key={index} className="w-1/3 h-full relative">
                          <Image
                            src={film.foto}
                            alt={film.nome}
                            fill
                            className="object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="font-bold text-sm">{film.nome}</h4>
                            <p className="text-xs opacity-80">{film.data_evento}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Duplica per loop continuo */}
                    <div className="flex min-w-full">
                      {lungometraggiData.map((film, index) => (
                        <div key={index + 3} className="w-1/3 h-full relative">
                          <Image
                            src={film.foto}
                            alt={film.nome}
                            fill
                            className="object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="font-bold text-sm">{film.nome}</h4>
                            <p className="text-xs opacity-80">{film.data_evento}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge e titolo */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-base px-4 py-2 rounded-full">
                      <EditableText 
                        contentKey="festival.films.badge"
                        defaultValue="Lungometraggi"
                        tag="span"
                      />
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-3">
                      <EditableText 
                        contentKey="festival.films.title"
                        defaultValue="Film in Programmazione"
                        tag="span"
                      />
                    </h3>
                    <p className="font-poppins text-white/95 text-lg leading-relaxed">
                      <EditableText 
                        contentKey="festival.films.description"
                        defaultValue="Capolavori del cinema italiano e internazionale"
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
                
                {/* Contenuto */}
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-poppins font-semibold text-lg text-movieboli-nero mb-3">
                      <EditableText 
                        contentKey="festival.films.list_title"
                        defaultValue="Film Selezionati:"
                        tag="span"
                      />
                    </h4>
                    <div className="space-y-3 text-sm">
                      {lungometraggiData.map((film, index) => (
                        <div key={index} className="bg-movieboli-crema/30 p-3 rounded-lg">
                          <p className="font-medium text-movieboli-nero">{film.nome}</p>
                          <p className="text-movieboli-nero/70">{film.data_evento}</p>
                          <p className="text-movieboli-nero/60 text-xs mt-1 line-clamp-2">{film.bio}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="font-poppins text-movieboli-nero/80 mb-6 leading-relaxed">
                    <EditableText 
                      contentKey="festival.films.description_long"
                      defaultValue="Proiezioni speciali di capolavori del cinema italiano e internazionale selezionati per il festival."
                      tag="span"
                      multiline={true}
                    />
                  </p>
                  <Link href="/festival/programma">
                    <span className="inline-block bg-movieboli-nero text-white font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-violaPrincipale transition-all duration-300 group-hover:scale-105">
                      <EditableText 
                        contentKey="festival.films.cta"
                        defaultValue="Vedi Programma Film"
                        tag="span"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* 4. PROGRAMMA */}
              <motion.div
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Header con sfondo scorrevole del programma */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-movieboli-violaPrincipale/40 to-movieboli-crema/50">
                  {/* Sfondo scorrevole con elementi del programma */}
                  <div className="absolute inset-0 flex animate-scroll-fast">
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-nero/60 to-movieboli-bordeaux/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">22 AGO</h4>
                          <p className="text-sm opacity-80">Apertura</p>
                        </div>
                      </div>
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-bordeaux/60 to-movieboli-violaPrincipale/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">23 AGO</h4>
                          <p className="text-sm opacity-80">Masterclass</p>
                        </div>
                      </div>
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-violaPrincipale/60 to-movieboli-nero/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">24 AGO</h4>
                          <p className="text-sm opacity-80">Premiazione</p>
                        </div>
                      </div>
                    </div>
                    {/* Duplica per loop continuo */}
                    <div className="flex min-w-full">
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-crema/60 to-movieboli-nero/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">19:30</h4>
                          <p className="text-sm opacity-80">Proiezioni</p>
                        </div>
                      </div>
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-nero/60 to-movieboli-crema/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">21:00</h4>
                          <p className="text-sm opacity-80">Q&A</p>
                        </div>
                      </div>
                      <div className="w-1/3 h-full relative bg-gradient-to-br from-movieboli-bordeaux/60 to-movieboli-violaPrincipale/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h4 className="font-bold text-lg">22:00</h4>
                          <p className="text-sm opacity-80">Eventi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge e titolo */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-movieboli-nero text-movieboli-crema font-poppins font-medium text-base px-4 py-2 rounded-full">
                      <EditableText 
                        contentKey="festival.program.dates"
                        defaultValue="22-23-24 Agosto"
                        tag="span"
                      />
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-3">
                      <EditableText 
                        contentKey="festival.program.title"
                        defaultValue="Programma Completo"
                        tag="span"
                      />
                    </h3>
                    <p className="font-poppins text-white/95 text-lg leading-relaxed">
                      <EditableText 
                        contentKey="festival.program.description_short"
                        defaultValue="Tre giorni di cinema non-stop"
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
                
                {/* Contenuto */}
                <div className="p-8">
                  <div className="space-y-3 mb-6">
                    <p className="text-movieboli-nero/80">
                      • <span className="font-medium">19:30</span> - Apertura e Contest Cortometraggi
                    </p>
                    <p className="text-movieboli-nero/80">
                      • <span className="font-medium">21:00</span> - Interviste e Q&A con gli ospiti
                    </p>
                    <p className="text-movieboli-nero/80">
                      • <span className="font-medium">21:30</span> - Proiezioni Film
                    </p>
                  </div>
                  <p className="font-poppins text-movieboli-nero/80 mb-6 leading-relaxed">
                    <EditableText 
                      contentKey="festival.program.description"
                      defaultValue="Tre giorni di cinema non-stop all'Arena di Sant'Antonio ad Eboli."
                      tag="span"
                      multiline={true}
                    />
                  </p>
                  <Link href="/festival/programma">
                    <span className="inline-block bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-nero hover:text-white transition-all duration-300 group-hover:scale-105">
                      <EditableText 
                        contentKey="festival.program.cta"
                        defaultValue="Vedi Programma"
                        tag="span"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sezione Vota - Riprogettata con bacio.png */}
        <section id="vota" className="relative py-24 bg-movieboli-nero overflow-hidden">
          {/* Background con bacio.png migliorato */}
          {/* Rimuovo anche il background nella sezione vota */}
          {/* 
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/bacio.png"
              alt="Background vota"
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-75"
            />
          </div>
          */}
          
          {/* Overlay gradient migliorato */}
          <div className="absolute inset-0 bg-gradient-to-br from-movieboli-nero/90 via-movieboli-nero/85 to-movieboli-bordeaux/70"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-semibold text-5xl sm:text-6xl text-white mb-8">
                <EditableText 
                  contentKey="festival.vote.title"
                  defaultValue="Il Tuo Voto Conta"
                  tag="span"
                />
              </h2>
              <div className="w-24 h-1 bg-movieboli-violaPrincipale mx-auto mb-8"></div>
              <p className="font-poppins text-2xl text-white/95 mb-12 leading-relaxed">
                <EditableText 
                  contentKey="festival.vote.description"
                  defaultValue="Partecipa alla selezione dei cortometraggi. La giuria popolare assegna il Premio del Pubblico al miglior cortometraggio del festival."
                  tag="span"
                  multiline={true}
                />
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/festival/cortometraggi"
                  className="inline-flex items-center bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-movieboli-crema hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <EditableText 
                    contentKey="festival.vote.cta_vote"
                    defaultValue="Vota i Cortometraggi"
                    tag="span"
                  />
                </Link>
                <Link
                  href="/festival/programma"
                  className="inline-flex items-center border-2 border-white text-white font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-white hover:text-movieboli-nero hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <EditableText 
                    contentKey="festival.vote.cta_rules"
                    defaultValue="Regolamento Voto"
                    tag="span"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer professionale con dati aggiornati */}
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
                      priority
                    />
                  </div>
                  <h3 className="font-poppins font-semibold text-2xl text-movieboli-violaPrincipale">
                    <EditableText 
                      contentKey="festival.footer.brand_name"
                      defaultValue="MoviEboli"
                      tag="span"
                    />
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.dates"
                      defaultValue="Date: 15-19 Agosto 2025"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.location"
                      defaultValue="Luogo: Cinema Vittoria, Eboli (SA)"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.organizer"
                      defaultValue="Organizzato da: MOVIEBOLI Associazione Culturale"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.shorts_count"
                      defaultValue="Cortometraggi: 15 in concorso internazionale"
                      tag="span"
                    />
                  </p>
                </div>
              </div>

              {/* Contatti */}
              <div>
                <h3 className="font-poppins font-medium text-xl text-movieboli-violaPrincipale mb-6">
                  <EditableText 
                    contentKey="festival.footer.contacts_title"
                    defaultValue="Contatti"
                    tag="span"
                  />
                </h3>
                <div className="space-y-3">
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.email"
                      defaultValue="Email: info@movieboli.it"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.phone"
                      defaultValue="Tel: +39 328 123 4567"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.press_email"
                      defaultValue="Stampa: stampa@movieboli.it"
                      tag="span"
                    />
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    <EditableText 
                      contentKey="festival.footer.tickets"
                      defaultValue="Biglietti: Cinema Vittoria Eboli"
                      tag="span"
                    />
                  </p>
                </div>
              </div>

              {/* Social e Links */}
              <div>
                <h3 className="font-poppins font-medium text-xl text-movieboli-violaPrincipale mb-6">
                  <EditableText 
                    contentKey="festival.footer.social_title"
                    defaultValue="Seguici"
                    tag="span"
                  />
                </h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <a href="https://instagram.com/movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    <EditableText 
                      contentKey="festival.footer.social_instagram"
                      defaultValue="Instagram"
                      tag="span"
                    />
                  </a>
                  <a href="https://facebook.com/movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    <EditableText 
                      contentKey="festival.footer.social_facebook"
                      defaultValue="Facebook"
                      tag="span"
                    />
                  </a>
                  <a href="https://youtube.com/@movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    <EditableText 
                      contentKey="festival.footer.social_youtube"
                      defaultValue="YouTube"
                      tag="span"
                    />
                  </a>
                </div>
                <div className="space-y-2">
                  <Link href="/chi-siamo" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    <EditableText 
                      contentKey="festival.footer.link_about"
                      defaultValue="Chi Siamo"
                      tag="span"
                    />
                  </Link>
                  <Link href="/attivita" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    <EditableText 
                      contentKey="festival.footer.link_activities"
                      defaultValue="Le Nostre Attività"
                      tag="span"
                    />
                  </Link>
                  <Link href="/festival/programma" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    <EditableText 
                      contentKey="festival.footer.link_program"
                      defaultValue="Programma Dettagliato"
                      tag="span"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-movieboli-crema/20 mt-16 pt-8 text-center">
              <p className="font-poppins text-movieboli-crema/80">
                <EditableText 
                  contentKey="festival.footer.copyright"
                  defaultValue="© 2024 MoviEboli Film Festival - MOVIEBOLI Associazione Culturale • Festival del Cinema Indipendente"
                  tag="span"
                />
              </p>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  )
}

export default FestivalPage
