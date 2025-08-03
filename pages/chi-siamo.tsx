import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditableText from '../components/ui/EditableText';

const ChiSiamoHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        // Nel ChiSiamoHero component:
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <EditableText 
            contentKey="about.title"
            defaultValue="Chi Siamo"
            tag="span"
          />
        </h1>
        <p className="text-xl md:text-2xl text-movieboli-neutral-100 leading-relaxed">
          <EditableText 
            contentKey="about.subtitle"
            defaultValue="La storia, la missione e le persone dietro MOVIEBOLI APS"
            tag="span"
          />
        </p>
        
        // Nel StorySection component:
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          <EditableText 
            contentKey="about.story.title"
            defaultValue="La Nostra Storia"
            tag="span"
          />
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          <EditableText 
            contentKey="about.story.p1"
            defaultValue="MOVIEBOLI APS nasce nel 2020 dalla passione di un gruppo di giovani per il cinema e l'arte..."
            tag="span"
            multiline={true}
          />
        </p>
      </div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              La Nostra Storia
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              MOVIEBOLI APS nasce nel 2020 dalla passione di un gruppo di giovani 
              per il cinema e l'arte. L'idea è semplice: portare la cultura 
              cinematografica nel cuore di Eboli, creando un ponte tra tradizione 
              e innovazione.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Il nostro nome unisce "Movie" e "Eboli", rappresentando la nostra 
              missione di far diventare la nostra città un punto di riferimento 
              per il cinema indipendente e la cultura artistica nel territorio.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quello che è iniziato come un piccolo festival locale è cresciuto 
              fino a diventare un evento riconosciuto a livello regionale, 
              attirando artisti, registi e appassionati da tutta Italia.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dal 2020</h3>
                <p className="text-gray-700 text-lg">Promuoviamo cultura e arte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            La Nostra Missione
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Promuovere la Cultura</h3>
            <p className="text-gray-700 leading-relaxed">
              Diffondere la cultura cinematografica e artistica nel territorio, 
              rendendo l'arte accessibile a tutti.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sostenere i Talenti</h3>
            <p className="text-gray-700 leading-relaxed">
              Offrire opportunità e visibilità a giovani artisti, registi e 
              creativi emergenti del territorio.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Creare Comunità</h3>
            <p className="text-gray-700 leading-relaxed">
              Unire persone attraverso l'arte, creando una comunità di appassionati 
              e sostenitori della cultura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Marco Rossi",
      role: "Presidente",
      description: "Regista e produttore, fondatore dell'associazione",
      image: "🎭"
    },
    {
      name: "Laura Bianchi",
      role: "Direttrice Artistica",
      description: "Critica cinematografica e curatrice eventi",
      image: "🎨"
    },
    {
      name: "Giuseppe Verde",
      role: "Coordinatore Tecnico",
      description: "Esperto di produzione e organizzazione eventi",
      image: "⚙️"
    },
    {
      name: "Sofia Neri",
      role: "Responsabile Comunicazione",
      description: "Social media manager e content creator",
      image: "📱"
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Il Nostro Team
          </h2>
          <div className="w-24 h-1 bg-secondary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Un gruppo di professionisti appassionati che lavorano insieme 
            per realizzare la nostra visione.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">{member.image}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-900 to-secondary-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            I Nostri Valori
          </h2>
          <div className="w-24 h-1 bg-secondary-400 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Qualità</h3>
            <p className="text-movieboli-neutral-100">Selezioniamo sempre contenuti di alta qualità artistica</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-3">Inclusività</h3>
            <p className="text-movieboli-neutral-100">Creiamo spazi aperti e accoglienti per tutti</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-3">Innovazione</h3>
            <p className="text-movieboli-neutral-100">Sperimentiamo nuove forme di espressione artistica</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-white mb-3">Crescita</h3>
            <p className="text-movieboli-neutral-100">Sosteniamo lo sviluppo del territorio e dei talenti</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const JoinSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Unisciti a Noi
        </h2>
        <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Sei appassionato di cinema e cultura? Vuoi contribuire alla crescita 
          del territorio? Ci sono molti modi per essere parte di MOVIEBOLI APS.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Volontario</h3>
            <p className="text-gray-700 mb-4">Aiutaci nell'organizzazione degli eventi</p>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">Scopri come →</a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sostenitore</h3>
            <p className="text-gray-700 mb-4">Sostieni le nostre attività con una donazione</p>
            <a href="/donazioni" className="text-primary-600 hover:text-primary-700 font-semibold">Dona ora →</a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Partner</h3>
            <p className="text-gray-700 mb-4">Collabora con noi come partner o sponsor</p>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">Contattaci →</a>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/donazioni" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Sostieni MOVIEBOLI
          </a>
          <a 
            href="#" 
            className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
          >
            Contattaci
          </a>
        </div>
      </div>
    </section>
  );
};

export default function ChiSiamo() {
  return (
    <BrandingProvider>
      <div className="min-h-screen bg-white">
        <Head>
          <title>Chi Siamo - MOVIEBOLI APS</title>
          <meta name="description" content="Scopri la storia, la missione e il team di MOVIEBOLI APS, l'associazione di promozione sociale che promuove la cultura cinematografica a Eboli." />
          <meta name="keywords" content="MOVIEBOLI, chi siamo, associazione, cinema, Eboli, cultura, team, missione" />
          <meta property="og:title" content="Chi Siamo - MOVIEBOLI APS" />
          <meta property="og:description" content="Scopri la storia, la missione e il team di MOVIEBOLI APS, l'associazione di promozione sociale che promuove la cultura cinematografica a Eboli." />
          <meta property="og:image" content="/logo-movieboli.png" />
        </Head>
        
        <Navbar />
        
        <main>
          <ChiSiamoHero />
          <StorySection />
          <MissionSection />
          <TeamSection />
          <ValuesSection />
          <JoinSection />
        </main>
        
        <Footer />
      </div>
    </BrandingProvider>
  );
}