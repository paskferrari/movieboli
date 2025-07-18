'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const isHomePage = router.pathname === '/'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Aggiungi scroll-smooth al documento
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Attività', href: '/attivita' },
    { name: 'Festival', href: '/festival' },
    { name: 'Contatti', href: '/contatti' },
  ]

  const socialLinks = [
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
      name: 'Facebook',
      href: 'https://facebook.com/movieboli',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:info@movieboli.it',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-movieboli-rosaSfondo">
      {/* Header con Navbar */}
      <header className={`${
        isHomePage ? 'absolute' : 'sticky'
      } top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isHomePage && !isScrolled 
           ? 'bg-transparent' 
           : 'bg-movieboli-sfondo/95 backdrop-blur-md shadow-lg'
       }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                 <Image
                   src="/logo-movieboli.png"
                   alt="MoviEboli Film Festival Logo"
                   fill
                   className="object-contain"
                   priority
                 />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-2xl font-bold text-movieboli-nero2 tracking-wide leading-none">
                   MOVIEBOLI
                 </span>
                 <span className="font-poppins text-xs text-movieboli-nero1 tracking-wider font-medium">
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
                  className="font-poppins text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:text-movieboli-nero1 hover:scale-105 relative group text-movieboli-nero2"
                 >
                   {item.name}
                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-movieboli-oro1 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-movieboli-nero2 hover:text-movieboli-nero1 focus:outline-none focus:text-movieboli-nero1 transition-colors duration-300"
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
            <div className="md:hidden animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-movieboli-sfondo/95 backdrop-blur-sm border-t border-movieboli-oro1/30">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-poppins font-semibold tracking-wide uppercase transition-all duration-300 text-movieboli-nero2 hover:text-movieboli-nero1 hover:bg-movieboli-oro1/20 rounded-lg transform hover:translate-x-2"
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

      {/* Footer con nuova brand identity */}
       <footer className="bg-movieboli-nero2 text-movieboli-sfondo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Festival Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-16 h-16">
                   <Image
                     src="/logo-movieboli.png"
                     alt="MoviEboli Film Festival Logo"
                     fill
                     className="object-contain filter brightness-0 invert"
                   />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins text-2xl font-bold tracking-wide text-movieboli-sfondo leading-none">
                     MOVIEBOLI
                   </span>
                   <span className="font-poppins text-sm text-movieboli-oro1 tracking-wider font-medium">
                     FILM FESTIVAL
                   </span>
                </div>
              </div>
              <p className="text-movieboli-sfondo/80 mb-6 max-w-md font-poppins leading-relaxed">
                Il festival cinematografico più creativo e innovativo del Sud Italia. 
                Un'esperienza unica che celebra l'arte, la cultura e la creatività cinematografica.
              </p>
              
              {/* Social Links con hover rosaPastello */}
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-movieboli-oro1 hover:text-movieboli-highlight1 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links e Contatti */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-poppins text-lg mb-4 text-movieboli-oro1 tracking-wide uppercase font-semibold">
                   Festival
                 </h3>
                 <ul className="space-y-3">
                   <li>
                     <Link href="/#programma" className="text-movieboli-sfondo/70 hover:text-movieboli-sfondo transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                       Programma
                     </Link>
                   </li>
                   <li>
                     <Link href="/#chi-siamo" className="text-movieboli-sfondo/70 hover:text-movieboli-sfondo transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                       Chi siamo
                     </Link>
                   </li>
                   <li>
                     <Link href="/#prenota" className="text-movieboli-sfondo/70 hover:text-movieboli-sfondo transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                       Prenota
                     </Link>
                   </li>
                   <li>
                     <Link href="/#vota" className="text-movieboli-sfondo/70 hover:text-movieboli-sfondo transition-colors duration-300 font-poppins hover:translate-x-1 transform inline-block">
                       Vota
                     </Link>
                   </li>
                 </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-poppins text-lg mb-4 text-movieboli-oro1 tracking-wide uppercase font-semibold">
                   Contatti
                 </h3>
                 <ul className="space-y-3 text-movieboli-sfondo/70 font-poppins text-sm">
                   <li className="flex items-start space-x-2">
                     <span className="text-movieboli-oro1">📍</span>
                     <span>Via del Cinema, 1<br />85025 Melfi (PZ)</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <span className="text-movieboli-oro1">📞</span>
                     <span>+39 0972 123456</span>
                   </li>
                   <li className="flex items-center space-x-2">
                     <span className="text-movieboli-oro1">✉️</span>
                     <a href="mailto:info@movieboli.it" className="hover:text-movieboli-highlight1 transition-colors duration-300">
                       info@movieboli.it
                     </a>
                   </li>
                 </ul>
              </div>
            </div>
          </div>

          {/* Copyright centrato */}
          <div className="border-t border-movieboli-sfondo/20 mt-8 pt-8 text-center">
             <p className="text-movieboli-sfondo/70 text-sm font-poppins">
              © {currentYear} MoviEboli Film Festival. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout