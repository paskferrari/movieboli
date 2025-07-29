import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FestivalFooter from '../../components/festival/FestivalFooter';

/**
 * Pagina Ospiti - MoviEboli Film Festival 2025
 * Design: cinematografico, elegante, informativo
 * Organizzazione: 5 ospiti divisi per 3 giorni del festival
 */
const OspitiPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('giorno1');
  const [selectedGuest, setSelectedGuest] = useState(null);
  
  // Simulazione del caricamento iniziale ottimizzata
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Dati degli ospiti dal JSON organizzati per giorni secondo il programma
  // Dati degli ospiti aggiornati secondo il programma del festival
  const guestsByDay = {
    giorno1: {
      date: "Giovedì 22 Agosto 2025",
      title: "Prima Giornata - Apertura Festival",
      schedule: "Intervista Ospiti: 21:00-21:30",
      film: "Mixed by Erry di Sibilia (21:30-23:30)",
      cortometraggi: ["Dieci Secondi", "Place Under the Sun", "Ya Hanouni", "Appuntamento a Mezzogiorno"],
      guests: [
        {
          nome: "Emanuele Palumbo",
          bio: "Emanuele Palumbo è un regista e videomaker italiano. I suoi lavori spaziano tra videoclip musicali, cortometraggi e documentari, con uno stile visivo diretto e coinvolgente. Si distingue per la capacità di raccontare storie intime con uno sguardo autentico e contemporaneo.",
          foto: "https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg",
          ruolo: "Regista e Videomaker",
          dettagli: {
            filmografia: ["Cortometraggio A", "Documentario B", "Videoclip C"],
            premi: ["Premio Miglior Regia 2023", "Menzione Speciale Festival XYZ"],
            curiosita: "Ha iniziato la sua carriera come fotografo prima di passare al cinema."
          }
        },
        {
          nome: "Giuseppe Arena",
          bio: "Giuseppe Arena è un compositore e musicista italiano, attivo nel campo delle colonne sonore per cinema e teatro. La sua musica è caratterizzata da atmosfere evocative e da una ricerca timbrica raffinata. Collabora spesso con autori teatrali e registi del panorama indipendente.",
          foto: "https://i.ibb.co/WWDttfmZ/GIUSEPPE-ARENA.jpg",
          ruolo: "Compositore e Musicista",
          dettagli: {
            filmografia: ["Colonna Sonora Film A", "Teatro B", "Documentario C"],
            premi: ["Premio Miglior Colonna Sonora 2022"],
            curiosita: "Utilizza strumenti tradizionali del Sud Italia nelle sue composizioni."
          }
        },
        {
          nome: "Luigi D'Oriano",
          bio: "Luigi D'Oriano è un montatore cinematografico italiano, con esperienza in film d'autore e documentari. Ha lavorato con registi emergenti e affermati, curando il ritmo narrativo e l'equilibrio visivo delle opere a cui ha partecipato. È docente e consulente in post-produzione.",
          foto: "https://i.ibb.co/zyMGPT9/LUIGI-D-ORIANO.jpg",
          ruolo: "Montatore e Docente",
          dettagli: {
            filmografia: ["Film d'autore A", "Documentario B", "Serie TV C"],
            premi: ["Nastro d'Argento Miglior Montaggio 2021"],
            curiosita: "Insegna tecniche di montaggio presso l'Accademia di Cinema di Roma."
          }
        }
      ]
    },
    giorno2: {
      date: "Venerdì 23 Agosto 2025",
      title: "Seconda Giornata - Focus Autore",
      schedule: "Intervista Ospite: 21:00-21:30",
      film: "Yaya e Lennie - The Walking Liberty di Alessandro Rak (21:30-23:30)",
      cortometraggi: ["Sharing is Caring", "The Rock Tensions", "Jus d'Orange", "Fathers Letters"],
      guests: [
        {
          nome: "Mario Martone",
          bio: "Mario Martone è un regista, sceneggiatore e drammaturgo italiano. Tra i principali esponenti del cinema d'autore italiano contemporaneo, ha diretto film come 'Morte di un matematico napoletano', 'L'amore molesto', 'Teatro di guerra', 'Noi credevamo' e 'Capri-Revolution'. Ha vinto numerosi premi internazionali e la sua opera spazia tra cinema, teatro e opera lirica.",
          foto: "https://i.ibb.co/VptMKV2X/licensed-image.jpg ",
          ruolo: "Regista e Drammaturgo",
          dettagli: {
            filmografia: ["L'amore molesto", "Noi credevamo", "Capri-Revolution", "Qui rido io"],
            premi: ["David di Donatello", "Nastro d'Argento", "Premio Venezia"],
            curiosita: "Ha fondato il gruppo teatrale Falso Movimento negli anni '80."
          }
        }
      ]
    },
    giorno3: {
      date: "Sabato 24 Agosto 2025",
      title: "Terza Giornata - Chiusura e Premiazioni",
      schedule: "Intervista Ospite: 21:00-21:30",
      film: "Gatta Cenerentola di Alessandro Rak (21:30-23:30)",
      cortometraggi: ["Tutti i cortometraggi in gara - Serata finale"],
      guests: [
        {
          nome: "Alessandro Rak",
          bio: "Alessandro Rak è un regista, sceneggiatore e illustratore italiano, noto per il suo lavoro nell'animazione. Ha co-diretto film d'animazione come 'L'arte della felicità', 'Gatta Cenerentola' e 'Yaya e Lennie - The Walking Liberty', opere che hanno ricevuto numerosi riconoscimenti internazionali. Il suo stile fonde animazione digitale e atmosfere cinematografiche profonde e poetiche.",
          foto: "https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg",
          ruolo: "Regista e Animatore",
          dettagli: {
            filmografia: ["L'arte della felicità", "Gatta Cenerentola", "Yaya e Lennie"],
            premi: ["David di Donatello Miglior Film d'Animazione", "Nastro d'Argento"],
            curiosita: "I suoi film d'animazione sono ambientati nella Napoli contemporanea."
          }
        }
      ]
    }
  };

  const days = Object.keys(guestsByDay);

  return (
    <>
      <Head>
        <title>Ospiti del Festival 2025 | MOVIEBOLI Festival</title>
        <meta name="description" content="Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: Alessandro Rak, Francesco Lettieri, Luigi D'Oriano, Giuseppe Arena e Emanuele Palumbo." />
        <meta property="og:title" content="Ospiti del Festival 2025 | MOVIEBOLI Festival" />
        <meta property="og:description" content="Tre giorni con i protagonisti del cinema italiano contemporaneo." />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      
      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-nero">
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MoviEboli Festival</h2>
            <p className="text-sm sm:text-base text-movieboli-crema/80">Caricamento ospiti...</p>
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
                Ospiti Speciali del MOVIEBOLI Film Festival 2025
              </h1>
              <p className="text-lg md:text-xl text-movieboli-crema/80 mb-6 max-w-3xl mx-auto">
                Tre giorni con i protagonisti del cinema italiano contemporaneo
              </p>
              <p className="text-base md:text-lg text-movieboli-violaPrincipale font-semibold mb-10">
                22-24 Agosto 2025 • Cinema Vittoria, Eboli
              </p>
              <Link href="/festival" legacyBehavior passHref>
                <motion.a
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Festival
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
                {days.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeDay === day
                        ? 'bg-movieboli-violaPrincipale text-movieboli-nero'
                        : 'text-movieboli-crema hover:bg-movieboli-violaPrincipale/20'
                    }`}
                  >
                    Giorno {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contenuto principale - Ospiti per giorno */}
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
                {/* Header del giorno */}
                <div className="text-center mb-12">
                  <motion.div
                    className="inline-block px-4 py-2 rounded-full bg-movieboli-violaPrincipale/20 border border-movieboli-violaPrincipale/40 mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-movieboli-violaPrincipale font-semibold text-sm sm:text-base">
                      {guestsByDay[activeDay].date}
                    </span>
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-movieboli-rosaPastello to-movieboli-violaPrincipale">
                    {guestsByDay[activeDay].title}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-movieboli-violaPrincipale font-medium">
                      {guestsByDay[activeDay].schedule}
                    </p>
                    <p className="text-movieboli-crema/80 text-sm">
                      Film: {guestsByDay[activeDay].film}
                    </p>
                    <p className="text-movieboli-crema/60 text-xs">
                      Cortometraggi: {guestsByDay[activeDay].cortometraggi.join(", ")}
                    </p>
                  </div>
                </div>
                
                {/* Griglia degli ospiti */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {guestsByDay[activeDay].guests.map((guest, index) => (
                    <motion.div
                      key={guest.nome}
                      className="bg-movieboli-bordeaux/10 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => setSelectedGuest(guest)}
                    >
                      {/* Immagine ospite centrata */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={guest.foto}
                          alt={guest.nome}
                          fill
                          className="object-cover object-center transition-transform duration-300 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-movieboli-nero/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{guest.nome}</h3>
                          <p className="text-movieboli-violaPrincipale font-medium">{guest.ruolo}</p>
                        </div>
                      </div>
                      
                      {/* Bio ospite */}
                      <div className="p-6">
                        <p className="text-movieboli-crema/80 text-sm leading-relaxed line-clamp-3 mb-4">
                          {guest.bio}
                        </p>
                        <button className="text-movieboli-violaPrincipale font-medium text-sm hover:text-movieboli-rosaPastello transition-colors">
                          Scopri di più →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                Ogni giornata prevede la proiezione di cortometraggi selezionati seguita da incontri con gli ospiti speciali. 
                Gli incontri includono masterclass, Q&A con il pubblico e momenti di networking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Orario</div>
                  <div className="text-movieboli-crema/80">20:30 - 23:00</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Luogo</div>
                  <div className="text-movieboli-crema/80">Cinema Vittoria</div>
                </div>
                <div className="bg-movieboli-violaPrincipale/10 rounded-lg p-4">
                  <div className="font-semibold text-movieboli-violaPrincipale mb-1">Ingresso</div>
                  <div className="text-movieboli-crema/80">Gratuito</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Unificato Festival */}
        <FestivalFooter />
      </main>
    </>
  );
};

export default OspitiPage;