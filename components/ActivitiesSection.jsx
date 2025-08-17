import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import EditableText from './ui/EditableText';
import { useContent } from '../contexts/ContentContext';

const ActivitiesSection = () => {
  const { getContent } = useContent();
  
  const activities = [
    {
      id: 1,
      title: (
        <EditableText 
          contentKey="activities.festival.title"
          defaultValue="Festival del Cortometraggio"
        />
      ),
      description: (
        <EditableText 
          contentKey="activities.festival.description"
          defaultValue="Il nostro evento annuale dedicato ai cortometraggi indipendenti, con proiezioni, workshop e incontri con registi."
          multiline={true}
        />
      ),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
        </svg>
      ),
      link: '/festival'
    },
    {
      id: 2,
      title: (
        <EditableText 
          contentKey="activities.podcast.title"
          defaultValue="Ciliegie Podcast"
        />
      ),
      description: (
        <EditableText 
          contentKey="activities.podcast.description"
          defaultValue="Il nostro podcast dedicato al cinema, con interviste, recensioni e approfondimenti sul mondo della settima arte."
          multiline={true}
        />
      ),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
      ),
      link: '/podcast'
    },
    
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
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            <EditableText 
              contentKey="activities.section.title"
              defaultValue="Le Nostre Attività"
            />
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            <EditableText 
              contentKey="activities.section.description"
              defaultValue="MOVIEBOLI promuove la cultura cinematografica attraverso diverse iniziative pensate per coinvolgere la comunità e diffondere la passione per il cinema."
              multiline={true}
            />
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
                
                <div className="text-gray-300 mb-6">
                  {activity.description}
                </div>
                
                <Link 
                  href={activity.link}
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                >
                  <EditableText 
                    contentKey="activities.cta.discover"
                    defaultValue="Scopri di più"
                    tag="span"
                  />
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
            <EditableText 
              contentKey="activities.cta.all"
              defaultValue="Tutte le Attività"
              tag="span"
            />
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