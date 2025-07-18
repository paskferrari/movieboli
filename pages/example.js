import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExampleSection from '../components/ExampleSection';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

/**
 * Pagina di esempio che mostra tutti i componenti migliorati
 * @returns {JSX.Element} - La pagina di esempio
 */
export default function ExamplePage() {
  return (
    <>
      <Head>
        <title>MOVIEBOLI Film Festival - Esempio</title>
        <meta name="description" content="Esempio di pagina con i componenti migliorati del MOVIEBOLI Film Festival" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col">
        {/* Navbar migliorata */}
        <Navbar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Sezioni di esempio con tutti i componenti migliorati */}
        <ExampleSection />
        
        {/* Footer migliorato */}
        <Footer />
        
        {/* Pulsante "Torna su" */}
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-50 border border-[#e5d4ed] hover:bg-[#f5a623] hover:text-white transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      </main>
    </>
  );
}