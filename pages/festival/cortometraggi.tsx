import FestivalPage from './FestivalPage';
import { GetStaticProps } from 'next';
import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
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
  id?: string;
}

// Interfaccia per le props della pagina
export interface FestivalPageProps {
  cortometraggi: Cortometraggio[];
  error?: string | null;
}

// Componente principale della pagina
const CortometraggiPage = ({ cortometraggi, error }: FestivalPageProps) => {
  // Prepara i dati per il componente FestivalPage
  const formattedCortometraggi = cortometraggi.map(corto => ({
    ...corto,
    id: corto.folderPath || corto.titolo.replace(/\s+/g, '_'),
    biografia_regista: corto.bioRegista || corto.biografia_regista
  }));
  
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
    // Percorso della directory contenente le cartelle dei cortometraggi
    const cortoBasePath = path.join(process.cwd(), 'public', 'json-folders');

  // Leggi le directory all'interno della cartella json-folders
    const dirents = await fs.readdir(cortoBasePath, { withFileTypes: true });
    const directories = dirents
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Array per memorizzare i dati dei cortometraggi
    const cortometraggi: Cortometraggio[] = [];
    
    // Leggi i dati di ogni cortometraggio
    for (const dir of directories) {
      const jsonPath = path.join(cortoBasePath, dir, 'cortometraggio.json');
      
      // Verifica se esiste il file JSON
      if (existsSync(jsonPath)) {
        // Leggi e analizza il file JSON
        const jsonData = readFileSync(jsonPath, 'utf8');
        const cortoData = JSON.parse(jsonData);
        
        // Aggiungi il percorso della cartella ai dati
        cortometraggi.push({
          ...cortoData,
          folderPath: dir
        });
      }
    }
    
    // Restituisci i dati come props
    return {
      props: {
        cortometraggi,
        error: null
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