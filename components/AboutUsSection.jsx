import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  const teamMembers = [
    {
      name: 'Marco Rossi',
      role: 'Presidente',
      image: '/team/marco.jpg', // Placeholder, sostituire con immagine reale
    },
    {
      name: 'Laura Bianchi',
      role: 'Direttore Artistico',
      image: '/team/laura.jpg', // Placeholder, sostituire con immagine reale
    },
    {
      name: 'Giovanni Verdi',
      role: 'Responsabile Comunicazione',
      image: '/team/giovanni.jpg', // Placeholder, sostituire con immagine reale
    },
    {
      name: 'Sofia Neri',
      role: 'Coordinatore Eventi',
      image: '/team/sofia.jpg', // Placeholder, sostituire con immagine reale
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center md:text-left">
              Chi Siamo
            </h2>
            <div className="space-y-4 text-lg text-white text-center md:text-left">
              <p>
                MOVIEBOLI è un'associazione culturale nata nel 2018 con l'obiettivo di promuovere la cultura cinematografica nel territorio di Eboli e oltre.
              </p>
              <p>
                La nostra missione è creare spazi di incontro e dialogo attraverso il cinema, valorizzando i talenti emergenti e offrendo opportunità di formazione e crescita culturale.
              </p>
              <p>
                Organizziamo festival, proiezioni, workshop, podcast e molto altro, sempre con lo sguardo rivolto alla comunità e alla qualità artistica.
              </p>
            </div>
            <div className="mt-8 text-center md:text-left">
              <Link 
                href="/chi-siamo"
                className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-yellow-400 hover:bg-yellow-400/10"
              >
                <span>Scopri la Nostra Storia</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                {/* Placeholder per un'immagine o video del team */}
                <div className="text-center p-8">
                  <svg className="w-24 h-24 mx-auto mb-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-yellow-400 text-xl">Il nostro team al lavoro</p>
                </div>
              </div>
            </div>
            
            {/* Decorazione */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 z-0"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full opacity-20 z-0"></div>
          </motion.div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-yellow-400 mb-12">
            Il Nostro Team
          </h3>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-yellow-400/30"
                variants={itemVariants}
              >
                <div className="aspect-w-1 aspect-h-1 bg-black">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Fallback se l'immagine non è disponibile */}
                    <div className="w-full h-full flex items-center justify-center bg-black text-yellow-400 text-5xl">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-gray-300">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/chi-siamo/team"
              className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-yellow-400 hover:bg-yellow-400/10"
            >
              <span>Conosci Tutto il Team</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;