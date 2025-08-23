import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Prenota = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    evento: '',
    numeroPosti: 1
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Eventi disponibili per la prenotazione
  const eventiDisponibili = [
    {
      id: 'film1',
      nome: 'La Strada del Cinema',
      data: '15 Luglio 2025',
      orario: '20:30',
      tipo: 'Lungometraggio'
    },
    {
      id: 'film2',
      nome: 'Luci della Città',
      data: '16 Luglio 2025',
      orario: '18:00',
      tipo: 'Lungometraggio'
    },
    {
      id: 'corti1',
      nome: 'Serata Cortometraggi - Blocco A',
      data: '15 Luglio 2025',
      orario: '16:30',
      tipo: 'Cortometraggi'
    },
    {
      id: 'corti2',
      nome: 'Serata Cortometraggi - Blocco B',
      data: '17 Luglio 2025',
      orario: '19:30',
      tipo: 'Cortometraggi'
    },
    {
      id: 'masterclass1',
      nome: 'Masterclass con Roberto Benigni',
      data: '15 Luglio 2025',
      orario: '15:00',
      tipo: 'Masterclass'
    },
    {
      id: 'workshop1',
      nome: 'Workshop di Regia con Matteo Garrone',
      data: '17 Luglio 2025',
      orario: '10:00',
      tipo: 'Workshop'
    },
    {
      id: 'premiazione',
      nome: 'Cerimonia di Premiazione',
      data: '18 Luglio 2025',
      orario: '22:00',
      tipo: 'Cerimonia'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validazione nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio'
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Il nome deve contenere almeno 2 caratteri'
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida'
    }

    // Validazione evento
    if (!formData.evento) {
      newErrors.evento = 'Seleziona un evento'
    }

    // Validazione numero posti
    if (formData.numeroPosti < 1 || formData.numeroPosti > 6) {
      newErrors.numeroPosti = 'Il numero di posti deve essere tra 1 e 6'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simula chiamata API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simula successo
      
      setShowConfirmation(true)
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        evento: '',
        numeroPosti: 1
      })
    } catch (error) {
      console.error('Errore durante la prenotazione:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedEvent = eventiDisponibili.find(evento => evento.id === formData.evento)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-movieboli-rosaSfondo via-movieboli-crema to-movieboli-rosaSfondo/80">
        <Navbar />
        <motion.div 
          className="min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md mx-auto text-center shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Prenotazione Confermata!
            </h2>
            <p className="text-gray-600 mb-8">
              Riceverai una email di conferma con tutti i dettagli della tua prenotazione.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-movieboli-nero font-semibold py-3 px-8 rounded-xl transition-colors duration-200"
            >
              Nuova Prenotazione
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-movieboli-rosaSfondo via-movieboli-crema to-movieboli-rosaSfondo/80">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-movieboli-violaPrincipale/20 via-transparent to-movieboli-crema/30" />
        
        <motion.div 
          className="relative z-10 w-full max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Titolo Hero */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
              Prenota il tuo posto
            </h1>
            <p className="text-lg md:text-xl text-black/80 max-w-xl mx-auto">
              Scegli l'evento e compila il modulo per assicurarti il tuo posto al MoviEboli Film Festival
            </p>
          </motion.div>

          {/* Form di Prenotazione */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    errors.nome 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-movieboli-violaPrincipale'
                  }`}
                  placeholder="Inserisci il tuo nome completo"
                />
                {errors.nome && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.nome}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 focus:outline-none focus:ring-0 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-movieboli-violaPrincipale'
                  }`}
                  placeholder="la-tua-email@esempio.com"
                />
                {errors.email && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Seleziona Evento */}
              <div>
                <label htmlFor="evento" className="block text-sm font-semibold text-gray-700 mb-2">
                  Seleziona Evento *
                </label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 focus:outline-none focus:ring-0 appearance-none bg-white ${
                    errors.evento 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-movieboli-violaPrincipale'
                  }`}
                >
                  <option value="">Scegli un evento...</option>
                  {eventiDisponibili.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nome} - {evento.data} ore {evento.orario}
                    </option>
                  ))}
                </select>
                {errors.evento && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.evento}
                  </motion.p>
                )}
                
                {/* Dettagli evento selezionato */}
                {selectedEvent && (
                  <motion.div 
                    className="mt-3 p-4 bg-movieboli-violaPrincipale/10 rounded-xl border border-movieboli-violaPrincipale/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <p className="font-semibold text-gray-800">{selectedEvent.nome}</p>
                        <p className="text-sm text-gray-600">{selectedEvent.tipo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-movieboli-bordeaux">{selectedEvent.data}</p>
                        <p className="text-sm text-gray-600">ore {selectedEvent.orario}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Numero Posti */}
              <div>
                <label htmlFor="numeroPosti" className="block text-sm font-semibold text-gray-700 mb-2">
                  Numero di Posti (1-6)
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, numeroPosti: Math.max(1, prev.numeroPosti - 1) }))}
                    className="w-10 h-10 rounded-full bg-movieboli-violaPrincipale/20 hover:bg-movieboli-violaPrincipale/30 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    id="numeroPosti"
                    name="numeroPosti"
                    min="1"
                    max="6"
                    value={formData.numeroPosti}
                    onChange={handleInputChange}
                    className={`w-20 px-4 py-3 rounded-xl border-2 text-center transition-colors duration-200 focus:outline-none focus:ring-0 ${
                      errors.numeroPosti 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-movieboli-violaPrincipale'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, numeroPosti: Math.min(6, prev.numeroPosti + 1) }))}
                    className="w-10 h-10 rounded-full bg-movieboli-violaPrincipale/20 hover:bg-movieboli-violaPrincipale/30 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                {errors.numeroPosti && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.numeroPosti}
                  </motion.p>
                )}
              </div>

              {/* Bottone Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-movieboli-bordeaux hover:bg-movieboli-bordeaux/80 hover:scale-105'
                } text-white shadow-lg`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Prenotazione in corso...</span>
                  </div>
                ) : (
                  'Prenota Ora'
                )}
              </motion.button>
            </form>

            {/* Note informative */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">Informazioni Importanti:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Riceverai una email di conferma con i dettagli della prenotazione</li>
                <li>• I posti sono limitati e assegnati in base all'ordine di arrivo</li>
                <li>• È possibile prenotare massimo 6 posti per evento</li>
                <li>• La prenotazione è gratuita ma obbligatoria</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default Prenota