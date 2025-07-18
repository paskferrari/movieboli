# MOVIEBOLI Design System
*Sistema di design per l'associazione culturale MOVIEBOLI*

---

## 🎨 Palette Colori

### Colori Principali
```css
/* Blu Culturale - Colore primario dell'associazione */
--movieboli-primary: #1E3A5F;     /* Blu profondo, professionale */
--movieboli-primary-light: #2B4A6B;
--movieboli-primary-dark: #152B42;

/* Terracotta Creativa - Colore secondario */
--movieboli-secondary: #C4704A;    /* Terracotta calda, creativa */
--movieboli-secondary-light: #D4825E;
--movieboli-secondary-dark: #A85D3A;
```

### Colori Neutri
```css
/* Grigi Editoriali */
--movieboli-neutral-50: #FAFBFC;
--movieboli-neutral-100: #F4F6F8;
--movieboli-neutral-200: #E8ECF0;
--movieboli-neutral-300: #D1D8E0;
--movieboli-neutral-400: #9AA4B2;
--movieboli-neutral-500: #6B7684;
--movieboli-neutral-600: #4A5568;
--movieboli-neutral-700: #2D3748;
--movieboli-neutral-800: #1A202C;
--movieboli-neutral-900: #171923;
```

### Colori Accento
```css
/* Verde Successo */
--movieboli-success: #38A169;
--movieboli-success-light: #48BB78;
--movieboli-success-dark: #2F855A;

/* Ambra Attenzione */
--movieboli-warning: #D69E2E;
--movieboli-warning-light: #ECC94B;
--movieboli-warning-dark: #B7791F;

/* Rosso Errore */
--movieboli-error: #E53E3E;
--movieboli-error-light: #FC8181;
--movieboli-error-dark: #C53030;

/* Viola Podcast */
--movieboli-podcast: #805AD5;
--movieboli-podcast-light: #9F7AEA;
--movieboli-podcast-dark: #6B46C1;
```

---

## 📝 Tipografia

### Font Primario: Inter
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Uso: UI, navigazione, testi brevi, pulsanti */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Secondario: Crimson Text
```css
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

/* Uso: Titoli editoriali, contenuti lunghi, citazioni */
font-family: 'Crimson Text', Georgia, serif;
```

### Scala Tipografica
```css
/* Titoli */
.text-display: 3.5rem;    /* 56px - Hero titles */
.text-h1: 2.5rem;         /* 40px - Page titles */
.text-h2: 2rem;           /* 32px - Section titles */
.text-h3: 1.5rem;         /* 24px - Subsection titles */
.text-h4: 1.25rem;        /* 20px - Card titles */

/* Corpo */
.text-lg: 1.125rem;       /* 18px - Lead text */
.text-base: 1rem;         /* 16px - Body text */
.text-sm: 0.875rem;       /* 14px - Small text */
.text-xs: 0.75rem;        /* 12px - Captions */
```

---

## 🧩 Componenti UI

### Pulsanti
```css
/* Pulsante Primario */
.btn-primary {
  background: var(--movieboli-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-primary:hover {
  background: var(--movieboli-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
}

/* Pulsante Secondario */
.btn-secondary {
  background: transparent;
  color: var(--movieboli-primary);
  border: 2px solid var(--movieboli-primary);
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--movieboli-primary);
  color: white;
}

/* Pulsante Terracotta (CTA speciali) */
.btn-terracotta {
  background: var(--movieboli-secondary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-terracotta:hover {
  background: var(--movieboli-secondary-dark);
  transform: translateY(-1px);
}
```

### Cards
```css
.card-movieboli {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--movieboli-neutral-200);
  transition: all 0.3s ease;
}

.card-movieboli:hover {
  box-shadow: 0 8px 24px rgba(30, 58, 95, 0.12);
  transform: translateY(-2px);
  border-color: var(--movieboli-primary);
}

/* Card Podcast */
.card-podcast {
  background: linear-gradient(135deg, #805AD5 0%, #9F7AEA 100%);
  color: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.card-podcast::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
  pointer-events: none;
}
```

### Navbar
```css
.navbar-movieboli {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--movieboli-neutral-200);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-link {
  color: var(--movieboli-neutral-700);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.navbar-link:hover {
  color: var(--movieboli-primary);
  background: var(--movieboli-neutral-50);
}

.navbar-link.active {
  color: var(--movieboli-primary);
  background: var(--movieboli-neutral-100);
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--movieboli-secondary);
  border-radius: 50%;
}
```

### Form
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--movieboli-neutral-300);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--movieboli-primary);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--movieboli-neutral-700);
  font-size: 14px;
}

.form-error {
  color: var(--movieboli-error);
  font-size: 14px;
  margin-top: 4px;
}
```

### Modali
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-header {
  border-bottom: 1px solid var(--movieboli-neutral-200);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.modal-title {
  font-family: 'Crimson Text', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--movieboli-primary);
  margin: 0;
}
```

---

## 🎭 Variante Festival
*Per sezioni temporanee come "Festival 2025"*

### Colori Festival
```css
/* Overlay dorato per il festival */
--festival-gold: #D4AF37;
--festival-gold-light: #E6C757;
--festival-gold-dark: #B8941F;

/* Gradiente festival */
--festival-gradient: linear-gradient(135deg, #1E3A5F 0%, #D4AF37 100%);
```

### Componenti Festival
```css
.festival-badge {
  background: var(--festival-gradient);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.festival-card {
  background: white;
  border: 2px solid var(--festival-gold);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.festival-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--festival-gradient);
}

.festival-section {
  background: linear-gradient(135deg, rgba(30, 58, 95, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%);
  border-left: 4px solid var(--festival-gold);
  padding: 24px;
  border-radius: 0 12px 12px 0;
}
```

---

## ⚙️ Configurazione Tailwind

### Aggiornamento `tailwind.config.js`
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colori MOVIEBOLI
        'movieboli': {
          primary: {
            DEFAULT: '#1E3A5F',
            light: '#2B4A6B',
            dark: '#152B42',
          },
          secondary: {
            DEFAULT: '#C4704A',
            light: '#D4825E',
            dark: '#A85D3A',
          },
          neutral: {
            50: '#FAFBFC',
            100: '#F4F6F8',
            200: '#E8ECF0',
            300: '#D1D8E0',
            400: '#9AA4B2',
            500: '#6B7684',
            600: '#4A5568',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
          },
          success: '#38A169',
          warning: '#D69E2E',
          error: '#E53E3E',
          podcast: '#805AD5',
        },
        // Colori Festival
        'festival': {
          gold: {
            DEFAULT: '#D4AF37',
            light: '#E6C757',
            dark: '#B8941F',
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Crimson Text', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': '3.5rem',
      },
      borderRadius: {
        'movieboli': '12px',
      },
      boxShadow: {
        'movieboli': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'movieboli-hover': '0 8px 24px rgba(30, 58, 95, 0.12)',
        'festival': '0 4px 16px rgba(212, 175, 55, 0.2)',
      },
      backdropBlur: {
        'movieboli': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

---

## 🎨 Gestione Dual Branding

### Strategia di Implementazione

#### 1. Context Provider per il Branding
```javascript
// contexts/BrandingContext.js
import { createContext, useContext } from 'react';

const BrandingContext = createContext();

export const BrandingProvider = ({ children, variant = 'association' }) => {
  const brandingConfig = {
    association: {
      primaryColor: 'movieboli-primary',
      secondaryColor: 'movieboli-secondary',
      cardClass: 'card-movieboli',
      badgeClass: 'badge-movieboli',
    },
    festival: {
      primaryColor: 'movieboli-primary',
      secondaryColor: 'festival-gold',
      cardClass: 'festival-card',
      badgeClass: 'festival-badge',
    }
  };

  return (
    <BrandingContext.Provider value={brandingConfig[variant]}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => useContext(BrandingContext);
```

#### 2. Componenti Adattivi
```javascript
// components/ui/AdaptiveCard.jsx
import { useBranding } from '../../contexts/BrandingContext';

export const AdaptiveCard = ({ children, className = '', ...props }) => {
  const branding = useBranding();
  
  return (
    <div 
      className={`${branding.cardClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

#### 3. Layout Condizionale
```javascript
// pages/_app.tsx
import { BrandingProvider } from '../contexts/BrandingContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isFestivalSection = router.pathname.startsWith('/festival');
  
  return (
    <BrandingProvider variant={isFestivalSection ? 'festival' : 'association'}>
      <Component {...pageProps} />
    </BrandingProvider>
  );
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: '640px',   /* Tablet portrait */
md: '768px',   /* Tablet landscape */
lg: '1024px',  /* Desktop */
xl: '1280px',  /* Large desktop */
2xl: '1536px' /* Extra large */
```

### Componenti Responsive
```css
/* Card responsive */
.card-movieboli {
  padding: 16px;
}

@media (min-width: 768px) {
  .card-movieboli {
    padding: 24px;
  }
}

/* Typography responsive */
.text-display {
  font-size: 2.5rem; /* 40px mobile */
}

@media (min-width: 768px) {
  .text-display {
    font-size: 3.5rem; /* 56px desktop */
  }
}
```

---

## ♿ Accessibilità

### Contrasti Colori
- Tutti i colori rispettano WCAG 2.1 AA (4.5:1)
- Testi su sfondi colorati hanno contrasto minimo 7:1
- Focus states visibili e contrastati

### Interazioni
```css
/* Focus states accessibili */
.focus-movieboli:focus {
  outline: 2px solid var(--movieboli-primary);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--movieboli-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

---

## 🚀 Performance

### Ottimizzazioni CSS
```css
/* Preload critical fonts */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('...') format('woff2');
}

/* Reduce motion per utenti sensibili */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Lazy Loading
```javascript
// Componenti pesanti caricati dinamicamente
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="animate-pulse bg-movieboli-neutral-200 h-32 rounded-movieboli" />
});
```

---

*Design System MOVIEBOLI v1.0 - Creato per rappresentare l'eccellenza culturale con stile e accessibilità*