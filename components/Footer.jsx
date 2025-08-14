import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import EditableText from './ui/EditableText';

const Footer = ({ variant = 'auto' }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const router = useRouter();
  
  // Determina automaticamente la variante basata sulla route
  const getVariant = () => {
    if (variant !== 'auto') return variant;
    
    const path = router.pathname;
    if (path.startsWith('/festival') || path === '/festival') {
      return 'festival';
    }
    return 'association';
  };
  
  const currentVariant = getVariant();
  
  // Configurazione stili per varianti
  const variantStyles = {
    festival: {
      bg: 'bg-gradient-to-b from-movieboli-nero via-movieboli-nero/95 to-movieboli-nero',
      text: 'text-movieboli-crema',
      accent: 'text-movieboli-violaPrincipale',
      hover: 'hover:text-movieboli-violaPrincipale',
      border: 'border-movieboli-crema/20',
      socialBg: 'bg-movieboli-crema/10',
      socialHover: 'hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero'
    },
    association: {
      bg: 'bg-movieboli-black',
      text: 'text-white',
      accent: 'text-movieboli-accent',
      hover: 'hover:text-white',
      border: 'border-gray-700',
      socialBg: 'bg-movieboli-accent/10',
      socialHover: 'hover:bg-movieboli-accent hover:text-white'
    }
  };
  
  const styles = variantStyles[currentVariant];
  
  // Social Media Links
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/movieboli',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/movieboli',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@movieboli',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:movieboliaps@gmail.com',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];
  
  // Quick Links basati sulla variante
  const getQuickLinks = () => {
    const baseLinks = [
      { name: 'Chi Siamo', href: '/chi-siamo' },
      { name: 'Attività', href: '/attivita' },
      { name: 'Donazioni', href: '/donazioni' },
    ];
    
    if (currentVariant === 'festival') {
      return [
        { name: 'Festival', href: '/festival' },
        { name: 'Programma', href: '/festival/programma' },
        { name: 'Cortometraggi', href: '/festival/cortometraggi' },
        { name: 'Ospiti', href: '/festival/ospiti' },
        ...baseLinks
      ];
    }
    
    return [
      { name: 'Festival', href: '/festival' },
      { name: 'Podcast', href: '/podcast' },
      ...baseLinks
    ];
  };
  
  const quickLinks = getQuickLinks();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${styles.bg} ${styles.text} relative overflow-hidden`}
    >
      {/* Decorative Background */}
      {currentVariant === 'festival' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 via-transparent to-movieboli-crema/10" />
        </div>
      )}
      
      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${
                  currentVariant === 'festival' 
                    ? 'from-movieboli-violaPrincipale to-movieboli-crema' 
                    : 'from-movieboli-accent to-movieboli-primary'
                } rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div className="flex flex-col">
                  <span className={`font-inter text-2xl font-bold tracking-wide ${styles.text} leading-none`}>
                    MOVIEBOLI
                  </span>
                  <span className={`font-inter text-sm ${styles.accent} tracking-wider font-medium`}>
                    {currentVariant === 'festival' ? 'FILM FESTIVAL' : 'APS'}
                  </span>
                </div>
              </div>
              
              <p className={`${styles.text} opacity-85 mb-6 max-w-md font-inter text-base leading-relaxed`}>
                <EditableText 
                  contentKey={`footer.${currentVariant}.description`}
                  defaultValue={currentVariant === 'festival' 
                    ? "Festival del Cinema Indipendente che celebra l'arte cinematografica emergente e promuove la cultura audiovisiva nel territorio."
                    : "Promuoviamo la cultura cinematografica attraverso eventi, festival e attività educative nel territorio di Eboli."
                  }
                  tag="span"
                />
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    href={social.href}
                    className={`${styles.socialBg} ${styles.text} ${styles.socialHover} transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 px-3 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-sm`}
                    aria-label={social.name}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  >
                    {social.icon}
                    <span className="text-sm font-poppins">{social.name}</span>
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
            <h3 className={`font-inter text-lg mb-4 ${styles.accent} tracking-wide uppercase font-semibold`}>
              <EditableText 
                contentKey={`footer.${currentVariant}.links.title`}
                defaultValue="Link Utili"
                tag="span"
              />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                >
                  <Link 
                    href={link.href} 
                    className={`${styles.text} opacity-85 ${styles.hover} transition-all duration-300 font-poppins hover:translate-x-1 transform inline-block hover:opacity-100`}
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
            <h3 className={`font-inter text-lg mb-4 ${styles.accent} tracking-wide uppercase font-semibold`}>
              <EditableText 
                contentKey={`footer.${currentVariant}.contact.title`}
                defaultValue="Contatti"
                tag="span"
              />
            </h3>
            <ul className={`space-y-3 ${styles.text} opacity-85 font-poppins text-sm`}>
              <li className="flex items-start space-x-2">
                <span className={`${styles.accent} mt-0.5`}>📍</span>
                <div>
                  <p>Via Apollo XI, n.51</p>
                  <p>Eboli (SA)</p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <span className={styles.accent}>📞</span>
                <span>3333803485</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className={styles.accent}>✉️</span>
                <a 
                  href="mailto:movieboliaps@gmail.com" 
                  className={`${styles.hover} transition-colors duration-300`}
                >
                  movieboliaps@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className={`border-t ${styles.border}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className={`${styles.text} opacity-70 text-sm font-poppins`}>
              <EditableText 
                contentKey={`footer.${currentVariant}.copyright`}
                defaultValue={currentVariant === 'festival' 
                  ? `© ${currentYear} MoviEboli Film Festival - MOVIEBOLI Associazione Culturale • Festival del Cinema Indipendente`
                  : `© ${currentYear} MovieBoli APS. Tutti i diritti riservati.`
                }
                tag="span"
              />
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className={`${styles.text} opacity-70 ${styles.hover} transition-colors duration-300 font-poppins`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/termini" 
                className={`${styles.text} opacity-70 ${styles.hover} transition-colors duration-300 font-poppins`}
              >
                Termini di Servizio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;