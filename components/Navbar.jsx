import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Navbar = ({ variant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Determina automaticamente il tipo di sezione se variant non è specificato
  const isFestivalPage = router.pathname.startsWith('/festival') || 
                        router.pathname === '/programma' ||
                        router.pathname === '/prenota' ||
                        router.pathname === '/turni-impp';
  
  const currentVariant = variant || (isFestivalPage ? 'festival' : 'association');

  const navigation = [
    { 
      id: 'home',
      name: 'Home', 
      href: '/' 
    },
    { 
      id: 'about',
      name: 'Chi siamo', 
      href: '/chi-siamo' 
    },
    { 
      id: 'podcast',
      name: 'Podcast', 
      href: '/podcast' 
    },
    { 
      id: 'festival',
      name: 'Festival', 
      href: '/festival' 
    },
    { 
      id: 'donations',
      name: 'Donazioni', 
      href: '/donazioni' 
    }
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

  // Logica per gli stili della navbar - CORRETTA
  const getNavbarClasses = () => {
    if (currentVariant === 'festival') {
      // Per il festival: colori della palette MovieBoli
      return isScrolled 
        ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl text-movieboli-crema'
        : 'bg-movieboli-violaPrincipale/90 backdrop-blur-sm text-movieboli-crema';
    } else {
      // Per l'associazione: nera o trasparente che diventa bianca
      if (router.pathname === '/') {
        return isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-movieboli-primary'
          : 'bg-transparent text-white';
      } else {
        return 'bg-movieboli-primary/95 backdrop-blur-md shadow-lg text-white';
      }
    }
  };

  const getLinkClasses = (isActive) => {
    if (currentVariant === 'festival') {
      return `font-inter text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group px-2 py-1 ${
        isActive 
          ? 'text-movieboli-accent' 
          : 'text-movieboli-crema hover:text-movieboli-accent'
      }`;
    } else {
      if (router.pathname === '/' && !isScrolled) {
        return `font-inter text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group px-2 py-1 ${
          isActive 
            ? 'text-white' 
            : 'text-white/90 hover:text-white'
        }`;
      } else {
        return `font-inter text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group px-2 py-1 ${
          isActive 
            ? 'text-movieboli-accent' 
            : 'text-white hover:text-slate-300'
        }`;
      }
    }
  };

  const getLogoSrc = () => {
    if (currentVariant === 'festival') {
      return "/images/logonero.png";
    } else {
      return (router.pathname === '/' && !isScrolled) ? "/images/logo.png" : "/images/logonero.png";
    }
  };

  return (
    <motion.nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarClasses()}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 transform group-hover:scale-105 transition-transform duration-300">
              <Image
                src={getLogoSrc()}
                alt="MOVIEBOLI Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={getLinkClasses(router.pathname === item.href)}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  currentVariant === 'festival' ? 'bg-movieboli-accent' : 'bg-movieboli-primary'
                } ${
                  router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 focus:outline-none transition-colors duration-300 ${
                currentVariant === 'festival' 
                  ? 'text-movieboli-crema hover:text-movieboli-accent'
                  : (router.pathname === '/' && !isScrolled)
                    ? 'text-white hover:text-white/80'
                    : 'text-white hover:text-slate-300'
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden z-50 ${
            currentVariant === 'festival'
              ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-lg border-t border-movieboli-accent/30'
              : 'bg-movieboli-primary/95 backdrop-blur-md shadow-lg border-t border-slate-700/30'
          }`}
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg font-inter text-base font-semibold transition-all duration-300 ${
                    router.pathname === item.href 
                      ? (currentVariant === 'festival'
                          ? 'bg-movieboli-accent/20 text-movieboli-accent border-l-4 border-movieboli-accent'
                          : 'bg-slate-700/50 text-white border-l-4 border-slate-400'
                        )
                      : (currentVariant === 'festival'
                          ? 'text-movieboli-crema hover:bg-movieboli-accent/10 hover:text-movieboli-accent'
                          : 'text-white hover:bg-slate-700/30 hover:text-slate-300'
                        )
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;