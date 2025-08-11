import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import { useContent } from '../../contexts/ContentContext';
import EditableText from '../../components/ui/EditableText';

// Import dei dati ospiti
import ospitiData from '../../public/images/ospiti/ospiti.json';

// Aggiungi import
import Navbar from '../../components/layout/Navbar'

const OspitiPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('22 agosto'); // Cambiato da 'giovedi'
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Organizza gli ospiti per giorno
  const ospitiByday = {
    '22 agosto': ospitiData.filter(ospite => ospite.data_evento === '22 agosto 2025'),
    '23 agosto': ospitiData.filter(ospite => ospite.data_evento === '23 agosto 2025'),
    '24 agosto': ospitiData.filter(ospite => ospite.data_evento === '24 agosto 2025')
  };

  const { getContent } = useContent();
  
  // Corretto il mapping dei giorni
  const days = [
    { 
      id: '22 agosto', // Cambiato da 'giovedi'
      label: 'Giovedì 22 Agosto',
      title: 'Serata di Apertura'
    },
    { 
      id: '23 agosto', // Cambiato da 'venerdi'
      label: 'Venerdì 23 Agosto',
      title: 'Intervista a Mario Martone'
    },
    { 
      id: '24 agosto', // Cambiato da 'sabato'
      label: 'Sabato 24 Agosto',
      title: 'Intervista ad Alessandro Rak'
    }
  ];

  return (
    <>
      <Head>
        <title>
          <EditableText 
            contentKey="guests.meta.title"
            defaultValue="Ospiti del Festival 2025 | MOVIEBOLI Festival"
            tag="span"
          />
        </title>
        <meta name="description" content={
          getContent('guests.meta.description', 'Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: registi, sceneggiatori e professionisti del cinema italiano.')
        } />
        <meta property="og:title" content="Ospiti del Festival 2025 | MOVIEBOLI Festival" />
        <meta property="og:description" content="Tre serate con i grandi maestri del cinema italiano contemporaneo." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {/* Navbar Festival Standardizzata */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
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
              <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
                <EditableText 
                  contentKey="festival.nav.title"
                  defaultValue="FESTIVAL 2025"
                  tag="span"
                />
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.program"
                  defaultValue="Programma"
                  tag="span"
                />
              </Link>
              <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.shorts"
                  defaultValue="Cortometraggi"
                  tag="span"
                />
              </Link>
              <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.guests"
                  defaultValue="Ospiti"
                  tag="span"
                />
              </Link>
              <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="nav.about"
                  defaultValue="Info"
                  tag="span"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">
              <EditableText 
                contentKey="festival.loading.title"
                defaultValue="MoviEboli Festival"
                tag="span"
              />
            </h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">
              <EditableText 
                contentKey="guests.loading.message"
                defaultValue="Caricamento ospiti..."
                tag="span"
              />
            </p>
          </div>
        </div>
      )}
      
      <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
                <EditableText 
                  contentKey="guests.title"
                  defaultValue="Ospiti Speciali del MOVIEBOLI Film Festival 2025"
                  tag="span"
                />
              </h1>
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-6 max-w-3xl mx-auto">
                <EditableText 
                  contentKey="guests.subtitle"
                  defaultValue="Tre serate indimenticabili con i grandi maestri del cinema italiano contemporaneo"
                  tag="span"
                />
              </p>
              <p className="text-base md:text-lg text-movieboli-violaPrincipale font-semibold mb-10">
                <EditableText 
                  contentKey="guests.dates"
                  defaultValue="22-24 Agosto 2025 • Cinema Vittoria di Eboli"
                  tag="span"
                />
              </p>
              <Link href="/festival" legacyBehavior passHref>
                <motion.a
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <EditableText 
                    contentKey="guests.back"
                    defaultValue="Torna al Festival"
                    tag="span"
                  />
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Tab Navigation */}
        <section className="py-8 bg-movieboli-nero">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-movieboli-bordeaux/20 rounded-xl p-1">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      activeDay === day.id
                        ? 'bg-movieboli-violaPrincipale text-white shadow-lg'
                        : 'text-movieboli-crema/70 hover:text-movieboli-crema hover:bg-movieboli-violaPrincipale/20'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contenuto Ospiti */}
        <section className="py-10 sm:py-16 bg-movieboli-nero">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header della serata */}
                <div className="text-center mb-8 sm:mb-12">
                  <motion.div
                    className="inline-block px-4 py-2 rounded-full bg-movieboli-violaPrincipale/20 border border-movieboli-violaPrincipale/40 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-movieboli-violaPrincipale font-semibold text-sm sm:text-base">
                      {days.find(d => d.id === activeDay)?.label}
                    </span>
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-movieboli-rosaPastello to-movieboli-violaPrincipale">
                    {days.find(d => d.id === activeDay)?.title}
                  </h2>
                </div>
                
                {/* Griglia Ospiti - Card più grandi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {ospitiByday[activeDay]?.map((ospite, index) => (
                    <motion.div
                      key={ospite.nome}
                      className="bg-movieboli-bordeaux/10 rounded-3xl p-8 border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/40 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-movieboli-violaPrincipale/20"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setSelectedGuest(ospite)}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Foto Ospite - Molto più grande */}
                      <div className="relative w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-6 border-movieboli-violaPrincipale/40 shadow-2xl">
                        <Image
                          src={ospite.foto}
                          alt={ospite.nome}
                          fill
                          sizes="224px"
                          className="object-cover hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-avatar.jpg'
                          }}
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-movieboli-nero/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Info Ospite - Testo più grande */}
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-movieboli-violaPrincipale mb-4 leading-tight">
                          {ospite.nome}
                        </h3>
                        <p className="text-movieboli-crema/80 text-base mb-6 leading-relaxed line-clamp-4">
                          {ospite.bio}
                        </p>
                        <button className="text-movieboli-violaPrincipale font-semibold text-lg hover:text-movieboli-rosaPastello transition-colors duration-300 flex items-center justify-center mx-auto group">
                          <span>Leggi di più</span>
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Messaggio se non ci sono ospiti */}
                {(!ospitiByday[activeDay] || ospitiByday[activeDay].length === 0) && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎭</div>
                    <h3 className="text-2xl font-bold text-movieboli-violaPrincipale mb-2">
                      Ospiti in arrivo
                    </h3>
                    <p className="text-movieboli-crema/70">
                      Gli ospiti per questa serata saranno annunciati presto.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Sezione informazioni aggiuntive */}
            <motion.div
              className="mt-20 text-center bg-movieboli-bordeaux/10 rounded-2xl p-8 border border-movieboli-violaPrincipale/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-movieboli-violaPrincipale">
                Informazioni Incontri
              </h3>
              <p className="text-movieboli-crema/80 mb-6 max-w-2xl mx-auto">
                Ogni serata prevede la proiezione di cortometraggi selezionati seguita da un incontro con l'ospite speciale. 
                Gli incontri includono Q&A con il pubblico e momenti di networking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Orario</div>
                  <div className="text-movieboli-crema/80">21:00</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Luogo</div>
                  <div className="text-movieboli-crema/80">Arena di sant'antonio</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Ingresso</div>
                  <div className="text-movieboli-crema/80">Gratuito</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Modal Dettagli Ospite */}
        <AnimatePresence>
          {selectedGuest && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuest(null)}
            >
              <motion.div
                className="bg-movieboli-nero rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-movieboli-violaPrincipale/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-movieboli-violaPrincipale/30">
                      <Image
                        src={selectedGuest.foto}
                        alt={selectedGuest.nome}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-movieboli-violaPrincipale">
                        {selectedGuest.nome}
                      </h3>
                      <p className="text-movieboli-crema/70">
                        {selectedGuest.data_evento}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedGuest(null)}
                    className="text-movieboli-crema/70 hover:text-movieboli-crema transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-movieboli-crema/90 leading-relaxed">
                  {selectedGuest.bio}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Unificato Festival */}
        <Footer />
      </main>
    </>
  );
};

export default OspitiPage;