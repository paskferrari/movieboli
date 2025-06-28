import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/homepage/Hero'
import ChiSiamo from '../components/homepage/ChiSiamo'
import Attivita from '../components/homepage/Attivita'
import FestivalTeaser from '../components/homepage/FestivalTeaser'
import Contattaci from '../components/homepage/Contattaci'

/**
 * Homepage MOVIEBOLI - Associazione Culturale
 * Struttura: Hero + Chi siamo + Attività + Festival + Contattaci
 * Design: cinematografico, pop-surrealista, elegante
 */
export default function Home() {
  return (
    <>
      {/* Navbar trasparente su Hero, nera nelle altre sezioni */}
      <Navbar />
      
      {/* Contenuto principale homepage */}
      <main>
        {/* Hero Section - Schermo intero con sfondo nero */}
        <Hero />
        
        {/* Chi siamo - Sfondo rosa con missione associazione */}
        <ChiSiamo />
        
        {/* Le nostre attività - Griglia con cards eventi */}
        <Attivita />
        
        {/* Il Festival - Banner teaser MoviEboli Film Festival */}
        <FestivalTeaser />
        
        {/* Contattaci - Call to action finale */}
        <Contattaci />
      </main>
      
      {/* Footer scuro essenziale */}
      <Footer />
    </>
  )
}