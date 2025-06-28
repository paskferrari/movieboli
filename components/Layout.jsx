import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  // Menu di navigazione con anchor links per single page navigation
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/#chi-siamo' },
    { name: 'Programma', href: '/#programma' },
    { name: 'Prenota', href: '/#prenota' },
    { name: 'Vota', href: '/#vota' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Social links con Facebook, Instagram e Email come richiesto
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/movieboli',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/movieboli',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:info@movieboli.it',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Sticky con sfondo trasparente/rosa */}
      <header className="bg-rosa/20 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-20 h-20 transform hover:scale-105 transition-transform duration-300">
                 <Image
                   src="/logo-movieboli.png"
                   alt="MoviEboli Film Festival Logo"
                   fill
                   className="object-contain"
                   priority
                 />
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl text-bordeaux tracking-wide leading-none">
                  MoviEboli
                </span>
                <span className="font-poppins text-xs text-bordeaux/70 tracking-wider font-medium">
                  FILM FESTIVAL
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-poppins text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:text-bordeaux hover:scale-105 relative group text-bordeaux/80"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bordeaux transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-bordeaux/80 hover:text-bordeaux focus:outline-none focus:text-bordeaux transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-sm border-t border-rosa/30">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-poppins font-semibold tracking-wide uppercase transition-colors duration-300 text-bordeaux/80 hover:text-bordeaux hover:bg-rosa/20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer con colore bordeaux personalizzato */}
      <footer className="bg-bordeaux text-white" style={{backgroundColor: '#5d0a0a'}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Festival Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-20 h-20">
                   <Image
                     src="/logo-movieboli.png"
                     alt="MoviEboli Film Festival Logo"
                     fill
                     className="object-contain filter brightness-0 invert"
                   />
                </div>
                <div className="flex flex-col">
                  <span className="font-bebas text-2xl tracking-wide text-white leading-none">
                    MoviEboli
                  </span>
                  <span className="font-poppins text-sm text-gray-300 tracking-wider font-medium">
                    FILM FESTIVAL
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md font-poppins leading-relaxed">
                Il festival cinematografico più creativo e innovativo del Sud Italia. 
                Un'esperienza unica che celebra l'arte, la cultura e la creatività cinematografica.
              </p>
              
              {/* Social Links con stile migliorato */}
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-300 hover:text-rosa transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-poppins text-lg mb-4 text-rosa tracking-wide uppercase font-semibold">
                Festival
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#programma" className="text-gray-300 hover:text-white transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                    Programma
                  </Link>
                </li>
                <li>
                  <Link href="/#chi-siamo" className="text-gray-300 hover:text-white transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                    Chi siamo
                  </Link>
                </li>
                <li>
                  <Link href="/#prenota" className="text-gray-300 hover:text-white transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                    Prenota
                  </Link>
                </li>
                <li>
                  <Link href="/#vota" className="text-gray-300 hover:text-white transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                    Vota
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-poppins text-lg mb-4 text-rosa tracking-wide uppercase font-semibold">
                Contatti
              </h3>
              <ul className="space-y-3 text-gray-300 font-poppins">
                <li className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Via del Cinema, 1<br />85025 Melfi (PZ)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+39 0972 123456</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>✉️</span>
                  <a href="mailto:info@movieboli.it" className="hover:text-rosa transition-colors duration-300">
                    info@movieboli.it
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra inferiore */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0 font-poppins">
              © {currentYear} MoviEboli Film Festival. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-rosa transition-colors duration-300 font-poppins">
                Privacy Policy
              </Link>
              <Link href="/termini" className="text-gray-300 hover:text-rosa transition-colors duration-300 font-poppins">
                Termini di Servizio
              </Link>
              <Link href="/cookie" className="text-gray-300 hover:text-rosa transition-colors duration-300 font-poppins">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout