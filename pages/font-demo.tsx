import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

const FontDemoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Demo Font - MoviEboli Festival</title>
        <meta name="description" content="Dimostrazione dei font personalizzati del MoviEboli Festival" />
      </Head>
      
      <Layout>
        <div className="min-h-screen py-16">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bebas text-festival-dark mb-6">
                Demo Font Personalizzati
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-unica">
                Esempi di utilizzo dei font configurati per il MoviEboli Festival
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Bebas Neue */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-4xl font-bebas text-bordeaux mb-4">
                  Bebas Neue
                </h2>
                <p className="text-gray-600 mb-6 font-unica">
                  Font per titoli e intestazioni
                </p>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bebas text-rosa">
                    FESTIVAL ARTISTICO
                  </h3>
                  <h4 className="text-2xl font-bebas text-blu">
                    MOVIEBOLI 2024
                  </h4>
                  <h5 className="text-xl font-bebas text-bordeaux">
                    CINEMA E ARTE
                  </h5>
                </div>
                <div className="mt-6 p-3 bg-gray-100 rounded">
                  <code className="text-sm text-gray-700">
                    font-bebas
                  </code>
                </div>
              </div>

              {/* Staatliches */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-4xl font-stat text-bordeaux mb-4">
                  Staatliches
                </h2>
                <p className="text-gray-600 mb-6 font-unica">
                  Font per elementi display e accenti
                </p>
                <div className="space-y-3">
                  <p className="text-2xl font-stat text-rosa">
                    EVENTI SPECIALI
                  </p>
                  <p className="text-xl font-stat text-blu">
                    PROIEZIONI
                  </p>
                  <p className="text-lg font-stat text-bordeaux">
                    WORKSHOP
                  </p>
                </div>
                <div className="mt-6 p-3 bg-gray-100 rounded">
                  <code className="text-sm text-gray-700">
                    font-stat
                  </code>
                </div>
              </div>

              {/* Unica One */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-4xl font-unica text-bordeaux mb-4">
                  Unica One
                </h2>
                <p className="text-gray-600 mb-6 font-unica">
                  Font per testo corpo e paragrafi
                </p>
                <div className="space-y-3 text-left">
                  <p className="text-lg font-unica text-rosa">
                    Il MoviEboli Festival celebra l'arte cinematografica con eventi unici.
                  </p>
                  <p className="text-base font-unica text-blu">
                    Scopri le proiezioni, i workshop e gli incontri con gli artisti.
                  </p>
                  <p className="text-sm font-unica text-bordeaux">
                    Un'esperienza culturale indimenticabile nel cuore della Basilicata.
                  </p>
                </div>
                <div className="mt-6 p-3 bg-gray-100 rounded">
                  <code className="text-sm text-gray-700">
                    font-unica
                  </code>
                </div>
              </div>
            </div>

            {/* Esempi combinati */}
            <div className="bg-crema rounded-xl shadow-lg p-8">
              <h2 className="text-4xl font-bebas text-bordeaux mb-6 text-center">
                ESEMPI COMBINATI
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-stat text-blu">
                    PROGRAMMA EVENTI
                  </h3>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bebas text-bordeaux">
                      VENERDÌ 15 MARZO
                    </h4>
                    <p className="font-unica text-gray-700">
                      Apertura del festival con la proiezione del film "Cinema Paradiso" seguito da un dibattito con il regista.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bebas text-bordeaux">
                      SABATO 16 MARZO
                    </h4>
                    <p className="font-unica text-gray-700">
                      Workshop di regia cinematografica e masterclass con attori professionisti.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-stat text-rosa">
                    BIGLIETTI E INFO
                  </h3>
                  <div className="space-y-2">
                    <p className="font-unica text-gray-700">
                      <span className="font-bebas text-lg text-bordeaux">INGRESSO SINGOLO:</span> €15
                    </p>
                    <p className="font-unica text-gray-700">
                      <span className="font-bebas text-lg text-bordeaux">ABBONAMENTO 3 GIORNI:</span> €35
                    </p>
                    <p className="font-unica text-gray-700">
                      <span className="font-bebas text-lg text-bordeaux">STUDENTI:</span> €10
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guida utilizzo */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bebas text-bordeaux mb-6">
                GUIDA ALL'UTILIZZO
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 text-left max-w-4xl mx-auto">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`/* Font Bebas Neue - Per titoli principali */
<h1 className="font-bebas text-4xl">TITOLO PRINCIPALE</h1>

/* Font Staatliches - Per elementi display */
<p className="font-stat text-2xl">ELEMENTO DISPLAY</p>

/* Font Unica One - Per testo corpo */
<p className="font-unica text-base">Testo del paragrafo principale.</p>

/* Combinazioni con colori personalizzati */
<h2 className="font-bebas text-3xl text-bordeaux">TITOLO COLORATO</h2>
<p className="font-stat text-xl text-rosa">ACCENTO ROSA</p>
<p className="font-unica text-blu">Testo blu con Unica One</p>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FontDemoPage;