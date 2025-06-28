# Assets

Questa cartella contiene tutti gli asset statici del progetto:

## Struttura

```
assets/
├── images/          # Immagini (loghi, foto, illustrazioni)
├── icons/           # Icone SVG
├── fonts/           # Font locali (se necessari)
└── videos/          # Video e media
```

## Linee Guida

### Immagini
- Usa formati moderni (WebP, AVIF) quando possibile
- Ottimizza le immagini per il web
- Usa nomi descrittivi per i file
- Mantieni una risoluzione appropriata per l'uso

### Icone
- Preferisci SVG per scalabilità
- Usa nomi consistenti
- Ottimizza il codice SVG

### Naming Convention
- Usa kebab-case per i nomi dei file
- Includi dimensioni se rilevanti
- Esempi:
  - `festival-logo.svg`
  - `hero-background-1920x1080.jpg`
  - `artist-placeholder-400x400.webp`

## Note

Per immagini che devono essere servite staticamente, usa la cartella `/public/` invece di `/assets/`.