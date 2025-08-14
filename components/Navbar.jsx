import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = ({ variant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Determina automaticamente il tipo di sezione
  const isFestivalPage = router.pathname.startsWith('/festival') || 
                        router.pathname === '/festival/programma' ||
                        router.pathname === '/prenota' ||
                        router.pathname === '/turni-impp';
  
  const currentVariant = variant || (isFestivalPage ? 'festival' : 'association');

  const navigation = [
    { id: 'home', name: 'Home', href: '/' },
    { id: 'about', name: 'Chi siamo', href: '/chi-siamo' },
    { id: 'activities', name: 'Attività', href: '/attivita' },
    { id: 'podcast', name: 'Podcast', href: '/podcast' },
    { id: 'festival', name: 'Festival', href: '/festival' },
    { id: 'program', name: 'Programma', href: '/festival/programma' },
    { id: 'donations', name: 'Donazioni', href: '/donazioni' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Chiudi menu quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Gestione ESC per chiudere menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Stili navbar migliorati con migliore contrasto
  const getNavbarClasses = () => {
    if (currentVariant === 'festival') {
      return isScrolled 
        ? 'bg-movieboli-nero/98 backdrop-blur-lg shadow-2xl border-b border-movieboli-accent/20'
        : 'bg-movieboli-violaPrincipale/95 backdrop-blur-md';
    } else {
      if (router.pathname === '/') {
        return isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-2xl border-b border-gray-200'
          : 'bg-transparent';
      } else {
        return 'bg-movieboli-primary/98 backdrop-blur-lg shadow-2xl border-b border-movieboli-primary/30';
      }
    }
  };

  const getTextColor = () => {
    if (currentVariant === 'festival') {
      return 'text-movieboli-crema';
    } else {
      return (router.pathname === '/' && !isScrolled) ? 'text-white' : 'text-movieboli-primary';
    }
  };

  const getLinkClasses = (isActive) => {
    const baseClasses = 'font-inter text-sm lg:text-base font-semibold tracking-wide transition-all duration-300 relative group px-3 py-2 rounded-lg';
    
    if (currentVariant === 'festival') {
      return `${baseClasses} ${
        isActive 
          ? 'text-movieboli-accent bg-movieboli-accent/10' 
          : 'text-movieboli-crema hover:text-movieboli-accent hover:bg-movieboli-accent/5'
      }`;
    } else {
      if (router.pathname === '/' && !isScrolled) {
        return `${baseClasses} ${
          isActive 
            ? 'text-white bg-white/10' 
            : 'text-white/90 hover:text-white hover:bg-white/5'
        }`;
      } else {
        return `${baseClasses} ${
          isActive 
            ? 'text-movieboli-accent bg-movieboli-accent/10' 
            : 'text-movieboli-primary hover:text-movieboli-accent hover:bg-movieboli-accent/5'
        }`;
      }
    }
  };

  const getLogoSrc = () => {
    if (currentVariant === 'festival') {
      return "/images/logoNuovo.png";
    } else {
      return (router.pathname === '/' && !isScrolled) ? "/images/logoNuovo.png" : "/images/logoNuovo.png";
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarClasses()} ${getTextColor()}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 sm:h-22">
            {/* Logo Ingrandito */}
            {/* Logo Ottimizzato - Solo logo per sezione associazione */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative navbar-logo transform group-hover:scale-105 transition-all duration-300">
                <Image
                  src={getLogoSrc()}
                  alt="MOVIEBOLI Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                  sizes="(max-width: 375px) 44px, (max-width: 640px) 48px, (max-width: 1023px) 64px, 112px"
                />
              </div>
              {/* Testi visibili solo nella sezione festival */}
              {currentVariant === 'festival' && (
                <div className="hidden sm:block">
                  <div className={`font-bold text-lg lg:text-xl ${getTextColor()}`}>
                    MOVIEBOLI
                  </div>
                  <div className={`text-xs lg:text-sm opacity-80 ${getTextColor()}`}>
                    Film Festival
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={getLinkClasses(router.pathname === item.href)}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-3 right-3 h-0.5 transition-all duration-300 ${
                    currentVariant === 'festival' ? 'bg-movieboli-accent' : 'bg-movieboli-primary'
                  } ${
                    router.pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={`p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 rounded-lg ${
                  currentVariant === 'festival' 
                    ? 'text-movieboli-crema hover:text-movieboli-accent focus:ring-movieboli-accent hover:bg-movieboli-accent/10'
                    : (router.pathname === '/' && !isScrolled)
                      ? 'text-white hover:text-white/80 focus:ring-white hover:bg-white/10'
                      : 'text-movieboli-primary hover:text-movieboli-accent focus:ring-movieboli-primary hover:bg-movieboli-primary/10'
                }`}
                aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                aria-expanded={isMenuOpen}
              >
                <svg
                  className={`w-7 h-7 transform transition-transform duration-300 ${
                    isMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu Migliorato */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Sidebar */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden overflow-y-auto ${
                currentVariant === 'festival'
                  ? 'bg-movieboli-nero/98 border-r border-movieboli-accent/30'
                  : 'bg-white border-r border-gray-200'
              }`}
            >
              <div className="p-6">
                {/* Header del menu mobile */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-current/20">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={getLogoSrc()}
                        alt="MOVIEBOLI Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${
                        currentVariant === 'festival' ? 'text-movieboli-crema' : 'text-movieboli-primary'
                      }`}>
                        MOVIEBOLI
                      </div>
                      <div className={`text-xs opacity-80 ${
                        currentVariant === 'festival' ? 'text-movieboli-crema' : 'text-movieboli-primary'
                      }`}>
                        {currentVariant === 'festival' ? 'Film Festival' : 'Associazione'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      currentVariant === 'festival'
                        ? 'text-movieboli-crema hover:text-movieboli-accent hover:bg-movieboli-accent/10'
                        : 'text-movieboli-primary hover:text-movieboli-accent hover:bg-movieboli-primary/10'
                    }`}
                    aria-label="Chiudi menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-4 rounded-xl font-inter text-base font-semibold transition-all duration-300 ${
                          router.pathname === item.href 
                            ? (currentVariant === 'festival'
                                ? 'bg-movieboli-accent/20 text-movieboli-accent border-l-4 border-movieboli-accent shadow-lg'
                                : 'bg-movieboli-primary/10 text-movieboli-primary border-l-4 border-movieboli-primary shadow-lg'
                              )
                            : (currentVariant === 'festival'
                                ? 'text-movieboli-crema hover:bg-movieboli-accent/10 hover:text-movieboli-accent hover:translate-x-1'
                                : 'text-movieboli-primary hover:bg-movieboli-primary/5 hover:text-movieboli-accent hover:translate-x-1'
                              )
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="flex-1">{item.name}</span>
                        {router.pathname === item.href && (
                          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer del menu mobile */}
                <div className={`mt-8 pt-6 border-t border-current/20 text-center ${
                  currentVariant === 'festival' ? 'text-movieboli-crema' : 'text-movieboli-primary'
                }`}>
                  <p className="text-sm opacity-80">
                    © 2024 MOVIEBOLI APS
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;