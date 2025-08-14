import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import EditableText from './ui/EditableText';

const VideoGridHero = () => {
  const [randomVideos, setRandomVideos] = useState([]);
  const [sfondiData, setSfondiData] = useState([]);
  const [videoErrors, setVideoErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Carica i dati dei video al mount del componente
  useEffect(() => {
    const loadVideoData = async () => {
      try {
        const response = await fetch('/images/sfondi/sfondi.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Video data loaded:', data);
        setSfondiData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Errore nel caricamento dei video:', error);
        // Fallback con video locali
        const fallbackVideos = [
          { nome: 'fallback1', url: '/images/sfondi/1videosfondo.mp4' },
          { nome: 'fallback2', url: '/images/sfondi/movie2.mp4' },
          { nome: 'fallback3', url: '/images/sfondi/movie3.mp4' }
        ];
        setSfondiData(fallbackVideos);
        setIsLoading(false);
      }
    };
    
    loadVideoData();
  }, []);

  // Funzione per mescolare array e selezionare 3 video
  const shuffleAndSelectVideos = () => {
    if (sfondiData.length === 0) return [];
    const shuffled = [...sfondiData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Inizializza i video randomici quando i dati sono caricati
  useEffect(() => {
    if (sfondiData.length > 0 && !isLoading) {
      const selectedVideos = shuffleAndSelectVideos();
      console.log('Selected videos:', selectedVideos);
      setRandomVideos(selectedVideos);
      
      // Cambia i video ogni 30 secondi per mantenere varietà
      const interval = setInterval(() => {
        const newVideos = shuffleAndSelectVideos();
        console.log('Rotating to new videos:', newVideos);
        setRandomVideos(newVideos);
        setVideoErrors({}); // Reset errori quando cambiano i video
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [sfondiData, isLoading]);

  // Gestione errori video
  const handleVideoError = (index, error) => {
    console.error(`Errore nel caricamento del video ${index}:`, error);
    setVideoErrors(prev => ({ ...prev, [index]: true }));
  };

  // Configurazioni delle animazioni
  const logoAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const subtitleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.3,
      },
    },
  };

  // Componente per singolo video con gestione errori
  const VideoColumn = ({ video, index, className = "" }) => {
    // Se c'è un errore per questo video, usa il primo video disponibile come fallback
    const getVideoSrc = () => {
      if (videoErrors[index] && sfondiData.length > 0) {
        // Usa il primo video disponibile come fallback
        return sfondiData[0].url;
      }
      return video?.url || (sfondiData.length > 0 ? sfondiData[0].url : '');
    };

    const videoSrc = getVideoSrc();
    
    // Non renderizzare se non abbiamo video disponibili
    if (!videoSrc || isLoading) {
      return (
        <div className={`h-full w-full overflow-hidden bg-black flex items-center justify-center ${className}`}>
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Caricamento video...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`h-full w-full overflow-hidden ${className}`}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/logo-movieboli.png"
          key={`${videoSrc}-${index}`}
          onError={(e) => handleVideoError(index, e)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Griglia di video */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-3">
        {/* Prima colonna video */}
        <VideoColumn 
          video={randomVideos[0]} 
          index={0}
        />

        {/* Seconda colonna video (visibile solo su tablet e desktop) */}
        <VideoColumn 
          video={randomVideos[1]} 
          index={1}
          className="hidden md:block"
        />

        {/* Terza colonna video (visibile solo su tablet e desktop) */}
        <VideoColumn 
          video={randomVideos[2]} 
          index={2}
          className="hidden md:block"
        />
      </div>

      {/* Overlay nero con gradiente per migliorare il contrasto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      {/* Overlay centrale con logo, sottotitolo e navigazione */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-6">
          <motion.div
            className="mx-auto mb-8"
            initial="hidden"
            animate="visible"
            variants={logoAnimation}
          >
            <Image 
              src="/images/logo.png" 
              alt="MOVIEBOLI Logo" 
              width={300} 
              height={300} 
              className="mx-auto drop-shadow-2xl"
            />
          </motion.div>
          
          <motion.div
            className="text-2xl md:text-3xl text-movieboli-accent mt-6 max-w-2xl mx-auto font-medium tracking-wide drop-shadow-lg"
            initial="hidden"
            animate="visible"
            variants={subtitleAnimation}
          >
            <EditableText 
              contentKey="hero.subtitle"
              defaultValue="Cultura, Cinema, Comunità"
              tag="span"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Indicatore di scorrimento */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-movieboli-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-movieboli-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default VideoGridHero;