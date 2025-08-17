import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ArchivioFestival = () => {
  const edizioni = [
    {
      anno: '2024',
      titolo: 'Visioni del Futuro',
      descrizione: 'Il cinema che immagina domani',
      link: '/archivio-festival/2024',
      immagine: '/images/festival-2024.jpg'
    },
    {
      anno: '2023', 
      titolo: 'Emozioni Indipendenti',
      descrizione: 'Un viaggio attraverso le emozioni del cinema indipendente',
      link: '/archivio-festival/2023',
      immagine: '/images/festival-2023.jpg'
    },
    {
      anno: 'Drive-In',
      titolo: 'Cinema sotto le Stelle',
      descrizione: 'L\'esperienza unica del cinema all\'aperto',
      link: '/archivio-festival/drive-in',
      immagine: '/archivio-festival/cover.png'
    }
  ];

  return (
    <>
      <Head>
        <title>Archivio Festival - Edizioni Passate | MoviEboli</title>
        <meta name="description" content="Esplora tutte le edizioni passate del MoviEboli Film Festival: 2024, 2023 e Drive-In. Rivivi i momenti più belli del nostro festival." />
      </Head>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Archivio <span className="text-yellow-400">Festival</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Esplora la storia del nostro festival attraverso le edizioni passate, 
              ognuna con il suo tema unico e i suoi film indimenticabili.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {edizioni.map((edizione) => (
              <Link key={edizione.anno} href={edizione.link}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-black">{edizione.anno}</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{edizione.titolo}</h3>
                    <p className="text-gray-300 mb-4">{edizione.descrizione}</p>
                    
                    <div className="flex items-center text-yellow-400 font-semibold">
                      <span>Esplora edizione</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ArchivioFestival;