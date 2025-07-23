'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useBranding, useBrandingClasses } from '../../contexts/BrandingContext'

/**
 * Navbar - Navigazione principale del sito MOVIEBOLI
 * Design: adattivo con dual branding (associazione/festival)
 * Layout: logo a sinistra, menu centrato, responsive
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const branding = useBranding()
  const classes = useBrandingClasses()

  // Menu di navigazione principale
  const navigation = [
    { name: 'Home', href: '/', section: 'association' },
    { name: 'Chi siamo', href: '/chi-siamo', section: 'association' },
    { name: 'Attività', href: '/attivita', section: 'association' },
    { name: 'Podcast', href: '/podcast', section: 'association' },
    { name: 'Festival', href: '/festival', section: 'festival' },
    { name: 'Programma', href: '/programma', section: 'festival' },
    { name: 'Prenota', href: '/prenota', section: 'festival' },
    { name: 'Turni IMPP', href: '/turni-impp', section: 'festival' },
    // Aggiungi questa voce all'array navigation
    { name: 'Ospiti', href: '/festival/ospiti', section: 'festival' },
  ]

  // Gestione scroll per cambiare stile navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determina se siamo nella homepage
  const isHomepage = router.pathname === '/'

  // Stili dinamici basati su scroll, pagina e branding
  const getNavbarClasses = () => {
    const baseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300'
    
    if (isHomepage) {
      return `${baseClasses} ${
        isScrolled
          ? 'navbar-movieboli shadow-lg'
          : 'bg-transparent'
      }`
    }
    
    return `${baseClasses} navbar-movieboli shadow-lg`
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={getNavbarClasses()}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo MOVIEBOLI */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
              <img
                src="/logo-movieboli.png"
                alt="MOVIEBOLI Logo"
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isHomepage && !isScrolled
                    ? 'filter brightness-0 invert'
                    : ''
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`${classes.fontPrimary} font-bold text-2xl tracking-wide transition-colors duration-300 ${
                isHomepage && !isScrolled
                  ? 'text-white'
                  : classes.textPrimary
              }`}>
                MOVIEBOLI
              </span>
              <span className={`${classes.fontPrimary} text-sm tracking-wider font-medium transition-colors duration-300 ${
                isHomepage && !isScrolled
                  ? 'text-white/80'
                  : 'text-movieboli-neutral-600'
              }`}>
                {branding.isFestival() ? 'FESTIVAL' : 'ASSOCIAZIONE CULTURALE'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href
              const isFestivalItem = item.section === 'festival'
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    navbar-link relative group
                    ${classes.fontPrimary} font-medium text-sm tracking-wide
                    transition-all duration-300
                    ${
                      isHomepage && !isScrolled
                        ? isActive
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                        : isActive
                          ? classes.textPrimary
                          : 'text-movieboli-neutral-600 hover:text-movieboli-primary'
                    }
                    ${isFestivalItem && branding.isAssociation() ? 'festival-text-gradient' : ''}
                  `}
                >
                  {item.name}
                  {isFestivalItem && branding.isAssociation() && (
                    <span className="festival-badge ml-2 text-xs">Nuovo</span>
                  )}
                  <span className={`
                    absolute -bottom-1 left-0 h-0.5 transition-all duration-300
                    ${
                      isFestivalItem
                        ? 'bg-festival-gold'
                        : 'bg-movieboli-secondary'
                    }
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-110
                ${
                  isHomepage && !isScrolled
                    ? 'text-white hover:text-white/80'
                    : 'text-movieboli-neutral-600 hover:text-movieboli-primary'
                }
              `}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden glass-movieboli rounded-lg mt-2 border border-movieboli-neutral-200"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href
                  const isFestivalItem = item.section === 'festival'
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-6 py-3 ${classes.fontPrimary} font-medium text-base
                        transition-all duration-300 hover:bg-movieboli-neutral-50
                        ${
                          isActive
                            ? `${classes.textPrimary} bg-movieboli-neutral-100 border-l-4 border-movieboli-secondary`
                            : 'text-movieboli-neutral-700 hover:text-movieboli-primary'
                        }
                        ${isFestivalItem ? 'flex items-center justify-between' : ''}
                      `}
                    >
                      <span>{item.name}</span>
                      {isFestivalItem && branding.isAssociation() && (
                        <span className="festival-badge text-xs">Nuovo</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar