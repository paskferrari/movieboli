import React from 'react';

/**
 * Componente ChiSiamo per il MoviEboli Film Festival
 * Sezione "Chi siamo" con layout a due colonne responsive
 * Sfondo crema e tipografia artistica
 */
const ChiSiamo = () => {
  return (
    <section id="chi-siamo" className="py-10 sm:py-16 px-4 bg-crema">
      <div className="max-w-7xl mx-auto">
        {/* Container principale con layout responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Colonna sinistra - Contenuto testuale */}
          <div className="space-y-4 sm:space-y-6">
            {/* Titolo principale */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas text-bordeaux mb-4 sm:mb-8">
              Chi Siamo
            </h2>
            
            {/* Paragrafo introduttivo */}
            <div className="space-y-3 sm:space-y-4 font-unica text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Il <strong className="text-bordeaux">MoviEboli Film Festival</strong> nasce dalla passione 
                per il cinema indipendente e la volontà di valorizzare il territorio lucano attraverso 
                l'arte cinematografica. Da anni portiamo nella suggestiva cornice di Eboli le voci 
                più innovative del panorama cinematografico contemporaneo.
              </p>
              
              <p>
                La nostra missione è creare un ponte tra tradizione e innovazione, offrendo una 
                piattaforma di dialogo per registi emergenti, artisti affermati e appassionati di cinema. 
                Ogni agosto, trasformiamo la città in un palcoscenico a cielo aperto dove storie 
                uniche prendono vita.
              </p>
              
              <p>
                Crediamo nel potere del cinema come linguaggio universale, capace di unire culture 
                diverse e stimolare riflessioni profonde. Il festival è un'esperienza immersiva che 
                celebra la creatività in tutte le sue forme, dalla regia alla fotografia, dalla 
                sceneggiatura alla post-produzione.
              </p>
            </div>
            
            {/* Elementi decorativi */}
            <div className="flex items-center space-x-2 sm:space-x-4 pt-4 sm:pt-6">
              <div className="w-8 sm:w-12 h-1 bg-rosa"></div>
              <span className="font-stat text-bordeaux text-xs sm:text-sm tracking-wider uppercase">
                Dal 2018 • Eboli • Campania
              </span>
              <div className="w-8 sm:w-12 h-1 bg-blu"></div>
            </div>
          </div>
          
          {/* Colonna destra - Immagine/Placeholder */}
          <div className="relative">
            {/* Placeholder artistico per immagine */}
            <div className="relative bg-gradient-to-br from-rosa via-blu to-bordeaux rounded-xl sm:rounded-2xl p-4 sm:p-8 min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
              
              {/* Elementi decorativi di sfondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 border-3 sm:border-4 border-white rounded-full"></div>
                <div className="absolute bottom-12 sm:bottom-20 right-6 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 border-3 sm:border-4 border-white transform rotate-45"></div>
                <div className="absolute top-1/2 left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-white rounded-full opacity-50"></div>
                <div className="absolute bottom-6 sm:bottom-10 left-12 sm:left-20 w-6 sm:w-8 h-6 sm:h-8 bg-white transform rotate-12"></div>
              </div>
              
              {/* Contenuto centrale */}
              <div className="text-center text-white z-10">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎬</div>
                <h3 className="font-bebas text-2xl sm:text-3xl mb-1 sm:mb-2">MOVIEBOLI</h3>
                <p className="font-unica text-base sm:text-lg opacity-90">Film Festival</p>
                <div className="mt-4 sm:mt-6 flex justify-center space-x-2">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
            
            {/* Ombra decorativa */}
            <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-full h-full bg-bordeaux rounded-xl sm:rounded-2xl opacity-20 -z-10"></div>
          </div>
        </div>
        
        {/* Sezione statistiche/highlights */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-bebas text-rosa mb-1 sm:mb-2">150+</div>
            <div className="font-unica text-sm sm:text-base text-gray-600">Cortometraggi in concorso</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-bebas text-blu mb-1 sm:mb-2">25</div>
            <div className="font-unica text-sm sm:text-base text-gray-600">Paesi rappresentati</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
            <div className="text-2xl sm:text-3xl font-bebas text-bordeaux mb-1 sm:mb-2">5000+</div>
            <div className="font-unica text-sm sm:text-base text-gray-600">Visitatori ogni anno</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChiSiamo;