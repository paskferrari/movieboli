import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import EditableText from './ui/EditableText';
import { useContent } from '../contexts/ContentContext';

const PastEditionsSection = () => {
  const { getContent } = useContent();
  
  const editions = [
    {
      year: '2023',
      title: (
        <EditableText 
          contentKey="past_editions.2023.title"
          defaultValue="Edizione 2023"
          tag="span"
        />
      ),
      image: '/festival-2023.jpg',
      description: (
        <EditableText 
          contentKey="past_editions.2023.description"
          defaultValue="Un viaggio attraverso le emozioni del cinema indipendente"
          tag="span"
        />
      ),
      link: '/archivio-festival/2023'
    },
    {
      year: '2022',
      title: (
        <EditableText 
          contentKey="past_editions.2022.title"
          defaultValue="Edizione 2022"
          tag="span"
        />
      ),
      image: '/festival-2022.jpg',
      description: (
        <EditableText 
          contentKey="past_editions.2022.description"
          defaultValue="Nuove prospettive e visioni dal mondo del cortometraggio"
          tag="span"
        />
      ),
      link: '/archivio-festival/2024'
    },
    {
      year: '2021',
      title: (
        <EditableText 
          contentKey="past_editions.2021.title"
          defaultValue="Edizione 2021"
          tag="span"
        />
      ),
      image: '/festival-2021.jpg',
      description: (
        <EditableText 
          contentKey="past_editions.2021.description"
          defaultValue="Il cinema che unisce comunità e cultura"
          tag="span"
        />
      ),
      link: '/festival/2021'
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
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            <EditableText 
              contentKey="past_editions.title"
              defaultValue="Edizioni Passate"
              tag="span"
            />
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            <EditableText 
              contentKey="past_editions.description"
              defaultValue="Esplora la storia del nostro festival attraverso le edizioni passate, ognuna con il suo tema unico e i suoi film indimenticabili."
              multiline={true}
            />
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {editions.map((edition, index) => (
            <motion.div 
              key={edition.year}
              className="group relative overflow-hidden rounded-xl shadow-xl bg-gray-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30"
              variants={itemVariants}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <div 
                  className="w-full h-full bg-black flex items-center justify-center text-yellow-400 text-5xl font-bold"
                  style={{
                    backgroundImage: `url(${edition.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                  <span className="relative z-10 text-yellow-400 group-hover:scale-110 transition-transform duration-300">{edition.year}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {edition.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {edition.description}
                </p>
                <Link 
                  href={edition.link}
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                >
                  <span>
                    <EditableText 
                      contentKey="past_editions.link"
                      defaultValue="Scopri di più"
                      tag="span"
                    />
                  </span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link 
            href="/archivio-festival"
            className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg border border-yellow-400 hover:bg-yellow-400/10"
          >
            <span>
              <EditableText 
                contentKey="past_editions.archive"
                defaultValue="Archivio Completo"
                tag="span"
              />
            </span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastEditionsSection;