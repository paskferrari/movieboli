import { useState, useEffect } from 'react'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-festival-primary via-festival-secondary to-festival-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border-4 border-white rounded-full animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-white rounded-full animate-pulse animation-delay-400"></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border-4 border-white rounded-full animate-pulse animation-delay-600"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl font-normal tracking-wider mb-6">
              FESTIVAL
              <br />
              <span className="font-staatliches text-5xl md:text-7xl lg:text-8xl text-festival-accent">
                MoviEboli
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 max-w-4xl mx-auto leading-relaxed">
              Arte, Cultura e Spettacolo si incontrano
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light mb-12 max-w-3xl mx-auto opacity-90">
              Un viaggio straordinario attraverso le forme d'arte contemporanea
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-festival-primary hover:bg-festival-light font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Scopri il Programma
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-festival-primary font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Acquista Biglietti
              </button>
            </div>
          </div>

          {/* Date e Location */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="font-bebas text-3xl md:text-4xl mb-2">15-17</div>
                <div className="text-lg opacity-90">Luglio 2024</div>
              </div>
              <div className="text-center">
                <div className="font-bebas text-3xl md:text-4xl mb-2">EBOLI</div>
                <div className="text-lg opacity-90">Salerno, Italia</div>
              </div>
              <div className="text-center">
                <div className="font-bebas text-3xl md:text-4xl mb-2">50+</div>
                <div className="text-lg opacity-90">Artisti</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero