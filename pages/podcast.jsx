
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

// Componente Hero della pagina Podcast
const PodcastHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 overflow-hidden">
      {/* Elementi decorativi animati */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 transform transition-all duration-1000 ${isVisible ? 'scale-100 rotate-45' : 'scale-0'}`}></div>
        <div className={`absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full opacity-10 transform transition-all duration-1500 ${isVisible ? 'scale-100 -rotate-45' : 'scale-0'}`}></div>
        <div className={`absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-15 transform transition-all duration-2000 ${isVisible ? 'scale-100' : 'scale-0'}`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Titolo principale */}
        <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="text-yellow-400">Macine</span> Podcast
        </h1>

        {/* Sottotitolo */}
        <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl transform transition-all duration-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Il podcast degli affamati di cinema
        </p>

        {/* Call to action */}
        <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <a 
            href="#prossimi-episodi" 
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Prenota il tuo posto
          </a>
          <a 
            href="#episodi-passati" 
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Ascolta gli episodi
          </a>
        </div>
      </div>
    </section>
  );
};

// Sezione Descrizione Podcast
const DescrizionePodcastSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Logo */}
          <div className="lg:w-1/3 flex justify-center">
            <img 
              src="/images/logomacine.png" 
              alt="Macine Podcast" 
              className="w-48 h-48 object-contain"
            />
          </div>
          
          {/* Descrizione */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              MACINE Podcast è arrivato!
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                🎬 Hai presente quelle interviste sul cinema tutte impostate, piene di paroloni e silenzi imbarazzanti? Eccoci. Prodotto da MOVIEBOLI, in ogni puntata chiacchieriamo con professionisti del cinema: registi, attori, montatori, sceneggiatori, tecnici, comparse, ex comparse. Tutto senza prenderci troppo sul serio. (Ma nemmeno troppo poco.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente per i Prossimi Episodi (Eventi Live)
const ProssimiEpisodiSection = () => {
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const [datiPrenotazione, setDatiPrenotazione] = useState({
    nome: '',
    email: '',
    telefono: '',
    note: ''
  });
  const [postiDisponibili] = useState({
    '22-agosto': 45,
    '23-agosto': 38,
    '24-agosto': 42
  });
  const [errori, setErrori] = useState({});
  const [prenotazioneInviata, setPrenotazioneInviata] = useState(false);
  const [caricamento, setCaricamento] = useState(false);

  // Dati degli eventi aggiornati
  const prossimiEpisodi = [
    {
      id: '22-agosto',
      data: '22 Agosto 2025',
      orario: '17.30',
      luogo: 'Giardino Vacca de Dominicis,Eboli',
      titolo: 'Episodio Live: Mixed by Erry',
      ospiti: ['Cast di Mixed by Erry'],
      descrizione: 'Una serata speciale con tutto il cast del film Mixed by Erry.',
      immagine: 'https://i.ibb.co/FGby12B/image.png' // Locandina ufficiale del film
    },
    {
      id: '23-agosto',
      data: '23 Agosto 2025',
      orario: '17.30',
      luogo: 'Giardino Vacca de Dominicis,Eboli',
      titolo: 'Episodio Live: Il Cinema Contemporaneo',
      ospiti: ['Pierluigi Gigante'],
      descrizione: 'Un incontro esclusivo con Pierluigi Gigante per parlare di cinema contemporaneo.',
      immagine: '/images/ospiti/pierluigi_gigante.png'
    },
    {
      id: '24-agosto',
      data: '24 Agosto 2025',
      orario: '17.30',
      luogo: 'Giardino Vacca de Dominicis,Eboli',
      titolo: 'Episodio Live: L\'Animazione Italiana',
      ospiti: ['Alessandro Rak'],
      descrizione: 'Scopri i segreti dell\'animazione italiana con il regista di Gatta Cenerentola.',
      immagine: 'https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg'
    }
  ];

  const validaForm = () => {
    const nuoviErrori = {};
    
    if (!datiPrenotazione.nome.trim()) {
      nuoviErrori.nome = 'Il nome è obbligatorio';
    }
    
    if (!datiPrenotazione.email.trim()) {
      nuoviErrori.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(datiPrenotazione.email)) {
      nuoviErrori.email = 'Inserisci un\'email valida';
    }
    
    if (!datiPrenotazione.telefono.trim()) {
      nuoviErrori.telefono = 'Il telefono è obbligatorio';
    }
    
    setErrori(nuoviErrori);
    return Object.keys(nuoviErrori).length === 0;
  };

  const gestisciPrenotazione = async (e) => {
    e.preventDefault();
    
    if (!validaForm()) return;
    
    setCaricamento(true);
    
    // Simulazione invio prenotazione
    setTimeout(() => {
      setCaricamento(false);
      setPrenotazioneInviata(true);
      setEventoSelezionato(null);
      setDatiPrenotazione({ nome: '', email: '', telefono: '', note: '' });
      
      setTimeout(() => {
        setPrenotazioneInviata(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="prossimi-episodi" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Prossimi <span className="text-yellow-500">Episodi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Non perdere l'opportunità di assistere dal vivo alle registrazioni del nostro podcast. 
            Prenota il tuo posto per gli eventi in programma.
          </p>
        </div>

        {/* Griglia degli eventi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {prossimiEpisodi.map((episodio) => (
            <div key={episodio.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={episodio.immagine} 
                  alt={episodio.titolo}
                  className="w-full h-64 object-cover object-top"
                  style={{
                    objectPosition: episodio.id === '22-agosto' ? 'center top' : 'center center'
                  }}
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {postiDisponibili[episodio.id]} posti
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <span className="text-sm font-semibold">{episodio.data}</span>
                  <span className="text-sm">• {episodio.orario}</span>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2">{episodio.titolo}</h3>
                
                <p className="text-gray-600 mb-4 text-sm">{episodio.descrizione}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">📍 {episodio.luogo}</p>
                  <p className="text-sm text-gray-500">🎤 {episodio.ospiti.join(', ')}</p>
                </div>
                
                <button
                  onClick={() => setEventoSelezionato(episodio)}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  Prenota ora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Messaggio di conferma */}
        {prenotazioneInviata && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
            ✅ Prenotazione inviata con successo!
          </div>
        )}
      </div>

      {/* Modal di prenotazione */}
      {eventoSelezionato && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-black">
                  Prenota per {eventoSelezionato.titolo}
                </h3>
                <button
                  onClick={() => setEventoSelezionato(null)}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>📅 Data:</strong> {eventoSelezionato.data} alle {eventoSelezionato.orario}<br/>
                  <strong>📍 Luogo:</strong> {eventoSelezionato.luogo}<br/>
                  <strong>🎤 Ospiti:</strong> {eventoSelezionato.ospiti.join(', ')}<br/>
                  <strong>🎫 Posti disponibili:</strong> {postiDisponibili[eventoSelezionato.id]}
                </p>
              </div>

              <form onSubmit={gestisciPrenotazione} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={datiPrenotazione.nome}
                    onChange={(e) => setDatiPrenotazione({...datiPrenotazione, nome: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${errori.nome ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Il tuo nome completo"
                  />
                  {errori.nome && <p className="text-red-500 text-sm mt-1">{errori.nome}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={datiPrenotazione.email}
                    onChange={(e) => setDatiPrenotazione({...datiPrenotazione, email: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${errori.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="la-tua-email@esempio.com"
                  />
                  {errori.email && <p className="text-red-500 text-sm mt-1">{errori.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    value={datiPrenotazione.telefono}
                    onChange={(e) => setDatiPrenotazione({...datiPrenotazione, telefono: e.target.value})}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${errori.telefono ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+39 123 456 7890"
                  />
                  {errori.telefono && <p className="text-red-500 text-sm mt-1">{errori.telefono}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note aggiuntive
                  </label>
                  <textarea
                    value={datiPrenotazione.note}
                    onChange={(e) => setDatiPrenotazione({...datiPrenotazione, note: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    rows="3"
                    placeholder="Eventuali richieste speciali o note..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">ℹ️ Informazioni importanti:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• L'evento si svolge all'aperto</li>
                    <li>• In caso di maltempo, l'evento sarà rimandato</li>
                    <li>• Riceverai conferma via email entro 24 ore</li>
                    <li>• L'ingresso è gratuito ma la prenotazione è obbligatoria</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEventoSelezionato(null)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={caricamento}
                    className="flex-1 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 disabled:opacity-50"
                  >
                    {caricamento ? 'Invio...' : 'Conferma prenotazione'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Componente per gli Episodi Passati
const EpisodiPassatiSection = () => {
  const episodiPassati = [
    {
      id: 1,
      titolo: "Cinema e Videomaking",
      ospite: "Emanuele Palumbo",
      descrizione: "Un approfondimento sul mondo del videomaking e del cinema contemporaneo con Emanuele Palumbo.",
      durata: "42:15",
      data: "15 Luglio 2025",
      immagine: "https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg",
      youtube_url: "https://youtu.be/q9Tl8DxDVLE?si=i5f8IH_Mq7xlJdES"
    }
  ];

  return (
    <section id="episodi-passati" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Episodi <span className="text-yellow-500">Passati</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rivedi le nostre interviste esclusive con i protagonisti del cinema.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodiPassati.map((episodio) => (
            <div key={episodio.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={episodio.immagine} 
                  alt={episodio.titolo}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {episodio.durata}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <span className="text-sm font-semibold">{episodio.data}</span>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2">{episodio.titolo}</h3>
                
                <p className="text-gray-600 mb-4 text-sm">{episodio.descrizione}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">🎤 Con {episodio.ospite}</p>
                </div>
                
                <a
                  href={episodio.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  ▶️ Guarda su YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente principale della pagina Podcast
const Podcast = () => {
  return (
    <>
      <Head>
        <title>Macine Podcast - Il Cinema Raccontato dai Protagonisti | MoviEboli</title>
        <meta name="description" content="Scopri Macine Podcast: interviste esclusive con registi, attori e professionisti del cinema. Prenota il tuo posto per gli eventi live a Eboli." />
        <meta name="keywords" content="podcast, cinema, interviste, registi, attori, Eboli, eventi live, Alessandro Rak, Pierluigi Gigante" />
        <meta property="og:title" content="Macine Podcast - Il Cinema Raccontato dai Protagonisti" />
        <meta property="og:description" content="Interviste esclusive con i protagonisti del cinema italiano e internazionale. Eventi live a Eboli." />
        <meta property="og:image" content="/images/logomacine.png" />
        <meta property="og:type" content="website" />
      </Head>
      
      <Navbar />
      <PodcastHero />
      <DescrizionePodcastSection />
      <ProssimiEpisodiSection />
      <EpisodiPassatiSection />
      <Footer />
    </>
  );
};

export default Podcast;