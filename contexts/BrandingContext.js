import { createContext, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';

// Context per la gestione del branding
const BrandingContext = createContext();

// Configurazioni di branding
const BRANDING_CONFIGS = {
  association: {
    name: 'MOVIEBOLI',
    variant: 'association',
    colors: {
      primary: 'movieboli-primary',
      secondary: 'movieboli-secondary',
      accent: 'movieboli-podcast',
      neutral: 'movieboli-neutral-700',
      background: 'white',
    },
    fonts: {
      primary: 'font-sans', // Inter
      secondary: 'font-serif', // Crimson Text
    },
    components: {
      card: 'card-movieboli',
      button: 'btn-primary',
      badge: 'badge-movieboli',
      navbar: 'navbar-movieboli',
    },
    gradients: {
      primary: 'gradient-primary',
      secondary: 'gradient-secondary',
      podcast: 'gradient-podcast',
    },
    shadows: {
      default: 'shadow-movieboli',
      hover: 'shadow-movieboli-hover',
    },
  },
  festival: {
    name: 'MOVIEBOLI Festival',
    variant: 'festival',
    colors: {
      primary: 'movieboli-primary',
      secondary: 'festival-gold',
      accent: 'movieboli-festival-primario1',
      neutral: 'movieboli-neutral-700',
      background: 'movieboli-festival-sfondo',
    },
    fonts: {
      primary: 'font-poppins', // Poppins (festival)
      secondary: 'font-serif', // Crimson Text
    },
    components: {
      card: 'festival-card',
      button: 'btn-primary',
      badge: 'festival-badge',
      navbar: 'navbar-movieboli',
    },
    gradients: {
      primary: 'festival-gradient',
      secondary: 'gradient-secondary',
      festival: 'festival-gradient',
    },
    shadows: {
      default: 'shadow-festival',
      hover: 'shadow-movieboli-hover',
    },
  },
};

// Provider del contesto
export const BrandingProvider = ({ children, forceVariant = null }) => {
  const router = useRouter();
  
  // Determina automaticamente la variante in base al percorso
  const variant = useMemo(() => {
    if (forceVariant) return forceVariant;
    
    // Percorsi che utilizzano il branding festival
    const festivalPaths = [
      '/festival',
      '/programma',
      '/prenota',
      '/vota',
      '/artisti',
      '/turni-impp',
    ];
    
    const currentPath = router.pathname;
    const isFestivalSection = festivalPaths.some(path => 
      currentPath.startsWith(path)
    );
    
    return isFestivalSection ? 'festival' : 'association';
  }, [router.pathname, forceVariant]);
  
  const brandingConfig = BRANDING_CONFIGS[variant];
  
  const contextValue = useMemo(() => ({
    ...brandingConfig,
    // Utility functions
    getClassName: (component, additionalClasses = '') => {
      const baseClass = brandingConfig.components[component] || '';
      return `${baseClass} ${additionalClasses}`.trim();
    },
    getColorClass: (colorType, prefix = 'text') => {
      const color = brandingConfig.colors[colorType];
      return color ? `${prefix}-${color}` : '';
    },
    getGradientClass: (gradientType) => {
      return brandingConfig.gradients[gradientType] || '';
    },
    isFestival: () => variant === 'festival',
    isAssociation: () => variant === 'association',
  }), [brandingConfig, variant]);
  
  return (
    <BrandingContext.Provider value={contextValue}>
      {children}
    </BrandingContext.Provider>
  );
};

// Hook per utilizzare il contesto
export const useBranding = () => {
  const context = useContext(BrandingContext);
  
  if (!context) {
    throw new Error('useBranding deve essere utilizzato all\'interno di BrandingProvider');
  }
  
  return context;
};

// Hook per componenti condizionali
export const useBrandingVariant = () => {
  const { variant } = useBranding();
  return variant;
};

// Hook per classi CSS dinamiche
export const useBrandingClasses = () => {
  const branding = useBranding();
  
  return {
    // Componenti base
    card: branding.getClassName('card'),
    button: branding.getClassName('button'),
    badge: branding.getClassName('badge'),
    navbar: branding.getClassName('navbar'),
    
    // Colori
    textPrimary: branding.getColorClass('primary', 'text'),
    textSecondary: branding.getColorClass('secondary', 'text'),
    bgPrimary: branding.getColorClass('primary', 'bg'),
    bgSecondary: branding.getColorClass('secondary', 'bg'),
    borderPrimary: branding.getColorClass('primary', 'border'),
    
    // Gradienti
    gradientPrimary: branding.getGradientClass('primary'),
    gradientSecondary: branding.getGradientClass('secondary'),
    
    // Font
    fontPrimary: branding.fonts.primary,
    fontSecondary: branding.fonts.secondary,
    
    // Ombre
    shadowDefault: branding.shadows.default,
    shadowHover: branding.shadows.hover,
  };
};

// Componente wrapper per sezioni con branding specifico
export const BrandingSection = ({ variant, children, className = '' }) => {
  return (
    <BrandingProvider forceVariant={variant}>
      <div className={`branding-section branding-${variant} ${className}`}>
        {children}
      </div>
    </BrandingProvider>
  );
};

// Utility per classi condizionali
export const brandingClasses = {
  association: {
    hero: 'bg-gradient-to-br from-movieboli-primary to-movieboli-primary-dark text-white',
    section: 'bg-white',
    accent: 'text-movieboli-secondary',
  },
  festival: {
    hero: 'festival-gradient text-white',
    section: 'bg-movieboli-festival-sfondo/10',
    accent: 'text-festival-gold',
  },
};

// Export delle configurazioni per uso diretto
export { BRANDING_CONFIGS };
export default BrandingContext;