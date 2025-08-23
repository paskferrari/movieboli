import React from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../hooks/useAdmin'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from './AuthModal'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const { isAdmin, loading } = useAdmin()
  const [showAuthModal, setShowAuthModal] = React.useState(false)

  // Mostra loading durante il controllo
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-movieboli-violaPrincipale/30 border-t-movieboli-violaPrincipale rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-movieboli-crema text-lg">Verifica autorizzazioni...</p>
        </motion.div>
      </div>
    )
  }

  // Se non è autenticato, mostra il modal di login
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto p-8"
          >
            <div className="w-20 h-20 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-movieboli-crema mb-4">
              Accesso Richiesto
            </h2>
            <p className="text-movieboli-crema/80 mb-6">
              Devi essere autenticato per accedere alla dashboard amministrativa.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Accedi
            </motion.button>
          </motion.div>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    )
  }

  // Se è autenticato ma non è admin
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-movieboli-neroProfondo to-movieboli-nero flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-movieboli-crema mb-4">
            Accesso Negato
          </h2>
          <p className="text-movieboli-crema/80 mb-4">
            Non hai i permessi necessari per accedere alla dashboard amministrativa.
          </p>
          <p className="text-movieboli-crema/60 text-sm">
            Utente: {user?.email}
          </p>
        </motion.div>
      </div>
    )
  }

  // Se è autenticato e admin, mostra il contenuto
  return children
}

export default AdminRoute