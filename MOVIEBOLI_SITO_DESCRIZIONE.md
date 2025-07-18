# 🎬 MOVIEBOLI - Descrizione Dettagliata del Sito

## 📋 Panoramica del Progetto

Il sito web MOVIEBOLI è una piattaforma digitale completa che rappresenta l'identità duale dell'organizzazione: da un lato l'**Associazione Culturale MOVIEBOLI**, attiva tutto l'anno con iniziative culturali, e dall'altro il **Festival Cinematografico MOVIEBOLI**, evento temporaneo annuale. Il design system implementato supporta elegantemente questa dualità, offrendo un'esperienza utente coerente ma distintiva per entrambe le anime del progetto.

## 🎨 Identità Visiva

### Dual Branding

Il sito implementa un sofisticato sistema di **dual branding** che alterna automaticamente due identità visive distinte ma complementari:

#### 🏛️ Associazione Culturale (Branding Principale)
- **Palette**: Blu culturale (#1E3A5F) come colore primario, Terracotta creativa (#C4704A) come secondario
- **Stile**: Elegante, professionale, editoriale
- **Tono**: Istituzionale ma accessibile

#### 🎭 Festival Cinematografico (Branding Temporaneo)
- **Palette**: Mantiene il blu come base ma introduce l'oro festival (#D4AF37) come accento distintivo
- **Stile**: Più vivace, cinematografico, con elementi decorativi dorati
- **Tono**: Celebrativo, artistico, coinvolgente

Il sistema rileva automaticamente in quale sezione si trova l'utente e applica il branding appropriato, creando una transizione fluida tra le due identità.

### Palette Colori Completa

#### Colori Principali
- **Blu Culturale** (#1E3A5F): Colore primario dell'associazione, comunica professionalità e stabilità
- **Terracotta Creativa** (#C4704A): Colore secondario, aggiunge calore e creatività
- **Oro Festival** (#D4AF37): Accento speciale per le sezioni festival, evoca prestigio e celebrazione
- **Viola Podcast** (#805AD5): Colore distintivo per la sezione podcast "Ciliegie"

#### Colori Neutri
- Una scala di grigi editoriali dal bianco al nero profondo, con sfumature intermedie per creare gerarchia visiva

#### Colori Funzionali
- **Verde Successo** (#38A169): Per conferme e stati positivi
- **Ambra Attenzione** (#D69E2E): Per avvisi e stati di cautela
- **Rosso Errore** (#E53E3E): Per errori e stati negativi

### Tipografia Editoriale

Il sistema tipografico combina due font complementari:

- **Inter**: Font sans-serif moderno per UI, navigazione e testi brevi
  - Pesi: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - Utilizzo: Interfaccia utente, navigazione, pulsanti, testi brevi

- **Crimson Text**: Font serif elegante per titoli editoriali e contenuti lunghi
  - Pesi: 400 (Regular), 600 (SemiBold), 400 Italic
  - Utilizzo: Titoli principali, citazioni, contenuti editoriali lunghi

La gerarchia tipografica è strutturata con una scala precisa:
- Display: 3.5rem (56px) - Titoli hero
- H1: 2.5rem (40px) - Titoli pagina
- H2: 2rem (32px) - Titoli sezione
- H3: 1.5rem (24px) - Titoli sottosezione
- H4: 1.25rem (20px) - Titoli card
- Testo grande: 1.125rem (18px) - Testi introduttivi
- Testo base: 1rem (16px) - Corpo del testo
- Testo piccolo: 0.875rem (14px) - Note, didascalie

## 🧩 Componenti UI

Il sito utilizza un sistema di componenti modulari e riutilizzabili:

### Pulsanti
- **Primario**: Sfondo blu con testo bianco, per azioni principali
- **Secondario**: Bordo blu con testo blu, per azioni secondarie
- **Terracotta**: Sfondo terracotta con testo bianco, per CTA speciali
- **Festival**: Sfondo oro con testo scuro, per azioni nelle sezioni festival

Ogni pulsante supporta varianti di dimensione, icone e stati (hover, focus, disabled).

### Card
- **AdaptiveCard**: Card base che si adatta al contesto di branding
- **EventCard**: Per eventi, con data, categoria e descrizione
- **PodcastCard**: Per episodi podcast, con numero, durata e data
- **FestivalCard**: Per contenuti festival, con bordo dorato e accenti speciali

Le card presentano effetti di hover eleganti come sollevamento e ombre sottili.

### Navigazione
- **Navbar**: Barra di navigazione adattiva con indicatori di sezione
- **Footer**: Piè di pagina completo con sezioni informative e link utili
- **Breadcrumb**: Percorso di navigazione per sezioni profonde

### Form Elements
- Input, textarea, select con stili coerenti
- Messaggi di errore e validazione
- Checkbox e radio button personalizzati

### Badge e Tag
- Badge per categorie, stati e indicatori
- Tag festival per evidenziare contenuti speciali

## 📱 Layout e Responsive Design

Il sito adotta un approccio **mobile-first** con breakpoint accuratamente definiti:

- **Mobile**: < 640px
- **Tablet Portrait**: 640px
- **Tablet Landscape**: 768px
- **Desktop**: 1024px
- **Large Desktop**: 1280px

Ogni componente e layout è progettato per adattarsi fluidamente a tutte le dimensioni dello schermo, garantendo un'esperienza ottimale su qualsiasi dispositivo.

### Struttura delle Pagine

#### Homepage Associazione
1. **Hero Section**: Presentazione dell'associazione con immagine di sfondo e CTA
2. **Attività**: Grid di card che mostrano le principali attività
3. **Festival Teaser**: Anteprima del prossimo festival con countdown
4. **Podcast**: Sezione dedicata al podcast "Ciliegie"
5. **Chi Siamo**: Breve presentazione del team
6. **Contatti**: Form di contatto e informazioni

#### Homepage Festival
1. **Hero Festival**: Grande visual con date e tema del festival
2. **Programma**: Calendario eventi con filtri per categoria
3. **Film in Concorso**: Slider di card con i film selezionati
4. **Prenotazione**: Sistema di prenotazione biglietti
5. **Votazione**: Interfaccia per votare i film preferiti
6. **Partner**: Loghi e informazioni sponsor

## ✨ Animazioni ed Effetti

Il sito implementa animazioni sottili ma efficaci per migliorare l'esperienza utente:

### Animazioni di Entrata
- Fade in dal basso per elementi al caricamento della pagina
- Slide da sinistra per elementi in sequenza
- Stagger effect per liste di card

### Effetti Hover
- Sollevamento (hover-lift) per card e elementi interattivi
- Glow sottile per elementi festival
- Transizioni fluide per pulsanti e link

### Effetti Speciali
- Effetto vetro (glass-movieboli) per overlay e modali
- Gradienti cinematografici per sfondi speciali
- Testo con gradiente per titoli importanti

Tutte le animazioni sono ottimizzate per le performance e rispettano le preferenze utente (reduced motion).

## 🎭 Sezioni Principali

### Associazione Culturale

#### Chi Siamo
Presentazione dell'associazione, della sua storia e missione, con profili del team e timeline degli eventi significativi.

#### Attività
Panoramica delle attività culturali organizzate durante l'anno, con filtri per categoria (cinema, formazione, eventi).

#### Podcast "Ciliegie"
Sezione dedicata al podcast dell'associazione, con player integrato, archivio episodi e possibilità di iscrizione.

#### Memoria Carta
Archivio digitale di documenti storici, manifesti e programmi delle passate edizioni, consultabile con filtri.

### Festival Cinematografico

#### Programma
Calendario dettagliato degli eventi del festival, con filtri per data, luogo e categoria, e possibilità di aggiungere eventi al proprio calendario.

#### Prenota
Sistema di prenotazione biglietti con selezione evento, numero posti e conferma via email.

#### Vota
Interfaccia per votare i film in concorso, con autenticazione semplice e visualizzazione risultati in tempo reale.

#### Artisti
Presentazione dei registi, attori e professionisti ospiti del festival, con bio e opere.

## ⚡ Performance e Accessibilità

### Ottimizzazioni Performance
- Lazy loading per immagini e componenti pesanti
- Font display swap per caricamento ottimizzato dei font
- Transizioni GPU-accelerated per animazioni fluide
- Code splitting per caricamento più veloce delle pagine

### Accessibilità
- Contrasti WCAG 2.1 AA compliant per tutti i testi
- Focus states visibili e ben definiti
- Skip links per navigazione da tastiera
- Attributi ARIA per screen reader
- Supporto per reduced motion

## 🚀 Funzionalità Tecniche

### PWA (Progressive Web App)
- Installabile su dispositivi mobili e desktop
- Funzionalità offline per contenuti essenziali
- Notifiche push per eventi imminenti (opzionale)

### Integrazione Social
- Condivisione facilitata di eventi e contenuti
- Feed Instagram integrato nella homepage
- Embed di video da YouTube/Vimeo per trailer e contenuti

### Multilingua
- Supporto per italiano (principale) e inglese (secondario)
- Switcher di lingua accessibile nel footer

## 🎯 Esperienza Utente

### Percorsi Utente Principali

1. **Visitatore Occasionale**
   - Scoperta dell'associazione → Esplorazione attività → Iscrizione newsletter

2. **Appassionato di Cinema**
   - Informazioni festival → Programma → Prenotazione biglietti → Votazione

3. **Studente/Professionista**
   - Sezione formazione → Iscrizione workshop → Materiali didattici

4. **Partner/Sponsor**
   - Chi siamo → Risultati passate edizioni → Form contatto

### Micro-interazioni

Il sito è arricchito da micro-interazioni che migliorano l'esperienza:
- Feedback visivi su azioni utente
- Tooltip informativi su elementi complessi
- Stati di loading personalizzati
- Transizioni tra pagine fluide

## 🔮 Evoluzione Futura

### Roadmap Sviluppo

1. **Fase 1 (Completata)**
   - Design system completo
   - Struttura base del sito
   - Sezioni associazione e festival

2. **Fase 2 (In corso)**
   - Sistema di prenotazione avanzato
   - Archivio digitale completo
   - Ottimizzazioni performance

3. **Fase 3 (Pianificata)**
   - Area membri con contenuti esclusivi
   - Integrazione e-commerce per merchandising
   - Espansione sezione podcast

## 🎬 Conclusione

Il sito MOVIEBOLI rappresenta un equilibrio perfetto tra estetica cinematografica, funzionalità moderna e accessibilità. La sua struttura duale permette di servire efficacemente sia l'associazione culturale permanente che il festival temporaneo, offrendo un'esperienza utente coerente ma distintiva per entrambe le anime del progetto.

Il design system implementato garantisce coerenza visiva, facilità di manutenzione e scalabilità futura, permettendo al sito di evolversi insieme all'organizzazione mantenendo sempre la sua identità distintiva.

Ogni elemento del sito è stato progettato con attenzione ai dettagli, dalla tipografia alla palette colori, dalle animazioni all'accessibilità, creando un'esperienza digitale che riflette perfettamente i valori culturali e artistici di MOVIEBOLI.

---

*MOVIEBOLI - Associazione Culturale & Festival Cinematografico*