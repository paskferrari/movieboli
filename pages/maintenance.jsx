import Head from 'next/head';
import { motion } from 'framer-motion';
import { useBranding } from '../contexts/BrandingContext';
import Button from '../components/Button';

const MaintenancePage = () => {
  const branding = useBranding();
  
  return (
    <>
      <Head>
        <title>Sito in Manutenzione - MOVIEBOLI</title>
        <meta name="description" content="Il sito MOVIEBOLI è attualmente in manutenzione. Torneremo presto online!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-movieboli-primary-900 via-movieboli-primary-800 to-movieboli-secondary-900 p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Stripe */}
          <div className="h-2 bg-gradient-to-r from-movieboli-accent to-movieboli-secondary-300" />
          
          <div className="p-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-movieboli-primary-600 to-movieboli-primary-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="ml-3">
                <div className="text-2xl font-bold text-movieboli-primary-900">MOVIEBOLI</div>
                <div className="text-xs text-movieboli-accent-600 font-medium">ASSOCIAZIONE CULTURALE</div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-movieboli-primary-900 mb-4">
                Sito in Manutenzione
              </h1>
              
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-movieboli-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <p className="text-movieboli-neutral-600 mb-4">
                Stiamo effettuando alcuni aggiornamenti al nostro sito web.
                Torneremo online il prima possibile!
              </p>
              
              <p className="text-sm text-movieboli-neutral-500 mb-6">
                Grazie per la pazienza e la comprensione.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="mailto:info@movieboli.it"
                  primary
                >
                  Contattaci
                </Button>
                
                <Button 
                  href="https://instagram.com/movieboli"
                  outline
                >
                  Seguici su Instagram
                </Button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center text-xs text-movieboli-neutral-400 pt-4 border-t border-movieboli-neutral-100">
              &copy; {new Date().getFullYear()} MOVIEBOLI APS. Tutti i diritti riservati.
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MaintenancePage;