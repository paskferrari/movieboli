import React, { useState } from 'react';

/**
 * Componente Prenota per il MoviEboli Film Festival
 * Form di prenotazione con validazione e conferma
 * Sfondo rosa, bottoni blu, design responsive
 */
const Prenota = () => {
  // State per i dati del form
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    evento: '',
    numeroPosti: 1
  });

  // State per errori di validazione
  const [errors, setErrors] = useState({});
  
  // State per messaggio di conferma
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // State per loading
  const [isLoading, setIsLoading] = useState(false);

  // Lista eventi disponibili
  const eventiDisponibili = [
    { id: '', nome: 'Seleziona un evento' },
    { id: 'luci-memoria', nome: 'Luci della Memoria - 15 Agosto 20:30' },
    { id: 'vento-sud', nome: 'Vento del Sud - 15 Agosto 21:00' },
    { id: 'frammenti-urbani', nome: 'Frammenti Urbani - 15 Agosto 21:30' },
    { id: 'silenzio-pietre', nome: 'Il Silenzio delle Pietre - 16 Agosto 20:00' },
    { id: 'radici-moderne', nome: 'Radici Moderne - 16 Agosto 20:45' },
    { id: 'echi-futuro', nome: 'Echi di Futuro - 16 Agosto 21:15' }
  ];

  // Funzione per gestire i cambiamenti nei campi del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Funzione di validazione
  const validateForm = () => {
    const newErrors = {};

    // Validazione nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Il nome deve contenere almeno 2 caratteri';
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    // Validazione evento
    if (!formData.evento) {
      newErrors.evento = 'Seleziona un evento';
    }

    // Validazione numero posti
    if (formData.numeroPosti < 1 || formData.numeroPosti > 10) {
      newErrors.numeroPosti = 'Il numero di posti deve essere tra 1 e 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simula una chiamata API
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
      
      // Reset del form
      setFormData({
        nome: '',
        email: '',
        evento: '',
        numeroPosti: 1
      });
      
      // Nascondi la conferma dopo 5 secondi
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="prenota" className="py-16 px-4 bg-rosa">
      <div className="max-w-4xl mx-auto">
        
        {/* Header della sezione */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bebas text-white mb-4">
            Prenota il tuo posto
          </h2>
          <p className="text-xl font-unica text-white opacity-90 max-w-2xl mx-auto">
            Assicurati un posto per i cortometraggi del MoviEboli Film Festival. 
            La prenotazione è gratuita e garantisce l'accesso prioritario.
          </p>
        </div>

        {/* Messaggio di conferma */}
        {showConfirmation && (
          <div className="mb-8 bg-green-500 text-white p-6 rounded-2xl text-center animate-fade-in">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bebas text-2xl mb-2">Prenotazione Confermata!</h3>
            <p className="font-unica">
              Grazie per la tua prenotazione. Riceverai una email di conferma a breve.
            </p>
          </div>
        )}

        {/* Form di prenotazione */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Nome */}
              <div>
                <label htmlFor="nome" className="block font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-unica text-gray-700 focus:outline-none focus:border-blu transition-colors ${
                    errors.nome ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Inserisci il tuo nome completo"
                />
                {errors.nome && (
                  <p className="mt-2 text-red-500 text-sm font-unica">{errors.nome}</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-unica text-gray-700 focus:outline-none focus:border-blu transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="la-tua-email@esempio.com"
                />
                {errors.email && (
                  <p className="mt-2 text-red-500 text-sm font-unica">{errors.email}</p>
                )}
              </div>

              {/* Campo Evento */}
              <div>
                <label htmlFor="evento" className="block font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">
                  Evento *
                </label>
                <select
                  id="evento"
                  name="evento"
                  value={formData.evento}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-unica text-gray-700 focus:outline-none focus:border-blu transition-colors ${
                    errors.evento ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  {eventiDisponibili.map((evento) => (
                    <option key={evento.id} value={evento.id}>
                      {evento.nome}
                    </option>
                  ))}
                </select>
                {errors.evento && (
                  <p className="mt-2 text-red-500 text-sm font-unica">{errors.evento}</p>
                )}
              </div>

              {/* Campo Numero Posti */}
              <div>
                <label htmlFor="numeroPosti" className="block font-stat text-sm uppercase tracking-wider text-bordeaux mb-2">
                  Numero di Posti
                </label>
                <input
                  type="number"
                  id="numeroPosti"
                  name="numeroPosti"
                  min="1"
                  max="10"
                  value={formData.numeroPosti}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-unica text-gray-700 focus:outline-none focus:border-blu transition-colors ${
                    errors.numeroPosti ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.numeroPosti && (
                  <p className="mt-2 text-red-500 text-sm font-unica">{errors.numeroPosti}</p>
                )}
                <p className="mt-1 text-gray-500 text-sm font-unica">
                  Massimo 10 posti per prenotazione
                </p>
              </div>

              {/* Bottone di invio */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blu hover:bg-blue-700 text-white font-stat text-lg uppercase tracking-wider py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Prenotazione in corso...</span>
                    </div>
                  ) : (
                    'Prenota ora'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Footer informativo */}
          <div className="bg-crema p-6 border-t">
            <div className="flex items-center justify-center space-x-4 text-gray-600 font-unica text-sm">
              <div className="flex items-center space-x-2">
                <span>🎫</span>
                <span>Ingresso gratuito</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>Conferma via email</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>Accesso prioritario</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prenota;