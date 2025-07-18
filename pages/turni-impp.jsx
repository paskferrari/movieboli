import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TurniIMPP() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-movieboli-dark via-movieboli-darker to-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-movieboli-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-movieboli-red/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-movieboli-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              TURNI <span className="text-movieboli-gold">IMPP</span> 2025
            </h1>
            <p className="text-xl text-movieboli-light mb-8 max-w-2xl mx-auto">
              Compila il modulo per registrare la tua disponibilità per i turni del festival
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-movieboli-gold to-movieboli-red mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Form Container */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl">
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-movieboli-dark/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-movieboli-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-movieboli-light text-lg">Caricamento modulo...</p>
                  </div>
                </div>
              )}

              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Modulo Registrazione Turni
                </h2>
                <p className="text-movieboli-light">
                  Seleziona i tuoi turni preferiti per il festival MOVIEBOLI 2025
                </p>
              </div>

              {/* Iframe Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20">
                <div className="bg-gradient-to-br from-white to-gray-50 p-2">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScdvURhYjJkxbg2ZIRrjp4YQ4Hj_phdqKw82COe9y4ytj8ItQ/viewform?embedded=true"
                    width="100%"
                    height="1200"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    onLoad={handleIframeLoad}
                    className="w-full rounded-xl shadow-inner"
                    style={{
                      minHeight: '1200px',
                      background: 'white'
                    }}
                  >
                    Caricamento modulo...
                  </iframe>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <div className="bg-movieboli-primary/10 border border-movieboli-primary/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-movieboli-gold mb-2">
                    📋 Informazioni Importanti
                  </h3>
                  <ul className="text-movieboli-light text-sm space-y-2">
                    <li>• Compila tutti i campi richiesti</li>
                    <li>• Seleziona i turni in base alla tua disponibilità</li>
                    <li>• Riceverai conferma via email</li>
                    <li>• Per problemi tecnici contatta l'organizzazione</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-2 h-32 bg-gradient-to-b from-movieboli-gold to-transparent opacity-30" />
      <div className="absolute top-1/2 right-0 w-2 h-32 bg-gradient-to-b from-movieboli-red to-transparent opacity-30" />
      
      <Footer />
    </div>
  );
}

// Custom CSS for iframe styling
const customStyles = `
  .iframe-container {
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  }
  
  .iframe-container iframe {
    transition: all 0.3s ease;
  }
  
  .iframe-container:hover iframe {
    transform: scale(1.01);
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}