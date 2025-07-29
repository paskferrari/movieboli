# 🔐 Sistema di Autenticazione MOVIEBOLI Festival 2025

Questo documento spiega come configurare e utilizzare il sistema di autenticazione per il Festival 2025.

## 📋 Panoramica

Il sistema di autenticazione include:
- **Registrazione e login utenti** con Supabase Auth
- **Protezione delle route** per le sezioni che richiedono autenticazione
- **Sistema di voto persistente** collegato agli utenti registrati
- **Interfaccia moderna** con modali e animazioni

## 🚀 Configurazione Iniziale

### 1. Configura Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un account
2. Crea un nuovo progetto
3. Vai su **Settings > API** e copia:
   - Project URL
   - Anon/Public Key

### 2. Configura le Variabili d'Ambiente

1. Copia il file `.env.local.example` in `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Modifica `.env.local` con i tuoi valori:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Configura il Database

1. Vai su **SQL Editor** in Supabase
2. Copia e incolla il contenuto di `supabase-setup.sql`
3. Esegui lo script

Questo creerà:
- Tabelle per profili utente e voti
- Policy di sicurezza (RLS)
- Trigger automatici
- Vista per statistiche voti

## 🏗️ Architettura del Sistema

### Componenti Principali

#### 1. **AuthContext** (`contexts/AuthContext.js`)
- Gestisce lo stato di autenticazione globale
- Fornisce funzioni per login, registrazione, logout
- Monitora i cambiamenti di sessione
- Supporta sistema di ruoli (user/admin)

#### 2. **AuthModal** (`components/auth/AuthModal.jsx`)
- Modal per login e registrazione
- Interfaccia moderna con animazioni
- Validazione form e gestione errori

#### 3. **ProtectedRoute** (`components/auth/ProtectedRoute.jsx`)
- Componente per proteggere le route
- Mostra modal di autenticazione se necessario
- Gestisce stati di caricamento

#### 4. **AdminRoute** (`components/auth/AdminRoute.jsx`)
- Componente per proteggere le route amministrative
- Verifica privilegi di amministratore
- Reindirizza utenti non autorizzati

#### 5. **Dashboard Amministrativa** (`components/admin/`)
- **AdminDashboard**: Componente principale della dashboard
- **FilmStatsCard**: Statistiche dettagliate per ogni film
- **UserStatsCard**: Gestione e analisi utenti
- **DemographicsChart**: Grafici demografici interattivi

#### 6. **Supabase Client** (`lib/supabase.js`)
- Configurazione client Supabase
- Funzioni per autenticazione e gestione voti
- Interfaccia semplificata per il database
- Modalità demo per testing senza database

### Flusso di Autenticazione

1. **Utente non autenticato** accede a `/festival/vota`
2. **ProtectedRoute** rileva mancanza di autenticazione
3. **AuthModal** si apre automaticamente
4. **Utente si registra/accede**
5. **Pagina si sblocca** e mostra il contenuto
6. **Voti vengono salvati** nel database collegati all'utente

### Registrazione

Il form di registrazione raccoglie:
- Nome e cognome
- Email
- Password (con conferma)
- Età (tra 13 e 120 anni)
- Sesso (Maschio, Femmina, Altro, Preferisco non rispondere)
- Ruolo (automaticamente impostato su 'user', 'admin' solo per amministratori)

I dati vengono salvati automaticamente nel profilo utente per analisi demografiche.

### Dashboard Amministrativa

La dashboard admin fornisce:
- **Panoramica Generale**: Statistiche totali di voti, utenti e età media
- **Analisi per Film**: Distribuzione voti e statistiche dettagliate per ogni cortometraggio
- **Gestione Utenti**: Visualizzazione, ricerca e ordinamento degli utenti registrati
- **Analisi Demografica**: Grafici interattivi su età e genere degli utenti
- **Accesso Limitato**: Solo utenti con ruolo 'admin' possono accedere

## 🎯 Utilizzo

### Proteggere una Route

```jsx
import ProtectedRoute from '../components/auth/ProtectedRoute'

function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Contenuto protetto</div>
    </ProtectedRoute>
  )
}
```

### Proteggere una Route Admin

```jsx
import AdminRoute from '../components/auth/AdminRoute'

function AdminPage() {
  return (
    <AdminRoute>
      <div>Contenuto solo per amministratori</div>
    </AdminRoute>
  )
}
```

### Utilizzare il Context di Autenticazione

```jsx
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth()
  
  if (isAuthenticated) {
    return (
      <div>
        <p>Benvenuto, {user.email}!</p>
        <button onClick={signOut}>Logout</button>
      </div>
    )
  }
  
  return <p>Non autenticato</p>
}
```

### Salvare un Voto

```jsx
import { saveVote } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

function VotingComponent() {
  const { user } = useAuth()
  
  const handleVote = async (filmId, rating) => {
    try {
      await saveVote(user.id, filmId, rating)
      console.log('Voto salvato!')
    } catch (error) {
      console.error('Errore:', error)
    }
  }
  
  // ...
}
```

## 🔒 Sicurezza

### Row Level Security (RLS)
- **Abilitato** su tutte le tabelle
- **Policy specifiche** per ogni operazione
- **Utenti possono accedere** solo ai propri dati

### Validazione
- **Lato client**: Validazione form in tempo reale
- **Lato server**: Constraint database e policy RLS
- **Sanitizzazione**: Input automaticamente sanitizzati da Supabase

## 📊 Gestione Voti

### Caratteristiche
- **Un voto per utente per film**
- **Voti modificabili** (upsert automatico)
- **Persistenza garantita** nel database
- **Backup locale** in localStorage
- **Statistiche aggregate** disponibili

### Struttura Database

```sql
-- Tabella profili utente
user_profiles (
  id UUID (riferimento a auth.users),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  age INTEGER CHECK (age >= 13 AND age <= 120),
  gender TEXT CHECK (gender IN ('M', 'F', 'Altro', 'Preferisco non rispondere')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Tabella voti
votes (
  id UUID,
  user_id UUID,
  film_id TEXT,
  rating INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Struttura Voto
```sql
CREATE TABLE votes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  film_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, film_id)
);
```

## 🎨 Interfaccia Utente

### Design System
- **Colori**: Palette MOVIEBOLI Festival 2025
- **Animazioni**: Framer Motion per transizioni fluide
- **Responsive**: Ottimizzato per mobile e desktop
- **Accessibilità**: Focus states e screen reader friendly

### Stati dell'Interfaccia
- **Loading**: Spinner durante autenticazione
- **Error**: Messaggi di errore chiari
- **Success**: Feedback positivo per azioni completate
- **Saving**: Indicatori di salvataggio in corso

## 🐛 Troubleshooting

### Errori Comuni

#### "Invalid API Key"
- Verifica le variabili d'ambiente in `.env.local`
- Assicurati che le chiavi siano corrette
- Riavvia il server di sviluppo

#### "Row Level Security Policy Violation"
- Verifica che le policy RLS siano configurate
- Controlla che l'utente sia autenticato
- Esegui nuovamente `supabase-setup.sql`

#### "User not authenticated"
- Verifica che `AuthProvider` sia configurato in `_app.tsx`
- Controlla che la sessione sia valida
- Prova a fare logout e login nuovamente

### Debug

```jsx
// Aggiungi questo per debug
const { user, session, loading } = useAuth()
console.log('Auth Debug:', { user, session, loading })
```

## 📈 Funzionalità Implementate

### Sistema di Autenticazione
- **Registrazione e Login**: Sistema completo con validazione
- **Protezione Route**: Accesso controllato alle sezioni sensibili
- **Sistema di Ruoli**: Supporto per utenti normali e amministratori
- **Raccolta Dati Demografici**: Età e genere per analisi

### Dashboard Amministrativa
- **Statistiche Generali**: Panoramica completa del sistema
- **Analisi per Film**: Distribuzione voti e medie per ogni cortometraggio
- **Gestione Utenti**: Ricerca, ordinamento e visualizzazione utenti
- **Grafici Demografici**: Analisi visuale di età e genere
- **Modalità Demo**: Testing completo senza database

### Sistema di Voto
- **Voto a Stelle**: Rating da 1 a 5 stelle
- **Persistenza**: Salvataggio sicuro nel database
- **Prevenzione Duplicati**: Un voto per utente per film
- **Statistiche Real-time**: Calcolo automatico di medie

## 📈 Prossimi Sviluppi

- **Email verification** per nuovi utenti
- **Password reset** via email
- **Social login** (Google, Facebook)
- **Profili utente estesi** con avatar
- **Esportazione dati** per analisi
- **Notifiche real-time** per amministratori

## 🔑 Accesso alle Sezioni

### Sezione Voto
Per accedere alla sezione di voto protetta:
1. Vai su `/festival/vota`
2. Se non sei autenticato, apparirà automaticamente il modal di login
3. Registrati o effettua il login
4. Una volta autenticato, potrai accedere alla sezione voto

### Dashboard Amministrativa
Per accedere alla dashboard admin:
1. Vai su `/admin`
2. Devi essere autenticato con un account che ha ruolo 'admin'
3. In modalità demo, usa `admin@movieboli.com` come email per testare
4. La dashboard include:
   - Panoramica generale con statistiche
   - Analisi dettagliate per ogni cortometraggio
   - Gestione e ricerca utenti
   - Grafici demografici interattivi

## 🧪 Testing in Modalità Demo

Per testare il sistema senza configurare Supabase:

1. Apri `lib/supabase.js`
2. Imposta `DEMO_MODE = true`
3. Riavvia il server di sviluppo
4. Usa le credenziali demo:
   - **Utente normale**: `demo@movieboli.com` (qualsiasi password)
   - **Amministratore**: `admin@movieboli.com` (qualsiasi password)

In modalità demo, tutti i dati sono simulati e non vengono salvati permanentemente.

### Test della Dashboard Admin
1. Effettua il login con `admin@movieboli.com`
2. Vai su `/admin` per accedere alla dashboard
3. Esplora le diverse sezioni: Panoramica, Cortometraggi, Utenti, Demografia
## 🤝 Supporto

Per problemi o domande:
1. Controlla che le variabili d'ambiente siano configurate correttamente
2. Verifica la configurazione Supabase
3. Consulta la [documentazione Supabase](https://supabase.com/docs)
4. Controlla i log del browser e del server
5. Testa in modalità demo per isolare problemi di configurazione

### Risoluzione Problemi Comuni

#### Errore "infinite recursion detected in policy"
Se vedi questo errore quando accedi alla dashboard admin:
1. Il problema è nelle policy RLS che creano ricorsione
2. Assicurati che le policy admin usino `auth.jwt()` invece di query alla tabella
3. Verifica che il ruolo sia salvato nei `user_metadata` durante la registrazione
4. Riesegui lo script SQL aggiornato in Supabase