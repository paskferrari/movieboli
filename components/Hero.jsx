import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Componente Hero per il MoviEboli Film Festival 2025
 * Sezione intro a tutta altezza con animazioni e scroll smooth
 * Sfondo rosa pastello, testo blu elettrico, design immersivo
 */
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Attiva le animazioni dopo il mount del componente
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Funzione per lo scroll smooth verso la sezione programma
  const scrollToProgramma = () => {
    const programmaSection = document.getElementById('programma');
    if (programmaSection) {
      programmaSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: '#f5a6a6'}}>
      
      {/* Elementi decorativi di sfondo */}
      <div className="absolute inset-0 opacity-20">
        {/* Cerchi animati */}
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-32 w-24 h-24 border-4 border-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 border-4 border-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-4 border-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Forme geometriche */}
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-white opacity-10 transform rotate-45 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 right-20 w-12 h-12 bg-white opacity-10 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        
        {/* Linee decorative */}
        <div className="absolute top-1/3 left-1/2 w-1 h-32 bg-white opacity-20 transform -translate-x-1/2 animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-white opacity-20 animate-pulse" style={{animationDelay: '3.5s'}}></div>
      </div>

      {/* Contenuto principale */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        
        {/* Logo/Scritta MOVIEBOLI */}
        <div className={`transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo MoviEboli */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-white rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300 p-4">
              <div className="relative w-full h-full">
                <Image
                  src="/logo-movieboli.png"
                  alt="MoviEboli Film Festival Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Scritta MOVIEBOLI */}
            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-2" style={{color: '#4829ff'}}>
              MOVIEBOLI
            </h1>
          </div>
        </div>

        {/* Titolo principale */}
        <div className={`transition-all duration-1000 ease-out transform delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold mb-4" style={{color: '#4829ff'}}>
            Film Festival 2025
          </h2>
        </div>

        {/* Sottotitolo */}
        <div className={`transition-all duration-1000 ease-out transform delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold mb-12" style={{color: '#4829ff'}}>
            Eboli, Agosto 2025
          </p>
          
          {/* Descrizione aggiuntiva */}
          <p className="font-sans text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Un viaggio cinematografico unico nel cuore della Campania. 
            Scopri i migliori cortometraggi internazionali e vivi l'emozione del grande cinema.
          </p>
        </div>

        {/* Bottone call-to-action */}
        <div className={`transition-all duration-1000 ease-out transform delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={scrollToProgramma}
            className="group relative inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-sans font-bold text-white rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95 overflow-hidden"
            style={{backgroundColor: '#4829ff'}}
          >
            {/* Effetto hover animato */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Contenuto del bottone */}
            <span className="relative z-10 flex items-center space-x-3">
              <span>Scopri il programma</span>
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
            
            {/* Effetto ripple */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
          </button>
        </div>

        {/* Indicatore di scroll animato */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-blue-600 font-sans text-sm uppercase tracking-wider">Scroll</span>
          </div>
        </div>
      </div>

      {/* Overlay gradiente per migliorare la leggibilità */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-10"></div>
    </section>
  );
};

export default Hero;