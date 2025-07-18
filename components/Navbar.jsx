import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Festival', href: '/festival' },
    { name: 'Donazioni', href: '/donazioni' }
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
        ? 'bg-movieboli-sfondo/95 backdrop-blur-md shadow-lg border-b border-movieboli-oro2/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-movieboli-primario1 to-movieboli-primario2 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-base sm:text-lg">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter text-lg sm:text-xl font-bold text-[#1E3A5F] tracking-wide leading-none">
                MOVIEBOLI
              </span>
              <span className="font-inter text-xs text-[#1E3A5F] tracking-wider font-medium">
                APS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-inter text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group ${
                  router.pathname === item.href 
                    ? 'text-[#f5a623]' 
                    : 'text-[#1E3A5F] hover:text-[#f5a623]'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#f5a623] transition-all duration-300 ${
                  router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-[#1E3A5F] hover:text-[#f5a623] focus:outline-none transition-colors duration-300"
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
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-[#e5d4ed] overflow-hidden z-50`}
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg font-inter text-base font-semibold ${router.pathname === item.href ? 'bg-movieboli-primario1/10 text-[#f5a623]' : 'text-[#1E3A5F] hover:bg-gray-100 hover:text-[#f5a623]'}`}
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