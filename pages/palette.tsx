import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

const PalettePage: React.FC = () => {
  const colors = [
    { name: 'Rosa', class: 'bg-rosa', hex: '#f5a6a6' },
    { name: 'Blu', class: 'bg-blu', hex: '#4829ff' },
    { name: 'Bordeaux', class: 'bg-bordeaux', hex: '#5d0a0a' },
    { name: 'Crema', class: 'bg-crema', hex: '#fff5e6' },
  ];

  return (
    <>
      <Head>
        <title>Palette Colori - MoviEboli Festival</title>
        <meta name="description" content="Palette colori personalizzata del MoviEboli Festival" />
      </Head>
      
      <Layout>
        <div className="min-h-screen py-16">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bebas text-festival-dark mb-6">
                Palette Colori
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                La nuova palette colori personalizzata per il MoviEboli Festival
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div 
                    className={`${color.class} w-full h-32 rounded-lg shadow-lg mb-4 border-2 border-gray-200`}
                  ></div>
                  <h3 className="text-2xl font-bebas text-festival-dark mb-2">
                    {color.name}
                  </h3>
                  <p className="text-gray-600 font-mono text-sm">
                    {color.hex}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bebas text-festival-dark mb-6 text-center">
                Esempi di Utilizzo
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <button className="w-full bg-rosa hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Rosa
                  </button>
                  <button className="w-full bg-blu hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Blu
                  </button>
                  <button className="w-full bg-bordeaux hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Bordeaux
                  </button>
                  <button className="w-full bg-crema hover:bg-opacity-80 text-bordeaux font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-bordeaux">
                    Bottone Crema
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-rosa bg-rosa bg-opacity-10">
                    <p className="text-rosa font-semibold">Messaggio con accento rosa</p>
                  </div>
                  <div className="p-4 border-l-4 border-blu bg-blu bg-opacity-10">
                    <p className="text-blu font-semibold">Messaggio con accento blu</p>
                  </div>
                  <div className="p-4 border-l-4 border-bordeaux bg-bordeaux bg-opacity-10">
                    <p className="text-bordeaux font-semibold">Messaggio con accento bordeaux</p>
                  </div>
                  <div className="p-4 border-l-4 border-bordeaux bg-crema">
                    <p className="text-bordeaux font-semibold">Messaggio su sfondo crema</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bebas text-festival-dark mb-6">
                Classi CSS Disponibili
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 text-left max-w-2xl mx-auto">
                <pre className="text-sm text-gray-800">
{`/* Sfondi */
.bg-rosa, .bg-blu, .bg-bordeaux, .bg-crema

/* Testi */
.text-rosa, .text-blu, .text-bordeaux, .text-crema

/* Bordi */
.border-rosa, .border-blu, .border-bordeaux, .border-crema

/* Utilizzo con Tailwind */
className="bg-rosa text-white"
className="border-2 border-blu text-blu"
className="bg-crema text-bordeaux"`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PalettePage;