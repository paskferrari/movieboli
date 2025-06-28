import React from 'react';

/**
 * Componente Programma per il MoviEboli Film Festival
 * Griglia di cards responsive per eventi e cortometraggi
 * Layout: 1 colonna mobile, 2 tablet, 3 desktop
 */
const Programma = () => {
  // Dati placeholder per gli eventi del festival
  const eventi = [
    {
      id: 1,
      titolo: "Luci della Memoria",
      sottotitolo: "Regia di Marco Rossi",
      categoria: "Drammatico",
      orario: "20:30",
      giorno: "15 Agosto",
      durata: "18 min",
      colore: "rosa"
    },
    {
      id: 2,
      titolo: "Vento del Sud",
      sottotitolo: "Regia di Anna Bianchi",
      categoria: "Documentario",
      orario: "21:00",
      giorno: "15 Agosto",
      durata: "22 min",
      colore: "blu"
    },
    {
      id: 3,
      titolo: "Frammenti Urbani",
      sottotitolo: "Regia di Luca Verdi",
      categoria: "Sperimentale",
      orario: "21:30",
      giorno: "15 Agosto",
      durata: "15 min",
      colore: "bordeaux"
    },
    {
      id: 4,
      titolo: "Il Silenzio delle Pietre",
      sottotitolo: "Regia di Sofia Neri",
      categoria: "Storico",
      orario: "20:00",
      giorno: "16 Agosto",
      durata: "25 min",
      colore: "rosa"
    },
    {
      id: 5,
      titolo: "Radici Moderne",
      sottotitolo: "Regia di Giuseppe Blu",
      categoria: "Sociale",
      orario: "20:45",
      giorno: "16 Agosto",
      durata: "20 min",
      colore: "blu"
    },
    {
      id: 6,
      titolo: "Echi di Futuro",
      sottotitolo: "Regia di Elena Gialli",
      categoria: "Sci-Fi",
      orario: "21:15",
      giorno: "16 Agosto",
      durata: "17 min",
      colore: "bordeaux"
    }
  ];

  // Funzione per ottenere le classi CSS in base al colore
  const getColorClasses = (colore) => {
    switch (colore) {
      case 'rosa':
        return {
          bg: 'bg-rosa',
          border: 'border-rosa',
          text: 'text-rosa',
          hover: 'hover:bg-rosa'
        };
      case 'blu':
        return {
          bg: 'bg-blu',
          border: 'border-blu',
          text: 'text-blu',
          hover: 'hover:bg-blu'
        };
      case 'bordeaux':
        return {
          bg: 'bg-bordeaux',
          border: 'border-bordeaux',
          text: 'text-bordeaux',
          hover: 'hover:bg-bordeaux'
        };
      default:
        return {
          bg: 'bg-rosa',
          border: 'border-rosa',
          text: 'text-rosa',
          hover: 'hover:bg-rosa'
        };
    }
  };

  return (
    <section id="programma" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header della sezione */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bebas text-bordeaux mb-4">
            Programma Festival
          </h2>
          <p className="text-xl font-unica text-gray-600 max-w-3xl mx-auto">
            Scopri tutti i cortometraggi in concorso e gli eventi speciali del MoviEboli Film Festival 2025
          </p>
          
          {/* Decorazione */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="w-16 h-1 bg-rosa"></div>
            <div className="text-2xl">🎬</div>
            <div className="w-16 h-1 bg-blu"></div>
          </div>
        </div>

        {/* Griglia degli eventi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventi.map((evento) => {
            const colorClasses = getColorClasses(evento.colore);
            
            return (
              <div 
                key={evento.id} 
                className="bg-crema rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Header della card con colore tematico */}
                <div className={`${colorClasses.bg} p-6 text-white relative overflow-hidden`}>
                  {/* Elementi decorativi di sfondo */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-6 -translate-y-6"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-4 translate-y-4"></div>
                  
                  {/* Contenuto header */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-stat text-sm uppercase tracking-wider opacity-90">
                        {evento.categoria}
                      </span>
                      <span className="font-unica text-sm opacity-90">
                        {evento.durata}
                      </span>
                    </div>
                    
                    <h3 className="font-bebas text-2xl mb-2 leading-tight">
                      {evento.titolo}
                    </h3>
                    
                    <p className="font-unica text-sm opacity-90">
                      {evento.sottotitolo}
                    </p>
                  </div>
                </div>
                
                {/* Corpo della card */}
                <div className="p-6">
                  {/* Informazioni orario */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">📅</div>
                      <div>
                        <div className="font-stat text-sm text-gray-500 uppercase tracking-wide">
                          {evento.giorno}
                        </div>
                        <div className="font-bebas text-xl text-bordeaux">
                          {evento.orario}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`w-3 h-3 ${colorClasses.bg} rounded-full`}></div>
                  </div>
                  
                  {/* Bottone azione */}
                  <button className={`w-full py-3 px-6 border-2 ${colorClasses.border} ${colorClasses.text} font-stat text-sm uppercase tracking-wider rounded-lg transition-all duration-300 ${colorClasses.hover} hover:text-white transform hover:scale-105 active:scale-95`}>
                    Scopri di più
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Sezione informazioni aggiuntive */}
        <div className="mt-16 bg-gradient-to-r from-rosa via-blu to-bordeaux rounded-2xl p-8 text-white text-center">
          <h3 className="font-bebas text-3xl mb-4">Informazioni Utili</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-unica">
            <div>
              <div className="text-2xl mb-2">📍</div>
              <div className="font-stat text-sm uppercase tracking-wider opacity-90 mb-1">Luogo</div>
              <div>Cinema Comunale Eboli</div>
            </div>
            
            <div>
              <div className="text-2xl mb-2">🎫</div>
              <div className="font-stat text-sm uppercase tracking-wider opacity-90 mb-1">Biglietti</div>
              <div>Ingresso gratuito</div>
            </div>
            
            <div>
              <div className="text-2xl mb-2">⏰</div>
              <div className="font-stat text-sm uppercase tracking-wider opacity-90 mb-1">Durata</div>
              <div>15-17 Agosto 2025</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programma;