import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '../../components/Footer'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { useAuth } from '../../contexts/AuthContext'
import EditableText from '../../components/ui/EditableText'
import { supabase } from '../../lib/supabase'

const SondaggioFestival = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    eta: '',
    genere: '',
    residenza: '',
    stato_regione: '',
    professione: '',
    titolo_studio: '',
    mezzo_trasporto: '',
    visitato_citta: '',
    film_visti: '',
    corti_visti: '',
    interviste_viste: '',
    conosce_macine: '',
    puntate_live: '',
    come_conosciuto: '',
    newsletter: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  // Gestione scroll per navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    try {
      setIsSubmitting(true)
      
      const { error } = await supabase
        .from('festival_survey')
        .insert({
          user_id: user?.id,
          ...formData,
          submitted_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      setSubmitMessage('Grazie per aver completato il sondaggio!')
      setFormData({
        eta: '',
        genere: '',
        residenza: '',
        stato_regione: '',
        professione: '',
        titolo_studio: '',
        mezzo_trasporto: '',
        visitato_citta: '',
        film_visti: '',
        corti_visti: '',
        interviste_viste: '',
        conosce_macine: '',
        puntate_live: '',
        come_conosciuto: '',
        newsletter: ''
      })
      
    } catch (error) {
      console.error('Errore nel salvare il sondaggio:', error)
      setSubmitMessage('Errore nel salvare il sondaggio. Riprova.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(''), 5000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-movieboli-nero via-gray-900 to-movieboli-nero">
        <Head>
          <title>Sondaggio Festival - MOVIEBOLI</title>
          <meta name="description" content="Sondaggio di gradimento del Festival MOVIEBOLI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {/* Navbar Festival Standardizzata */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center group">
                <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logo-movieboli.png"
                    alt="MOVIEBOLI Logo"
                    fill
                    className="object-contain filter brightness-0 invert"
                    priority
                  />
                </div>
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                  <EditableText 
                    contentKey="nav.program"
                    defaultValue="Programma"
                    tag="span"
                  />
                </Link>
                <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                  <EditableText 
                    contentKey="festival.nav.shorts"
                    defaultValue="Cortometraggi"
                    tag="span"
                  />
                </Link>
                <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                  <EditableText 
                    contentKey="festival.nav.vote"
                    defaultValue="Vota"
                    tag="span"
                  />
                </Link>
                <Link href="/festival/contest_artistico/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
                  <EditableText 
                    contentKey="festival.nav.contest"
                    defaultValue="Contest"
                    tag="span"
                  />
                </Link>
                <Link href="/festival/sondaggio" className="font-poppins font-medium text-movieboli-violaPrincipale">
                  <EditableText 
                    contentKey="festival.nav.survey"
                    defaultValue="Sondaggio"
                    tag="span"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                  variants={itemVariants}
                >
                  <EditableText 
                    contentKey="survey.title"
                    defaultValue="Sondaggio Festival"
                    tag="span"
                  />
                </motion.h1>
                <motion.p 
                  className="text-xl text-movieboli-crema mb-8"
                  variants={itemVariants}
                >
                  <EditableText 
                    contentKey="survey.description"
                    defaultValue="La tua opinione è importante per noi. Aiutaci a migliorare il Festival MOVIEBOLI."
                    tag="span"
                  />
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Form Section */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.form 
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-2xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Dati demografici */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Dati demografici</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Età</label>
                      <input
                        type="number"
                        value={formData.eta}
                        onChange={(e) => handleInputChange('eta', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-movieboli-violaPrincipale focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Genere</label>
                      <div className="flex gap-4">
                        {['Maschio', 'Femmina', 'Altro'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="genere"
                              value={option}
                              checked={formData.genere === option}
                              onChange={(e) => handleInputChange('genere', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Residenza (Città)</label>
                      <input
                        type="text"
                        value={formData.residenza}
                        onChange={(e) => handleInputChange('residenza', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-movieboli-violaPrincipale focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stato / Regione</label>
                      <input
                        type="text"
                        value={formData.stato_regione}
                        onChange={(e) => handleInputChange('stato_regione', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-movieboli-violaPrincipale focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professione</label>
                      <input
                        type="text"
                        value={formData.professione}
                        onChange={(e) => handleInputChange('professione', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-movieboli-violaPrincipale focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titolo di studio</label>
                      <div className="space-y-2">
                        {['Scuola dell\'obbligo', 'Diploma', 'Laurea', 'Altro'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="titolo_studio"
                              value={option}
                              checked={formData.titolo_studio === option}
                              onChange={(e) => handleInputChange('titolo_studio', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Esperienza logistica */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Esperienza logistica</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mezzo di trasporto usato per raggiungere il Festival</label>
                      <div className="flex flex-wrap gap-4">
                        {['Auto', 'Treno', 'Bus', 'Aereo', 'Altro'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="mezzo_trasporto"
                              value={option}
                              checked={formData.mezzo_trasporto === option}
                              onChange={(e) => handleInputChange('mezzo_trasporto', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hai visitato la città durante il Festival?</label>
                      <div className="flex gap-4">
                        {['Sì', 'No'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="visitato_citta"
                              value={option}
                              checked={formData.visitato_citta === option}
                              onChange={(e) => handleInputChange('visitato_citta', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Partecipazione al Festival */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Partecipazione al Festival</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quanti film hai visto?</label>
                      <div className="flex gap-4">
                        {['1', '2', '3'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="film_visti"
                              value={option}
                              checked={formData.film_visti === option}
                              onChange={(e) => handleInputChange('film_visti', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quanti corti hai visto?</label>
                      <div className="flex gap-4">
                        {['1-2', '3-5', '6-8'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="corti_visti"
                              value={option}
                              checked={formData.corti_visti === option}
                              onChange={(e) => handleInputChange('corti_visti', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quante interviste hai visto?</label>
                      <div className="flex gap-4">
                        {['Nessuna', '1-2', '3 o più'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="interviste_viste"
                              value={option}
                              checked={formData.interviste_viste === option}
                              onChange={(e) => handleInputChange('interviste_viste', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Conosci Macine?</label>
                      <div className="flex gap-4">
                        {['Sì', 'No'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="conosce_macine"
                              value={option}
                              checked={formData.conosce_macine === option}
                              onChange={(e) => handleInputChange('conosce_macine', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">A quante puntate live hai assistito?</label>
                      <div className="flex gap-4">
                        {['Nessuna', '1-2', '3 o più'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="puntate_live"
                              value={option}
                              checked={formData.puntate_live === option}
                              onChange={(e) => handleInputChange('puntate_live', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comunicazione e feedback */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Comunicazione e feedback</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Come hai conosciuto il Festival?</label>
                      <div className="flex flex-wrap gap-4">
                        {['Passaparola', 'Amici/parenti', 'Social', 'Giornali', 'TV', 'Altro'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="come_conosciuto"
                              value={option}
                              checked={formData.come_conosciuto === option}
                              onChange={(e) => handleInputChange('come_conosciuto', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Saresti interessato a ricevere una newsletter?</label>
                      <div className="flex gap-4">
                        {['Sì', 'No'].map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="newsletter"
                              value={option}
                              checked={formData.newsletter === option}
                              onChange={(e) => handleInputChange('newsletter', e.target.value)}
                              className="mr-2"
                              required
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div className="text-center" variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-movieboli-violaPrincipale hover:bg-movieboli-violaSecondario transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Invio in corso...
                      </div>
                    ) : (
                      'Invia Sondaggio'
                    )}
                  </button>
                  
                  {submitMessage && (
                    <motion.p 
                      className={`mt-4 text-lg font-medium ${
                        submitMessage.includes('Grazie') ? 'text-green-600' : 'text-red-600'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {submitMessage}
                    </motion.p>
                  )}
                </motion.div>
              </motion.form>
            </div>
          </section>

          {/* Back to Festival */}
          <section className="py-12 px-4 text-center">
            <Link href="/festival" className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-white font-bold transition-all duration-300 hover:bg-movieboli-violaSecondario transform hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna al Festival
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default SondaggioFestival