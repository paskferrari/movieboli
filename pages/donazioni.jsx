import Head from 'next/head';
import { BrandingProvider } from '../contexts/BrandingContext';
import { useContent } from '../contexts/ContentContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import EditableText from '../components/ui/EditableText';

const TypewriterEffect = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const motivations = [
    "Sostieni giovani talenti",
    "Promuovi la cultura",
    "Valorizza il territorio",
    "Crei comunità",
    "Investi nel futuro"
  ];
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = motivations[textIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(current.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % motivations.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textIndex, motivations]);
  
  return (
    <div className="h-8 flex items-center justify-center">
      <span className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-movieboli-primary-600 via-movieboli-accent-500 to-movieboli-secondary-600 bg-clip-text text-transparent">
        {currentText}
        <span className="animate-pulse bg-gradient-to-r from-movieboli-primary-600 via-movieboli-accent-500 to-movieboli-secondary-600 bg-clip-text text-transparent">|</span>
      </span>
    </div>
  );
};

const DonazioniHero = () => {
  const { getContent } = useContent();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-white">
              <EditableText 
                contentKey="donazioni.hero.titolo"
                defaultValue="Sostieni MOVIEBOLI"
                tag="span"
              />
            </span>
          </h1>
          
          {/* Animazione Typewriter sotto il titolo */}
          <div className="mb-8">
            <TypewriterEffect />
          </div>
          
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            <EditableText 
              contentKey="donazioni.hero.descrizione"
              defaultValue="La tua donazione ci aiuta a promuovere la cultura cinematografica nel territorio di Eboli, organizzare eventi di qualità e sostenere giovani talenti."
              multiline={true}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

const IbanSection = () => {
  const { getContent } = useContent();
  const [copiato, setCopiato] = useState(false);
  
  const copiaIban = () => {
    const iban = getContent('donazioni.iban.dati_bancari.iban') || 'IT00 X000 0000 0000 0000 0000 000';
    navigator.clipboard.writeText(iban);
    setCopiato(true);
    setTimeout(() => setCopiato(false), 2000);
  };
  
  return (
    <section id="dona-ora" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="donazioni.iban.titolo"
              defaultValue="Donazione tramite Bonifico"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <EditableText 
              contentKey="donazioni.iban.descrizione"
              defaultValue="Il modo più semplice e sicuro per sostenere la nostra associazione."
              multiline={true}
            />
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-movieboli-secondary-50 to-movieboli-primary-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-movieboli-primary-100">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Dati Bancari */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-movieboli-primary-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-movieboli-primary-900">
                    <EditableText 
                      contentKey="donazioni.iban.dati_bancari.titolo"
                      defaultValue="Dati Bancari"
                    />
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-movieboli-primary-700 mb-2 uppercase tracking-wide">
                      <EditableText 
                        contentKey="donazioni.iban.dati_bancari.intestatario_label"
                        defaultValue="Intestatario"
                      />
                    </label>
                    <div className="p-4 bg-white rounded-xl font-semibold text-movieboli-primary-900 shadow-inner border border-movieboli-primary-100">
                      <EditableText 
                        contentKey="donazioni.iban.dati_bancari.intestatario"
                        defaultValue="MOVIEBOLI APS"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-movieboli-primary-700 mb-2 uppercase tracking-wide">
                      <EditableText 
                        contentKey="donazioni.iban.dati_bancari.iban_label"
                        defaultValue="IBAN"
                      />
                    </label>
                    <div className="flex">
                      <div className="flex-1 p-4 bg-white rounded-l-xl font-mono text-movieboli-primary-900 shadow-inner border border-movieboli-primary-100 text-lg">
                        <EditableText 
                          contentKey="donazioni.iban.dati_bancari.iban"
                          defaultValue="IT00 X000 0000 0000 0000 0000 000"
                        />
                      </div>
                      <button
                        onClick={copiaIban}
                        className="px-6 bg-movieboli-primary-600 hover:bg-movieboli-primary-700 text-white rounded-r-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        title="Copia IBAN"
                      >
                        {copiato ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {copiato && (
                      <p className="text-sm text-movieboli-accent-600 mt-2 font-semibold animate-fade-in">
                        <EditableText 
                          contentKey="donazioni.iban.dati_bancari.copiato_messaggio"
                          defaultValue="✓ IBAN copiato negli appunti!"
                        />
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-movieboli-primary-700 mb-2 uppercase tracking-wide">
                      <EditableText 
                        contentKey="donazioni.iban.dati_bancari.banca_label"
                        defaultValue="Banca"
                      />
                    </label>
                    <div className="p-4 bg-white rounded-xl text-movieboli-primary-900 shadow-inner border border-movieboli-primary-100">
                      <EditableText 
                        contentKey="donazioni.iban.dati_bancari.banca"
                        defaultValue="Banca di Credito Cooperativo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Istruzioni */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-movieboli-accent-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-movieboli-primary-900">
                    <EditableText 
                      contentKey="donazioni.iban.istruzioni.titolo"
                      defaultValue="Istruzioni"
                    />
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-movieboli-accent-50 to-movieboli-secondary-50 border-l-4 border-movieboli-accent-500 rounded-r-xl">
                    <h4 className="font-bold text-movieboli-accent-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-movieboli-accent-500 rounded-full mr-2"></span>
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.causale.titolo"
                        defaultValue="Causale"
                      />
                    </h4>
                    <p className="text-movieboli-accent-700 text-sm mb-3">
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.causale.testo"
                        defaultValue="Inserisci una causale per identificare la donazione."
                        multiline={true}
                      />
                    </p>
                    <div className="p-3 bg-white rounded-lg font-mono text-sm text-movieboli-accent-800 border border-movieboli-accent-200">
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.causale.esempio"
                        defaultValue="Donazione MOVIEBOLI APS"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-movieboli-primary-50 to-movieboli-secondary-50 border-l-4 border-movieboli-primary-500 rounded-r-xl">
                    <h4 className="font-bold text-movieboli-primary-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-movieboli-primary-500 rounded-full mr-2"></span>
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.ricevuta.titolo"
                        defaultValue="Ricevuta Fiscale"
                      />
                    </h4>
                    <p className="text-movieboli-primary-700 text-sm">
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.ricevuta.testo"
                        defaultValue="Riceverai una ricevuta fiscale per la tua donazione che potrai utilizzare per le detrazioni."
                        multiline={true}
                      />
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-movieboli-secondary-50 border-l-4 border-green-500 rounded-r-xl">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.detraibilita.titolo"
                        defaultValue="Detraibilità"
                      />
                    </h4>
                    <p className="text-green-700 text-sm">
                      <EditableText 
                        contentKey="donazioni.iban.istruzioni.detraibilita.testo"
                        defaultValue="La donazione è detraibile fiscalmente secondo le normative vigenti per le APS."
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComeUsiamoSection = () => {
  const { getContent } = useContent();
  
  const utilizzi = [
    {
      icon: "🎬",
      titolo: "Festival di Cortometraggi",
      descrizione: "Organizzazione del festival annuale, premi per i vincitori e supporto tecnico per le proiezioni.",
      percentuale: "40%"
    },
    {
      icon: "🎭",
      titolo: "Eventi Culturali",
      descrizione: "Spettacoli teatrali, concerti, mostre d'arte e altre iniziative culturali durante l'anno.",
      percentuale: "30%"
    },
    {
      icon: "🎓",
      titolo: "Formazione",
      descrizione: "Workshop, masterclass e corsi di formazione per giovani talenti del territorio.",
      percentuale: "20%"
    },
    {
      icon: "⚙️",
      titolo: "Gestione",
      descrizione: "Spese operative, attrezzature tecniche e mantenimento delle attività associative.",
      percentuale: "10%"
    }
  ];
  
  return (
    <section id="come-usiamo" className="py-20 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-secondary-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="donazioni.come_usiamo.titolo"
              defaultValue="Come Usiamo i Fondi"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-primary-600 mx-auto mb-8" />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <EditableText 
              contentKey="donazioni.come_usiamo.descrizione"
              defaultValue="Trasparenza totale: ecco come investiamo ogni euro delle vostre donazioni per far crescere la cultura nel nostro territorio."
              multiline={true}
            />
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {utilizzi.map((utilizzo, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-movieboli-primary-100">
              <div className="text-center">
                <div className="text-5xl mb-6">{utilizzo.icon}</div>
                <div className="text-3xl font-bold text-movieboli-primary-600 mb-4">{utilizzo.percentuale}</div>
                <h3 className="text-xl font-bold text-movieboli-primary-900 mb-4">
                  {utilizzo.titolo}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {utilizzo.descrizione}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-movieboli-primary-100">
            <h3 className="text-2xl font-bold text-movieboli-primary-900 mb-4">
              <EditableText 
                contentKey="donazioni.come_usiamo.trasparenza.titolo"
                defaultValue="Trasparenza Totale"
              />
            </h3>
            <p className="text-gray-700">
              <EditableText 
                contentKey="donazioni.come_usiamo.trasparenza.descrizione"
                defaultValue="Pubblichiamo annualmente un report dettagliato sull'utilizzo dei fondi. Ogni donazione viene tracciata e rendicontata con massima trasparenza."
                multiline={true}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PercheDonareSection = () => {
  const { getContent } = useContent();
  
  const motivi = [
    {
      icon: "🌟",
      titolo: "Sostieni i Talenti",
      descrizione: "Aiuti giovani artisti e registi a realizzare i loro sogni e a far crescere il cinema indipendente."
    },
    {
      icon: "🏛️",
      titolo: "Valorizza il Territorio",
      descrizione: "Contribuisci a rendere Eboli un punto di riferimento culturale per tutta la Campania."
    },
    {
      icon: "🎭",
      titolo: "Promuovi la Cultura",
      descrizione: "Sostieni eventi, spettacoli e iniziative che arricchiscono la vita culturale della comunità."
    },
    {
      icon: "🤝",
      titolo: "Crei Comunità",
      descrizione: "Favorisci l'aggregazione sociale e la condivisione di esperienze artistiche uniche."
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary-900 mb-6">
            <EditableText 
              contentKey="donazioni.perche_donare.titolo"
              defaultValue="Perché Donare"
            />
          </h2>
          <div className="w-24 h-1 bg-movieboli-primary-600 mx-auto mb-8" />
          <div className="text-xl text-gray-700 max-w-3xl mx-auto">
            <p className="mb-4">Ogni donazione è un investimento nel futuro culturale del nostro territorio.</p>
            <TypewriterEffect />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {motivi.map((motivo, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-movieboli-primary-500 to-movieboli-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl">{motivo.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-movieboli-primary-900 mb-4">
                {motivo.titolo}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {motivo.descrizione}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-movieboli-primary-900 to-movieboli-secondary-900">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <EditableText 
            contentKey="donazioni.footer_cta.titolo"
            defaultValue="Unisciti a Noi"
          />
        </h2>
        <p className="text-xl text-movieboli-neutral-200 mb-8 max-w-2xl mx-auto">
          <EditableText 
            contentKey="donazioni.footer_cta.descrizione"
            defaultValue="Ogni contributo, grande o piccolo, ci aiuta a realizzare progetti straordinari e a far crescere la nostra comunità."
            multiline={true}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-movieboli-accent-600 hover:bg-movieboli-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Dona Ora
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-movieboli-primary-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Scopri di Più
          </button>
        </div>
      </div>
    </section>
  );
};

// Sezione separata sotto la hero
const TypewriterSection = () => {
  return (
    <section className="py-8 bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-secondary-900">
      <div className="max-w-4xl mx-auto text-center px-4">
        <TypewriterEffect />
      </div>
    </section>
  );
};

export default function Donazioni() {
  const { getContent } = useContent();
  
  return (
    <BrandingProvider>
      <Head>
        <title>{getContent('donazioni.meta.title') || 'Donazioni - MOVIEBOLI APS'}</title>
        <meta name="description" content={getContent('donazioni.meta.description') || 'Sostieni MOVIEBOLI APS e contribuisci alla promozione della cultura cinematografica nel territorio di Eboli.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        <DonazioniHero />
        <IbanSection />
        <ComeUsiamoSection />
        <FooterCTA />
      </main>
      
      <Footer />
    </BrandingProvider>
  );
}