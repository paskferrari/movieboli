# Guida all'Uso del Design System MOVIEBOLI

## 🚀 Introduzione

Questo documento spiega come utilizzare il nuovo design system MOVIEBOLI nel progetto. Il sistema supporta il **dual branding** tra l'associazione culturale e il festival temporaneo.

---

## 📁 Struttura dei File

```
├── MOVIEBOLI_DESIGN_SYSTEM.md     # Documentazione completa del design system
├── contexts/
│   └── BrandingContext.js          # Context per gestione dual branding
├── components/ui/
│   ├── AdaptiveCard.jsx            # Card adattive
│   └── Button.jsx                  # Pulsanti adattivi
├── styles/
│   └── movieboli-design-system.css # Classi CSS del design system
└── tailwind.config.js              # Configurazione aggiornata
```

---

## 🎨 Utilizzo dei Colori

### Associazione (Principale)
```jsx
// Colori primari
className="bg-movieboli-primary text-white"
className="text-movieboli-secondary"

// Colori neutri
className="bg-movieboli-neutral-100"
className="text-movieboli-neutral-700"

// Colori funzionali
className="text-movieboli-success"  // Verde
className="text-movieboli-error"    // Rosso
className="text-movieboli-podcast"  // Viola
```

### Festival (Temporaneo)
```jsx
// Colori festival
className="bg-festival-gold text-white"
className="festival-gradient"  // Gradiente blu-oro

// Compatibilità con colori esistenti
className="bg-movieboli-festival-primario1"  // Viola festival
className="bg-movieboli-festival-sfondo"     // Rosa festival
```

---

## 🔤 Tipografia

### Font Families
```jsx
// Font principale (Inter) - UI e navigazione
className="font-sans"

// Font secondario (Crimson Text) - Titoli editoriali
className="font-serif"

// Font festival (Poppins) - Compatibilità
className="font-poppins"
```

### Dimensioni Testo
```jsx
className="text-display"    // 56px - Hero titles
className="text-h1"         // 40px - Page titles
className="text-h2"         // 32px - Section titles
className="text-lg"         // 18px - Lead text
className="text-base"       // 16px - Body text
```

---

## 🧩 Componenti UI

### Pulsanti
```jsx
import Button from '../components/ui/Button';

// Pulsante primario
<Button variant="primary">Azione Principale</Button>

// Pulsante secondario
<Button variant="secondary">Azione Secondaria</Button>

// Pulsante terracotta (CTA speciali)
<Button variant="terracotta">Scopri di più</Button>

// Pulsante festival (adattivo)
<Button variant="festival">Festival 2025</Button>

// Con icona
<Button icon={<span>📧</span>} iconPosition="left">
  Contattaci
</Button>

// Come link
<Button href="/chi-siamo" variant="primary">
  Chi Siamo
</Button>
```

### Cards
```jsx
import { AdaptiveCard, EventCard, PodcastCard } from '../components/ui/AdaptiveCard';

// Card base adattiva
<AdaptiveCard>
  <h3>Titolo</h3>
  <p>Contenuto della card</p>
</AdaptiveCard>

// Card per eventi
<EventCard 
  title="Nome Evento"
  date="15 Marzo 2025"
  description="Descrizione dell'evento"
  category="Cinema"
  onClick={() => console.log('Evento cliccato')}
/>

// Card per podcast
<PodcastCard 
  title="Titolo Episodio"
  episode="12"
  duration="45 min"
  description="Descrizione episodio"
  publishDate="10 Marzo 2025"
/>
```

### Form Elements
```jsx
// Input
<input className="form-input" placeholder="Il tuo nome" />

// Textarea
<textarea className="form-textarea" placeholder="Il tuo messaggio" />

// Select
<select className="form-select">
  <option>Seleziona opzione</option>
</select>

// Label
<label className="form-label">Nome completo</label>

// Messaggio di errore
<p className="form-error">Campo obbligatorio</p>
```

---

## 🎭 Dual Branding

### Context Provider
Il `BrandingProvider` rileva automaticamente la sezione e applica il branding corretto:

```jsx
import { useBranding, useBrandingClasses } from '../contexts/BrandingContext';

function MyComponent() {
  const branding = useBranding();
  const classes = useBrandingClasses();
  
  return (
    <div className={classes.card}>
      <h2 className={classes.textPrimary}>
        {branding.name}
      </h2>
      
      {branding.isFestival() && (
        <span className="festival-badge">Festival 2025</span>
      )}
    </div>
  );
}
```

### Sezioni con Branding Specifico
```jsx
import { BrandingSection } from '../contexts/BrandingContext';

// Forza il branding festival in una sezione
<BrandingSection variant="festival">
  <h2>Contenuto con stile Festival</h2>
  <Button variant="primary">Pulsante Festival</Button>
</BrandingSection>

// Torna al branding associazione
<BrandingSection variant="association">
  <h2>Contenuto con stile Associazione</h2>
</BrandingSection>
```

### Percorsi Automatici
Il sistema rileva automaticamente il branding in base al percorso:

- **Festival**: `/festival`, `/programma`, `/prenota`, `/vota`, `/artisti`, `/turni-impp`
- **Associazione**: tutti gli altri percorsi

---

## 🎨 Classi CSS Utility

### Componenti Predefiniti
```css
/* Pulsanti */
.btn-primary
.btn-secondary
.btn-terracotta
.btn-ghost

/* Cards */
.card-movieboli
.card-podcast
.festival-card

/* Navbar */
.navbar-movieboli
.navbar-link

/* Form */
.form-input
.form-label
.form-error

/* Modali */
.modal-overlay
.modal-content
.modal-title
```

### Badge e Tags
```css
.badge-movieboli      /* Badge neutro */
.badge-primary        /* Badge primario */
.badge-secondary      /* Badge secondario */
.badge-podcast        /* Badge podcast */
.festival-badge       /* Badge festival */
```

### Effetti e Animazioni
```css
.hover-lift           /* Solleva al hover */
.hover-scale          /* Scala al hover */
.loading-skeleton     /* Skeleton loading */
.glass-movieboli      /* Effetto vetro */
```

---

## 📱 Responsive Design

### Breakpoints
```jsx
// Mobile first approach
sm: '640px'   // Tablet portrait
md: '768px'   // Tablet landscape  
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

### Esempi Responsive
```jsx
className="text-2xl md:text-4xl lg:text-display"
className="p-4 md:p-6 lg:p-8"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## ♿ Accessibilità

### Focus States
```jsx
className="focus-movieboli"  // Focus accessibile
```

### Skip Links
```jsx
<a href="#main-content" className="skip-link">
  Salta al contenuto principale
</a>
```

### Contrasti
Tutti i colori rispettano WCAG 2.1 AA (4.5:1 minimo).

---

## 🚀 Esempi Pratici

### Homepage Associazione
```jsx
import AssociationHero from '../components/homepage/AssociationHero';

function HomePage() {
  return (
    <div>
      <AssociationHero />
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 font-serif text-movieboli-primary mb-8">
            Le nostre attività
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdaptiveCard>
              <h3 className="text-h4 font-serif mb-4">Cinema</h3>
              <p>Proiezioni e rassegne cinematografiche</p>
            </AdaptiveCard>
            
            <AdaptiveCard variant="podcast">
              <h3 className="text-h4 text-white mb-4">Podcast</h3>
              <p className="text-white/90">Ciliegie - Il nostro podcast</p>
            </AdaptiveCard>
            
            <AdaptiveCard>
              <h3 className="text-h4 font-serif mb-4">Eventi</h3>
              <p>Incontri culturali e formativi</p>
            </AdaptiveCard>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Pagina Festival
```jsx
function FestivalPage() {
  const branding = useBranding();
  
  return (
    <div>
      {/* Hero con branding festival automatico */}
      <section className="festival-gradient py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <span className="festival-badge mb-4">Festival 2025</span>
          <h1 className="text-display font-serif mb-6">
            MOVIEBOLI Festival
          </h1>
          <Button variant="terracotta" size="lg">
            Scopri il Programma
          </Button>
        </div>
      </section>
      
      {/* Contenuto con card festival */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventCard 
              title="Film di Apertura"
              date="20 Marzo 2025"
              category="Anteprima"
              variant="festival"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 🔧 Personalizzazione

### Estendere i Colori
```javascript
// tailwind.config.js
colors: {
  movieboli: {
    // Aggiungi nuovi colori
    custom: '#YOUR_COLOR',
  }
}
```

### Nuove Varianti Componenti
```jsx
// Estendi AdaptiveCard
<AdaptiveCard variant="custom" className="bg-custom-color">
  Contenuto personalizzato
</AdaptiveCard>
```

---

## 📋 Checklist Implementazione

- [ ] Importare il CSS del design system in `_app.tsx`
- [ ] Wrappare l'app con `BrandingProvider`
- [ ] Sostituire i pulsanti esistenti con il componente `Button`
- [ ] Convertire le card esistenti in `AdaptiveCard`
- [ ] Aggiornare i colori usando la nuova palette
- [ ] Testare il dual branding su percorsi festival
- [ ] Verificare l'accessibilità con screen reader
- [ ] Ottimizzare le performance (font loading, CSS)

---

## 🆘 Risoluzione Problemi

### Errore: "useBranding must be used within BrandingProvider"
**Soluzione**: Assicurati che il componente sia wrappato nel `BrandingProvider`.

### Stili non applicati
**Soluzione**: Verifica che `movieboli-design-system.css` sia importato in `_app.tsx`.

### Font non caricati
**Soluzione**: Controlla i link di preconnessione a Google Fonts in `_app.tsx`.

---

*Design System MOVIEBOLI - Versione 1.0*