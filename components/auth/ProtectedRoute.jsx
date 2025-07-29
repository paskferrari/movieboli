import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from './AuthModal'
import { motion } from 'framer-motion'

const ProtectedRoute = ({ children, fallback = null, showModal = true }) => {
  const { user, loading, isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated && showModal) {
      setShowAuthModal(true)
    }
  }, [loading, isAuthenticated, showModal])

  // Mostra loading mentre verifica l'autenticazione
  if (loading) {
    return (
      <div className="min-h-screen bg-movieboli-neroProfondo flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
          <h2 className="text-xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
          <p className="text-sm text-movieboli-crema/80">Verifica autenticazione...</p>
        </div>
      </div>
    )
  }

  // Se l'utente è autenticato, mostra il contenuto
  if (isAuthenticated) {
    return children
  }

  // Se non è autenticato e non deve mostrare il modal, mostra il fallback
  if (!showModal) {
    return fallback || (
      <div className="min-h-screen bg-movieboli-neroProfondo flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-movieboli-crema mb-4">
            Accesso Richiesto
          </h2>
          <p className="text-movieboli-crema/80 mb-6">
            Devi essere registrato per accedere a questa sezione del Festival 2025.
          </p>
        </div>
      </div>
    )
  }

  // Mostra il modal di autenticazione
  return (
    <>
      {/* Contenuto bloccato con overlay */}
      <div className="relative">
        {/* Contenuto sfocato */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Overlay con messaggio */}
        <div className="absolute inset-0 bg-movieboli-neroProfondo/80 flex items-center justify-center p-4">
          <motion.div 
            className="text-center max-w-md bg-movieboli-bordeaux/20 backdrop-blur-md rounded-2xl border border-movieboli-violaPrincipale/30 p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-movieboli-crema mb-4">
              Accesso Richiesto
            </h2>
            <p className="text-movieboli-crema/80 mb-6">
              Per votare i cortometraggi del Festival 2025 devi essere registrato. 
              Crea un account gratuito o accedi se ne hai già uno.
            </p>
            <motion.button
              onClick={() => setShowAuthModal(true)}
              className="w-full py-3 bg-movieboli-violaPrincipale text-movieboli-nero font-bold rounded-xl transition-all duration-200"
              whileTap={{ scale: 0.98 }}
            >
              Accedi o Registrati
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Modal di autenticazione */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </>
  )
}

export default ProtectedRoute