'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * Footer - Footer principale del sito MOVIEBOLI
 * Design: sfondo scuro, essenziale, con link social e copyright
 * Layout: logo centrato, link di navigazione, social media, copyright
 */
const Footer = () => {
  // Link di navigazione footer
  const footerLinks = [
    { name: 'Chi siamo', href: '/chi-siamo' },
    { name: 'Attività', href: '/attivita' },
    { name: 'Festival', href: '/festival' },
    { name: 'Contatti', href: '/contatti' },
    { name: 'Privacy Policy', href: '/privacy' },
  ]

  // Link social media
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/movieboli',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.438-.928-.928s.438-.928.928-.928.928.438.928.928-.438.928-.928.928zm-3.832 1.418c-1.297 0-2.448.49-3.323 1.297-.928.875-1.418 2.026-1.418 3.323s.49 2.448 1.418 3.323c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.928-.875 1.418-2.026 1.418-3.323s-.49-2.448-1.418-3.323c-.875-.807-2.026-1.297-3.323-1.297z"/>
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
      name: 'YouTube',
      href: 'https://youtube.com/@movieboli',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

  return (
    <footer className="bg-movieboli-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sezione principale footer */}
        <div className="py-12 border-b border-movieboli-pink/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Logo e descrizione */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative w-16 h-16 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/logo-movieboli.png"
                    alt="MOVIEBOLI Logo"
                    fill
                    className="object-contain filter brightness-0 invert"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins font-bold text-2xl tracking-wide text-movieboli-pink">
                    MOVIEBOLI
                  </span>
                  <span className="font-poppins text-sm tracking-wider font-medium text-movieboli-pink/70">
                    ASSOCIAZIONE CULTURALE
                  </span>
                </div>
              </Link>
              <p className="font-poppins text-white/80 leading-relaxed max-w-sm">
                Cinema, cultura e creatività. L'associazione MOVIEBOLI promuove eventi culturali, 
                progetti artistici e il MoviEboli Film Festival durante tutto l'anno.
              </p>
            </div>

            {/* Link di navigazione */}
            <div className="md:col-span-1">
              <h3 className="font-poppins font-bold text-lg text-movieboli-pink mb-6">
                Navigazione
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-poppins text-white/80 hover:text-movieboli-pink transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti e social */}
            <div className="md:col-span-1">
              <h3 className="font-poppins font-bold text-lg text-movieboli-pink mb-6">
                Seguici
              </h3>
              <div className="space-y-4 mb-6">
                <p className="font-poppins text-white/80">
                  <span className="font-semibold text-movieboli-pink">Email:</span><br />
                  info@movieboli.it
                </p>
                <p className="font-poppins text-white/80">
                  <span className="font-semibold text-movieboli-pink">Sede:</span><br />
                  Eboli (SA), Campania
                </p>
              </div>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-movieboli-pink transition-all duration-300 transform hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-poppins text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} MOVIEBOLI - Associazione Culturale. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="font-poppins text-white/60 hover:text-movieboli-pink text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie"
                className="font-poppins text-white/60 hover:text-movieboli-pink text-sm transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorazione finale */}
      <div className="h-1 bg-gradient-to-r from-movieboli-pink via-movieboli-bordeaux to-movieboli-pink"></div>
    </footer>
  )
}

export default Footer