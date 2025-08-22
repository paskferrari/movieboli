# Configurazione Supabase per MovieBoli

Questo documento spiega come configurare Supabase per il progetto MovieBoli.

## Errore: "supabaseUrl is required"

Se vedi questo errore, significa che le variabili di ambiente di Supabase non sono configurate.

## Soluzione Rapida

### 1. Crea un account Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea un account gratuito
3. Crea un nuovo progetto

### 2. Ottieni le credenziali

1. Nel dashboard del tuo progetto Supabase
2. Vai su **Settings** → **API**
3. Copia:
   - **Project URL** (es. `https://abcdefgh.supabase.co`)
   - **anon public key** (inizia con `eyJ...`)
   - **service_role key** (inizia con `eyJ...`)

### 3. Configura le variabili di ambiente

1. Apri il file `.env.local` nella root del progetto
2. Sostituisci i valori placeholder:

```env
# Sostituisci con i tuoi valori reali
NEXT_PUBLIC_SUPABASE_URL=https://tuoprogetto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### 4. Crea le tabelle del database

1. Nel dashboard Supabase, vai su **SQL Editor**
2. Esegui il file `structure_supabase-setup.sql` che trovi nella root del progetto
3. Questo creerà tutte le tabelle necessarie

### 5. Popola i dati iniziali (opzionale)

1. Avvia il server di sviluppo: `npm run dev`
2. Vai su `http://localhost:3000/api/podcast/seed` per popolare i dati dei podcast

## Modalità Demo

Se non vuoi configurare Supabase subito, il sito funziona in modalità demo con dati fittizi.
In modalità demo:
- ✅ Navigazione del sito
- ✅ Visualizzazione contenuti
- ❌ Autenticazione reale
- ❌ Votazioni persistenti
- ❌ Prenotazioni podcast

## Risoluzione Problemi

### Errore: "Invalid API key"
- Verifica che la chiave API sia copiata correttamente
- Assicurati di usare la chiave `anon public` per `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Errore: "Project not found"
- Verifica che l'URL del progetto sia corretto
- Assicurati che il progetto Supabase sia attivo

### Il sito non si carica
- Riavvia il server di sviluppo: `npm run dev`
- Controlla la console del browser per errori

## Supporto

Per ulteriore assistenza:
1. Controlla la [documentazione Supabase](https://supabase.com/docs)
2. Verifica che tutte le variabili di ambiente siano configurate correttamente
3. Assicurati che il progetto Supabase sia attivo e accessibile