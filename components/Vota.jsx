import React, { useState } from 'react';

/**
 * Componente Vota per il MoviEboli Film Festival
 * Cards per votare i cortometraggi in gara
 * Layout responsive: 2 colonne desktop, 1 mobile
 */
const Vota = () => {
  // State per tracciare i voti e i messaggi di ringraziamento
  const [votedFilms, setVotedFilms] = useState(new Set());
  const [showThankYou, setShowThankYou] = useState(null);

  // Dati placeholder per i cortometraggi in gara
  const cortometraggi = [
    {
      id: 1,
      titolo: "Luci della Memoria",
      regista: "Marco Rossi",
      categoria: "Drammatico",
      durata: "18 min",
      descrizione: "Un viaggio emotivo attraverso i ricordi di un anziano che rivive i momenti più significativi della sua vita.",
      colore: "rosa"
    },
    {
      id: 2,
      titolo: "Vento del Sud",
      regista: "Anna Bianchi",
      categoria: "Documentario",
      durata: "22 min",
      descrizione: "Un documentario che esplora le tradizioni culinarie del Sud Italia attraverso le storie di tre generazioni.",
      colore: "blu"
    },
    {
      id: 3,
      titolo: "Frammenti Urbani",
      regista: "Luca Verdi",
      categoria: "Sperimentale",
      durata: "15 min",
      descrizione: "Una riflessione visiva sulla vita urbana contemporanea attraverso immagini poetiche e suoni d'ambiente.",
      colore: "bordeaux"
    },
    {
      id: 4,
      titolo: "Il Silenzio delle Pietre",
      regista: "Sofia Neri",
      categoria: "Storico",
      durata: "25 min",
      descrizione: "La storia di un piccolo borgo abbandonato raccontata attraverso le voci di chi lo ha abitato.",
      colore: "rosa"
    },
    {
      id: 5,
      titolo: "Radici Moderne",
      regista: "Giuseppe Blu",
      categoria: "Sociale",
      durata: "20 min",
      descrizione: "Il contrasto tra tradizione e modernità nella vita di una famiglia di immigrati di seconda generazione.",
      colore: "blu"
    },
    {
      id: 6,
      titolo: "Echi di Futuro",
      regista: "Elena Gialli",
      categoria: "Sci-Fi",
      durata: "17 min",
      descrizione: "Una visione distopica del futuro dove la tecnologia ha sostituito ogni forma di comunicazione umana.",
      colore: "bordeaux"
    }
  ];

  // Funzione per gestire il voto
  const handleVote = (filmId) => {
    if (votedFilms.has(filmId)) {
      return; // Già votato
    }

    // Aggiungi il film ai votati
    setVotedFilms(prev => new Set([...prev, filmId]));
    
    // Mostra il messaggio di ringraziamento
    setShowThankYou(filmId);
    
    // Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setShowThankYou(null);
    }, 3000);
  };

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
    <section id="vota" className="py-16 px-4 bg-crema">
      <div className="max-w-6xl mx-auto">
        
        {/* Header della sezione */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bebas text-bordeaux mb-4">
            Vota il tuo cortometraggio preferito
          </h2>
          <p className="text-xl font-unica text-gray-600 max-w-3xl mx-auto">
            Partecipa alla selezione del pubblico! Il tuo voto contribuirà all'assegnazione 
            del Premio del Pubblico MoviEboli 2025.
          </p>
          
          {/* Decorazione */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <div className="w-16 h-1 bg-rosa"></div>
            <div className="text-2xl">🏆</div>
            <div className="w-16 h-1 bg-blu"></div>
          </div>
        </div>

        {/* Griglia dei cortometraggi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cortometraggi.map((film) => {
            const colorClasses = getColorClasses(film.colore);
            const hasVoted = votedFilms.has(film.id);
            const showMessage = showThankYou === film.id;
            
            return (
              <div 
                key={film.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Placeholder immagine */}
                <div className={`${colorClasses.bg} h-48 relative overflow-hidden`}>
                  {/* Elementi decorativi */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-4 border-white transform rotate-45"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  
                  {/* Contenuto centrale */}
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <div className="font-stat text-sm uppercase tracking-wider opacity-90">
                        {film.categoria}
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge durata */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full font-unica text-sm">
                    {film.durata}
                  </div>
                </div>
                
                {/* Contenuto della card */}
                <div className="p-6">
                  {/* Titolo e regista */}
                  <div className="mb-4">
                    <h3 className="font-bebas text-2xl text-bordeaux mb-1">
                      {film.titolo}
                    </h3>
                    <p className="font-stat text-sm uppercase tracking-wider text-gray-500">
                      Regia di {film.regista}
                    </p>
                  </div>
                  
                  {/* Descrizione */}
                  <p className="font-unica text-gray-600 text-sm leading-relaxed mb-6">
                    {film.descrizione}
                  </p>
                  
                  {/* Messaggio di ringraziamento */}
                  {showMessage && (
                    <div className="mb-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg text-center animate-fade-in">
                      <div className="text-lg mb-1">✨</div>
                      <div className="font-stat text-sm uppercase tracking-wider">
                        Grazie per il tuo voto!
                      </div>
                    </div>
                  )}
                  
                  {/* Bottone voto */}
                  <button
                    onClick={() => handleVote(film.id)}
                    disabled={hasVoted}
                    className={`w-full py-3 px-6 rounded-lg font-stat text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                      hasVoted
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : `border-2 ${colorClasses.border} ${colorClasses.text} ${colorClasses.hover} hover:text-white hover:scale-105`
                    }`}
                  >
                    {hasVoted ? (
                      <div className="flex items-center justify-center space-x-2">
                        <span>✓</span>
                        <span>Voto registrato</span>
                      </div>
                    ) : (
                      'Vota questo film'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Sezione informazioni votazione */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="font-bebas text-3xl text-bordeaux mb-4">Come funziona la votazione</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-unica text-gray-600">
            <div>
              <div className="text-3xl mb-3">👁️</div>
              <div className="font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">Guarda</div>
              <div className="text-sm">
                Assisti alle proiezioni durante il festival per conoscere tutti i cortometraggi in gara
              </div>
            </div>
            
            <div>
              <div className="text-3xl mb-3">🗳️</div>
              <div className="font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">Vota</div>
              <div className="text-sm">
                Esprimi la tua preferenza cliccando sul bottone "Vota" del cortometraggio che ti è piaciuto di più
              </div>
            </div>
            
            <div>
              <div className="text-3xl mb-3">🏆</div>
              <div className="font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">Premia</div>
              <div className="text-sm">
                Il cortometraggio più votato riceverà il Premio del Pubblico MoviEboli 2025
              </div>
            </div>
          </div>
          
          {/* Statistiche voti */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="font-stat text-sm uppercase tracking-wider text-gray-500 mb-2">
              I tuoi voti: {votedFilms.size} / {cortometraggi.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rosa to-blu h-2 rounded-full transition-all duration-500"
                style={{ width: `${(votedFilms.size / cortometraggi.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vota;