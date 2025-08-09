import { useState } from 'react';
import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditableText from '../components/ui/EditableText';

const PodcastHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.846l3.537-2.816z" clipRule="evenodd" />
              <path d="M15.025 7.05a3.5 3.5 0 010 5.9m2.121-7.778a6.5 6.5 0 010 9.556" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-movieboli-accent-400">
              <EditableText 
                contentKey="podcast_hero_title" 
                defaultText="Ciliegie" 
                tag="span"
              />
            </span>
            <span className="block text-3xl md:text-5xl font-normal text-movieboli-secondary-100 mt-2">
              <EditableText 
                contentKey="podcast_hero_subtitle" 
                defaultText="Podcast" 
                tag="span"
              />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-movieboli-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            <EditableText 
              contentKey="podcast_hero_description" 
              defaultText="Il podcast di MOVIEBOLI APS dedicato al cinema, alle interviste esclusive e alle discussioni culturali che fanno la differenza." 
              tag="span"
            />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#episodi" 
              className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="podcast_hero_cta_episodes" 
                defaultText="🎧 Ascolta gli Episodi" 
                tag="span"
              />
            </a>
            <a 
              href="#prenotazione" 
              className="bg-movieboli-secondary-600 hover:bg-movieboli-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="podcast_hero_cta_booking" 
                defaultText="📹 Prenota Riprese Live" 
                tag="span"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutPodcastSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-movieboli-primary-900 mb-6">
              <EditableText 
                contentKey="podcast_about_title" 
                defaultText="Cos'è Ciliegie Podcast?" 
                tag="span"
              />
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="podcast_about_description_1" 
                defaultText="Ciliegie Podcast è il nostro appuntamento settimanale con il mondo del cinema. Ogni episodio è un viaggio attraverso storie, interviste e analisi approfondite del panorama cinematografico contemporaneo." 
                tag="span"
              />
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="podcast_about_description_2" 
                defaultText="Il nome Ciliegie rappresenta la dolcezza e l'autenticità delle conversazioni che nascono spontaneamente quando si parla di cinema con passione e competenza." 
                tag="span"
              />
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <EditableText 
                contentKey="podcast_about_description_3" 
                defaultText="Dalle produzioni indipendenti ai grandi blockbuster, dalle interviste esclusive con registi emergenti alle analisi dei classici del cinema, ogni episodio offre una prospettiva unica e appassionata." 
                tag="span"
              />
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-movieboli-accent-100 to-movieboli-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎙️</div>
                <h3 className="text-2xl font-bold text-movieboli-primary-900 mb-2">
                  <EditableText 
                    contentKey="podcast_about_frequency_title" 
                    defaultText="Ogni Settimana" 
                    tag="span"
                  />
                </h3>
                <p className="text-gray-700 text-lg">
                  <EditableText 
                    contentKey="podcast_about_frequency_description" 
                    defaultText="Nuovi episodi e contenuti esclusivi" 
                    tag="span"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EpisodiSection = () => {
  const episodi = [
    {
      numero: "#15",
      titolo: "Il Cinema Indipendente Italiano nel 2024",
      descrizione: "Un'analisi approfondita delle produzioni indipendenti italiane più interessanti dell'anno.",
      durata: "45 min",
      data: "15 Dic 2024",
      ospite: "Marco Bellocchio Jr."
    },
    {
      numero: "#14",
      titolo: "Intervista a Sofia Scandurra",
      descrizione: "La giovane regista campana ci racconta il suo ultimo cortometraggio premiato a Venezia.",
      durata: "38 min",
      data: "8 Dic 2024",
      ospite: "Sofia Scandurra"
    },
    {
      numero: "#13",
      titolo: "I Festival Cinematografici del Sud Italia",
      descrizione: "Un viaggio attraverso i festival più importanti del Meridione e il loro impatto culturale.",
      durata: "52 min",
      data: "1 Dic 2024",
      ospite: "Giuseppe Tornatore"
    },
    {
      numero: "#12",
      titolo: "Cinema e Territorio: Eboli nel Cinema",
      descrizione: "Come il nostro territorio è stato rappresentato nel cinema italiano e internazionale.",
      durata: "41 min",
      data: "24 Nov 2024",
      ospite: "Laura Delli Colli"
    }
  ];
  
  return (
    <section id="episodi" className="py-20 bg-movieboli-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="podcast_episodes_title" 
              defaultText="Archivio Episodi" 
              tag="span"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-accent-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <EditableText 
              contentKey="podcast_episodes_description" 
              defaultText="Scopri i nostri episodi più recenti e immergiti nel mondo del cinema attraverso le nostre conversazioni." 
              tag="span"
            />
          </p>
        </div>
        
        <div className="grid gap-6">
          {episodi.map((episodio, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="bg-movieboli-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                      {episodio.numero}
                    </span>
                    <span className="text-gray-500 text-sm">{episodio.data}</span>
                    <span className="text-gray-500 text-sm ml-3">• {episodio.durata}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-movieboli-primary-900 mb-2">
                    {episodio.titolo}
                  </h3>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {episodio.descrizione}
                  </p>
                  
                  <div className="flex items-center text-sm text-movieboli-secondary-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Ospite: {episodio.ospite}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col sm:flex-row gap-3">
                  <button className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    ▶ Ascolta
                  </button>
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                    📥 Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <EditableText 
              contentKey="podcast_episodes_view_all" 
              defaultText="Vedi Tutti gli Episodi" 
              tag="span"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

const PrenotazioneSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    note: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dateOptions = [
    { value: '', label: 'Seleziona una data' },
    { value: '2025-02-15', label: '15 Febbraio 2025' },
    { value: '2025-02-22', label: '22 Febbraio 2025' },
    { value: '2025-03-01', label: '1 Marzo 2025' },
    { value: '2025-03-08', label: '8 Marzo 2025' },
    { value: '2025-03-15', label: '15 Marzo 2025' },
    { value: '2025-03-22', label: '22 Marzo 2025' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }
    
    if (!formData.data) {
      newErrors.data = 'Seleziona una data';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Save to console (temporary)
      console.log('Prenotazione riprese live:', formData);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ nome: '', email: '', data: '', note: '' });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <section id="prenotazione" className="py-20 bg-movieboli-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-movieboli-primary-900 mb-4">
              <EditableText 
                contentKey="podcast_booking_success_title" 
                defaultText="Prenotazione Confermata!" 
                tag="span"
              />
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              <EditableText 
                contentKey="podcast_booking_success_description" 
                defaultText="Grazie per la tua prenotazione. Ti contatteremo presto con tutti i dettagli per partecipare alle riprese live del nostro podcast." 
                tag="span"
              />
            </p>
            <div className="bg-movieboli-accent-50 border border-movieboli-accent-200 rounded-lg p-4">
              <p className="text-movieboli-accent-800 font-medium">
                <EditableText 
                  contentKey="podcast_booking_success_email_note" 
                  defaultText="📧 Riceverai una email di conferma a breve" 
                  tag="span"
                />
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prenotazione" className="py-20 bg-movieboli-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="podcast_booking_title" 
              defaultText="Prenota le Riprese Live" 
              tag="span"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-accent-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <EditableText 
              contentKey="podcast_booking_description" 
              defaultText="Vuoi assistere alle riprese live del nostro podcast? Prenota il tuo posto e vivi l'esperienza dal vivo!" 
              tag="span"
            />
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-movieboli-primary-900 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-movieboli-accent-500 focus:border-movieboli-accent-500 transition-colors ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Il tuo nome completo"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-movieboli-primary-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-movieboli-accent-500 focus:border-movieboli-accent-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="la-tua-email@esempio.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-semibold text-movieboli-primary-900 mb-2">
                Data Preferita *
              </label>
              <select
                id="data"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-movieboli-accent-500 focus:border-movieboli-accent-500 transition-colors ${
                  errors.data ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data}</p>}
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-semibold text-movieboli-primary-900 mb-2">
                Note Aggiuntive
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-movieboli-accent-500 focus:border-movieboli-accent-500 transition-colors resize-none"
                placeholder="Hai qualche richiesta particolare o domanda? Scrivila qui..."
              />
            </div>

            <div className="bg-movieboli-secondary-50 border border-movieboli-secondary-200 rounded-lg p-4">
              <p className="text-sm text-movieboli-primary-800">
                <strong>📍 Informazioni:</strong> 
                Le riprese si svolgono presso il nostro studio a Eboli. Ti invieremo tutti i dettagli via email dopo la conferma.
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <EditableText 
                  contentKey="podcast_booking_submit_button" 
                  defaultText="🎬 Prenota il Tuo Posto" 
                  tag="span"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};



export default function Podcast() {
  return (
    <BrandingProvider>
      <div className="min-h-screen bg-white">
        <Head>
          <title>Podcast Ciliegie - MOVIEBOLI APS</title>
          <meta name="description" content="Podcast Ciliegie è il podcast di MOVIEBOLI dedicato al cinema, alle interviste esclusive e alle discussioni culturali. Ascolta i nostri episodi settimanali." />
          <meta name="keywords" content="podcast, cinema, ciliegie, MOVIEBOLI, interviste, film, cultura, Eboli" />
          <meta property="og:title" content="Podcast Ciliegie - MOVIEBOLI APS" />
          <meta property="og:description" content="Il podcast di MOVIEBOLI dedicato al cinema, alle interviste esclusive e alle discussioni culturali." />
          <meta property="og:image" content="/logo-movieboli.png" />
          <meta property="og:type" content="website" />
        </Head>
        
        <Navbar />
        
        <main>
          <PodcastHero />
          <AboutPodcastSection />
          <EpisodiSection />
          <PrenotazioneSection />

        </main>
        
        <Footer />
      </div>
    </BrandingProvider>
  );
}