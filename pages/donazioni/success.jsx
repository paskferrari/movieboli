import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function DonationSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      // Fetch session details from your backend
      fetch(`/api/payments/checkout-session?session_id=${session_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setSessionData(data);
          }
        })
        .catch(err => {
          setError('Errore nel recupero dei dettagli della donazione');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-movieboli-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifica della donazione in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Errore nella Verifica</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => router.push('/donazioni')}
              className="bg-movieboli-primary-600 hover:bg-movieboli-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Torna alle Donazioni
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Donazione Completata - MOVIEBOLI</title>
        <meta name="description" content="Grazie per la tua donazione a MOVIEBOLI APS" />
      </Head>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Grazie per la tua donazione!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Il tuo contributo aiuta MOVIEBOLI a continuare a promuovere la cultura cinematografica e sostenere i giovani talenti.
            </p>
            
            {sessionData && (
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Dettagli della Donazione</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Importo:</span>
                    <span className="font-medium">€{(sessionData.amount_total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">
                      {sessionData.mode === 'subscription' ? 'Donazione Mensile' : 'Donazione Una Tantum'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Transazione:</span>
                    <span className="font-mono text-xs">{sessionData.id}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-movieboli-primary-600 hover:bg-movieboli-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Torna alla Home
              </button>
              
              <button
                onClick={() => router.push('/donazioni')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Fai un'altra Donazione
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}