import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import VideoGridHero from '../components/VideoGridHero';
import PastEditionsSection from '../components/PastEditionsSection';
import PodcastSection from '../components/PodcastSection';
import ActivitiesSection from '../components/ActivitiesSection';
import EditableText from '../components/ui/EditableText';
import { useMetaTags } from '../hooks/useMetaTags';
import { useContent } from '../contexts/ContentContext';

const AssociationHero = () => {
  const { getContent } = useContent();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-secondary-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-movieboli-secondary-100">
              <EditableText 
                contentKey="homepage.hero.title"
                defaultValue="MOVIEBOLI APS"
                tag="span"
              />
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-normal text-movieboli-accent-400 mb-8">
            <EditableText 
              contentKey="homepage.hero.subtitle"
              defaultValue="Cultura, Cinema, Comunità"
              tag="span"
            />
          </h2>
          
          <p className="text-xl md:text-2xl text-movieboli-neutral-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            <EditableText 
              contentKey="homepage.hero.description"
              defaultValue="Promuoviamo la cultura cinematografica e artistica nel territorio di Eboli attraverso eventi, festival e iniziative culturali innovative."
              multiline={true}
            />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/chi-siamo" 
              className="bg-movieboli-primary-600 hover:bg-movieboli-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="homepage.hero.cta1"
                defaultValue="Scopri chi siamo"
                tag="span"
              />
            </a>
            <a 
              href="/festival/2025" 
              className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="homepage.hero.cta2"
                defaultValue="Festival 2025"
                tag="span"
              />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const ChiSiamoSection = () => {
  const { getContent } = useContent();
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="homepage.about.title"
              defaultValue="Chi Siamo"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-primary-600 mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-movieboli-primary-900 mb-6">
              <EditableText 
                contentKey="homepage.about.mission.title"
                defaultValue="La nostra missione"
              />
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="homepage.about.mission.p1"
                defaultValue="MOVIEBOLI APS è un'associazione di promozione sociale nata dalla passione per il cinema e l'arte. Il nostro obiettivo è valorizzare il territorio di Eboli attraverso eventi culturali di qualità."
                multiline={true}
              />
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <EditableText 
                contentKey="homepage.about.mission.p2"
                defaultValue="Crediamo nel potere dell'arte di unire le persone e creare comunità. Attraverso il nostro festival annuale e le nostre iniziative, promuoviamo la cultura cinematografica e sosteniamo giovani talenti."
                multiline={true}
              />
            </p>
            <a 
              href="/chi-siamo" 
              className="inline-flex items-center text-movieboli-accent-600 hover:text-movieboli-accent-700 font-semibold transition-colors duration-300"
            >
              <EditableText 
                contentKey="homepage.about.cta"
                defaultValue="Scopri di più →"
                tag="span"
              />
            </a>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-movieboli-secondary-100 to-movieboli-primary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-movieboli-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-movieboli-primary-900 mb-2">
                  <EditableText 
                    contentKey="homepage.about.since"
                    defaultValue="Dal 2020"
                  />
                </h4>
                <p className="text-gray-700">
                  <EditableText 
                    contentKey="homepage.about.since.description"
                    defaultValue="Promuoviamo cultura e arte nel territorio"
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

const CosaFacciamoSection = () => {
  const { getContent } = useContent();
  
  const activities = [
    {
      title: (
        <EditableText 
          contentKey="homepage.activities.festival.title"
          defaultValue="Festival di cortometraggi"
        />
      ),
      description: (
        <EditableText 
          contentKey="homepage.activities.festival.description"
          defaultValue="Il nostro evento principale che celebra il cinema indipendente e i giovani talenti del territorio."
          multiline={true}
        />
      ),
      icon: "🎬",
      link: "/festival/2025"
    },
    {
      title: (
        <EditableText 
          contentKey="homepage.activities.podcast.title"
          defaultValue="Ciliegie Podcast"
        />
      ),
      description: (
        <EditableText 
          contentKey="homepage.activities.podcast.description"
          defaultValue="Il nostro podcast dedicato al cinema, alle interviste e alle discussioni culturali."
          multiline={true}
        />
      ),
      icon: "🎙️",
      link: "/podcast"
    },
    {
      title: (
        <EditableText 
          contentKey="homepage.activities.workshops.title"
          defaultValue="Laboratori e attività culturali"
        />
      ),
      description: (
        <EditableText 
          contentKey="homepage.activities.workshops.description"
          defaultValue="Organizziamo workshop, proiezioni e incontri formativi durante tutto l'anno."
          multiline={true}
        />
      ),
      icon: "🎭",
      link: "/attivita"
    }
  ];
  
  return (
    <section className="py-20 bg-movieboli-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="homepage.activities.title"
              defaultValue="Cosa Facciamo"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-accent-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <EditableText 
              contentKey="homepage.activities.description"
              defaultValue="Le nostre attività sono pensate per promuovere la cultura cinematografica e creare opportunità per artisti e appassionati."
              multiline={true}
            />
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-5xl mb-6 text-center">{activity.icon}</div>
              <h3 className="text-2xl font-bold text-movieboli-primary-900 mb-4 text-center">
                {activity.title}
              </h3>
              <div className="text-gray-700 mb-6 text-center leading-relaxed">
                {activity.description}
              </div>
              <div className="text-center">
                <a 
                  href={activity.link}
                  className="text-movieboli-accent-600 hover:text-movieboli-accent-700 font-semibold inline-flex items-center transition-colors duration-300"
                >
                  <EditableText 
                    contentKey="homepage.activities.cta"
                    defaultValue="Scopri di più →"
                    tag="span"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => {
  const { getContent } = useContent();
  
  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <EditableText 
            contentKey="homepage.volunteer.title"
            defaultValue="Diventa Volontario"
          />
        </h2>
        <div className="w-24 h-1 bg-movieboli-accent-accent mx-auto mb-8" />
        
        <p className="text-xl text-white mb-8 leading-relaxed">
          <EditableText 
            contentKey="homepage.volunteer.description"
            defaultValue="Unisciti al nostro team di volontari e partecipa attivamente agli eventi dell'associazione. Contribuisci alla diffusione della cultura cinematografica nel territorio di Eboli."
            multiline={true}
          />
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/volontari" 
            className="bg-movieboli-accent hover:bg-movieboli-accent-700 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <EditableText 
              contentKey="homepage.volunteer.cta1"
              defaultValue="Candidati ora"
              tag="span"
            />
          </a>
          <a 
            href="/chi-siamo" 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            <EditableText 
              contentKey="homepage.volunteer.cta2"
              defaultValue="Scopri di più"
              tag="span"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

const FestivalSection = () => {
  const { getContent } = useContent();
  
  return (
    <section className="py-20 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-secondary-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="homepage.festival.title"
              defaultValue="Festival 2025"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-accent-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            <EditableText 
              contentKey="homepage.festival.description"
              defaultValue="Il nostro festival annuale è il cuore pulsante dell'associazione. Tre giorni di cinema, arte e cultura nel centro storico di Eboli."
              multiline={true}
            />
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-movieboli-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-movieboli-primary-600">
                <EditableText 
                  contentKey="homepage.festival.days"
                  defaultValue="3"
                  tag="span"
                />
              </span>
            </div>
            <h3 className="text-xl font-bold text-movieboli-primary-900 mb-2">Giorni di Festival</h3>
            <p className="text-gray-700">
              <EditableText 
                contentKey="homepage.festival.days.description"
                defaultValue="Un weekend dedicato al cinema e all'arte"
              />
            </p>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-movieboli-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-movieboli-accent-600">
                <EditableText 
                  contentKey="homepage.festival.films"
                  defaultValue="50+"
                  tag="span"
                />
              </span>
            </div>
            <h3 className="text-xl font-bold text-movieboli-primary-900 mb-2">Film in Concorso</h3>
            <p className="text-gray-700">
              <EditableText 
                contentKey="homepage.festival.films.description"
                defaultValue="Cortometraggi e lungometraggi selezionati"
              />
            </p>
          </div>
          
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-movieboli-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                <EditableText 
                  contentKey="homepage.festival.events"
                  defaultValue="10+"
                  tag="span"
                />
              </span>
            </div>
            <h3 className="text-xl font-bold text-movieboli-primary-900 mb-2">Eventi Speciali</h3>
            <p className="text-gray-700">
              <EditableText 
                contentKey="homepage.festival.events.description"
                defaultValue="Masterclass, incontri e proiezioni esclusive"
              />
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <a 
            href="/festival" 
            className="bg-gradient-to-r from-movieboli-primary-600 to-movieboli-accent-600 text-white px-12 py-5 rounded-lg font-bold text-xl hover:from-movieboli-primary-700 hover:to-movieboli-accent-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <EditableText 
              contentKey="homepage.festival.cta"
              defaultValue="🎬 Vai al Festival"
              tag="span"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const metaTags = useMetaTags();
  
  return (
    <div className="min-h-screen bg-movieboli-background-900">
      <Head>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content="/logo-movieboli.png" />
        <meta property="og:url" content="https://movieboli.it" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      <Navbar />
      
      <main>
        <VideoGridHero />
        <AssociationHero />
        <ChiSiamoSection />
        <CosaFacciamoSection />
        <ActivitiesSection />
        <PodcastSection />
        <PastEditionsSection />
        <FestivalSection />
        <FooterCTA />
      </main>
      
      <Footer />
    </div>
  );
}