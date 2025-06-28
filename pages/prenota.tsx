import Head from 'next/head'
import Layout from '../components/Layout'
import { useState } from 'react'

export default function Prenota() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [tickets, setTickets] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const events = [
    { id: 'opening', name: 'Cerimonia di Apertura', date: '15 Luglio 2024', price: 25 },
    { id: 'competition', name: 'Concorso Internazionale', date: '16-18 Luglio 2024', price: 15 },
    { id: 'masterclass', name: 'Masterclass con Registi', date: '19 Luglio 2024', price: 35 },
    { id: 'closing', name: 'Cerimonia di Chiusura', date: '20 Luglio 2024', price: 30 },
    { id: 'full', name: 'Pass Completo Festival', date: 'Tutti gli eventi', price: 80 }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Qui andrà la logica per l'invio del form
    alert('Prenotazione inviata! Ti contatteremo presto per la conferma.')
  }

  const selectedEventData = events.find(event => event.id === selectedEvent)
  const totalPrice = selectedEventData ? selectedEventData.price * tickets : 0

  return (
    <>
      <Head>
        <title>Prenota Biglietti - MoviEboli Film Festival</title>
        <meta 
          name="description" 
          content="Prenota i tuoi biglietti per il MoviEboli Film Festival. Scegli tra eventi singoli o il pass completo."
        />
        <meta name="keywords" content="biglietti, prenotazione, festival, cinema, MoviEboli" />
      </Head>
      
      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-festival-primary to-festival-secondary py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="font-bebas text-5xl md:text-7xl text-white mb-6 tracking-wide">
                  Prenota i Tuoi Biglietti
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Assicurati il tuo posto agli eventi più esclusivi del festival
                </p>
              </div>
            </div>
          </section>

          {/* Booking Form Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Events List */}
                  <div>
                    <h2 className="font-staatliches text-3xl text-festival-dark mb-8">
                      Scegli il Tuo Evento
                    </h2>
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div 
                          key={event.id}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedEvent === event.id 
                              ? 'border-festival-primary bg-festival-primary/5' 
                              : 'border-gray-200 hover:border-festival-primary/50'
                          }`}
                          onClick={() => setSelectedEvent(event.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-festival-dark mb-2">
                                {event.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {event.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-festival-primary text-lg">
                                €{event.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div>
                    <h2 className="font-staatliches text-3xl text-festival-dark mb-8">
                      Completa la Prenotazione
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                          placeholder="Il tuo nome completo"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                          placeholder="la-tua-email@esempio.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                          placeholder="+39 123 456 7890"
                        />
                      </div>

                      {/* Ticket Quantity */}
                      {selectedEvent && (
                        <div>
                          <label htmlFor="tickets" className="block text-sm font-medium text-gray-700 mb-2">
                            Numero di Biglietti
                          </label>
                          <select
                            id="tickets"
                            value={tickets}
                            onChange={(e) => setTickets(parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-festival-primary focus:border-transparent"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Order Summary */}
                      {selectedEvent && (
                        <div className="bg-festival-light p-6 rounded-lg">
                          <h3 className="font-medium text-festival-dark mb-4">Riepilogo Ordine</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Evento:</span>
                              <span className="font-medium">{selectedEventData?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Biglietti:</span>
                              <span>{tickets}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Prezzo unitario:</span>
                              <span>€{selectedEventData?.price}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                              <span>Totale:</span>
                              <span className="text-festival-primary">€{totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={!selectedEvent || !formData.name || !formData.email}
                        className="w-full bg-festival-primary text-white py-4 px-6 rounded-lg font-medium hover:bg-festival-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
                      >
                        Prenota Ora
                      </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4">
                      * Riceverai una email di conferma con i dettagli del pagamento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}