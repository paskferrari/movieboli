import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ActivitiesSection = () => {
  const activities = [
    {
      id: 1,
      title: 'Festival del Cortometraggio',
      description: 'Il nostro evento annuale dedicato ai cortometraggi indipendenti, con proiezioni, workshop e incontri con registi.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
        </svg>
      ),
      link: '/festival'
    },
    {
      id: 2,
      title: 'Ciliegie Podcast',
      description: 'Il nostro podcast dedicato al cinema, con interviste, recensioni e approfondimenti sul mondo della settima arte.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
      ),
      link: '/podcast'
    },
    {
      id: 3,
      title: 'Workshop e Laboratori',
      description: 'Corsi e laboratori di cinema, sceneggiatura, regia e montaggio per tutte le età, tenuti da professionisti del settore.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
        </svg>
      ),
      link: '/attivita/workshop'
    },
    {
      id: 4,
      title: 'Proiezioni Speciali',
      description: 'Serate dedicate alla proiezione di film d\'autore, classici restaurati e pellicole rare, spesso accompagnate da dibattiti.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      ),
      link: '/attivita/proiezioni'
    },
    {
      id: 5,
      title: 'Incontri con Autori',
      description: 'Dialoghi con registi, sceneggiatori e attori per scoprire il dietro le quinte del cinema e approfondire tematiche culturali.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      link: '/attivita/incontri'
    },
    {
      id: 6,
      title: 'Progetti Educativi',
      description: 'Iniziative nelle scuole per avvicinare i giovani al linguaggio cinematografico e stimolare la creatività attraverso l\'audiovisivo.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
      ),
      link: '/attivita/educazione'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">Le Nostre Attività</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            MOVIEBOLI promuove la cultura cinematografica attraverso diverse iniziative pensate per coinvolgere la comunità e diffondere la passione per il cinema.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {activities.map((activity) => (
            <motion.div 
              key={activity.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-yellow-400/30"
              variants={itemVariants}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-colors duration-300">
                  {activity.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {activity.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {activity.description}
                </p>
                
                <Link 
                  href={activity.link}
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                >
                  <span>Scopri di più</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link 
            href="/attivita"
            className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-yellow-400 hover:bg-yellow-400/10"
          >
            <span>Tutte le Attività</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;