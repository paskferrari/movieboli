import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const ProgrammaTest = () => {
  const [selectedDay, setSelectedDay] = useState('tutti');
  const [selectedCategory, setSelectedCategory] = useState('tutti');

  // Dati del programma 2024 (esempio basato su festival cinematografici tipici)
  const programma2024 = [
    {
      id: 1,
      title: "Cerimonia di Apertura",
      description: "Inaugurazione ufficiale del MOVIEBOLI Film Festival 2024 con ospiti speciali e anteprima del cortometraggio vincitore dell'edizione precedente.",
      date: "15 Luglio 2024",
      time: "20:30",
      location: "Piazza del Sedile",
      category: "evento",
      image: "/api/placeholder/400/300",
      duration: "90 min"
    },
    {
      id: 2,
      title: "La Strada del Cinema",
      description: "Cortometraggio drammatico che esplora le tradizioni del Sud Italia attraverso gli occhi di un giovane regista.",
      date: "16 Luglio 2024",
      time: "21:00",
      location: "Cinema Comunale",
      category: "cortometraggio",
      director: "Marco Rossi",
      duration: "25 min",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Workshop: Regia Digitale",
      description: "Masterclass sulla regia cinematografica nell'era digitale con il regista internazionale Alessandro Bianchi.",
      date: "17 Luglio 2024",
      time: "15:00",
      location: "Sala Conferenze",
      category: "workshop",
      duration: "120 min",
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Notte di Stelle",
      description: "Serata speciale con proiezione di cortometraggi sotto le stelle, accompagnata da musica dal vivo.",
      date: "18 Luglio 2024",
      time: "22:00",
      location: "Terrazza Panoramica",
      category: "evento",
      duration: "180 min",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Memorie di Basilicata",
      description: "Documentario che racconta la storia e le tradizioni della regione attraverso testimonianze e immagini d'archivio.",
      date: "19 Luglio 2024",
      time: "19:30",
      location: "Cinema Comunale",
      category: "documentario",
      director: "Lucia Verdi",
      duration: "45 min",
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "Premiazione e Chiusura",
      description: "Cerimonia di premiazione dei migliori cortometraggi e chiusura ufficiale del festival con ringraziamenti e annunci per l'edizione 2025.",
      date: "20 Luglio 2024",
      time: "21:30",
      location: "Piazza del Sedile",
      category: "evento",
      duration: "120 min",
      image: "/api/placeholder/400/300"
    }
  ];

  // Programma 2025 (anteprima)
  const programma2025 = [
    {
      id: 7,
      title: "Apertura Festival 2025",
      description: "La nuova edizione del MOVIEBOLI Film Festival si apre con una serata speciale dedicata al cinema indipendente.",
      date: "12 Luglio 2025",
      time: "20:00",
      location: "Piazza del Sedile",
      category: "evento",
      image: "/api/placeholder/400/300",
      duration: "120 min"
    },
    {
      id: 8,
      title: "Concorso Cortometraggi 2025",
      description: "Selezione dei migliori cortometraggi dell'anno con giuria internazionale e premi speciali.",
      date: "13-18 Luglio 2025",
      time: "Vari orari",
      location: "Multiple venues",
      category: "concorso",
      image: "/api/placeholder/400/300",
      duration: "5 giorni"
    }
  ];

  const giorni = [
    { value: 'tutti', label: 'Tutti i giorni' },
    { value: '15', label: '15 Luglio' },
    { value: '16', label: '16 Luglio' },
    { value: '17', label: '17 Luglio' },
    { value: '18', label: '18 Luglio' },
    { value: '19', label: '19 Luglio' },
    { value: '20', label: '20 Luglio' }
  ];

  const categorie = [
    { value: 'tutti', label: 'Tutte le categorie' },
    { value: 'evento', label: 'Eventi Speciali' },
    { value: 'cortometraggio', label: 'Cortometraggi' },
    { value: 'documentario', label: 'Documentari' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'concorso', label: 'Concorsi' }
  ];

  const filteredProgram = programma2024.filter(evento => {
    const dayMatch = selectedDay === 'tutti' || evento.date.includes(selectedDay);
    const categoryMatch = selectedCategory === 'tutti' || evento.category === selectedCategory;
    return dayMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-movieboli-sfondo">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-movieboli-sfondo via-movieboli-nero1/10 to-movieboli-highlight1/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-movieboli-nero1 mb-6">
              Programma Festival
            </h1>
            <p className="text-xl text-movieboli-nero2 max-w-3xl mx-auto mb-8">
              Scopri tutti gli eventi, le proiezioni e le attività del MOVIEBOLI Film Festival
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-movieboli-oro1/20 text-movieboli-nero1 rounded-full text-sm font-medium">
                📅 15-20 Luglio 2024
              </span>
              <span className="px-4 py-2 bg-movieboli-highlight1/20 text-movieboli-nero1 rounded-full text-sm font-medium">
                🎬 6 Eventi Principali
              </span>
              <span className="px-4 py-2 bg-movieboli-oro1/20 text-movieboli-nero1 rounded-full text-sm font-medium">
                📍 Eboli, Basilicata
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtri */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-movieboli-nero2 mb-2">Filtra per giorno:</label>
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-4 py-2 border border-movieboli-nero2/20 rounded-lg bg-white text-movieboli-nero1 focus:outline-none focus:ring-2 focus:ring-movieboli-oro1"
              >
                {giorni.map(giorno => (
                  <option key={giorno.value} value={giorno.value}>{giorno.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-movieboli-nero2 mb-2">Filtra per categoria:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-movieboli-nero2/20 rounded-lg bg-white text-movieboli-nero1 focus:outline-none focus:ring-2 focus:ring-movieboli-oro1"
              >
                {categorie.map(categoria => (
                  <option key={categoria.value} value={categoria.value}>{categoria.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Programma 2024 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-movieboli-nero1 mb-4">
              Festival 2024 - Edizione Passata
            </h2>
            <p className="text-lg text-movieboli-nero2 max-w-2xl mx-auto">
              Rivivi i momenti più belli dell'edizione 2024 del MOVIEBOLI Film Festival
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProgram.map(evento => (
              <Card
                key={evento.id}
                title={evento.title}
                description={evento.description}
                image={evento.image}
                category={evento.category}
                date={evento.date}
                duration={evento.duration}
                director={evento.director}
                buttons={[
                  {
                    text: "Dettagli",
                    variant: "primary",
                    onClick: () => console.log(`Visualizza dettagli: ${evento.title}`)
                  },
                  {
                    text: "📍 " + evento.location,
                    variant: "secondary",
                    onClick: () => console.log(`Mappa: ${evento.location}`)
                  }
                ]}
                metadata={[
                  { label: "Orario", value: evento.time },
                  { label: "Luogo", value: evento.location }
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Anteprima 2025 */}
      <section className="py-16 bg-gradient-to-r from-movieboli-oro1/10 to-movieboli-highlight1/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-movieboli-nero1 mb-4">
              Anteprima Festival 2025
            </h2>
            <p className="text-lg text-movieboli-nero2 max-w-2xl mx-auto">
              Preparati per la prossima edizione del MOVIEBOLI Film Festival
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programma2025.map(evento => (
              <Card
                key={evento.id}
                title={evento.title}
                description={evento.description}
                image={evento.image}
                category={evento.category}
                date={evento.date}
                duration={evento.duration}
                buttons={[
                  {
                    text: "Maggiori Info",
                    variant: "primary",
                    onClick: () => console.log(`Info: ${evento.title}`)
                  },
                  {
                    text: "Notificami",
                    variant: "secondary",
                    onClick: () => console.log(`Notifica: ${evento.title}`)
                  }
                ]}
                metadata={[
                  { label: "Orario", value: evento.time },
                  { label: "Luogo", value: evento.location }
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-movieboli-nero1 to-movieboli-nero2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-movieboli-sfondo mb-6">
            Non Perdere la Prossima Edizione
          </h2>
          <p className="text-xl text-movieboli-sfondo/80 mb-8">
            Iscriviti alla newsletter per ricevere aggiornamenti sul MOVIEBOLI Film Festival 2025
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg border border-movieboli-sfondo/20 bg-movieboli-sfondo text-movieboli-nero1 focus:outline-none focus:ring-2 focus:ring-movieboli-oro1"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-movieboli-oro1 to-movieboli-highlight1 text-movieboli-nero1 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Iscriviti
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgrammaTest;