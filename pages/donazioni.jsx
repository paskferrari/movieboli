import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const DonazioniHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-primary-100">Sostieni</span>
            <span className="block text-3xl md:text-5xl font-normal text-secondary-100 mt-2">
              MOVIEBOLI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-movieboli-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Il tuo contributo ci aiuta a promuovere la cultura cinematografica 
            e a sostenere i giovani talenti del territorio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#dona-ora" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Dona Ora
            </a>
            <a 
              href="#come-usiamo" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Come Usiamo i Fondi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const PercheDonareSection = () => {
  const motivi = [
    {
      icon: "🎬",
      titolo: "Promuoviamo il Cinema",
      descrizione: "Organizziamo eventi, festival e proiezioni per diffondere la cultura cinematografica nel territorio."
    },
    {
      icon: "🌟",
      titolo: "Sosteniamo i Talenti",
      descrizione: "Offriamo opportunità e visibilità ai giovani registi, attori e professionisti del cinema emergenti."
    },
    {
      icon: "🎓",
      titolo: "Educhiamo",
      descrizione: "Creiamo workshop, masterclass e programmi educativi per avvicinare le nuove generazioni al cinema."
    },
    {
      icon: "🤝",
      titolo: "Costruiamo Comunità",
      descrizione: "Uniamo appassionati, professionisti e curiosi in una rete di condivisione e crescita culturale."
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Perché Donare a MOVIEBOLI?
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            La tua donazione ha un impatto diretto sulla nostra comunità e 
            contribuisce a creare opportunità concrete per la cultura cinematografica.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {motivi.map((motivo, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {motivo.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {motivo.titolo}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {motivo.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComeUsiamoSection = () => {
  const utilizzi = [
    {
      percentuale: "40%",
      categoria: "Eventi e Festival",
      descrizione: "Organizzazione del Festival del Cinema, proiezioni speciali e eventi culturali",
      colore: "bg-primary-600"
    },
    {
      percentuale: "25%",
      categoria: "Supporto ai Talenti",
      descrizione: "Borse di studio, premi e sostegno economico per giovani filmmaker",
      colore: "bg-secondary-600"
    },
    {
      percentuale: "20%",
      categoria: "Educazione",
      descrizione: "Workshop, masterclass e programmi educativi nelle scuole",
      colore: "bg-green-600"
    },
    {
      percentuale: "15%",
      categoria: "Spese Operative",
      descrizione: "Gestione dell'associazione, comunicazione e amministrazione",
      colore: "bg-orange-600"
    }
  ];
  
  return (
    <section id="come-usiamo" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Come Utilizziamo le Donazioni
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Trasparenza e responsabilità: ecco come investiamo ogni euro 
            che riceviamo per massimizzare l'impatto culturale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {utilizzi.map((utilizzo, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className={`${utilizzo.colore} text-white text-2xl font-bold px-4 py-2 rounded-lg mr-4`}>
                  {utilizzo.percentuale}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {utilizzo.categoria}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {utilizzo.descrizione}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rendicontazione Annuale
            </h3>
            <p className="text-gray-700 mb-6">
              Ogni anno pubblichiamo un report dettagliato sull'utilizzo dei fondi 
              e sui risultati raggiunti grazie al vostro sostegno.
            </p>
            <a 
              href="#" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Scarica l'Ultimo Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const DonaOraSection = () => {
  const [importoPersonalizzato, setImportoPersonalizzato] = useState('');
  const [importoSelezionato, setImportoSelezionato] = useState(null);
  const [modalitaDonazione, setModalitaDonazione] = useState('unica');
  
  const importiSuggeriti = [10, 25, 50, 100, 250, 500];
  
  const handleImportoClick = (importo) => {
    setImportoSelezionato(importo);
    setImportoPersonalizzato('');
  };
  
  const handleImportoPersonalizzato = (e) => {
    setImportoPersonalizzato(e.target.value);
    setImportoSelezionato(null);
  };
  
  const handleDonazione = () => {
    const importo = importoSelezionato || parseFloat(importoPersonalizzato);
    if (importo && importo > 0) {
      alert(`Grazie per la tua donazione di €${importo}! Ti reindirizzeremo al sistema di pagamento.`);
    } else {
      alert('Seleziona o inserisci un importo valido.');
    }
  };
  
  return (
    <section id="dona-ora" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Fai una Donazione
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Scegli l'importo che preferisci e contribuisci a sostenere 
            la nostra missione culturale.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-8">
          {/* Modalità di donazione */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modalità di donazione</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setModalitaDonazione('unica')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  modalitaDonazione === 'unica'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Donazione Unica
              </button>
              <button
                onClick={() => setModalitaDonazione('mensile')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  modalitaDonazione === 'mensile'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Donazione Mensile
              </button>
            </div>
          </div>
          
          {/* Importi suggeriti */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scegli un importo</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {importiSuggeriti.map((importo) => (
                <button
                  key={importo}
                  onClick={() => handleImportoClick(importo)}
                  className={`p-4 rounded-lg font-semibold transition-colors ${
                    importoSelezionato === importo
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  €{importo}
                </button>
              ))}
            </div>
            
            {/* Importo personalizzato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oppure inserisci un importo personalizzato
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  value={importoPersonalizzato}
                  onChange={handleImportoPersonalizzato}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          
          {/* Riepilogo */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Riepilogo Donazione</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Importo:</span>
              <span className="font-semibold text-xl text-primary-600">
                €{importoSelezionato || importoPersonalizzato || '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Modalità:</span>
              <span className="font-semibold">
                {modalitaDonazione === 'unica' ? 'Donazione Unica' : 'Donazione Mensile'}
              </span>
            </div>
            
            {modalitaDonazione === 'mensile' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm">
                  💡 Con una donazione mensile ci aiuti a pianificare meglio le nostre attività 
                  e a garantire continuità ai nostri progetti.
                </p>
              </div>
            )}
          </div>
          
          {/* Metodi di pagamento */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metodi di pagamento</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">💳</div>
                <span className="font-semibold">Carta di Credito</span>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">🏦</div>
                <span className="font-semibold">Bonifico Bancario</span>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">📱</div>
                <span className="font-semibold">PayPal</span>
              </div>
            </div>
          </div>
          
          {/* Pulsante donazione */}
          <div className="text-center">
            <button
              onClick={handleDonazione}
              className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {modalitaDonazione === 'unica' ? 'Dona Ora' : 'Attiva Donazione Mensile'}
            </button>
            
            <p className="text-gray-600 text-sm mt-4">
              🔒 Pagamento sicuro e protetto. I tuoi dati sono al sicuro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AltriModiSection = () => {
  const altriModi = [
    {
      icon: "🛒",
      titolo: "5x1000",
      descrizione: "Destina il tuo 5x1000 a MOVIEBOLI. È gratuito e non ti costa nulla.",
      codice: "CF: 12345678901",
      azione: "Scopri come"
    },
    {
      icon: "🎁",
      titolo: "Donazioni in Memoria",
      descrizione: "Fai una donazione in memoria di una persona cara.",
      codice: null,
      azione: "Contattaci"
    },
    {
      icon: "🏢",
      titolo: "Sponsorizzazioni Aziendali",
      descrizione: "La tua azienda può sostenere i nostri progetti e ottenere visibilità.",
      codice: null,
      azione: "Proposta"
    },
    {
      icon: "⏰",
      titolo: "Volontariato",
      descrizione: "Dona il tuo tempo e le tue competenze per supportare le nostre attività.",
      codice: null,
      azione: "Unisciti"
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Altri Modi per Sostenere MOVIEBOLI
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Oltre alle donazioni dirette, ci sono molti altri modi 
            per supportare la nostra missione culturale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {altriModi.map((modo, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{modo.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{modo.titolo}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{modo.descrizione}</p>
              
              {modo.codice && (
                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <code className="text-sm font-mono text-gray-800">{modo.codice}</code>
                </div>
              )}
              
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                {modo.azione} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      nome: "Maria Rossi",
      ruolo: "Sostenitrice dal 2022",
      testo: "Sostengo MOVIEBOLI perché credo nel potere del cinema di unire le persone e creare cultura. Vedere i giovani talenti crescere grazie ai vostri progetti è emozionante.",
      avatar: "👩‍🎨"
    },
    {
      nome: "Giuseppe Bianchi",
      ruolo: "Imprenditore locale",
      testo: "Come azienda, siamo orgogliosi di supportare MOVIEBOLI. Il festival ha portato visibilità al nostro territorio e ha creato opportunità per tutta la comunità.",
      avatar: "👨‍💼"
    },
    {
      nome: "Anna Verdi",
      ruolo: "Ex partecipante workshop",
      testo: "Grazie ai workshop di MOVIEBOLI ho scoperto la mia passione per la regia. Ora lavoro nel cinema e tutto è iniziato qui. Il vostro lavoro cambia davvero le vite.",
      avatar: "🎬"
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Cosa Dicono i Nostri Sostenitori
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="text-4xl mb-4 text-center">{testimonial.avatar}</div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.testo}"
              </p>
              <div className="text-center">
                <h4 className="font-bold text-gray-900">{testimonial.nome}</h4>
                <p className="text-gray-600 text-sm">{testimonial.ruolo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Donazioni() {
  return (
    <BrandingProvider>
      <div className="min-h-screen bg-white">
        <Head>
          <title>Donazioni - Sostieni MOVIEBOLI APS</title>
          <meta name="description" content="Sostieni MOVIEBOLI APS con una donazione. Il tuo contributo aiuta a promuovere la cultura cinematografica e sostenere i giovani talenti del territorio." />
          <meta name="keywords" content="donazioni, sostieni, MOVIEBOLI, cinema, cultura, Eboli, associazione" />
          <meta property="og:title" content="Donazioni - Sostieni MOVIEBOLI APS" />
          <meta property="og:description" content="Il tuo contributo ci aiuta a promuovere la cultura cinematografica e a sostenere i giovani talenti del territorio." />
          <meta property="og:image" content="/logo-movieboli.png" />
          <meta property="og:type" content="website" />
        </Head>
        
        <Navbar />
        
        <main>
          <DonazioniHero />
          <PercheDonareSection />
          <ComeUsiamoSection />
          <DonaOraSection />
          <AltriModiSection />
          <TestimonialsSection />
        </main>
        
        <Footer />
      </div>
    </BrandingProvider>
  );
}