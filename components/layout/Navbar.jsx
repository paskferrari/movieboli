'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Navbar - Navigazione principale del sito MOVIEBOLI
 * Design: trasparente su Hero, nera nelle altre sezioni
 * Layout: logo a sinistra, menu centrato, responsive
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Menu di navigazione principale
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Attività', href: '/attivita' },
    { name: 'Festival', href: '/festival' },
    { name: 'Contatti', href: '/contatti' },
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

  // Stili dinamici basati su scroll e pagina
  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      isHomepage
        ? isScrolled
          ? 'bg-movieboli-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
        : 'bg-movieboli-black shadow-lg'
    }
  `

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo MOVIEBOLI */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo-movieboli.png"
                alt="MOVIEBOLI Logo"
                fill
                className={`object-contain transition-all duration-300 ${
                  isHomepage && !isScrolled
                    ? 'filter brightness-0 invert'
                    : ''
                }`}
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-poppins font-bold text-xl tracking-wide transition-colors duration-300 ${
                isHomepage && !isScrolled
                  ? 'text-movieboli-pink'
                  : 'text-movieboli-pink'
              }`}>
                MOVIEBOLI
              </span>
              <span className={`font-poppins text-xs tracking-wider font-medium transition-colors duration-300 ${
                isHomepage && !isScrolled
                  ? 'text-white/70'
                  : 'text-movieboli-pink/70'
              }`}>
                ASSOCIAZIONE CULTURALE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    font-poppins font-semibold text-sm uppercase tracking-wider
                    transition-all duration-300 hover:scale-105 relative group
                    ${
                      isHomepage && !isScrolled
                        ? isActive
                          ? 'text-movieboli-pink'
                          : 'text-white hover:text-movieboli-pink'
                        : isActive
                          ? 'text-movieboli-pink'
                          : 'text-white hover:text-movieboli-pink'
                    }
                  `}
                >
                  {item.name}
                  <span className={`
                    absolute -bottom-1 left-0 h-0.5 bg-movieboli-pink transition-all duration-300
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
                    ? 'text-white hover:text-movieboli-pink'
                    : 'text-movieboli-pink hover:text-white'
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
              className="md:hidden overflow-hidden bg-movieboli-black/95 backdrop-blur-md rounded-lg mt-2 border border-movieboli-pink/20"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block px-6 py-3 font-poppins font-semibold text-base
                        transition-all duration-300 hover:bg-movieboli-pink/10
                        ${
                          isActive
                            ? 'text-movieboli-pink bg-movieboli-pink/5 border-l-4 border-movieboli-pink'
                            : 'text-white hover:text-movieboli-pink'
                        }
                      `}
                    >
                      {item.name}
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