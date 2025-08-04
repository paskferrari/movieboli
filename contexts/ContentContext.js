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

  // Festival Pages
  'festival.competition.title': 'Competizione ufficiale di MOVIEBOLI Film Festival 2025',
  'festival.competition.description': 'Scopri le opere cinematografiche selezionate per la competizione ufficiale del MOVIEBOLI Festival del Cinema di Eboli.',
  'festival.competition.back': 'Torna al Festival',
  'festival.shorts.title': 'Cortometraggi in Concorso',
  
  // Program Page
  'program.title': 'Programma Festival',
  'program.subtitle': 'Tre giorni di cinema, cortometraggi e ospiti speciali dal 22 al 24 agosto 2025',
  'program.meta.title': 'Programma Festival | MoviEboli Film Festival 2025',
  'program.meta.description': 'Programma completo del MoviEboli Film Festival 2025 - 22-24 Agosto. Cortometraggi, ospiti speciali e eventi.',
  'program.download.title': 'Programma Completo',
  'program.download.description': 'Scarica il programma dettagliato del festival in formato PDF',
  'program.download.button': 'Scarica PDF',
  
  // Guests Page
  'guests.title': 'Ospiti del Festival',
  'guests.subtitle': 'Incontra i protagonisti del cinema che parteciperanno al festival',
  'guests.back': 'Torna al Festival',
  'guests.day1': 'Giovedì 22',
  'guests.day2': 'Venerdì 23', 
  'guests.day3': 'Sabato 24',
  
  // Vote Page
  'vote.title': 'Vota i Cortometraggi',
  'vote.subtitle': 'Esprimi il tuo voto per i cortometraggi in concorso',
  'vote.login_required': 'Accedi per votare',
  'vote.rating.label': 'Il tuo voto:',
  'vote.submit': 'Salva Voto',
  'vote.success': 'Voto salvato con successo!',
  'vote.error': 'Errore nel salvare il voto',
  
  // Festival Navigation
  'festival.nav.title': 'FESTIVAL 2025',
  'festival.nav.shorts': 'Cortometraggi',
  'festival.nav.guests': 'Ospiti',
  'festival.nav.program': 'Programma',
  'festival.nav.vote': 'Vota',
  
  // Festival Meta Tags
  'festival.meta.title': 'Cortometraggi in Concorso | MOVIEBOLI Festival',
  'festival.meta.description': 'Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli',
  
  // Festival Loading
  'festival.loading.title': 'MoviEboli Festival',
  'festival.loading.message': 'Caricamento cortometraggi...',
  
  // Guests Meta Tags
  'guests.meta.title': 'Ospiti del Festival 2025 | MOVIEBOLI Festival',
  'guests.meta.description': 'Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: registi, sceneggiatori e professionisti del cinema italiano.',
  
  // Guests Content
  'guests.dates': '22-24 Agosto 2025 • Cinema Vittoria di Eboli',
  'guests.loading.message': 'Caricamento ospiti...',
  
  // Program Meta Tags
  'program.meta.title': 'Programma Festival | MoviEboli Film Festival 2025',
  'program.meta.description': 'Programma completo del MoviEboli Film Festival 2025 - 22-24 Agosto. Cortometraggi, ospiti speciali e eventi.',
  'program.loading.message': 'Caricamento programma...',
  
  // Vote Meta Tags
  'vote.meta.title': 'Vota i Cortometraggi | MOVIEBOLI Festival',
  'vote.meta.description': 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival',
  'vote.loading.message': 'Caricamento sistema di voto...',
  'vote.rating_system': 'Sistema di rating a 5 stelle',
  'vote.back_to_festival': 'Torna al Festival',
  'vote.success_title': 'Voto registrato!',
  'vote.success_message': 'Grazie per la tua valutazione',
  'vote.remove_vote': 'Rimuovi voto',
  'vote.watch_trailer': 'Guarda Trailer',
  
  // Event Types
  'event.type.apertura': 'APERTURA',
  'event.type.film': 'FILM',
  'event.type.cortometraggi': 'CORTI',
  'event.type.talk': 'TALK',
  'event.type.panel': 'PANEL',
  'event.type.masterclass': 'MASTER',
  'event.type.workshop': 'WORKSHOP',
  'event.type.incontro': 'INCONTRO',
  'event.type.aperitivo': 'APERITIVO',
  'event.type.premiazione': 'PREMI',
  'event.type.festa': 'FESTA',
  'event.type.evento': 'EVENTO',

  // Homepage Hero
  'homepage.hero.title': 'MOVIEBOLI APS',
  'homepage.hero.subtitle': 'Cultura, Cinema, Comunità',
  'homepage.hero.description': 'Promuoviamo la cultura cinematografica e artistica nel territorio di Eboli attraverso eventi, festival e iniziative culturali innovative.',
  'homepage.hero.cta1': 'Scopri chi siamo',
  'homepage.hero.cta2': 'Festival 2025',
  
  // Chi Siamo Section
  'homepage.about.title': 'Chi Siamo',
  'homepage.about.mission.title': 'La nostra missione',
  'homepage.about.mission.p1': 'MOVIEBOLI APS è un\'associazione di promozione sociale nata dalla passione per il cinema e l\'arte. Il nostro obiettivo è valorizzare il territorio di Eboli attraverso eventi culturali di qualità.',
  'homepage.about.mission.p2': 'Crediamo nel potere dell\'arte di unire le persone e creare comunità. Attraverso il nostro festival annuale e le nostre iniziative, promuoviamo la cultura cinematografica e sosteniamo giovani talenti.',
  'homepage.about.cta': 'Scopri di più →',
  'homepage.about.since': 'Dal 2020',
  'homepage.about.since.description': 'Promuoviamo cultura e arte nel territorio',
  
  // Cosa Facciamo Section
  'homepage.activities.title': 'Cosa Facciamo',
  'homepage.activities.description': 'Le nostre attività sono pensate per promuovere la cultura cinematografica e creare opportunità per artisti e appassionati.',
  'homepage.activities.festival.title': 'Festival di cortometraggi',
  'homepage.activities.festival.description': 'Il nostro evento principale che celebra il cinema indipendente e i giovani talenti del territorio.',
  'homepage.activities.podcast.title': 'Ciliegie Podcast',
  'homepage.activities.podcast.description': 'Il nostro podcast dedicato al cinema, alle interviste e alle discussioni culturali.',
  'homepage.activities.workshops.title': 'Laboratori e attività culturali',
  'homepage.activities.workshops.description': 'Organizziamo workshop, proiezioni e incontri formativi durante tutto l\'anno.',
  'homepage.activities.cta': 'Scopri di più →',
  
  // Footer CTA Section
  'homepage.volunteer.title': 'Diventa Volontario',
  'homepage.volunteer.description': 'Unisciti al nostro team di volontari e partecipa attivamente agli eventi dell\'associazione. Contribuisci alla diffusione della cultura cinematografica nel territorio di Eboli.',
  'homepage.volunteer.cta1': 'Candidati ora',
  'homepage.volunteer.cta2': 'Scopri di più',
  
  // Festival Section Homepage
  'homepage.festival.title': 'Festival 2025',
  'homepage.festival.description': 'Il nostro festival annuale è il cuore pulsante dell\'associazione. Tre giorni di cinema, arte e cultura nel centro storico di Eboli.',
  'homepage.festival.days': '3',
  'homepage.festival.days.description': 'Un weekend dedicato al cinema e all\'arte',
  'homepage.festival.films': '50+',
  'homepage.festival.films.description': 'Cortometraggi e lungometraggi selezionati',
  'homepage.festival.events': '10+',
  'homepage.festival.events.description': 'Masterclass, incontri e proiezioni esclusive',
  'homepage.festival.cta': '🎬 Vai al Festival',
  
  // Activities Section (componente)
  'activities.section.title': 'Le Nostre Attività',
  'activities.section.description': 'MOVIEBOLI promuove la cultura cinematografica attraverso diverse iniziative pensate per coinvolgere la comunità e diffondere la passione per il cinema.',
  'activities.festival.title': 'Festival del Cortometraggio',
  'activities.festival.description': 'Il nostro evento annuale dedicato ai cortometraggi indipendenti, con proiezioni, workshop e incontri con registi.',
  'activities.podcast.title': 'Ciliegie Podcast',
  'activities.podcast.description': 'Il nostro podcast dedicato al cinema, con interviste, recensioni e approfondimenti sul mondo della settima arte.',
  'activities.workshop.title': 'Workshop e Laboratori',
  'activities.workshop.description': 'Corsi e laboratori di cinema, sceneggiatura, regia e montaggio per tutte le età, tenuti da professionisti del settore.',
  'activities.screenings.title': 'Proiezioni Speciali',
  'activities.screenings.description': 'Serate dedicate alla proiezione di film d\'autore, classici restaurati e pellicole rare, spesso accompagnate da dibattiti.',
  'activities.meetings.title': 'Incontri con Autori',
  'activities.meetings.description': 'Dialoghi con registi, sceneggiatori e attori per scoprire il dietro le quinte del cinema e approfondire tematiche culturali.',
  'activities.education.title': 'Progetti Educativi',
  'activities.education.description': 'Iniziative nelle scuole per avvicinare i giovani al linguaggio cinematografico e stimolare la creatività attraverso l\'audiovisivo.',
  'activities.cta.all': 'Tutte le Attività',
  'activities.cta.discover': 'Scopri di più',
  
  // Podcast Section
  'podcast.section.title': 'Ciliegie Podcast',
  'podcast.section.description': 'Conversazioni sul cinema, interviste con registi e approfondimenti culturali. Il nostro podcast è un viaggio sonoro nel mondo della settima arte.',
  'podcast.episode.12.title': 'Il Cinema Italiano Contemporaneo',
  'podcast.episode.12.guest': 'Marco Rossi',
  'podcast.episode.12.duration': '45 min',
  'podcast.episode.12.date': '15 Maggio 2023',
  'podcast.episode.11.title': 'Nuove Tecnologie nel Cinema',
  'podcast.episode.11.guest': 'Laura Bianchi',
  'podcast.episode.11.duration': '38 min',
  'podcast.episode.11.date': '1 Maggio 2023',
  'podcast.episode.10.title': 'Cinema Indipendente e Festival',
  'podcast.episode.10.guest': 'Giovanni Verdi',
  'podcast.episode.10.duration': '52 min',
  'podcast.episode.10.date': '15 Aprile 2023',
  'podcast.cta.all': 'Tutti gli Episodi',
  
  // Past Editions Section
  'past_editions.title': 'Edizioni Passate',
  'past_editions.description': 'Esplora la storia del nostro festival attraverso le edizioni passate, ognuna con il suo tema unico e i suoi film indimenticabili.',
  'past_editions.2023.title': 'Edizione 2023',
  'past_editions.2023.description': 'Un viaggio attraverso le emozioni del cinema indipendente',
  'past_editions.2022.title': 'Edizione 2022',
  'past_editions.2022.description': 'Nuove prospettive e visioni dal mondo del cortometraggio',
  'past_editions.2021.title': 'Edizione 2021',
  'past_editions.2021.description': 'Il cinema che unisce comunità e cultura',
  'past_editions.cta.discover': 'Scopri di più',
  'past_editions.cta.archive': 'Archivio Completo',
  
  // ... existing code ...
};

// Provider del contesto
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(demoContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funzione per caricare i contenuti da Supabase
  const loadContent = async () => {
    if (isDemoMode) {
      console.log('🔍 DEBUG - Modalità demo attiva, usando contenuti demo');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) {
        console.error('Errore nel caricamento contenuti:', error);
        setError(error.message);
        return;
      }

      // Converte l'array in oggetto chiave-valore
      const contentObj = {};
      data.forEach(item => {
        contentObj[item.key] = item.value;
      });

      // Merge con i contenuti demo per le chiavi mancanti
      setContent({ ...demoContent, ...contentObj });
      
    } catch (err) {
      console.error('Errore nel caricamento contenuti:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per aggiornare un contenuto
  const updateContent = async (key, value) => {
    if (isDemoMode) {
      // In modalità demo, aggiorna solo lo stato locale
      setContent(prev => ({ ...prev, [key]: value }));
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ key, value }, { onConflict: 'key' });

      if (error) {
        console.error('Errore nell\'aggiornamento contenuto:', error);
        return { success: false, error: error.message };
      }

      // Aggiorna lo stato locale
      setContent(prev => ({ ...prev, [key]: value }));
      return { success: true };
      
    } catch (err) {
      console.error('Errore nell\'aggiornamento contenuto:', err);
      return { success: false, error: err.message };
    }
  };

  // Funzione per ottenere un contenuto
  const getContent = (key, defaultValue = '') => {
    return content[key] || defaultValue;
  };

  // Carica i contenuti all'avvio
  useEffect(() => {
    loadContent();
  }, []);

  const value = {
    content,
    loading,
    error,
    getContent,
    updateContent,
    loadContent
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Hook per utilizzare il contesto
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent deve essere utilizzato all\'interno di un ContentProvider');
  }
  return context;
};