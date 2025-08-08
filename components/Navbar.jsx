import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import EditableText from './ui/EditableText';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navigation = [
    { 
      id: 'home',
      name: <EditableText contentKey="nav.home" defaultValue="Home" tag="span" />, 
      href: '/' 
    },
    { 
      id: 'about',
      name: <EditableText contentKey="nav.about" defaultValue="Chi siamo" tag="span" />, 
      href: '/chi-siamo' 
    },
    { 
      id: 'podcast',
      name: <EditableText contentKey="nav.podcast" defaultValue="Podcast" tag="span" />, 
      href: '/podcast' 
    },
    { 
      id: 'festival',
      name: <EditableText contentKey="nav.festival" defaultValue="Festival" tag="span" />, 
      href: '/festival' 
    },
    { 
      id: 'donations',
      name: <EditableText contentKey="nav.donations" defaultValue="Donazioni" tag="span" />, 
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

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-movieboli-black/90 backdrop-blur-md shadow-lg border-b border-movieboli-accent/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Solo immagine senza sfondo */}
          <Link href="/" className="group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 transform group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
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
                className={`font-inter text-xs lg:text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group px-2 py-1 ${
                  router.pathname === item.href 
                    ? (isScrolled ? 'text-movieboli-accent' : 'text-movieboli-accent')
                    : (isScrolled ? 'text-white hover:text-movieboli-accent' : 'text-white hover:text-movieboli-accent')
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-movieboli-accent transition-all duration-300 ${
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
                isScrolled 
                  ? 'text-white hover:text-movieboli-accent' 
                  : 'text-white hover:text-movieboli-accent'
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
          className={`md:hidden absolute top-full left-0 right-0 bg-movieboli-black/95 backdrop-blur-md shadow-lg border-t border-movieboli-accent/30 overflow-hidden z-50`}
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.id}  // Usa item.id invece di item.name
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg font-inter text-base font-semibold transition-all duration-300 ${
                    router.pathname === item.href 
                      ? 'bg-movieboli-accent/20 text-movieboli-accent border-l-4 border-movieboli-accent' 
                      : 'text-white hover:bg-movieboli-accent/10 hover:text-movieboli-accent'
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