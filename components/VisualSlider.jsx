import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Visual Slider - Carosello professionale con scroll orizzontale
 * Design elegante ispirato ai festival internazionali
 * Sfondo rosa con contenuti in overlay nero/semitrasparente
 */
const VisualSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Dati delle slide con placeholder professionali
  const slides = [
    {
      id: 1,
      title: "Il Festival",
      subtitle: "Un evento cinematografico di prestigio",
      description: "MoviEboli celebra l'arte cinematografica nel cuore della Campania, unendo tradizione e innovazione in un'esperienza culturale unica.",
      image: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=1200&h=800&fit=crop&crop=center",
      cta: "Scopri di più",
      link: "/chi-siamo"
    },
    {
      id: 2,
      title: "I Film",
      subtitle: "Cortometraggi selezionati internazionalmente",
      description: "Una curata selezione di opere cinematografiche che raccontano storie universali attraverso linguaggi visivi innovativi e coinvolgenti.",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=800&fit=crop&crop=center",
      cta: "Esplora",
      link: "/programma"
    },
    {
      id: 3,
      title: "Partecipa",
      subtitle: "Diventa parte dell'esperienza",
      description: "Vivi il festival da protagonista: vota i tuoi cortometraggi preferiti, partecipa agli eventi speciali e connettiti con la comunità cinematografica.",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1200&h=800&fit=crop&crop=center",
      cta: "Scopri come",
      link: "/vota"
    }
  ];

  // Auto-slide ogni 5 secondi
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    // Riattiva autoplay dopo 10 secondi
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <section className="min-h-screen bg-rosa relative overflow-hidden">
      {/* Container principale */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Immagine di sfondo */}
            <div className="absolute inset-0">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Contenuto della slide */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-rosa font-bold text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
                      {slides[currentSlide].title}
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-rosa/90 text-xl md:text-2xl font-semibold mb-6">
                      {slides[currentSlide].subtitle}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-rosa border-2 border-rosa font-bold text-lg md:text-xl px-8 py-4 md:px-10 md:py-5 rounded-full hover:bg-rosa hover:text-black transition-all duration-300 shadow-2xl"
                    >
                      {slides[currentSlide].cta}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controlli di navigazione */}
        <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="bg-black/80 text-rosa p-3 md:p-4 rounded-full hover:bg-black transition-all duration-300 shadow-lg backdrop-blur-sm"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>

        <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-black/80 text-rosa p-3 md:p-4 rounded-full hover:bg-black transition-all duration-300 shadow-lg backdrop-blur-sm"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Indicatori slide */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-rosa scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
          <motion.div
            className="h-full bg-rosa"
            initial={{ width: '0%' }}
            animate={{ width: isAutoPlay ? '100%' : '0%' }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </div>
    </section>
  );
};

export default VisualSlider;