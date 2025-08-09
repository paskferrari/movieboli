import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import { useContent } from '../../contexts/ContentContext';
import EditableText from '../ui/EditableText';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Predefined donation amounts
const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500];

const DonationForm = () => {
  const { getContent } = useContent();
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once'); // 'once' or 'monthly'
  const [donorInfo, setDonorInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    anonymous: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe', 'applepay', 'bonifico'
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showBonifico, setShowBonifico] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Initialize Apple Pay / Google Pay
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
        // Handle Apple Pay / Google Pay payment
        const { error: confirmError } = await stripe.confirmCardPayment(
          // You would need to create a payment intent first
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

  // Generate idempotency key
  const generateIdempotencyKey = () => {
    return `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Handle Stripe Checkout redirect
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
          amount: amount * 100, // Convert to cents
          frequency,
          donorInfo
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la creazione della sessione di pagamento');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (err) {
      console.error('Errore checkout:', err);
      setError(err.message || 'Errore durante il pagamento');
      setIsProcessing(false);
    }
  };

  // Handle bonifico form submission
  const handleBonificoSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Validate donor info for bonifico
      if (!donorInfo.email || !donorInfo.firstName || !donorInfo.lastName) {
        throw new Error('Tutti i campi sono obbligatori per il bonifico');
      }

      // Here you could send the bonifico request to your backend
      // For now, we'll just show the success state
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
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
              <span className="text-gray-600">IBAN:</span>
              <span className="font-mono font-medium">IT60 X054 2811 1010 0000 0123 456</span>
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Amount Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <EditableText 
              contentKey="donazioni.form.importo_titolo"
              defaultValue="Scegli l'importo"
            />
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {DONATION_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount('');
                }}
                className={`p-3 rounded-xl border-2 transition-all ${
                  amount === preset && !customAmount
                    ? 'border-movieboli-primary-600 bg-movieboli-primary-50 text-movieboli-primary-700'
                    : 'border-gray-200 hover:border-movieboli-primary-300'
                }`}
              >
                €{preset}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Altro importo"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(parseFloat(e.target.value) || 0);
              }}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-movieboli-primary-500 focus:border-transparent"
              min="0.10"
              step="0.01"
              max="10000"
            />
            <span className="absolute right-3 top-3 text-gray-500">€</span>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <EditableText 
              contentKey="donazioni.form.frequenza_titolo"
              defaultValue="Frequenza"
            />
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setFrequency('once')}
              className={`p-4 rounded-xl border-2 transition-all ${
                frequency === 'once'
                  ? 'border-movieboli-primary-600 bg-movieboli-primary-50'
                  : 'border-gray-200 hover:border-movieboli-primary-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Una tantum</div>
              <div className="text-sm text-gray-600">Donazione singola</div>
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`p-4 rounded-xl border-2 transition-all ${
                frequency === 'monthly'
                  ? 'border-movieboli-primary-600 bg-movieboli-primary-50'
                  : 'border-gray-200 hover:border-movieboli-primary-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Mensile</div>
              <div className="text-sm text-gray-600">Sostegno continuativo</div>
            </button>
          </div>
        </div>

        {/* Donor Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <EditableText 
              contentKey="donazioni.form.info_titolo"
              defaultValue="Le tue informazioni"
            />
          </h3>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={donorInfo.anonymous}
                onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                className="mr-3 h-4 w-4 text-movieboli-primary-600 focus:ring-movieboli-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                <EditableText 
                  contentKey="donazioni.form.anonimo"
                  defaultValue="Donazione anonima"
                />
              </span>
            </label>
          </div>

          {!donorInfo.anonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={donorInfo.firstName}
                  onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-movieboli-primary-500 focus:border-transparent"
                  required={!donorInfo.anonymous}
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
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-movieboli-primary-500 focus:border-transparent"
                  required={!donorInfo.anonymous}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-movieboli-primary-500 focus:border-transparent"
                  required={!donorInfo.anonymous}
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <EditableText 
              contentKey="donazioni.form.metodo_titolo"
              defaultValue="Metodo di pagamento"
            />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'stripe'
                  ? 'border-movieboli-primary-600 bg-movieboli-primary-50'
                  : 'border-gray-200 hover:border-movieboli-primary-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Carta di Credito</div>
              <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
            </button>
            
            {paymentRequest && (
              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'applepay'
                    ? 'border-movieboli-primary-600 bg-movieboli-primary-50'
                    : 'border-gray-200 hover:border-movieboli-primary-300'
                }`}
              >
                <div className="font-semibold text-gray-900">Apple Pay</div>
                <div className="text-sm text-gray-600">Pagamento rapido</div>
              </button>
            )}
            
            <button
              onClick={() => setPaymentMethod('bonifico')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'bonifico'
                  ? 'border-movieboli-primary-600 bg-movieboli-primary-50'
                  : 'border-gray-200 hover:border-movieboli-primary-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Bonifico Bancario</div>
              <div className="text-sm text-gray-600">Trasferimento diretto</div>
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Payment Forms */}
        {paymentMethod === 'stripe' && (
          <div>
            <button
              onClick={handleStripeCheckout}
              disabled={isProcessing || amount < 5}
              className="w-full bg-movieboli-primary-600 hover:bg-movieboli-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reindirizzamento...
                </span>
              ) : (
                `Dona €${amount} con Carta`
              )}
            </button>
          </div>
        )}

        {paymentMethod === 'bonifico' && (
          <form onSubmit={handleBonificoSubmit}>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Informazioni per il Bonifico</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Beneficiario:</strong> MOVIEBOLI APS</p>
                <p><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</p>
                <p><strong>Causale:</strong> Donazione MOVIEBOLI - {donorInfo.firstName} {donorInfo.lastName}</p>
                <p><strong>Importo:</strong> €{amount}</p>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing || donorInfo.anonymous || !donorInfo.email || !donorInfo.firstName || !donorInfo.lastName}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Invio richiesta...
                </span>
              ) : (
                `Richiedi Dettagli Bonifico per €${amount}`
              )}
            </button>
          </form>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                <EditableText 
                  contentKey="donazioni.form.sicurezza_titolo"
                  defaultValue="Pagamento sicuro"
                />
              </p>
              <p className="text-xs text-gray-600">
                <EditableText 
                  contentKey="donazioni.form.sicurezza_desc"
                  defaultValue="Dona in modo rapido e sicuro con carta di credito o Apple Pay. Tutti i pagamenti sono protetti e conformi alle normative europee."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper con Elements provider
const DonationFormWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm />
    </Elements>
  );
};

// Esporta solo il wrapper
export default DonationFormWrapper;


