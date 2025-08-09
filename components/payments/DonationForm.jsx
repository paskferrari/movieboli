import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import EditableText from '../ui/EditableText';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500];

const DonationForm = () => {
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [donorInfo, setDonorInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    anonymous: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showBonifico, setShowBonifico] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'IT',
        currency: 'eur',
        total: {
          label: 'Donazione MOVIEBOLI',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        const { error: confirmError } = await stripe.confirmCardPayment(
          '', 
          { payment_method: ev.paymentMethod.id }
        );

        if (confirmError) {
          ev.complete('fail');
        } else {
          ev.complete('success');
          setSuccess(true);
        }
      });
    }
  }, [stripe, amount]);

  const generateIdempotencyKey = () => {
    return `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const idempotencyKey = generateIdempotencyKey();
      
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({
          amount: amount * 100,
          frequency,
          donorInfo
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la creazione della sessione di pagamento');
      }

      const { url } = await response.json();
      
      window.location.href = url;
      
    } catch (err) {
      console.error('Errore checkout:', err);
      setError(err.message || 'Errore durante il pagamento');
      setIsProcessing(false);
    }
  };

  const handleBonificoSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      if (!donorInfo.email || !donorInfo.firstName || !donorInfo.lastName) {
        throw new Error('Tutti i campi sono obbligatori per il bonifico');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowBonifico(true);
      setSuccess(true);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (success && showBonifico) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-blue-50 rounded-2xl border border-blue-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Richiesta di Bonifico Ricevuta!
          </h2>
          <p className="text-gray-600">
            Ti abbiamo inviato un'email con tutti i dettagli per completare la donazione tramite bonifico.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-blue-200 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Dettagli per il Bonifico:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Beneficiario:</span>
              <span className="font-medium">MOVIEBOLI APS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Banca:</span>
              <span className="font-medium">BANCA POPOLARE DELL'EMILIA ROMAGNA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IBAN:</span>
              <span className="font-mono font-medium">IT73I0538776090000003879784</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Importo:</span>
              <span className="font-medium">€{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Causale:</span>
              <span className="font-medium">Donazione MOVIEBOLI - {donorInfo.firstName} {donorInfo.lastName}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => window.location.href = '/donazioni'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Torna alle Donazioni
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-2xl border border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Grazie per la tua donazione!
          </h2>
          <p className="text-gray-600 mb-6">
            Il tuo contributo aiuta MOVIEBOLI a continuare a promuovere la cultura cinematografica.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-movieboli-primary-600 hover:bg-movieboli-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-movieboli-primary-600 via-movieboli-primary-700 to-purple-800 rounded-3xl p-8 mb-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <img 
              src="/images/logo.png" 
              alt="MovieBoli Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            <EditableText contentKey="donazioni.hero.titolo" defaultValue="Sostieni MOVIEBOLI" />
          </h2>
          <p className="text-xl opacity-90 mb-6">
            <EditableText contentKey="donazioni.hero.sottotitolo" defaultValue="Il tuo contributo aiuta a promuovere la cultura cinematografica" />
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sicuro al 100%
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Deducibile fiscalmente
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Impatto immediato
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-4 md:mx-0">
        <div className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-movieboli-primary-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-movieboli-primary-600 font-bold text-sm">1</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              <EditableText 
                contentKey="donazioni.form.importo_titolo"
                defaultValue="Scegli l'importo della tua donazione"
              />
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            {DONATION_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount('');
                }}
                className={`group relative p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  amount === preset && !customAmount
                    ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                    : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className={`text-xl md:text-2xl font-bold mb-1 ${
                    amount === preset && !customAmount ? 'text-movieboli-primary-700' : 'text-gray-900'
                  }`}>
                    €{preset}
                  </div>
                  <div className={`text-xs ${
                    amount === preset && !customAmount ? 'text-movieboli-primary-600' : 'text-gray-500'
                  }`}>
                    {preset <= 25 ? 'Sostegno base' : preset <= 100 ? 'Sostegno medio' : 'Sostegno premium'}
                  </div>
                </div>
                {amount === preset && !customAmount && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-movieboli-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">€</span>
            </div>
            <input
              type="number"
              placeholder="Inserisci un importo personalizzato"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(parseFloat(e.target.value) || 0);
              }}
              className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-movieboli-primary-100 focus:border-movieboli-primary-500 transition-all text-lg font-medium"
              min="0.10"
              step="0.01"
              max="10000"
            />
          </div>
          
          {amount > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center text-green-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Con €{amount} puoi sostenere {amount >= 100 ? 'un intero evento' : amount >= 50 ? 'una proiezione' : 'le attività dell\'associazione'}!</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-movieboli-primary-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-movieboli-primary-600 font-bold text-sm">2</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              <EditableText 
                contentKey="donazioni.form.frequenza_titolo"
                defaultValue="Scegli la frequenza"
              />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <button
              onClick={() => setFrequency('once')}
              className={`group p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                frequency === 'once'
                  ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                  : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-4 ${
                  frequency === 'once' ? 'bg-movieboli-primary-500' : 'bg-gray-100 group-hover:bg-movieboli-primary-100'
                }`}>
                  <span className={`text-xl md:text-2xl ${
                    frequency === 'once' ? 'text-white' : 'text-gray-500 group-hover:text-movieboli-primary-500'
                  }`}>⏰</span>
                </div>
                <div>
                  <div className={`font-bold text-base md:text-lg ${
                    frequency === 'once' ? 'text-movieboli-primary-700' : 'text-gray-900'
                  }`}>Una tantum</div>
                  <div className={`text-sm ${
                    frequency === 'once' ? 'text-movieboli-primary-600' : 'text-gray-600'
                  }`}>Donazione singola</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Perfetto per sostenere un evento specifico o fare una donazione occasionale.
              </p>
            </button>
            
            <button
              onClick={() => setFrequency('monthly')}
              className={`group p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 relative ${
                frequency === 'monthly'
                  ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                  : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
              }`}
            >
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPOLARE
              </div>
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-4 ${
                  frequency === 'monthly' ? 'bg-movieboli-primary-500' : 'bg-gray-100 group-hover:bg-movieboli-primary-100'
                }`}>
                  <span className={`text-xl md:text-2xl ${
                    frequency === 'monthly' ? 'text-white' : 'text-gray-500 group-hover:text-movieboli-primary-500'
                  }`}>🔄</span>
                </div>
                <div>
                  <div className={`font-bold text-base md:text-lg ${
                    frequency === 'monthly' ? 'text-movieboli-primary-700' : 'text-gray-900'
                  }`}>Mensile</div>
                  <div className={`text-sm ${
                    frequency === 'monthly' ? 'text-movieboli-primary-600' : 'text-gray-600'
                  }`}>Sostegno continuativo</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-left">
                Diventa un sostenitore regolare e aiutaci a pianificare meglio le nostre attività.
              </p>
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-100 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-movieboli-primary-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-movieboli-primary-600 font-bold text-sm">3</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              <EditableText 
                contentKey="donazioni.form.info_titolo"
                defaultValue="Le tue informazioni"
              />
            </h3>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-movieboli-primary-300 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={donorInfo.anonymous}
                onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                className="w-5 h-5 text-movieboli-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-movieboli-primary-500 focus:ring-2"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Donazione anonima</div>
                <div className="text-sm text-gray-600">Non voglio che il mio nome appaia pubblicamente</div>
              </div>
            </label>
          </div>
          
          {!donorInfo.anonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={donorInfo.firstName}
                  onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-movieboli-primary-100 focus:border-movieboli-primary-500 transition-all"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  value={donorInfo.lastName}
                  onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-movieboli-primary-100 focus:border-movieboli-primary-500 transition-all"
                  placeholder="Il tuo cognome"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={donorInfo.email}
              onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-movieboli-primary-100 focus:border-movieboli-primary-500 transition-all"
              placeholder="la-tua-email@esempio.com"
              required
            />
            <p className="mt-2 text-sm text-gray-600">
              Riceverai una ricevuta della donazione e aggiornamenti sulle nostre attività.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-movieboli-primary-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-movieboli-primary-600 font-bold text-sm">4</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              <EditableText 
                contentKey="donazioni.form.pagamento_titolo"
                defaultValue="Metodo di pagamento"
              />
            </h3>
          </div>
          
          <div className="space-y-4 mb-8">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                paymentMethod === 'stripe'
                  ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                  : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-4 ${
                    paymentMethod === 'stripe' ? 'bg-movieboli-primary-500' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xl md:text-2xl ${
                      paymentMethod === 'stripe' ? 'text-white' : 'text-gray-500'
                    }`}>💳</span>
                  </div>
                  <div>
                    <div className={`font-bold text-base md:text-lg ${
                      paymentMethod === 'stripe' ? 'text-movieboli-primary-700' : 'text-gray-900'
                    }`}>Carta di Credito/Debito</div>
                    <div className={`text-sm ${
                      paymentMethod === 'stripe' ? 'text-movieboli-primary-600' : 'text-gray-600'
                    }`}>Visa, Mastercard, American Express</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">SICURO</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">IMMEDIATO</span>
                </div>
              </div>
            </button>
            
            {paymentRequest && (
              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  paymentMethod === 'applepay'
                    ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                    : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-4 ${
                      paymentMethod === 'applepay' ? 'bg-movieboli-primary-500' : 'bg-gray-100'
                    }`}>
                      <span className={`text-xl md:text-2xl ${
                        paymentMethod === 'applepay' ? 'text-white' : 'text-gray-500'
                      }`}>📱</span>
                    </div>
                    <div>
                      <div className={`font-bold text-base md:text-lg ${
                        paymentMethod === 'applepay' ? 'text-movieboli-primary-700' : 'text-gray-900'
                      }`}>Apple Pay / Google Pay</div>
                      <div className={`text-sm ${
                        paymentMethod === 'applepay' ? 'text-movieboli-primary-600' : 'text-gray-600'
                      }`}>Pagamento con un tocco</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">VELOCE</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">SICURO</span>
                  </div>
                </div>
              </button>
            )}
            
            <button
              onClick={() => setPaymentMethod('bonifico')}
              className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                paymentMethod === 'bonifico'
                  ? 'border-movieboli-primary-500 bg-gradient-to-br from-movieboli-primary-50 to-movieboli-primary-100 shadow-lg'
                  : 'border-gray-200 hover:border-movieboli-primary-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-4 ${
                    paymentMethod === 'bonifico' ? 'bg-movieboli-primary-500' : 'bg-gray-100'
                  }`}>
                    <span className={`text-xl md:text-2xl ${
                      paymentMethod === 'bonifico' ? 'text-white' : 'text-gray-500'
                    }`}>🏦</span>
                  </div>
                  <div>
                    <div className={`font-bold text-base md:text-lg ${
                      paymentMethod === 'bonifico' ? 'text-movieboli-primary-700' : 'text-gray-900'
                    }`}>Bonifico Bancario</div>
                    <div className={`text-sm ${
                      paymentMethod === 'bonifico' ? 'text-movieboli-primary-600' : 'text-gray-600'
                    }`}>Riceverai i dettagli via email</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">TRADIZIONALE</span>
                </div>
              </div>
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center text-red-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {paymentMethod === 'stripe' && (
              <button
                onClick={handleStripeCheckout}
                disabled={isProcessing || amount <= 0}
                className="w-full bg-gradient-to-r from-movieboli-primary-600 to-movieboli-primary-700 hover:from-movieboli-primary-700 hover:to-movieboli-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 md:py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Elaborazione...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-lg md:text-xl">Dona €{amount} {frequency === 'monthly' ? '/mese' : ''}</span>
                    <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            )}
            
            {paymentMethod === 'applepay' && paymentRequest && (
              <div className="w-full">
                <PaymentRequestButtonElement
                  options={{
                    paymentRequest,
                    style: {
                      paymentRequestButton: {
                        theme: 'dark',
                        height: '64px',
                        type: 'donate',
                      },
                    },
                  }}
                />
              </div>
            )}
            
            {paymentMethod === 'bonifico' && (
              <form onSubmit={handleBonificoSubmit}>
                <button
                  type="submit"
                  disabled={isProcessing || amount <= 0 || !donorInfo.email || !donorInfo.firstName || !donorInfo.lastName}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 md:py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Elaborazione...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-lg md:text-xl">Richiedi Bonifico per €{amount}</span>
                      <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                <EditableText 
                  contentKey="donazioni.form.sicurezza"
                  defaultValue="I tuoi dati sono protetti con crittografia SSL a 256 bit"
                />
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  SSL Sicuro
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verificato
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                  Privacy Protetta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DonationFormWrapper = () => {
    return (
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    );
  };

  export default DonationFormWrapper;