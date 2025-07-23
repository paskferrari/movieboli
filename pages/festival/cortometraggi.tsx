import FestivalPage from './FestivalPage';
import { GetStaticProps } from 'next';
import { readFileSync } from 'fs';
import path from 'path';
import React from 'react';

// Interfaccia per i dati del cortometraggio
export interface Cortometraggio {
  titolo: string;
  regista: string;
  durata: string;
  sinossi: string;
  immagine: string;
  folderPath?: string;
  anno?: string;
  trailer?: string;
  bioRegista?: string;
  biografia_regista?: string;
  link?: string;
  bio?: string;
  id?: string;
  sbloccato: boolean; // Aggiungi questa proprietà
}

// Interfaccia per le props della pagina
export interface FestivalPageProps {
  cortometraggi: Cortometraggio[];
  error?: string | null;
}

// Componente principale della pagina
const CortometraggiPage = ({ cortometraggi, error }: FestivalPageProps) => {
  // Prepara i dati per il componente FestivalPage
  // Nel componente CortometraggiPage, aggiorna il mapping:
  const formattedCortometraggi = cortometraggi
    .map(corto => ({
      ...corto,
      id: corto.folderPath || corto.titolo.replace(/\s+/g, '_'),
      biografia_regista: corto.bioRegista || corto.biografia_regista || corto.bio,
      trailer: corto.trailer || corto.link,
      sbloccato: corto.sbloccato ?? false // Assicurati che sbloccato sia sempre definito
    }))
    // Ordina i cortometraggi: prima quelli sbloccati, poi quelli bloccati
    .sort((a, b) => {
      // Se a è sbloccato e b no, a viene prima
      if (a.sbloccato && !b.sbloccato) return -1;
      // Se b è sbloccato e a no, b viene prima
      if (!a.sbloccato && b.sbloccato) return 1;
      // Se entrambi hanno lo stesso stato di sblocco, mantieni l'ordine originale
      return 0;
    });
  
  return (
    <FestivalPage 
      cortometraggi={formattedCortometraggi}
      error={error}
    />
  );
};

// Funzione per ottenere i dati statici al momento della build
export const getStaticProps: GetStaticProps<FestivalPageProps> = async () => {
  try {
    // Percorso del file JSON unificato
    const jsonFilePath = path.join(process.cwd(), 'public', 'json-folders', 'film_unificati.json');
    
    // Array per memorizzare i dati dei cortometraggi
    let cortometraggi: Cortometraggio[] = [];
    
    try {
      // Leggi e analizza il file JSON unificato
      const jsonData = readFileSync(jsonFilePath, 'utf8');
      cortometraggi = JSON.parse(jsonData);
      
      // Pulisci i dati e aggiungi folderPath basato sul titolo
      cortometraggi = cortometraggi.map(corto => {
        // Pulisci i dati
        if (corto.titolo) corto.titolo = corto.titolo.trim();
        if (corto.durata) corto.durata = corto.durata.trim();
        
        // Crea un folderPath basato sul titolo se non esiste
        if (!corto.folderPath) {
          corto.folderPath = corto.titolo.replace(/\s+/g, '_');
        }
        
        return corto;
      });
    } catch (parseError) {
      console.error(`Errore nel parsing del JSON unificato:`, parseError);
      throw parseError;
    }
    
    // Restituisci i dati come props
    return {
      props: {
        cortometraggi,
        error: cortometraggi.length === 0 ? 'Nessun cortometraggio trovato.' : null
      },
      // Rigenera la pagina ogni ora
      revalidate: 3600
    };
  } catch (error) {
    console.error('Errore durante il caricamento dei cortometraggi:', error);
    
    // Restituisci un messaggio di errore
    return {
      props: {
        cortometraggi: [],
        error: 'Si è verificato un errore durante il caricamento dei cortometraggi. Riprova più tardi.'
      },
      // Riprova più frequentemente in caso di errore
      revalidate: 60
    };
  }
};

export default CortometraggiPage;