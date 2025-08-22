import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditableText from './ui/EditableText';
import { useContent } from '../contexts/ContentContext';

const VotingCountdown = () => {
  const { getContent } = useContent();
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVotingOpen, setIsVotingOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0); // 19:00 oggi
      
      // Se sono già passate le 19:00 di oggi, imposta per domani
      if (now > today) {
        today.setDate(today.getDate() + 1);
      }
      
      const difference = today - now;
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
        setIsVotingOpen(false);
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsVotingOpen(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isVotingOpen) {
    return (
      <motion.section 
        className="py-16 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-secondary-600"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <EditableText 
                contentKey="homepage.voting.open.title"
                defaultValue="🎉 Le Votazioni Sono Aperte!"
                tag="span"
              />
            </h2>
            <p className="text-xl text-white/90 mb-6">
              <EditableText 
                contentKey="homepage.voting.open.description"
                defaultValue="Vota ora i tuoi cortometraggi e opere artistiche preferiti del MOVIEBOLI Festival 2025"
                tag="span"
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/festival/vota" 
                className="bg-white text-movieboli-violaPrincipale px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
  }

  return (
    <motion.section 
      className="py-16 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-secondary-600"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <EditableText 
              contentKey="homepage.voting.countdown.title"
              defaultValue="🗳️ Le Votazioni Iniziano Presto!"
              tag="span"
            />
          </h2>
          <p className="text-xl text-white/90 mb-8">
            <EditableText 
              contentKey="homepage.voting.countdown.description"
              defaultValue="Preparati a votare i cortometraggi e le opere artistiche del MOVIEBOLI Festival 2025"
              tag="span"
            />
          </p>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
            <motion.div 
              className="bg-white/20 rounded-xl p-4 md:p-6"
              variants={numberVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-white/80 font-medium">
                <EditableText 
                  contentKey="homepage.voting.countdown.hours"
                  defaultValue="Ore"
                  tag="span"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/20 rounded-xl p-4 md:p-6"
              variants={numberVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-white/80 font-medium">
                <EditableText 
                  contentKey="homepage.voting.countdown.minutes"
                  defaultValue="Minuti"
                  tag="span"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/20 rounded-xl p-4 md:p-6"
              variants={numberVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-white/80 font-medium">
                <EditableText 
                  contentKey="homepage.voting.countdown.seconds"
                  defaultValue="Secondi"
                  tag="span"
                />
              </div>
            </motion.div>
          </div>
          
          <p className="text-lg text-white/90 mb-8">
            <EditableText 
              contentKey="homepage.voting.countdown.time"
              defaultValue="Le votazioni inizieranno alle 19:00"
              tag="span"
            />
          </p>
          
          {/* Collegamenti alle pagine di voto */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/festival/vota" 
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm"
            >
              <EditableText 
                contentKey="homepage.voting.preview.shorts"
                defaultValue="📋 Anteprima Cortometraggi"
                tag="span"
              />
            </a>
            <a 
              href="/festival/contest_artistico/vota" 
              className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm"
            >
              <EditableText 
                contentKey="homepage.voting.preview.art"
                defaultValue="🎨 Anteprima Opere Artistiche"
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