import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import { CardGrid, CardSection } from './Card';
import Button from './Button';
import GlassEffect from './GlassEffect';
import Pattern from './Pattern';
import CinematicGradient from './CinematicGradient';

/**
 * Componente di esempio che mostra come utilizzare tutti i componenti creati
 * @returns {JSX.Element} - Il componente di esempio
 */
const ExampleSection = () => {
  // Dati di esempio per le card
  const exampleCards = [
    {
      id: 1,
      title: 'La Grande Bellezza',
      description: 'Un viaggio attraverso la bellezza e la decadenza di Roma, visto attraverso gli occhi di Jep Gambardella.',
      image: '/images/film1.jpg',
      category: 'Drama',
      director: 'Paolo Sorrentino',
      rating: '4.8',
      date: '2023-06-15'
    },
    {
      id: 2,
      title: 'Chiamami col tuo nome',
      description: 'Una storia di amore e scoperta ambientata nell\'estate del 1983 in Italia.',
      image: '/images/film2.jpg',
      category: 'Romantico',
      director: 'Luca Guadagnino',
      rating: '4.7',
      date: '2023-07-22'
    },
    {
      id: 3,
      title: 'Nuovo Cinema Paradiso',
      description: 'La storia di un regista di successo che torna al suo paese natale in Sicilia dopo aver saputo della morte del suo mentore.',
      image: '/images/film3.jpg',
      category: 'Classico',
      director: 'Giuseppe Tornatore',
      rating: '4.9',
      date: '2023-08-10'
    }
  ];

  return (
    <>
      {/* Prima sezione con sfondo bianco */}
      <Section 
        id="chi-siamo"
        title="Chi Siamo"
        subtitle="Il MOVIEBOLI Film Festival celebra il cinema d'autore e le nuove voci del panorama cinematografico."
        backgroundColor="white"
        patternType="dots"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-poppins font-bold text-movieboli-nero2 mb-4">La nostra missione</h3>
            <p className="text-movieboli-nero1/80 mb-6 leading-relaxed">
              Nato nel 2010, il MOVIEBOLI Film Festival è diventato un punto di riferimento per il cinema indipendente e d'autore. 
              La nostra missione è scoprire e promuovere nuovi talenti, offrendo una piattaforma per film innovativi e storie uniche.
            </p>
            <p className="text-movieboli-nero1/80 mb-6 leading-relaxed">
              Ogni anno, il festival attira registi, attori e appassionati di cinema da tutto il mondo, creando un ambiente 
              stimolante per lo scambio di idee e la celebrazione dell'arte cinematografica.
            </p>
            <Button primary href="/about">
              Scopri di più
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <GlassEffect className="p-6 rounded-xl overflow-hidden">
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/festival.jpg" 
                  alt="MOVIEBOLI Film Festival" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-inter text-sm text-movieboli-nero1/70 italic">
                  "Il cinema è un sogno collettivo" - Federico Fellini
                </p>
              </div>
            </GlassEffect>
            <Pattern type="circles" color="#f5a623" opacity="0.07" className="-z-10" />
          </motion.div>
        </div>
      </Section>
      
      {/* Gradiente cinematografico tra le sezioni */}
      <CinematicGradient from="white" via="cream" to="cream" />
      
      {/* Seconda sezione con sfondo cream */}
      <Section 
        id="programma"
        title="Programma 2025"
        subtitle="Scopri i film in concorso e gli eventi speciali della prossima edizione."
        backgroundColor="cream"
        patternType="grid"
      >
        <CardSection subtitle="I film più attesi della prossima edizione" useGradient={false}>
          <CardGrid>
            {exampleCards.map(card => (
              <Card 
                key={card.id}
                {...card}
                useGlass={card.id === 1} // Solo la prima card usa l'effetto vetro
                isSpecial={card.id === 2} // Solo la seconda card è speciale
              />
            ))}
          </CardGrid>
          
          <div className="mt-12 text-center">
            <Button primary large href="/programma">
              Vedi tutti i film
            </Button>
          </div>
        </CardSection>
      </Section>
      
      {/* Gradiente cinematografico tra le sezioni */}
      <CinematicGradient from="cream" via="white" to="white" />
      
      {/* Terza sezione con sfondo bianco e CTA */}
      <Section 
        id="partecipa"
        backgroundColor="white"
        patternType="waves"
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center py-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-movieboli-nero2 mb-6">
            Partecipa al Festival
          </h2>
          <p className="text-lg text-movieboli-nero1/80 mb-8">
            Sei un regista o un produttore? Invia il tuo film e partecipa alla selezione ufficiale del MOVIEBOLI Film Festival 2025.
          </p>
          
          <GlassEffect className="p-8 mb-8">
            <h3 className="text-xl font-poppins font-semibold text-movieboli-nero2 mb-4">
              Iscrizioni Aperte
            </h3>
            <p className="text-movieboli-nero1/80 mb-6">
              Le iscrizioni per l'edizione 2025 sono aperte fino al 31 dicembre 2024. 
              Consulta il regolamento e invia la tua candidatura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button primary href="/iscrizioni">
                Invia il tuo film
              </Button>
              <Button outline secondary href="/regolamento">
                Leggi il regolamento
              </Button>
            </div>
          </GlassEffect>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#f5a623]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="font-poppins font-semibold text-movieboli-nero2 mb-2">Lungometraggi</h3>
              <p className="text-sm text-movieboli-nero1/70">Film con durata superiore ai 60 minuti</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#f5a623]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📹</span>
              </div>
              <h3 className="font-poppins font-semibold text-movieboli-nero2 mb-2">Cortometraggi</h3>
              <p className="text-sm text-movieboli-nero1/70">Film con durata inferiore ai 30 minuti</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#f5a623]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="font-poppins font-semibold text-movieboli-nero2 mb-2">Documentari</h3>
              <p className="text-sm text-movieboli-nero1/70">Film documentari di qualsiasi durata</p>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default ExampleSection;