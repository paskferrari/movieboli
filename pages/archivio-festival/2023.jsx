import Head from 'next/head';
import { BrandingProvider } from '../../contexts/BrandingContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EditableText from '../../components/ui/EditableText';

const Festival2023Hero = () => {
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
              <EditableText contentKey="festival_2023_hero_title" defaultText="Festival" />
            </span>
            <span className="block text-3xl md:text-5xl font-normal text-secondary-100 mt-2">
              <EditableText contentKey="festival_2023_hero_year" defaultText="2023" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-movieboli-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            <EditableText contentKey="festival_2023_hero_subtitle" defaultText="La prima storica edizione del MOVIEBOLI Film Festival che ha dato vita al nostro sogno cinematografico." />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#storia" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText contentKey="festival_2023_cta_storia" defaultText="La Nostra Storia" />
            </a>
            <a 
              href="#prima-edizione" 
              className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText contentKey="festival_2023_cta_edizione" defaultText="Prima Edizione" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoriaSection = () => {
  return (
    <section id="storia" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <EditableText contentKey="festival_2023_storia_title" defaultText="L'Inizio di Tutto" />
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText contentKey="festival_2023_storia_p1" defaultText="Il 2023 ha segnato un momento storico per la cultura cinematografica di Eboli e del territorio circostante. Con coraggio e determinazione, abbiamo organizzato la prima edizione del MOVIEBOLI Film Festival." />
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText contentKey="festival_2023_storia_p2" defaultText="Partendo da zero, con poche risorse ma tanta passione, siamo riusciti a creare un evento che ha superato ogni aspettativa, attirando filmmaker da tutta Italia e gettando le basi per quello che sarebbe diventato un appuntamento fisso nel panorama culturale regionale." />
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <EditableText contentKey="festival_2023_storia_p3" defaultText="Quella prima edizione ci ha insegnato che i sogni, quando condivisi con una comunità appassionata, possono davvero diventare realtà." />
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  <EditableText contentKey="festival_2023_card_title" defaultText="Prima Edizione" />
                </h3>
                <p className="text-gray-700 text-lg">
                  <EditableText contentKey="festival_2023_card_date" defaultText="Giugno 2023" />
                </p>
                <p className="text-gray-700">
                  <EditableText contentKey="festival_2023_card_subtitle" defaultText="Il sogno diventa realtà" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatistichePrimaEdizione = () => {
  const stats = [
    { numero: "89", descrizione: <EditableText contentKey="festival_2023_stat_films" defaultText="Film Partecipanti" /> },
    { numero: "15", descrizione: <EditableText contentKey="festival_2023_stat_regions" defaultText="Regioni Italiane" /> },
    { numero: "3.200", descrizione: <EditableText contentKey="festival_2023_stat_viewers" defaultText="Spettatori" /> },
    { numero: "12", descrizione: <EditableText contentKey="festival_2023_stat_events" defaultText="Eventi Speciali" /> }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <EditableText contentKey="festival_2023_stats_title" defaultText="Prima Edizione in Numeri" />
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700">
            <EditableText contentKey="festival_2023_stats_subtitle" defaultText="I risultati straordinari della nostra prima avventura cinematografica." />
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
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

const VincitoriPrimaEdizione = () => {
  const vincitori = [
    {
      categoria: "Miglior Film",
      titolo: "Terra Madre",
      regista: "Francesca Romano",
      paese: "Italia",
      descrizione: "Un toccante ritratto della vita rurale nel Sud Italia."
    },
    {
      categoria: "Miglior Regia Emergente",
      titolo: "Oltre il Mare",
      regista: "Antonio Greco",
      paese: "Italia",
      descrizione: "Il debutto di un giovane talento campano."
    },
    {
      categoria: "Miglior Cortometraggio",
      titolo: "Nonna Rosa",
      regista: "Maria Esposito",
      paese: "Italia",
      descrizione: "Una storia di famiglia che ha commosso tutti."
    },
    {
      categoria: "Premio Speciale della Giuria",
      titolo: "Il Silenzio delle Pietre",
      regista: "Luca Martino",
      paese: "Italia",
      descrizione: "Un documentario sulla storia archeologica del territorio."
    }
  ];
  
  return (
    <section id="prima-edizione" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            I Primi Vincitori
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700">
            I film e i registi che hanno fatto la storia della prima edizione.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {vincitori.map((vincitore, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
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

const MomentiStorici = () => {
  const momenti = [
    {
      titolo: "Inaugurazione",
      data: "10 Giugno 2023",
      descrizione: "Il taglio del nastro che ha dato ufficialmente il via al primo MOVIEBOLI Film Festival.",
      immagine: "🎉"
    },
    {
      titolo: "Prima Proiezione",
      data: "10 Giugno 2023",
      descrizione: "La prima proiezione ufficiale del festival con il film di apertura 'Luci della Città'.",
      immagine: "🎬"
    },
    {
      titolo: "Incontro con Roberto Benigni",
      data: "12 Giugno 2023",
      descrizione: "L'ospite d'onore della prima edizione ha incantato il pubblico con la sua presenza.",
      immagine: "⭐"
    },
    {
      titolo: "Cerimonia di Premiazione",
      data: "14 Giugno 2023",
      descrizione: "La prima storica cerimonia di premiazione che ha consacrato i vincitori della prima edizione.",
      immagine: "🏆"
    }
  ];
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Momenti Storici
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700">
            Gli eventi che hanno segnato per sempre la storia del nostro festival.
          </p>
        </div>
        
        <div className="space-y-8">
          {momenti.map((momento, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{momento.immagine}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {momento.titolo}
                      </h3>
                      <p className="text-primary-600 font-semibold">
                        {momento.data}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {momento.descrizione}
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-6xl">{momento.immagine}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsPrimaEdizione = () => {
  const testimonials = [
    {
      nome: "Roberto Benigni",
      ruolo: "Ospite d'Onore 2023",
      testo: "MOVIEBOLI ha dimostrato che la passione per il cinema può nascere ovunque. Questa prima edizione è stata un esempio di come i sogni possano diventare realtà.",
      avatar: "🎭"
    },
    {
      nome: "Francesca Romano",
      ruolo: "Vincitrice Miglior Film 2023",
      testo: "Vincere alla prima edizione di MOVIEBOLI è stato un onore incredibile. Questo festival ha dato voce a storie che meritavano di essere raccontate.",
      avatar: "🏆"
    },
    {
      nome: "Marco Verdi",
      ruolo: "Spettatore della Prima Ora",
      testo: "Essere presente alla prima edizione è stato emozionante. Si sentiva che stava nascendo qualcosa di speciale per il nostro territorio.",
      avatar: "👨‍🎨"
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Voci dalla Prima Edizione
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
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

const LegacySection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-900 to-secondary-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          L'Eredità del 2023
        </h2>
        <div className="w-24 h-1 bg-secondary-400 mx-auto mb-8" />
        
        <p className="text-xl text-movieboli-neutral-100 mb-8 leading-relaxed">
          La prima edizione del MOVIEBOLI Film Festival ha posto le fondamenta 
          per quello che è diventato oggi: un punto di riferimento per il cinema 
          indipendente e una piattaforma di lancio per nuovi talenti.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-white mb-2">Crescita</h3>
            <p className="text-movieboli-neutral-200">Dalle basi del 2023 alla crescita esponenziale degli anni successivi</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Comunità</h3>
            <p className="text-movieboli-neutral-200">La nascita di una vera comunità cinematografica nel territorio</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Visione</h3>
            <p className="text-movieboli-neutral-200">La definizione di una missione culturale chiara e duratura</p>
          </div>
        </div>
        
        <a 
          href="/festival" 
          className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Scopri l'Edizione Attuale
        </a>
      </div>
    </section>
  );
};

export default function Festival2023() {
  return (
    <BrandingProvider>
      <div className="min-h-screen bg-white">
        <Head>
          <title><EditableText contentKey="festival_2023_page_title" defaultText="Festival 2023 - La Prima Edizione | MOVIEBOLI APS" /></title>
          <meta name="description" content={<EditableText contentKey="festival_2023_page_description" defaultText="Rivivi la prima storica edizione del MOVIEBOLI Film Festival 2023. Scopri come è nato il nostro sogno cinematografico e i primi vincitori." />} />
          <meta name="keywords" content={<EditableText contentKey="festival_2023_page_keywords" defaultText="festival 2023, prima edizione, MOVIEBOLI, cinema, storia, Eboli" />} />
          <meta property="og:title" content="Festival 2023 - La Prima Edizione | MOVIEBOLI APS" />
          <meta property="og:description" content="La prima storica edizione del MOVIEBOLI Film Festival che ha dato vita al nostro sogno cinematografico." />
          <meta property="og:image" content="/logo-movieboli.png" />
          <meta property="og:type" content="website" />
        </Head>
        
        <Navbar />
        
        <main>
          <Festival2023Hero />
          <StoriaSection />
          <StatistichePrimaEdizione />
          <VincitoriPrimaEdizione />
          <MomentiStorici />
          <TestimonialsPrimaEdizione />
          <LegacySection />
        </main>
        
        <Footer />
      </div>
    </BrandingProvider>
  );
}