import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

const PalettePage: React.FC = () => {
  const colors = [
    { name: 'Rosa Sfondo', class: 'bg-rosa', hex: '#f7bbc6' },
    { name: 'Viola Principale', class: 'bg-viola', hex: '#7968fa' },
    { name: 'Viola Secondario', class: 'bg-violaScuro', hex: '#5b41e2' },
    { name: 'Bordeaux Scuro', class: 'bg-bordeaux', hex: '#32080a' },
    { name: 'Nero Profondo', class: 'bg-nero', hex: '#1d0907' },
    { name: 'Verde Matcha', class: 'bg-matcha', hex: '#1b390a' },
    { name: 'Giallo Vintage', class: 'bg-giallo', hex: '#c3983a' },
    { name: 'Highlight Viola', class: 'bg-movieboli-violaHighlight', hex: '#ddcaf0' },
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  <button className="w-full bg-viola hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Viola Principale
                  </button>
                  <button className="w-full bg-violaScuro hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Viola Secondario
                  </button>
                  <button className="w-full bg-bordeaux hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Bordeaux Scuro
                  </button>
                  <button className="w-full bg-giallo hover:bg-opacity-80 text-nero font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    Bottone Giallo Vintage
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-viola bg-viola bg-opacity-10">
                    <p className="text-viola font-semibold">Messaggio con accento viola principale</p>
                  </div>
                  <div className="p-4 border-l-4 border-violaScuro bg-violaScuro bg-opacity-10">
                    <p className="text-violaScuro font-semibold">Messaggio con accento viola secondario</p>
                  </div>
                  <div className="p-4 border-l-4 border-bordeaux bg-bordeaux bg-opacity-10">
                    <p className="text-bordeaux font-semibold">Messaggio con accento bordeaux scuro</p>
                  </div>
                  <div className="p-4 border-l-4 border-giallo bg-rosa bg-opacity-20">
                    <p className="text-giallo font-semibold">Messaggio su sfondo rosa con giallo</p>
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
{`/* Sfondi Palette Personalizzata */
.bg-rosa, .bg-viola, .bg-violaScuro, .bg-bordeaux, .bg-nero, .bg-matcha, .bg-giallo

/* Testi Palette Personalizzata */
.text-rosa, .text-viola, .text-violaScuro, .text-bordeaux, .text-nero, .text-matcha, .text-giallo

/* Bordi Palette Personalizzata */
.border-rosa, .border-viola, .border-violaScuro, .border-bordeaux, .border-nero, .border-matcha, .border-giallo

/* Esempi Utilizzo Nuova Palette */
className="bg-viola text-white"
className="border-2 border-violaScuro text-violaScuro"
className="bg-rosa text-bordeaux"
className="bg-giallo text-nero"`}
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