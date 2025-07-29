import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode) // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (mode === 'register') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Il nome è obbligatorio'
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Il cognome è obbligatorio'
      }
      if (!formData.age || formData.age < 13 || formData.age > 120) {
        newErrors.age = 'L\'età deve essere compresa tra 13 e 120 anni'
      }
      if (!formData.gender.trim()) {
        newErrors.gender = 'Il sesso è obbligatorio'
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato email non valido'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La password è obbligatoria'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La password deve essere di almeno 6 caratteri'
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Le password non coincidono'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setErrors({ general: error.message })
        } else {
          onClose()
        }
      } else {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          age: parseInt(formData.age),
          gender: formData.gender
        }
        const { error } = await signUp(formData.email, formData.password, userData)
        if (error) {
          setErrors({ general: error.message })
        } else {
          setErrors({ general: 'Registrazione completata! Controlla la tua email per confermare l\'account.' })
        }
      }
    } catch (error) {
      setErrors({ general: 'Si è verificato un errore. Riprova.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      age: '',
      gender: ''
    })
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-movieboli-neroProfondo/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-movieboli-bordeaux/20 backdrop-blur-md rounded-2xl border border-movieboli-violaPrincipale/30 p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-movieboli-crema">
              {mode === 'login' ? 'Accedi' : 'Registrati'}
            </h2>
            <button
              onClick={onClose}
              className="text-movieboli-crema/60 hover:text-movieboli-crema transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome e Cognome (solo registrazione) */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                    placeholder="Nome"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                    Cognome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                    placeholder="Cognome"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Età e Sesso (solo registrazione) */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                    Età
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                    placeholder="Età"
                  />
                  {errors.age && (
                    <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                    Sesso
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                  >
                    <option value="" className="bg-movieboli-neroProfondo text-movieboli-crema">Seleziona...</option>
                    <option value="M" className="bg-movieboli-neroProfondo text-movieboli-crema">Maschio</option>
                    <option value="F" className="bg-movieboli-neroProfondo text-movieboli-crema">Femmina</option>
                    <option value="Altro" className="bg-movieboli-neroProfondo text-movieboli-crema">Altro</option>
                    <option value="Preferisco non rispondere" className="bg-movieboli-neroProfondo text-movieboli-crema">Preferisco non rispondere</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                placeholder="email@esempio.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Conferma Password (solo registrazione) */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-movieboli-crema/80 mb-2">
                  Conferma Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-movieboli-neroProfondo/50 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale transition-colors"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Errore generale */}
            {errors.general && (
              <div className={`p-3 rounded-xl text-sm ${
                errors.general.includes('Registrazione completata') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-movieboli-violaPrincipale text-movieboli-nero font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-movieboli-nero/30 border-t-movieboli-nero rounded-full animate-spin"></div>
                  <span>{mode === 'login' ? 'Accesso...' : 'Registrazione...'}</span>
                </div>
              ) : (
                mode === 'login' ? 'Accedi' : 'Registrati'
              )}
            </motion.button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-movieboli-crema/60 text-sm">
              {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
            </p>
            <button
              onClick={switchMode}
              className="text-movieboli-violaPrincipale font-medium hover:text-movieboli-violaSecondario transition-colors mt-1"
            >
              {mode === 'login' ? 'Registrati qui' : 'Accedi qui'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthModal