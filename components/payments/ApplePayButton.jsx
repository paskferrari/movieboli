import React, { useState, useEffect } from 'react';

const ApplePayButton = ({ amount, frequency, donorInfo, onSuccess, onError }) => {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Check if Apple Pay is available
    if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
      setIsApplePayAvailable(true);
    }
  }, []);

  const handleApplePayClick = async () => {
    if (!window.ApplePaySession) {
      onError('Apple Pay non è supportato su questo dispositivo');
      return;
    }

    setProcessing(true);

    try {
      const paymentRequest = {
        countryCode: 'IT',
        currencyCode: 'EUR',
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: `Donazione MOVIEBOLI - ${frequency === 'monthly' ? 'Mensile' : 'Una tantum'}`,
          amount: amount.toFixed(2)
        }
      };

      const session = new ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event) => {
        try {
          const response = await fetch('/api/payments/apple-pay-validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              validationURL: event.validationURL
            }),
          });

          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          session.abort();
          onError('Errore nella validazione Apple Pay');
        }
      };

      session.onpaymentauthorized = async (event) => {
        try {
          const response = await fetch('/api/payments/process-apple-pay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              payment: event.payment,
              amount,
              frequency,
              donorInfo
            }),
          });

          const result = await response.json();

          if (result.success) {
            session.completePayment(ApplePaySession.STATUS_SUCCESS);
            onSuccess({
              paymentId: result.paymentId,
              amount: amount,
              currency: 'EUR'
            });
          } else {
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            onError(result.error || 'Errore nel pagamento Apple Pay');
          }
        } catch (error) {
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          onError('Errore nel processamento del pagamento');
        }
      };

      session.oncancel = () => {
        setProcessing(false);
      };

      session.begin();
    } catch (error) {
      onError('Errore nell\'inizializzazione di Apple Pay');
      setProcessing(false);
    }
  };

  if (!isApplePayAvailable) {
    return null;
  }

  return (
    <button
      onClick={handleApplePayClick}
      disabled={processing}
      className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
    >
      {processing ? (
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
          </svg>
          <span>Pay</span>
        </>
      )}
    </button>
  );
};

export default ApplePayButton;