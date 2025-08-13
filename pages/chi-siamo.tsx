import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditableText from '../components/ui/EditableText';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ChiSiamoHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <EditableText 
            contentKey="about.hero.title"
            defaultValue="Chi Siamo"
            tag="span"
          />
        </h1>
        <p className="text-xl md:text-2xl text-movieboli-neutral-100 leading-relaxed">
          <EditableText 
            contentKey="about.hero.subtitle"
            defaultValue="La storia, la missione e le persone dietro MOVIEBOLI APS"
            tag="span"
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
              <EditableText 
                contentKey="about.story.title"
                defaultValue="La Nostra Storia"
                tag="span"
              />
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="about.story.paragraph1"
                defaultValue="MOVIEBOLI APS nasce nel 2020 dalla passione di un gruppo di giovani per il cinema e l'arte. L'idea è semplice: portare la cultura cinematografica nel cuore di Eboli, creando un ponte tra tradizione e innovazione."
                tag="span"
                multiline={true}
              />
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="about.story.paragraph2"
                defaultValue="Il nostro nome unisce Movie e Eboli, rappresentando la nostra missione di far diventare la nostra città un punto di riferimento per il cinema indipendente e la cultura artistica nel territorio."
                tag="span"
                multiline={true}
              />
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <EditableText 
                contentKey="about.story.paragraph3"
                defaultValue="Quello che è iniziato come un piccolo festival locale è cresciuto fino a diventare un evento riconosciuto a livello regionale, attirando artisti, registi e appassionati da tutta Italia."
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
              {/* Immagine di sfondo */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://i.ibb.co/XxprxgV2/61.jpg"
                  alt="Immagine di sfondo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
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
            <EditableText 
              contentKey="about.mission.title"
              defaultValue="La Nostra Missione"
              tag="span"
            />
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              <EditableText 
                contentKey="about.mission.culture.title"
                defaultValue="Promuovere la Cultura"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <EditableText 
                contentKey="about.mission.culture.description"
                defaultValue="Diffondere la cultura cinematografica e artistica nel territorio, rendendo l'arte accessibile a tutti."
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              <EditableText 
                contentKey="about.mission.innovation.title"
                defaultValue="Innovare"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <EditableText 
                contentKey="about.mission.innovation.description"
                defaultValue="Sperimentare nuove forme di espressione artistica e tecnologie innovative per il cinema."
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              <EditableText 
                contentKey="about.mission.community.title"
                defaultValue="Creare Comunità"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <EditableText 
                contentKey="about.mission.community.description"
                defaultValue="Unire persone attraverso l'arte, creando una comunità di appassionati e sostenitori della cultura."
                tag="span"
                multiline={true}
              />
            </p>
          </div>
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
            <EditableText 
              contentKey="about.values.title"
              defaultValue="I Nostri Valori"
              tag="span"
            />
          </h2>
          <div className="w-24 h-1 bg-secondary-400 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText 
                contentKey="about.values.quality.title"
                defaultValue="Qualità"
                tag="span"
              />
            </h3>
            <p className="text-movieboli-neutral-100">
              <EditableText 
                contentKey="about.values.quality.description"
                defaultValue="Selezioniamo sempre contenuti di alta qualità artistica"
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText 
                contentKey="about.values.inclusivity.title"
                defaultValue="Inclusività"
                tag="span"
              />
            </h3>
            <p className="text-movieboli-neutral-100">
              <EditableText 
                contentKey="about.values.inclusivity.description"
                defaultValue="Creiamo spazi aperti e accoglienti per tutti"
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText 
                contentKey="about.values.innovation.title"
                defaultValue="Innovazione"
                tag="span"
              />
            </h3>
            <p className="text-movieboli-neutral-100">
              <EditableText 
                contentKey="about.values.innovation.description"
                defaultValue="Sperimentiamo nuove forme di espressione artistica"
                tag="span"
                multiline={true}
              />
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-white mb-3">
              <EditableText 
                contentKey="about.values.growth.title"
                defaultValue="Crescita"
                tag="span"
              />
            </h3>
            <p className="text-movieboli-neutral-100">
              <EditableText 
                contentKey="about.values.growth.description"
                defaultValue="Sosteniamo lo sviluppo del territorio e dei talenti"
                tag="span"
                multiline={true}
              />
            </p>
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
          <EditableText 
            contentKey="about.join.title"
            defaultValue="Unisciti a Noi"
            tag="span"
          />
        </h2>
        <div className="w-24 h-1 bg-primary-600 mx-auto mb-8" />
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          <EditableText 
            contentKey="about.join.description"
            defaultValue="Sei appassionato di cinema e cultura? Vuoi contribuire alla crescita del territorio? Ci sono molti modi per essere parte di MOVIEBOLI APS."
            tag="span"
            multiline={true}
          />
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <EditableText 
                contentKey="about.join.volunteer.title"
                defaultValue="Volontario"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 mb-4">
              <EditableText 
                contentKey="about.join.volunteer.description"
                defaultValue="Aiutaci nell'organizzazione degli eventi"
                tag="span"
                multiline={true}
              />
            </p>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
              <EditableText 
                contentKey="about.join.volunteer.link_text"
                defaultValue="Scopri come →"
                tag="span"
              />
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <EditableText 
                contentKey="about.join.supporter.title"
                defaultValue="Sostenitore"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 mb-4">
              <EditableText 
                contentKey="about.join.supporter.description"
                defaultValue="Sostieni le nostre attività con una donazione"
                tag="span"
                multiline={true}
              />
            </p>
            <a href="/donazioni" className="text-primary-600 hover:text-primary-700 font-semibold">
              <EditableText 
                contentKey="about.join.supporter.link_text"
                defaultValue="Dona ora →"
                tag="span"
              />
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <EditableText 
                contentKey="about.join.partner.title"
                defaultValue="Partner"
                tag="span"
              />
            </h3>
            <p className="text-gray-700 mb-4">
              <EditableText 
                contentKey="about.join.partner.description"
                defaultValue="Collabora con noi come partner o sponsor"
                tag="span"
                multiline={true}
              />
            </p>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
              <EditableText 
                contentKey="about.join.partner.link_text"
                defaultValue="Contattaci →"
                tag="span"
              />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/donazioni" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <EditableText 
              contentKey="about.join.cta_donate"
              defaultValue="Sostieni MOVIEBOLI"
              tag="span"
            />
          </a>
          <a 
            href="#" 
            className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
          >
            <EditableText 
              contentKey="about.join.cta_contact"
              defaultValue="Contattaci"
              tag="span"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default function ChiSiamo() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrandingProvider>
      <Head>
        <title>Chi Siamo | MOVIEBOLI APS</title>
        <meta name="description" content="Scopri la storia, la missione e le persone dietro MOVIEBOLI APS - Associazione di Promozione Sociale dedicata al cinema e alla cultura." />
        <meta property="og:title" content="Chi Siamo | MOVIEBOLI APS" />
        <meta property="og:description" content="La storia, la missione e le persone dietro MOVIEBOLI APS" />
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
                  src="/images/logoNuovo.png"
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
              <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
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
              <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.films"
                  defaultValue="Film"
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
              <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                <EditableText 
                  contentKey="festival.nav.vote"
                  defaultValue="Vota"
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

      {/* Contenuto principale con padding-top per compensare navbar fissa */}
      <main className="pt-20">
        <ChiSiamoHero />
        <StorySection />
        <MissionSection />
        <ValuesSection />
        <JoinSection />
      </main>
      
      <Footer />
    </BrandingProvider>
  );
}