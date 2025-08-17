import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandingProvider } from '../../contexts/BrandingContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import driveInFoto from './data&media/drivein_foto.json';

// Componente Modal per visualizzare le foto ingrandite
const PhotoModal = ({ isOpen, onClose, photo, allPhotos, currentIndex }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(currentIndex);

  useEffect(() => {
    setCurrentPhotoIndex(currentIndex);
  }, [currentIndex]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  if (!isOpen) return null;

  const currentPhoto = allPhotos[currentPhotoIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="relative max-w-4xl max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentPhoto.link}
            alt={currentPhoto.nome_foto}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          
          {/* Pulsanti navigazione */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-movieboli-primary bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all"
          >
            ←
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-movieboli-primary bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all"
          >
            →
          </button>
          
          {/* Pulsante chiudi */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-movieboli-primary bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all"
          >
            ✕
          </button>
          
          {/* Indicatore foto */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-movieboli-primary bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentPhotoIndex + 1} / {allPhotos.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Componente Hero per il Drive In
const DriveInHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background con foto cover */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-movieboli-primary bg-opacity-70" />
      </div>
      
      {/* Gradiente overlay per migliorare la leggibilità */}
      <div className="absolute inset-0 bg-gradient-to-br from-movieboli-primary/40 via-movieboli-neutral-800/30 to-movieboli-secondary/20" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Drive In - sostituisce il titolo testuale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              // Per il logo
              src="/images/logoPrincipale.png"
              alt="Logo Drive In"
              className="mx-auto max-h-48 md:max-h-64 w-auto drop-shadow-2xl"
            />
          </motion.div>
          
          <p className="text-xl md:text-2xl mb-8 text-movieboli-neutral-100">
            Un'esperienza cinematica unica sotto le stelle
          </p>
          <div className="text-lg text-movieboli-neutral-200">
            <p>Cinema all'aperto • Atmosfera magica • Ricordi indimenticabili</p>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-movieboli-neutral-200">Scorri per esplorare</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-movieboli-secondary"
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Componente per la descrizione del Drive In
const DriveInDescription = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-movieboli-neutral-50 to-movieboli-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-movieboli-primary mb-8 font-serif">
            L'Esperienza Drive In
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-movieboli-primary to-movieboli-primary-dark p-6 rounded-movieboli shadow-movieboli">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-white mb-2">Cinema in Auto</h3>
              <p className="text-movieboli-neutral-100">Goditi il film comodamente dalla tua auto, un'esperienza unica e nostalgica.</p>
            </div>
            <div className="bg-gradient-to-br from-movieboli-secondary to-movieboli-secondary-dark p-6 rounded-movieboli shadow-movieboli">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2">Sotto le Stelle</h3>
              <p className="text-movieboli-neutral-100">Una serata magica all'aperto con il cielo stellato come soffitto.</p>
            </div>
            <div className="bg-gradient-to-br from-movieboli-primary to-movieboli-secondary p-6 rounded-movieboli shadow-movieboli">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-white mb-2">Cinema d'Altri Tempi</h3>
              <p className="text-movieboli-neutral-100">Rivivi l'atmosfera del cinema drive-in degli anni '50 e '60.</p>
            </div>
          </div>
          <p className="text-lg text-movieboli-neutral-700 leading-relaxed">
            Il nostro evento Drive In ha portato la magia del cinema all'aperto nella nostra comunità. 
            Un'esperienza che unisce la passione per il cinema con il fascino di una serata sotto le stelle, 
            creando ricordi indimenticabili per tutta la famiglia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Componente Galleria Foto
const DriveInGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const photos = driveInFoto['foto DRIVE.IN'];

  const openModal = (photo, index) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section className="py-20 bg-movieboli-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            Galleria Drive In
          </h2>
          <p className="text-xl text-movieboli-neutral-300">
            Rivivi i momenti magici della nostra serata drive-in
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.nome_foto}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-movieboli shadow-movieboli"
              onClick={() => openModal(photo, index)}
            >
              <img
                src={photo.link}
                alt={photo.nome_foto}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-movieboli-primary bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <PhotoModal
        isOpen={!!selectedPhoto}
        onClose={closeModal}
        photo={selectedPhoto}
        allPhotos={photos}
        currentIndex={selectedIndex}
      />
    </section>
  );
};

// Componente principale
export default function DriveInPage() {
  return (
    <BrandingProvider>
      <Head>
        <title>Drive In - MovieBoli</title>
        <meta name="description" content="Rivivi l'esperienza magica del nostro evento Drive In - cinema all'aperto sotto le stelle." />
        <meta name="keywords" content="drive in, cinema all'aperto, movieboli, associazione culturale, eboli" />
        <meta property="og:title" content="Drive In - MovieBoli" />
        <meta property="og:description" content="Rivivi l'esperienza magica del nostro evento Drive In - cinema all'aperto sotto le stelle." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://movieboli.it/archivio-festival/drive-in" />
      </Head>
      
      {/* Navbar Standard dell'Associazione */}
      <Navbar variant="association" />

      {/* Contenuto principale */}
      <main>
        <DriveInHero />
        <DriveInDescription />
        <DriveInGallery />
      </main>
      
      <Footer variant="association" />
    </BrandingProvider>
  );
}