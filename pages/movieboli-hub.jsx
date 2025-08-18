import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { 
  ArrowTopRightOnSquareIcon, 
  HeartIcon, 
  TicketIcon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline'

const MovieboliHub = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    {
      id: 'contest',
      title: 'Contest Artistico',
      description: 'Partecipa al nostro contest artistico',
      href: '/contest-artistico',
      icon: PaintBrushIcon,
      color: 'from-purple-600/80 to-indigo-700/80',
      external: false
    },
    {
      id: 'donazioni',
      title: 'Sostieni il Festival',
      description: 'Fai una donazione per supportare MovieBoli',
      href: '/donazioni',
      icon: HeartIcon,
      color: 'from-red-600/80 to-rose-700/80',
      external: false
    },
    {
      id: 'prenota',
      title: 'Prenota Biglietti',
      description: 'Prenota i tuoi posti per gli eventi',
      href: '/prenota',
      icon: TicketIcon,
      color: 'from-blue-600/80 to-cyan-700/80',
      external: false
    },
    {
      id: 'festival',
      title: 'Programma Festival',
      description: 'Scopri il programma completo',
      href: '/festival/programma',
      icon: ArrowTopRightOnSquareIcon,
      color: 'from-amber-600/80 to-orange-700/80',
      external: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>MovieBoli Hub - Link Utili | MOVIEBOLI Festival</title>
        <meta name="description" content="Hub di link utili per l'associazione MovieBoli - Contest artistico, donazioni, prenotazioni e molto altro" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        {/* Background con immagini più prominenti */}
        <div className="absolute inset-0">
          {/* Sfondo base scuro */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
          
          {/* Immagini di sfondo artistiche */}
          <div 
            className="absolute top-0 left-0 w-1/3 h-1/2 bg-cover bg-center opacity-20 transform -rotate-12 scale-110"
            style={{ 
              backgroundImage: 'url(/images/bacio.png)',
              filter: 'sepia(20%) hue-rotate(240deg) saturate(150%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-cover bg-center opacity-15 transform rotate-6 scale-105"
            style={{ 
              backgroundImage: 'url(/leoni.png)',
              filter: 'sepia(30%) hue-rotate(30deg) saturate(120%)'
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-1/4 h-1/3 bg-cover bg-center opacity-25 transform rotate-12"
            style={{ 
              backgroundImage: 'url(/images/locandinaredirect.png)',
              filter: 'sepia(40%) hue-rotate(320deg) saturate(140%)'
            }}
          />
          
          {/* Overlay con gradiente cinematografico */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 scale-110" />
                <img 
                  src="/images/logoNuovo.png" 
                  alt="MovieBoli Logo" 
                  className="relative h-28 w-auto filter drop-shadow-2xl"
                />
              </div>
            </div>
            
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I tuoi link utili per il festival
            </motion.p>
          </motion.div>

          {/* Links Grid */}
          <motion.div 
            className="max-w-2xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {links.map((link) => {
              const IconComponent = link.icon
              
              return (
                <motion.div key={link.id} variants={itemVariants}>
                  <Link href={link.href}>
                    <motion.div
                      className={`group relative p-6 rounded-xl bg-gradient-to-r ${link.color} shadow-xl cursor-pointer transform transition-all duration-300 hover:shadow-2xl border border-white/20 backdrop-blur-md`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Effetto glass elegante */}
                      <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm" />
                      
                      {/* Effetto luce */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                            <IconComponent className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-yellow-200 transition-colors duration-300">
                            {link.title}
                          </h3>
                          <p className="text-white/90 text-sm">
                            {link.description}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 border border-white/20">
                            <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Footer */}
          
        </div>
      </div>
    </>
  )
}

export default MovieboliHub