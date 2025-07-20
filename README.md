# MOVIEBOLI - Festival del Cinema e Podcast

Associazione culturale MOVIEBOLI - Sito web ufficiale del Festival del Cinema e Podcast Ciliegie.

## 🚀 Deploy su Vercel

### Prerequisiti
- Account Vercel
- Repository GitHub collegato

### Configurazione Deploy

1. **Collega il repository a Vercel:**
   - Vai su [vercel.com](https://vercel.com)
   - Importa il progetto da GitHub
   - Seleziona questo repository

2. **Configurazioni automatiche:**
   - Framework: Next.js (rilevato automaticamente)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

3. **Variabili d'ambiente (opzionali):**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_PWA_ENABLED=true
   ```

### Ottimizzazioni per Vercel

✅ **Configurazioni implementate:**
- `vercel.json` configurato per ottimizzazioni
- Next.js config ottimizzato per Vercel
- PWA configurata correttamente
- Caching headers per performance
- Image optimization abilitata
- Build verificato e funzionante

## Caratteristiche

- **Next.js 14** con TypeScript
- **TailwindCSS** per lo styling
- **Google Fonts** integrati (Bebas Neue, Staatliches, Unica One)
- **SEO ottimizzato** con meta tag completi
- **Localizzazione italiana** (it-IT)
- **Design responsive** con approccio mobile-first
- **Palette colori personalizzata** per il branding del festival
- **Struttura modulare dei componenti**
- **Animazioni avanzate** e transizioni

## 🚀 Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd MoviEboli
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   # oppure
   yarn install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   # oppure
   yarn dev
   ```

4. **Apri il browser**
   Vai su [http://localhost:3000](http://localhost:3000)

## 📁 Struttura del Progetto

```
MoviEboli/
├── components/          # Componenti React riutilizzabili
│   ├── layout/         # Componenti di layout (Header, Footer)
│   ├── sections/       # Sezioni della pagina (Hero, etc.)
│   └── ui/            # Componenti UI base (Button, etc.)
├── pages/              # Pagine Next.js con routing automatico
│   ├── _app.tsx       # App wrapper principale
│   ├── _document.tsx  # Document HTML personalizzato
│   └── index.tsx      # Homepage
├── styles/             # File CSS e styling
│   └── globals.css    # Stili globali e TailwindCSS
├── lib/               # Utility e helper functions
├── assets/            # Immagini, icone e altri asset
├── public/            # File statici pubblici
└── next.config.js     # Configurazione Next.js
```

## 🎯 Pagine Disponibili

- **Homepage** (`/`) - Pagina principale con hero section
- **Programma** (`/programma`) - Programma del festival
- **Artisti** (`/artisti`) - Lineup degli artisti
- **Info** (`/info`) - Informazioni generali
- **Contatti** (`/contatti`) - Pagina contatti

## 🎨 Design System

### Colori
- **Primary**: `#FF6B35` (Arancione festival)
- **Secondary**: `#F7931E` (Arancione secondario)
- **Accent**: `#FFD23F` (Giallo accento)
- **Dark**: `#1A1A1A` (Nero scuro)
- **Light**: `#F8F9FA` (Grigio chiaro)

### Typography
- **Headings**: Bebas Neue (sans-serif)
- **Display**: Staatliches (cursive)
- **Body**: Unica One (cursive)

### Breakpoints
- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🛠 Scripts Disponibili

```bash
# Sviluppo
npm run dev

# Build di produzione
npm run build

# Avvia server di produzione
npm run start

# Linting
npm run lint
```

## 📱 Responsive Design

Il sito è completamente responsive e ottimizzato per:
- **Mobile** (320px - 767px)
- **Tablet** (768px - 1023px)
- **Desktop** (1024px+)

## 🔧 Personalizzazione

### Colori del Festival
Modifica i colori in `tailwind.config.js`:

```javascript
colors: {
  festival: {
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#FFD23F',
    // ...
  },
}
```

### Font
I font sono importati in `styles/globals.css` e configurati in `tailwind.config.js`.

## 🚀 Deploy

### Vercel (Raccomandato)
1. Connetti il repository a Vercel
2. Deploy automatico ad ogni push

### Altri Provider
```bash
npm run build
npm run start
```

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Per favore:
1. Fai un fork del progetto
2. Crea un branch per la tua feature
3. Commit le tue modifiche
4. Push al branch
5. Apri una Pull Request

## 📞 Supporto

Per supporto o domande, contatta il team di sviluppo.

---

**Festival Artistico MoviEboli** - Arte, Cultura e Spettacolo