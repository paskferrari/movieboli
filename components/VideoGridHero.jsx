import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import EditableText from './ui/EditableText';

const VideoGridHero = () => {
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
              className="mx-auto animate-pulse-slow"
            />
          </motion.div>
          
          <motion.div
            className="text-2xl md:text-3xl text-movieboli-accent mt-6 max-w-2xl mx-auto font-medium tracking-wide"
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