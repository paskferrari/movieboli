import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';

const ContentContext = createContext();

// Dati demo per la modalità demo
const demoContent = {
  // Navigation
  'nav.home': 'Home',
  'nav.about': 'Chi siamo',
  'nav.podcast': 'Podcast',
  'nav.festival': 'Festival',
  'nav.donations': 'Donazioni',
  'nav.activities': 'Attività',
  'nav.program': 'Programma',
  'nav.vote': 'Vota',
  'nav.book': 'Prenota',

  // Hero Section
  'hero.title': 'MOVIEBOLI',
  'hero.subtitle': 'Cinema. Cultura. Creatività.',
  'hero.description': 'Il festival cinematografico più innovativo del Sud Italia',
  'hero.button.festival': 'Scopri il Festival',
  'hero.button.activities': 'Le nostre attività',

  // About Section
  'about.title': 'Chi Siamo',
  'about.subtitle': 'La storia, la missione e le persone dietro MOVIEBOLI APS',
  'about.story.title': 'La Nostra Storia',
  'about.story.p1': 'MOVIEBOLI APS nasce nel 2020 dalla passione di un gruppo di giovani per il cinema e l\'arte. L\'idea è semplice: portare la cultura cinematografica nel cuore di Eboli, creando un ponte tra tradizione e innovazione.',
  'about.story.p2': 'Il nostro nome unisce "Movie" e "Eboli", rappresentando la nostra missione di far diventare la nostra città un punto di riferimento per il cinema indipendente e la cultura artistica nel territorio.',
  'about.story.p3': 'Quello che è iniziato come un piccolo festival locale è cresciuto fino a diventare un evento riconosciuto a livello regionale, attirando artisti, registi e appassionati da tutta Italia.',

  // Mission Section
  'mission.title': 'La Nostra Missione',
  'mission.description': 'Promuovere la cultura cinematografica e sostenere i giovani talenti',

  // Activities
  'activities.title': 'Le Nostre Attività',
  'activities.subtitle': 'Scopri tutti i progetti e gli eventi che organizziamo durante l\'anno',
  'activities.lab.title': 'Laboratorio di Regia Cinematografica',
  'activities.lab.description': 'Corso intensivo di 8 settimane per apprendere le basi della regia cinematografica con professionisti del settore.',
  'activities.screening.title': 'Rassegna Cinema Europeo',
  'activities.screening.description': 'Ciclo di proiezioni dedicato al cinema europeo contemporaneo con dibattiti e incontri con i registi.',

  // Festival
  'festival.title': 'Festival MovieBoli 2025',
  'festival.subtitle': 'La quinta edizione del nostro festival cinematografico',
  'festival.description': 'Un\'esperienza unica che celebra l\'arte, la cultura e la creatività cinematografica',
  'festival.dates': '15-22 Giugno 2025',
  'festival.location': 'Eboli, Salerno',

  // Footer
  'footer.copyright': '© 2024 MovieBoli. Tutti i diritti riservati.',
  'footer.description': 'Il festival cinematografico più innovativo del Sud Italia. Un\'esperienza unica che celebra l\'arte, la cultura e la creatività cinematografica.',
  'footer.links.title': 'Link Utili',
  'footer.contact.title': 'Contatti',
  'footer.newsletter.title': 'Newsletter',
  'footer.newsletter.description': 'Iscriviti per ricevere aggiornamenti sul festival e sugli eventi speciali.',
  'footer.newsletter.button': 'Iscriviti',
  'footer.newsletter.placeholder': 'La tua email',
  'footer.quote': '"Il cinema è un sogno collettivo che ci unisce attraverso storie universali".',

  // Contact Info
  'contact.address': 'Via del Cinema, 1',
  'contact.city': '84025 Eboli (SA)',
  'contact.phone': '+39 0828 123456',
  'contact.email': 'info@movieboli.it',
  'contact.website': 'www.movieboli.it',

  // Buttons
  'button.discover': 'Scopri di più',
  'button.participate': 'Partecipa',
  'button.vote': 'Vota ora',
  'button.book': 'Prenota',
  'button.register': 'Registrati',
  'button.login': 'Accedi',
  'button.save': 'Salva',
  'button.cancel': 'Annulla',
  'button.edit': 'Modifica',
  'button.delete': 'Elimina',
  'button.add': 'Aggiungi',

  // Status Messages
  'status.loading': 'Caricamento...',
  'status.error': 'Si è verificato un errore',
  'status.success': 'Operazione completata con successo',
  'status.coming_soon': 'Prossimamente',
  'status.in_progress': 'In corso',
  'status.completed': 'Conclusa',

  // Forms
  'form.name': 'Nome',
  'form.email': 'Email',
  'form.message': 'Messaggio',
  'form.submit': 'Invia',
  'form.required': 'Campo obbligatorio',

  // Admin
  'admin.title': 'Pannello Amministrativo',
  'admin.content.title': 'Gestione Contenuti Sito',
  'admin.content.description': 'Modifica tutti i contenuti testuali del sito MovieBoli',
  'admin.add_content': 'Aggiungi Contenuto',
  'admin.edit': 'Modifica',
  'admin.save': 'Salva',
  'admin.cancel': 'Annulla',

  // Maintenance
  'maintenance.title': 'Sito in Manutenzione',
  'maintenance.message': 'Stiamo effettuando alcuni aggiornamenti al nostro sito web. Torneremo online il prima possibile!',
  'maintenance.thanks': 'Grazie per la pazienza e la comprensione.',
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