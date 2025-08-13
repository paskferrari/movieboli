import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-movieboli-sfondo via-movieboli-highlight2/50 to-movieboli-highlight1/30"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-movieboli-primario1/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-movieboli-oro1/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-movieboli-primario2/10 rounded-full blur-lg animate-pulse delay-500"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Logo */}
          <div className="mb-8">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
              <Image
                src="/images/logoNuovo.png"
                alt="MOVIEBOLI Film Festival Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Subtitle */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="font-poppins text-lg sm:text-xl md:text-2xl text-movieboli-nero1 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cinema, Cultura, Creatività
            </p>
            <p className="font-poppins text-base sm:text-lg text-movieboli-nero1/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Il festival cinematografico più innovativo del Sud Italia. 
              Un'esperienza unica che celebra l'arte e la creatività del cinema indipendente.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Link
              href="/festival"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-poppins font-semibold text-white bg-gradient-to-r from-movieboli-primario1 to-movieboli-primario2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Scopri il Festival</span>
              <div className="absolute inset-0 bg-gradient-to-r from-movieboli-primario2 to-movieboli-primario1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/programma"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-poppins font-semibold text-movieboli-primario1 bg-white/80 backdrop-blur-sm border-2 border-movieboli-primario1/30 rounded-full hover:bg-movieboli-primario1 hover:text-white hover:border-movieboli-primario1 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Vedi Programma
            </Link>
          </div>
          
          {/* Festival Info */}
          <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-movieboli-oro1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-movieboli-nero2 mb-2">Cinema d'Autore</h3>
              <p className="font-poppins text-sm text-movieboli-nero1/70">Cortometraggi e lungometraggi selezionati</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-movieboli-primario1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-movieboli-nero2 mb-2">Concorso</h3>
              <p className="font-poppins text-sm text-movieboli-nero1/70">Premi e riconoscimenti per i migliori film</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-movieboli-rossoRuggine/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="font-poppins text-lg font-semibold text-movieboli-nero2 mb-2">Eventi Speciali</h3>
              <p className="font-poppins text-sm text-movieboli-nero1/70">Incontri con registi e masterclass</p>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Hero;