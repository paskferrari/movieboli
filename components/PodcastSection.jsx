import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PodcastSection = () => {
  const episodes = [
    {
      number: 'EP 12',
      title: 'Il Cinema Italiano Contemporaneo',
      guest: 'Marco Rossi',
      duration: '45 min',
      date: '15 Maggio 2023',
      link: '/podcast/ep12'
    },
    {
      number: 'EP 11',
      title: 'Nuove Tecnologie nel Cinema',
      guest: 'Laura Bianchi',
      duration: '38 min',
      date: '1 Maggio 2023',
      link: '/podcast/ep11'
    },
    {
      number: 'EP 10',
      title: 'Cinema Indipendente e Festival',
      guest: 'Giovanni Verdi',
      duration: '52 min',
      date: '15 Aprile 2023',
      link: '/podcast/ep10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-16 gap-8">
          <div className="md:max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 text-center md:text-left">
              Ciliegie Podcast
            </h2>
            <p className="text-xl text-white text-center md:text-left">
              Conversazioni sul cinema, interviste con registi e approfondimenti culturali. 
              Il nostro podcast è un viaggio sonoro nel mondo della settima arte.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="https://open.spotify.com/show/example" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg border border-yellow-400/30 hover:bg-yellow-400/10"
              aria-label="Ascolta su Spotify"
            >
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </Link>
            
            <Link 
              href="https://podcasts.apple.com/podcast/example" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg border border-yellow-400/30 hover:bg-yellow-400/10"
              aria-label="Ascolta su Apple Podcasts"
            >
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.337 0 4.443 1.66 5.297 4.23.15.46.227.945.227 1.44 0 .496-.078.978-.227 1.44-.854 2.57-2.96 4.23-5.297 4.23-2.336 0-4.443-1.66-5.296-4.23-.15-.462-.226-.944-.226-1.44 0-.496.075-.98.226-1.44.854-2.57 2.96-4.23 5.296-4.23zm0 1.37c-1.829 0-3.464 1.283-4.119 3.232-.113.35-.169.712-.169 1.068 0 .356.056.72.169 1.068.655 1.95 2.29 3.232 4.119 3.232 1.83 0 3.464-1.283 4.12-3.232.112-.348.168-.712.168-1.068 0-.356-.056-.719-.168-1.068-.656-1.95-2.29-3.232-4.12-3.232zM11.93 6.687c.414.012.79.253.99.632.202.378.196.833-.014 1.206a.33.33 0 01-.451.123.33.33 0 01-.124-.45 1.175 1.175 0 00.018-.83.826.826 0 00-.548-.43c-.182-.038-.274-.22-.236-.4.037-.18.22-.273.4-.235a1.486 1.486 0 01-.035-.344c0-.202.041-.403.123-.59a1.555 1.555 0 01.806-.806c.186-.082.388-.123.59-.123.203 0 .404.04.59.123.186.082.354.2.496.351.142.152.254.332.33.531.077.199.115.41.115.622 0 .213-.038.424-.115.623a1.596 1.596 0 01-.33.53 1.592 1.592 0 01-.496.352c-.186.082-.387.123-.59.123-.202 0-.404-.041-.59-.123a1.593 1.593 0 01-.806-.883 1.578 1.578 0 01-.123-.59c0-.118.023-.237.053-.354.023-.087.115-.138.203-.115.087.023.138.115.115.203a1.177 1.177 0 00-.09.443c0 .15.03.3.09.44.059.14.147.266.255.371.11.105.238.188.379.242.14.053.29.08.44.08a1.19 1.19 0 00.44-.08c.14-.054.267-.137.377-.242.11-.105.195-.231.255-.371.059-.14.09-.29.09-.44 0-.15-.031-.3-.09-.44a1.182 1.182 0 00-.255-.371 1.182 1.182 0 00-.378-.242 1.186 1.186 0 00-.44-.08c-.15 0-.3.027-.44.08-.14.054-.267.137-.377.242-.11.105-.195.231-.255.371-.059.14-.09.29-.09.44 0 .12.024.24.064.354a.33.33 0 01-.235.4.33.33 0 01-.4-.235 1.578 1.578 0 01-.123-.59c0-.202.041-.403.123-.59.082-.186.2-.354.351-.495.152-.142.332-.254.53-.33a1.555 1.555 0 01.622-.116zm.07 7.847c3.497 0 5.4 2.95 5.4 2.95.82 1.175.82 2.116.82 2.116v1.22h-12.7v-1.22s0-.94.82-2.116c0 0 1.903-2.95 5.4-2.95h.26zm-.13 1.56c-2.296 0-3.91 2.118-3.91 2.118-.713 1.023-.713 1.84-.713 1.84v.177h9.213v-.177s0-.817-.713-1.84c0 0-1.614-2.118-3.91-2.118h.033z"/>
              </svg>
            </Link>
            
            <Link 
              href="https://www.youtube.com/channel/example" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg border border-yellow-400/30 hover:bg-yellow-400/10"
              aria-label="Guarda su YouTube"
            >
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
          </div>
        </div>

        <motion.div 
          className="bg-black rounded-2xl p-6 md:p-8 shadow-xl border border-yellow-400/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {episodes.map((episode, index) => (
            <motion.div 
              key={episode.number}
              className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl hover:bg-gray-900 transition-colors duration-300 ${index !== episodes.length - 1 ? 'border-b border-gray-800 pb-6 mb-6' : ''}`}
              variants={itemVariants}
            >
              <div className="flex-shrink-0 bg-black text-yellow-400 font-bold text-xl p-4 rounded-lg w-20 h-20 flex items-center justify-center border border-yellow-400/50">
                {episode.number}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">
                  {episode.title}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-white">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    {episode.guest}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {episode.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {episode.date}
                  </span>
                </div>
              </div>
              
              <Link 
                href={episode.link}
                className="flex-shrink-0 p-3 hover:bg-yellow-400 text-yellow-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110 border border-yellow-400/50"
                aria-label={`Ascolta l'episodio ${episode.number}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.54 9 8.88 3.46a3.42 3.42 0 0 0-5.13 3v11.12A3.42 3.42 0 0 0 7.17 21a3.43 3.43 0 0 0 1.71-.46L18.54 15a3.42 3.42 0 0 0 0-5.92zm-1 4.19-9.66 5.62a1.44 1.44 0 0 1-2.27-1.21V6.38a1.42 1.42 0 0 1 .72-1.23A1.45 1.45 0 0 1 7 5a1.44 1.44 0 0 1 .71.19l9.66 5.58a1.42 1.42 0 0 1 0 2.46z"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link 
            href="/podcast"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-all duration-300 hover:scale-105 shadow-lg font-bold"
          >
            <span>Tutti gli Episodi</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;