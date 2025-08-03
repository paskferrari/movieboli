import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';

const ContentContext = createContext();

// Dati demo per la modalità demo
const demoContent = {
  'hero.title': 'MOVIEBOLI',
  'hero.subtitle': 'Cinema. Cultura. Creatività.',
  'hero.button.festival': 'Scopri il Festival',
  'hero.button.activities': 'Le nostre attività',
  'about.title': 'Chi Siamo',
  'about.description': 'MovieBoli è un festival cinematografico che celebra la creatività e l\'innovazione nel cinema.',
  'footer.copyright': '© 2024 MovieBoli. Tutti i diritti riservati.',
  'nav.home': 'Home',
  'nav.festival': 'Festival',
  'nav.activities': 'Attività',
  'nav.about': 'Chi Siamo',
  // Aggiungi altri contenuti demo qui
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(demoContent);
  const [loading, setLoading] = useState(false);

  // Carica contenuti dal database
  const loadContent = async () => {
    if (isDemoMode) {
      setContent(demoContent);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value');
      
      if (error) throw error;
      
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.key] = item.value;
      });
      
      setContent({ ...demoContent, ...contentMap });
    } catch (error) {
      console.error('Errore nel caricamento contenuti:', error);
    } finally {
      setLoading(false);
    }
  };

  // Aggiorna contenuto
  const updateContent = async (key, value) => {
    if (isDemoMode) {
      setContent(prev => ({ ...prev, [key]: value }));
      return true;
    }
  
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ 
          key, 
          value, 
          updated_at: new Date().toISOString() 
        }, {
          onConflict: 'key'  // ← Aggiungi questa opzione
        });
      
      if (error) throw error;
      
      setContent(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (error) {
      console.error('Errore nell\'aggiornamento contenuto:', error);
      return false;
    }
  };

  // Ottieni contenuto per chiave
  const getContent = (key, defaultValue = '') => {
    return content[key] || defaultValue;
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{
      content,
      loading,
      getContent,
      updateContent,
      loadContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent deve essere usato all\'interno di ContentProvider');
  }
  return context;
};