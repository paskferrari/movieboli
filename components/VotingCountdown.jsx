import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditableText from './ui/EditableText';
import { useContent } from '../contexts/ContentContext';

const VotingCountdown = () => {
  const { getContent } = useContent();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="py-16 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-movieboli-violaPrincipale mb-4">
            <EditableText 
              contentKey="homepage.voting.open.title"
              defaultValue="🎉 Le Votazioni Sono Aperte!"
              tag="span"
            />
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            <EditableText 
              contentKey="homepage.voting.open.description"
              defaultValue="Vota ora i primi 5 cortometraggi del programma del 22 agosto del MOVIEBOLI Festival 2025"
              tag="span"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/festival/vota" 
              className="bg-movieboli-violaPrincipale text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-movieboli-violaPrincipale/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="homepage.voting.cta.shorts"
                defaultValue="🎬 Vota Cortometraggi"
                tag="span"
              />
            </a>
            <a 
              href="/festival/contest_artistico/vota" 
              className="bg-movieboli-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-movieboli-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <EditableText 
                contentKey="homepage.voting.cta.art"
                defaultValue="🎨 Vota Opere Artistiche"
                tag="span"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VotingCountdown;