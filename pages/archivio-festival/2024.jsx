import Head from 'next/head';
import { BrandingProvider } from '../../contexts/BrandingContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EditableText from '../../components/ui/EditableText';

const Festival2024Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v6H4V5h1zm0 8H4v2h1v-2z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-primary-100">
              <EditableText contentKey="festival_2024_hero_title" defaultText="Festival" />
            </span>
            <span className="block text-3xl md:text-5xl font-normal text-secondary-100 mt-2">
              <EditableText contentKey="festival_2024_hero_year" defaultText="2024" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-movieboli-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            <EditableText contentKey="festival_2024_hero_subtitle" defaultText="Rivivi i momenti più emozionanti della seconda edizione del MOVIEBOLI Film Festival." />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#highlights" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText contentKey="festival_2024_cta_highlights" defaultText="Highlights 2024" />
            </a>
            <a 
              href="#vincitori" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText contentKey="festival_2024_cta_vincitori" defaultText="Vincitori" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatisticheFestival = () => {
  const stats = [
    { numero: "156", descrizione: <EditableText contentKey="festival_2024_stat_films" defaultText="Film in Concorso" /> },
    { numero: "23", descrizione: <EditableText contentKey="festival_2024_stat_countries" defaultText="Paesi Rappresentati" /> },
    { numero: "8.500", descrizione: <EditableText contentKey="festival_2024_stat_viewers" defaultText="Spettatori" /> },
    { numero: "45", descrizione: <EditableText contentKey="festival_2024_stat_events" defaultText="Eventi Collaterali" /> }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <EditableText contentKey="festival_2024_stats_title" defaultText="Festival 2024 in Numeri" />
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {stat.numero}
              </div>
              <div className="text-gray-700 font-semibold">
                {stat.descrizione}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VincitoriSection = () => {
  const vincitori = [
    {
      categoria: "Miglior Film",
      titolo: "L'Ultimo Treno",
      regista: "Marco Bellocchio",
      paese: "Italia",
      descrizione: "Un dramma intenso ambientato nella Campania degli anni '80."
    },
    {
      categoria: "Miglior Regia",
      titolo: "Vento del Sud",
      regista: "Sofia Scandurra",
      paese: "Italia",
      descrizione: "Una storia di riscatto sociale nel profondo Sud."
    },
    {
      categoria: "Miglior Cortometraggio",
      titolo: "Radici",
      regista: "Giuseppe Tornatore Jr.",
      paese: "Italia",
      descrizione: "Un viaggio poetico tra tradizione e modernità."
    },
    {
      categoria: "Premio del Pubblico",
      titolo: "Casa Mia",
      regista: "Anna Rossi",
      paese: "Italia",
      descrizione: "Una commedia familiare che ha conquistato il cuore degli spettatori."
    }
  ];
  
  return (
    <section id="vincitori" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            I Vincitori 2024
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {vincitori.map((vincitore, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">🏆</div>
                <div>
                  <h3 className="text-lg font-bold text-primary-600">
                    {vincitore.categoria}
                  </h3>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {vincitore.titolo}
              </h4>
              
              <p className="text-gray-700 mb-2">
                <strong>Regia:</strong> {vincitore.regista}
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Paese:</strong> {vincitore.paese}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {vincitore.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HighlightsSection = () => {
  const highlights = [
    {
      titolo: "Cerimonia di Apertura",
      data: "15 Giugno 2024",
      descrizione: "Una serata magica con la partecipazione di ospiti internazionali e la proiezione del film di apertura.",
      immagine: "🎬"
    },
    {
      titolo: "Masterclass con Paolo Sorrentino",
      data: "17 Giugno 2024",
      descrizione: "Il regista premio Oscar ha condiviso i segreti del suo cinema con giovani filmmaker.",
      immagine: "🎓"
    },
    {
      titolo: "Notte Bianca del Cinema",
      data: "19 Giugno 2024",
      descrizione: "Proiezioni no-stop fino all'alba con film cult e anteprime esclusive.",
      immagine: "🌙"
    },
    {
      titolo: "Premio alla Carriera",
      data: "21 Giugno 2024",
      descrizione: "Riconoscimento speciale a Lina Wertmüller per il suo contributo al cinema italiano.",
      immagine: "⭐"
    }
  ];
  
  return (
    <section id="highlights" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Highlights del Festival
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="text-4xl mb-4 text-center">{highlight.immagine}</div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {highlight.titolo}
              </h3>
              
              <p className="text-primary-600 font-semibold mb-3">
                {highlight.data}
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                {highlight.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleriaSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Galleria Fotografica
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700">
            I momenti più belli del Festival 2024 immortalati nelle nostre foto.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl p-4 shadow-lg">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="text-4xl">📸</div>
              </div>
              <p className="text-center text-gray-700 font-semibold">
                Momento {item} del Festival
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Vedi Tutte le Foto
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Festival2024() {
  return (
    <BrandingProvider>
      <div className="min-h-screen bg-white">
        <Head>
          <title><EditableText contentKey="festival_2024_page_title" defaultText="Festival 2024 - MOVIEBOLI APS" /></title>
          <meta name="description" content={<EditableText contentKey="festival_2024_page_description" defaultText="Rivivi i momenti più emozionanti della seconda edizione del MOVIEBOLI Film Festival 2024. Scopri i vincitori, gli highlights e la galleria fotografica." />} />
          <meta name="keywords" content={<EditableText contentKey="festival_2024_page_keywords" defaultText="festival 2024, MOVIEBOLI, cinema, vincitori, highlights, Eboli" />} />
          <meta property="og:title" content="Festival 2024 - MOVIEBOLI APS" />
          <meta property="og:description" content="Rivivi i momenti più emozionanti della seconda edizione del MOVIEBOLI Film Festival 2024." />
          <meta property="og:image" content="/logo-movieboli.png" />
          <meta property="og:type" content="website" />
        </Head>
        
        <Navbar />
        
        <main>
          <Festival2024Hero />
          <StatisticheFestival />
          <VincitoriSection />
          <HighlightsSection />
          <GalleriaSection />
        </main>
        
        <Footer />
      </div>
    </BrandingProvider>
  );
}