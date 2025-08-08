'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useBranding, useBrandingClasses } from '../../contexts/BrandingContext'
import { useAuth } from '../../contexts/AuthContext'
import AuthModal from '../auth/AuthModal'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()
  const branding = useBranding()
  const classes = useBrandingClasses()
  const { user, isAuthenticated, signOut } = useAuth()

  // Controlla se siamo in una pagina del festival
  const isFestivalPage = router.pathname.startsWith('/festival') || 
                        router.pathname === '/programma' ||
                        router.pathname === '/prenota' ||
                        router.pathname === '/turni-impp'

  // Menu di navigazione festival
  const festivalNavigation = [
    { name: 'Programma', href: '/programma' },
    { name: 'Cortometraggi', href: '/festival/cortometraggi' },
    { name: 'Ospiti', href: '/festival/ospiti' },
    { name: 'Vota', href: '/festival/vota' },
    { name: 'Info', href: '/chi-siamo' },
  ]

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
    { name: 'Ospiti', href: '/festival/ospiti', section: 'festival' },
    { name: 'Vota', href: '/festival/vota', section: 'festival' },
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

  // Chiudi menu quando cambia la route
  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.pathname])

  // Previeni scroll del body quando il menu è aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  // Funzione per gestire il logout
  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Errore durante il logout:', error)
    }
  }

  return (
    <>
      {/* Festival Navbar */}
      {isFestivalPage ? (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative w-20 h-20 transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/logo-movieboli.png"
                    alt="MOVIEBOLI Logo"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
              </Link>
              
              <div className="flex items-center space-x-6">
                {/* Desktop Festival Navigation */}
                <div className="hidden md:flex space-x-8">
                  {festivalNavigation.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Hamburger Button for Festival */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300"
                  aria-label="Toggle festival menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                
                {/* Auth buttons */}
                <div className="flex items-center space-x-4">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      <span className="hidden sm:block text-movieboli-crema/80 text-sm">
                        Ciao, {user?.user_metadata?.firstName || user?.email?.split('@')[0]}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-movieboli-violaPrincipale/20 hover:bg-movieboli-violaPrincipale/30 text-movieboli-crema px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-movieboli-violaPrincipale hover:bg-movieboli-violaSecondario text-movieboli-nero px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold"
                    >
                      Accedi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        /* Regular Navbar */
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          router.pathname === '/' 
            ? isScrolled 
              ? 'navbar-movieboli shadow-lg' 
              : 'bg-transparent'
            : 'navbar-movieboli shadow-lg'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 md:py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                <div className="relative w-10 h-10 md:w-12 md:h-12 transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/logo-movieboli.png"
                    alt="MOVIEBOLI Logo"
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      router.pathname === '/' && !isScrolled ? 'filter brightness-0 invert' : ''
                    }`}
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`${classes.fontPrimary} font-bold text-lg md:text-2xl tracking-wide transition-colors duration-300 ${
                    router.pathname === '/' && !isScrolled ? 'text-white' : classes.textPrimary
                  }`}>
                    MOVIEBOLI
                  </span>
                  <span className={`${classes.fontPrimary} text-xs md:text-sm tracking-wider font-medium transition-colors duration-300 ${
                    router.pathname === '/' && !isScrolled ? 'text-white/80' : 'text-movieboli-neutral-600'
                  }`}>
                    {branding.isFestival() ? 'FESTIVAL' : 'ASSOCIAZIONE'}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
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
                          router.pathname === '/' && !isScrolled
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
                        ${isFestivalItem ? 'bg-festival-gold' : 'bg-movieboli-secondary'}
                        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                      `}></span>
                    </Link>
                  )
                })}
                
                {/* Auth buttons */}
                <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-movieboli-neutral-200">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      <span className={`hidden sm:block text-sm ${
                        router.pathname === '/' && !isScrolled ? 'text-white/80' : 'text-movieboli-neutral-600'
                      }`}>
                        Ciao, {user?.user_metadata?.firstName || user?.email?.split('@')[0]}
                      </span>
                      <button
                        onClick={handleLogout}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                          router.pathname === '/' && !isScrolled
                            ? 'bg-white/20 hover:bg-white/30 text-white'
                            : 'bg-movieboli-neutral-100 hover:bg-movieboli-neutral-200 text-movieboli-neutral-700'
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold ${
                        router.pathname === '/' && !isScrolled
                          ? 'bg-white text-movieboli-primary hover:bg-white/90'
                          : 'bg-movieboli-primary hover:bg-movieboli-secondary text-white'
                      }`}
                    >
                      Accedi
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center space-x-3">
                {/* Mobile Auth button */}
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium ${
                      router.pathname === '/' && !isScrolled
                        ? 'bg-white/20 hover:bg-white/30 text-white'
                        : 'bg-movieboli-neutral-100 hover:bg-movieboli-neutral-200 text-movieboli-neutral-700'
                    }`}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 text-xs font-bold ${
                      router.pathname === '/' && !isScrolled
                        ? 'bg-white text-movieboli-primary hover:bg-white/90'
                        : 'bg-movieboli-primary hover:bg-movieboli-secondary text-white'
                    }`}
                  >
                    Accedi
                  </button>
                )}
                
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`
                    p-2 rounded-lg transition-all duration-300 hover:scale-110 touch-target
                    ${
                      router.pathname === '/' && !isScrolled
                        ? 'text-white hover:text-white/80'
                        : 'text-movieboli-neutral-600 hover:text-movieboli-primary'
                    }
                  `}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
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
          </div>
        </nav>
      )}

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10">
                      <img
                        src="/logo-movieboli.png"
                        alt="MOVIEBOLI Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-movieboli-primary">MOVIEBOLI</div>
                      <div className="text-xs text-movieboli-neutral-600">
                        {branding.isFestival() ? 'FESTIVAL' : 'ASSOCIAZIONE'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-movieboli-neutral-600 hover:text-movieboli-primary touch-target"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  {(isFestivalPage ? festivalNavigation : navigation).map((item, index) => {
                    const isActive = router.pathname === item.href
                    const isFestivalItem = item.section === 'festival'
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            block px-4 py-3 rounded-lg font-medium text-base transition-all duration-200 touch-target
                            ${
                              isActive
                                ? 'bg-movieboli-primary text-white'
                                : 'text-movieboli-neutral-700 hover:bg-movieboli-neutral-100 hover:text-movieboli-primary'
                            }
                            ${isFestivalItem ? 'border-l-4 border-festival-gold' : ''}
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            {isFestivalItem && branding.isAssociation() && (
                              <span className="text-xs bg-festival-gold text-black px-2 py-1 rounded-full font-semibold">
                                Nuovo
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="login"
      />
    </>
  )
}

export default Navbar