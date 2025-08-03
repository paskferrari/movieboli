'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import EditableText from '../components/ui/EditableText';

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
              {/* Testo FESTIVAL rimosso */}
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                Programma
              </Link>
              <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                Cortometraggi
              </Link>
              <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                Ospiti
              </Link>
              <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                Vota
              </Link>
              <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                Info
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
            className="absolute inset-0 opacity-25"
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
          <div className="absolute inset-0 bg-gradient-to-br from-movieboli-nero/85 via-movieboli-nero/70 to-movieboli-bordeaux/40"></div>
          
          {/* Pistola decorativa laterale */}
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

          {/* Content principale */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <motion.h1 
                className="font-poppins font-bold text-5xl sm:text-7xl lg:text-8xl text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                MoviEboli
                <motion.span 
                  className="block text-movieboli-violaPrincipale"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Film Festival
                </motion.span>
                <motion.span 
                  className="block text-4xl sm:text-5xl lg:text-6xl font-medium text-movieboli-bordeaux"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  2025
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="font-poppins text-2xl sm:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Cinema indipendente. Cultura pop. Emozione collettiva.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Link
                  href="/programma"
                  className="inline-flex items-center bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-movieboli-crema hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Scopri il Programma
                </Link>
                <Link
                  href="/festival/cortometraggi"
                  className="inline-flex items-center border-2 border-movieboli-violaPrincipale text-movieboli-violaPrincipale font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/10"
                >
                  Vota i Corti
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
          {/* Background decorativo con bacio.png migliorato */}
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
                Esplora il Festival
              </h2>
              <div className="w-24 h-1 bg-movieboli-violaPrincipale mx-auto mb-8"></div>
              <p className="font-poppins text-2xl text-movieboli-nero/80 max-w-4xl mx-auto leading-relaxed">
                Tre giorni di cinema indipendente, ospiti internazionali e cortometraggi in concorso • 22-23-24 Agosto 2025
              </p>
            </motion.div>

            {/* Griglia principale con contenuti reali */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cortometraggi - Card principale con dati reali */}
              <motion.div
                className="lg:col-span-2 group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-80 bg-gradient-to-br from-movieboli-violaPrincipale/40 to-movieboli-bordeaux/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-movieboli-violaPrincipale text-movieboli-nero font-poppins font-medium text-base px-4 py-2 rounded-full">
                      Concorso Internazionale
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-3">
                      Cortometraggi in Gara
                    </h3>
                    <p className="font-poppins text-white/95 text-lg leading-relaxed">
                      8 cortometraggi selezionati: "Ya Hanouni", "Place under the sun", "Jus d'orange", "Appuntamento a Mezzogiorno" e altri. Storie da Francia, Italia, Moldavia e Russia.
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-poppins font-semibold text-lg text-movieboli-nero mb-3">Cortometraggi in Concorso:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">"Ya Hanouni" - Lyna Tadount</p>
                        <p className="text-movieboli-nero/70">Francia/Algeria</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">"Place under the sun" - Vlad Bolgarin</p>
                        <p className="text-movieboli-nero/70">Moldavia • 20 min</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">"Jus d'orange" - Alexandre Athané</p>
                        <p className="text-movieboli-nero/70">Francia • 13:45 min</p>
                      </div>
                      <div className="bg-movieboli-crema/30 p-3 rounded-lg">
                        <p className="font-medium text-movieboli-nero">"Appuntamento a Mezzogiorno" - Antonio Passaro</p>
                        <p className="text-movieboli-nero/70">Italia • 14 min</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/festival/cortometraggi">
                      <span className="inline-block bg-movieboli-nero text-movieboli-crema font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-bordeaux transition-all duration-300 group-hover:bg-movieboli-bordeaux group-hover:scale-105">
                        Esplora i Corti
                      </span>
                    </Link>
                    <Link href="#vota">
                      <span className="inline-block border-2 border-movieboli-nero text-movieboli-nero font-poppins font-medium px-6 py-3 rounded-xl hover:bg-movieboli-nero hover:text-white transition-all duration-300">
                        Vota Ora
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Ospiti e Programma - Cards laterali con contenuti reali */}
              <div className="space-y-8">
                {/* Ospiti Speciali con dati reali */}
                <motion.div
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-movieboli-bordeaux/40 to-movieboli-violaPrincipale/50">
                    <div className="absolute top-4 left-4">
                      <span className="bg-movieboli-bordeaux text-movieboli-crema font-poppins font-medium text-sm px-3 py-1 rounded-full">
                        Masterclass & Talk
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-poppins font-semibold text-2xl text-white mb-2">
                        Ospiti Internazionali
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-poppins font-semibold text-sm text-movieboli-nero mb-2">Ospiti Confermati:</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Daria D'Antonio</span> - Direttrice della Fotografia</p>
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Registi Internazionali</span> - Panel Cinema Mediterraneo</p>
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Workshop</span> - Sceneggiatura Innovativa</p>
                      </div>
                    </div>
                    <p className="font-poppins text-movieboli-nero/80 mb-6 leading-relaxed">
                      Masterclass, workshop e dibattiti con professionisti del cinema internazionale.
                    </p>
                    <Link href="/festival/ospiti">
                      <span className="inline-block bg-movieboli-bordeaux text-movieboli-crema font-poppins font-medium px-5 py-2 rounded-lg hover:bg-movieboli-nero transition-colors duration-300">
                        Scopri gli Ospiti
                      </span>
                    </Link>
                  </div>
                </motion.div>

                {/* Programma Completo con date aggiornate */}
                <motion.div
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-movieboli-nero/40 to-movieboli-violaPrincipale/40">
                    <div className="absolute top-4 left-4">
                      <span className="bg-movieboli-nero text-movieboli-crema font-poppins font-medium text-sm px-3 py-1 rounded-full">
                        22-23-24 Agosto
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-poppins font-semibold text-2xl text-white mb-2">
                        Programma Completo
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-poppins font-semibold text-sm text-movieboli-nero mb-2">Programma Giornaliero:</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Giovedì 22</span> - Apertura e Proiezioni</p>
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Venerdì 23</span> - Masterclass e Workshop</p>
                        <p className="text-movieboli-nero/80">• <span className="font-medium">Sabato 24</span> - Premiazione e Chiusura</p>
                      </div>
                    </div>
                    <p className="font-poppins text-movieboli-nero/80 mb-6 leading-relaxed">
                      Proiezioni, talk, workshop e eventi speciali. Tre giorni di cinema non-stop al Cinema Vittoria, Eboli.
                    </p>
                    <Link href="/programma">
                      <span className="inline-block bg-movieboli-nero text-movieboli-crema font-poppins font-medium px-5 py-2 rounded-lg hover:bg-movieboli-violaPrincipale transition-colors duration-300">
                        Vedi Programma
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione Vota - Riprogettata con bacio.png */}
        <section id="vota" className="relative py-24 bg-movieboli-nero overflow-hidden">
          {/* Background con bacio.png migliorato */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/bacio.png"
              alt="Background vota"
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-75"
            />
          </div>
          
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
                Il Tuo Voto Conta
              </h2>
              <div className="w-24 h-1 bg-movieboli-violaPrincipale mx-auto mb-8"></div>
              <p className="font-poppins text-2xl text-white/95 mb-12 leading-relaxed">
                Partecipa alla selezione dei cortometraggi. La giuria popolare assegna il Premio del Pubblico al miglior cortometraggio del festival.
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
                  Vota i Cortometraggi
                </Link>
                <Link
                  href="/programma"
                  className="inline-flex items-center border-2 border-white text-white font-poppins font-medium text-xl py-4 px-10 rounded-xl hover:bg-white hover:text-movieboli-nero hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Regolamento Voto
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
                    MoviEboli
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="font-poppins text-movieboli-crema/95">
                    Date: 15-19 Agosto 2025
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Luogo: Cinema Vittoria, Eboli (SA)
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Organizzato da: MOVIEBOLI Associazione Culturale
                  </p>
                  <p className="font-poppins text-movieboli-crema/95">
                    Cortometraggi: 15 in concorso internazionale
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
                    Tel: +39 328 123 4567
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
                  <a href="https://youtube.com/@movieboli" className="bg-movieboli-crema/10 text-movieboli-crema hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-300 px-4 py-2 rounded-lg font-poppins font-medium">
                    YouTube
                  </a>
                </div>
                <div className="space-y-2">
                  <Link href="/chi-siamo" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    Chi Siamo
                  </Link>
                  <Link href="/attivita" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    Le Nostre Attività
                  </Link>
                  <Link href="/programma" className="block font-poppins text-movieboli-crema/85 hover:text-movieboli-violaPrincipale transition-colors">
                    Programma Dettagliato
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-movieboli-crema/20 mt-16 pt-8 text-center">
              <p className="font-poppins text-movieboli-crema/80">
                © 2024 MoviEboli Film Festival - MOVIEBOLI Associazione Culturale • Festival del Cinema Indipendente
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
