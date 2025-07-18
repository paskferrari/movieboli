import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const VideoGridHero = () => {
  // Configurazioni delle animazioni
  const titleAnimation = {
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

  const navAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const navItemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Griglia di video */}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-3">
        {/* Prima colonna video */}
        <div className="h-full w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/logo-movieboli.png"
          >
            <source src="/video1.mp4" type="video/mp4" />
            <source src="/video1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Seconda colonna video (visibile solo su tablet e desktop) */}
        <div className="hidden h-full w-full overflow-hidden md:block">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/logo-movieboli.png"
          >
            <source src="/video1.mp4" type="video/mp4" />
            <source src="/video1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Terza colonna video (visibile solo su tablet e desktop) */}
        <div className="hidden h-full w-full overflow-hidden md:block">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/logo-movieboli.png"
          >
            <source src="/video1.mp4" type="video/mp4" />
            <source src="/video1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Overlay nero con gradiente per migliorare il contrasto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Overlay centrale con titolo, sottotitolo e navigazione */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-6">
          <motion.h1
            className="text-6xl font-bold text-white uppercase tracking-wider md:text-7xl lg:text-8xl"
            style={{ textShadow: '0 3px 6px rgba(0,0,0,0.4)' }}
            initial="hidden"
            animate="visible"
            variants={titleAnimation}
          >
            MOVIEBOLI
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-yellow-400 mt-4 max-w-2xl mx-auto font-light tracking-wide"
            initial="hidden"
            animate="visible"
            variants={subtitleAnimation}
          >
            Cultura, Cinema, Comunità
          </motion.p>
        </div>
        
        {/* Navigazione rapida rimossa */}
      </div>
      
      {/* Indicatore di scorrimento */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default VideoGridHero;