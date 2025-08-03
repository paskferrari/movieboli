import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import EditableText from './ui/EditableText';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  // Social Media Links
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/movieboli',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/movieboli',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/movieboli',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:info@movieboli.it',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];
  
  // Quick Links
  const quickLinks = [
    { name: 'Festival', href: '/festival' },
    { name: 'Programma', href: '/programma' },
    { name: 'Attività', href: '/attivita' },
    { name: 'Prenota', href: '/prenota' },
    { name: 'Vota', href: '/vota' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementare la logica per la newsletter
    console.log('Email sottoscritta:', email);
    setEmail('');
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-movieboli-nero1 text-movieboli-sfondo"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-movieboli-primario1 to-movieboli-primario2 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins text-xl sm:text-2xl font-bold tracking-wide text-movieboli-sfondo leading-none">
                    MOVIEBOLI
                  </span>
                  <span className="font-poppins text-xs sm:text-sm text-movieboli-oro1 tracking-wider font-medium">
                    FILM FESTIVAL
                  </span>
                </div>
              </div>
              
              <p className="text-movieboli-sfondo/80 mb-4 sm:mb-6 max-w-md font-poppins text-sm sm:text-base leading-relaxed">
                Il festival cinematografico più innovativo del Sud Italia. 
                Un'esperienza unica che celebra l'arte, la cultura e la creatività cinematografica.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    href={social.href}
                    className="text-movieboli-oro1 hover:text-movieboli-highlight1 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    aria-label={social.name}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-inter text-base sm:text-lg mb-3 sm:mb-4 text-[#f5a623] tracking-wide uppercase font-semibold">
              Link Utili
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                >
                  <Link 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition-colors duration-300 font-inter hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-inter text-base sm:text-lg mb-3 sm:mb-4 text-[#f5a623] tracking-wide uppercase font-semibold">
              Contatti
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-white/80 font-inter text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-[#f5a623] mt-0.5">📍</span>
                <div>
                  <p>Via del Cinema, 1</p>
                  <p>84025 Eboli (SA)</p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#f5a623]">📞</span>
                <span>+39 0828 123456</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#f5a623]">✉️</span>
                <a 
                  href="mailto:info@movieboli.it" 
                  className="hover:text-white transition-colors duration-300"
                >
                  info@movieboli.it
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#f5a623]">🌐</span>
                <a 
                  href="https://www.movieboli.it" 
                  className="hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.movieboli.it
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="font-inter text-base sm:text-lg mb-3 sm:mb-4 text-[#f5a623] tracking-wide uppercase font-semibold">
              Newsletter
            </h3>
            <p className="text-white/80 mb-3 sm:mb-4 font-inter text-xs sm:text-sm">
              Iscriviti per ricevere aggiornamenti sul festival e sugli eventi speciali.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2 sm:space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  required
                  className="flex-grow px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/10 border border-white/20 rounded-l-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#f5a623]/50"
                />
                <button
                  type="submit"
                  className="bg-[#f5a623] hover:bg-[#f5a623]/80 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-r-md font-inter font-medium transition-colors duration-300"
                >
                  Iscriviti
                </button>
              </div>
            </form>
            <p className="mt-4 sm:mt-6 text-white/60 text-xs italic font-inter">
              "Il cinema è un sogno collettivo che ci unisce attraverso storie universali".
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      // Aggiungi sezione nel footer
      <div className="border-t border-movieboli-neutral-200 pt-8 mt-8">
        <div className="text-center">
          <h3 className="font-bold text-movieboli-primary mb-2">Partecipa al Festival 2025</h3>
          <p className="text-movieboli-neutral-600 mb-4">
            Registrati per votare i cortometraggi e partecipare alla selezione del Premio del Pubblico
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-movieboli-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-movieboli-secondary transition-colors duration-300"
          >
            Registrati Gratuitamente
          </button>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-movieboli-crema/70 text-sm">
              <EditableText 
                contentKey="footer.copyright"
                defaultValue="© 2024 MovieBoli. Tutti i diritti riservati."
                tag="span"
              />
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-3 sm:space-x-6 text-xs sm:text-sm">
              <Link 
                href="/privacy" 
                className="text-white/60 hover:text-white transition-colors duration-300 font-inter"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/termini" 
                className="text-white/60 hover:text-white transition-colors duration-300 font-inter"
              >
                Termini di Servizio
              </Link>
              <Link 
                href="/cookie" 
                className="text-white/60 hover:text-white transition-colors duration-300 font-inter"
              >
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;