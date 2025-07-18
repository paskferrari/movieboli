# 🎬 MOVIEBOLI Festival - Guida Stile Globale

## 🎨 Palette Colori Ufficiale

### Colori Principali
```css
/* Palette MOVIEBOLI Personalizzata */
rosaPastello: #f7bbc6     /* Sfondo principale rosa tenue */
violaPrincipale: #7968fa  /* Colore principale viola */
violaSecondario: #5b41e2  /* Viola secondario più scuro */
bordoauxCinema: #32080a   /* Bordeaux molto scuro */
neroProfondo: #1d0907     /* Nero profondo */
verdeScuro: #191f1a       /* Verde molto scuro */
verdeMatcha: #1b390a      /* Verde matcha scuro */
gialloVintage: #c3983a    /* Giallo vintage dorato */
gialloChiaro: #ebbf72     /* Giallo chiaro */
rossoTerra: #c65636       /* Rosso terra */
violaHighlight: #ddcaf0   /* Viola chiaro per highlights */
violaHighlight2: #e1c2f2  /* Viola ancora più chiaro */
```

### Utilizzo Colori
- **Rosa Pastello**: Bottoni primari, accenti, hover states
- **Nero Profondo**: Testi, sfondi scuri, contrasti
- **Bordeaux Cinema**: Accenti eleganti, sezioni speciali
- **Crema Chiaro**: Background principale, card chiare
- **Verde Matcha**: Elementi naturali, stati success
- **Giallo Vintage**: Footer, link, elementi decorativi

## 🔤 Tipografia

### Font Principale: Poppins
- **Pesi disponibili**: 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Utilizzo**: Tutto il sito usa esclusivamente Poppins
- **Gerarchia**:
  - H1: `text-4xl md:text-5xl lg:text-6xl font-bold`
  - H2: `text-3xl md:text-4xl lg:text-5xl font-bold`
  - H3: `text-2xl md:text-3xl lg:text-4xl font-bold`
  - Body: `font-normal text-responsive`

## 🎯 Componenti Base

### Bottoni
```jsx
// Bottone Primario (Rosa su Nero)
<button className="btn-primary">
  Prenota ora
</button>

// Bottone Secondario (Nero su Rosa)
<button className="btn-secondary">
  Scopri di più
</button>

// Bottone Accent (Bordeaux/Giallo)
<button className="btn-accent">
  Vota ora
</button>
```

### Layout Sezioni
```jsx
// Hero Section
<section className="section-hero">
  <div className="container-movieboli">
    {/* Contenuto hero */}
  </div>
</section>

// Sezione Scura
<section className="section-contrast-dark section-padding">
  <div className="container-movieboli">
    {/* Contenuto */}
  </div>
</section>

// Sezione Chiara
<section className="section-contrast-light section-padding">
  <div className="container-movieboli">
    {/* Contenuto */}
  </div>
</section>

// Sezione Accent (Rosa)
<section className="section-accent section-padding">
  <div className="container-movieboli">
    {/* Contenuto */}
  </div>
</section>
```

### Card Cinematografiche
```jsx
// Card Standard
<div className="card-movieboli hover-lift">
  <h3>Titolo Film</h3>
  <p>Descrizione...</p>
</div>

// Card Scura
<div className="card-dark hover-glow">
  <h3>Titolo Evento</h3>
  <p>Descrizione...</p>
</div>
```

## 🎭 Navbar e Footer

### Navbar
```jsx
// Navbar Standard
<nav className="navbar-movieboli">
  {/* Contenuto navbar */}
</nav>

// Navbar Trasparente (per Hero)
<nav className="navbar-transparent">
  {/* Contenuto navbar */}
</nav>
```

### Footer
```jsx
<footer className="footer-movieboli section-padding">
  <div className="container-movieboli">
    <a href="#" className="footer-link">Link</a>
  </div>
</footer>
```

## ✨ Animazioni e Effetti

### Animazioni di Entrata
```jsx
// Fade in dal basso
<div className="animate-fade-in-up animation-delay-200">
  Contenuto
</div>

// Slide da sinistra
<div className="animate-slide-in-left animation-delay-400">
  Contenuto
</div>
```

### Effetti Hover
```jsx
// Sollevamento
<div className="hover-lift">
  Contenuto
</div>

// Glow rosa
<div className="hover-glow">
  Contenuto
</div>
```

## 📱 Responsive Design

### Breakpoints
- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Utility Responsive
```jsx
// Testo responsive
<p className="text-responsive">Testo normale</p>
<h2 className="text-responsive-lg">Titolo grande</h2>

// Padding responsive automatico
<section className="section-padding">
  {/* py-12 md:py-20 lg:py-28 px-6 md:px-8 lg:px-12 */}
</section>
```

## 🎬 Gradienti Cinematografici

```jsx
// Gradiente Hero (Nero-Bordeaux-Nero)
<div className="gradient-hero">
  Contenuto
</div>

// Gradiente Accent (Rosa-Giallo)
<div className="gradient-accent">
  Contenuto
</div>

// Testo con gradiente
<h1 className="text-gradient-movieboli">
  MOVIEBOLI Festival
</h1>
```

## ⚡ Performance

### Ottimizzazioni Automatiche
- Tutte le transizioni sono GPU-accelerated
- Scroll fluido abilitato globalmente
- Will-change applicato automaticamente
- Lazy loading per immagini

### Utility Performance
```jsx
// Accelerazione GPU manuale
<div className="gpu-accelerated">
  Contenuto
</div>

// Will-change specifico
<div className="will-change-transform">
  Elemento animato
</div>
```

## 🎯 Esempi Pratici

### Pagina Completa
```jsx
export default function PaginaFestival() {
  return (
    <>
      {/* Hero */}
      <section className="section-hero">
        <div className="container-movieboli text-center">
          <h1 className="text-gradient-movieboli animate-fade-in-up">
            MOVIEBOLI Festival 2024
          </h1>
          <p className="text-movieboli-cremaChiaro text-responsive-lg animate-fade-in-up animation-delay-200">
            Cinema, Arte e Cultura
          </p>
          <button className="btn-primary animate-fade-in-up animation-delay-400">
            Scopri il Programma
          </button>
        </div>
      </section>

      {/* Sezione Film */}
      <section className="section-contrast-light section-padding">
        <div className="container-movieboli">
          <h2 className="text-center mb-12">Film in Concorso</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film, index) => (
              <div key={film.id} className={`card-movieboli hover-lift animate-fade-in-up animation-delay-${index * 200}`}>
                <h3>{film.title}</h3>
                <p className="text-responsive">{film.description}</p>
                <button className="btn-secondary mt-4">
                  Dettagli
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-accent section-padding">
        <div className="container-movieboli text-center">
          <h2>Partecipa al Festival</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <button className="btn-primary">
              Prenota Biglietti
            </button>
            <button className="btn-accent">
              Vota i Corti
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
```

---

## 🚀 Quick Start

1. **Importa gli stili**: Già configurato in `globals.css`
2. **Usa i componenti**: Applica le classi CSS predefinite
3. **Mantieni coerenza**: Usa sempre la palette MOVIEBOLI
4. **Testa responsive**: Verifica su mobile, tablet, desktop
5. **Ottimizza performance**: Usa le utility di performance

**Ricorda**: Ogni elemento deve essere cinematografico, femminile-contemporaneo e indie-pop! 🎬✨