import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * CTA Section - Sezione finale con call-to-action
 * Design professionale con bottoni animati
 * Sfondo nero con testi e bottoni rosa
 */
const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('cta-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="cta-section"
      className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
    >
      {/* Elementi decorativi di sfondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-80 h-80 border border-rosa rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-rosa rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 border border-rosa rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Linee decorative */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa to-transparent opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-rosa to-transparent opacity-20"></div>
      </div>

      <div className="text-center px-4 max-w-6xl mx-auto relative z-10">
        {/* Titolo principale */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-rosa font-bold text-5xl md:text-6xl lg:text-8xl mb-6 leading-tight">
            Pronto a partecipare?
          </h2>
        </motion.div>

        {/* Sottotitolo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-rosa/80 text-xl md:text-2xl lg:text-3xl font-medium mb-16 max-w-4xl mx-auto leading-relaxed">
            Unisciti all'esperienza cinematografica più emozionante della Campania.
            <br className="hidden md:block" />
            Il tuo voto può fare la differenza.
          </p>
        </motion.div>

        {/* Bottoni CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center"
        >
          {/* Bottone Prenota */}
          <Link href="/prenota">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 166, 166, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group bg-rosa text-black font-bold text-xl md:text-2xl px-12 py-5 md:px-16 md:py-6 rounded-full shadow-2xl transition-all duration-300 hover:bg-white w-full md:w-auto min-w-[280px]"
            >
              <span className="flex items-center justify-center space-x-4">
                <motion.div
                  className="w-6 h-6 md:w-7 md:h-7 bg-black rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <span>Prenota</span>
              </span>
            </motion.button>
          </Link>

          {/* Bottone Vota */}
          <Link href="/vota">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 166, 166, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-rosa text-rosa font-bold text-xl md:text-2xl px-12 py-5 md:px-16 md:py-6 rounded-full hover:bg-rosa hover:text-black transition-all duration-300 shadow-2xl w-full md:w-auto min-w-[280px]"
            >
              <span className="flex items-center justify-center space-x-4">
                <motion.div
                  className="w-6 h-6 md:w-7 md:h-7 border-2 border-current rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <span>Vota</span>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Testo aggiuntivo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-16"
        >
          <p className="text-rosa/60 text-lg md:text-xl font-medium">
            MoviEboli Film Festival 2025 • Eboli, Agosto
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="w-16 h-px bg-rosa/30"></div>
            <div className="w-2 h-2 bg-rosa/50 rounded-full"></div>
            <div className="w-16 h-px bg-rosa/30"></div>
          </div>
        </motion.div>
      </div>

      {/* Effetto particelle fluttuanti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rosa/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CTASection;