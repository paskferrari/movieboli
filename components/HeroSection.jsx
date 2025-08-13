import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Hero Section - Sezione principale fullscreen
 * Design professionale con animazioni eleganti
 * Palette: Rosa (#f5a6a6) su sfondo nero
 */
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Attiva le animazioni dopo il mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Elementi decorativi di sfondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-rosa rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-rosa rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 border border-rosa rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="text-center px-4 max-w-6xl mx-auto relative z-10">
        {/* Logo MOVIEBOLI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-6">
              <Image
                src="/images/logoNuovo.png"
                alt="MoviEboli Film Festival Logo"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>
            <h1 className="text-rosa font-bold text-4xl md:text-6xl lg:text-7xl tracking-wide">
              MOVIEBOLI
            </h1>
          </div>
        </motion.div>

        {/* Titolo principale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-rosa font-semibold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Film Festival
          </h2>
        </motion.div>

        {/* Sottotitolo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-rosa/80 text-2xl md:text-3xl lg:text-4xl font-medium mb-12">
            Eboli, Agosto
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Link href="/programma">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-rosa text-black font-bold text-xl md:text-2xl px-12 py-5 md:px-16 md:py-6 rounded-full shadow-2xl transition-all duration-300 hover:bg-white hover:shadow-rosa/50"
            >
              <span className="flex items-center space-x-4">
                <span>Scopri il programma</span>
                <motion.svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-rosa rounded-full flex justify-center">
            <div className="w-1 h-3 bg-rosa rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-rosa/60 text-sm font-medium uppercase tracking-wider">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;