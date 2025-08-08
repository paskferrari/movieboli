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
  
  // Homepage About
  'homepage.about.title': 'Chi Siamo',
  'homepage.about.mission.title': 'La nostra missione',
  'homepage.about.mission.p1': 'MOVIEBOLI APS è un\'associazione di promozione sociale nata dalla passione per il cinema e l\'arte. Il nostro obiettivo è valorizzare il territorio di Eboli attraverso eventi culturali di qualità.',
  'homepage.about.mission.p2': 'Crediamo nel potere dell\'arte di unire le persone e creare comunità. Attraverso il nostro festival annuale e le nostre iniziative, promuoviamo la cultura cinematografica e sosteniamo giovani talenti.',
  'homepage.about.cta': 'Scopri di più →',
  'homepage.about.since': 'Dal 2020',
  'homepage.about.since.description': 'Promuoviamo cultura e arte nel territorio',
  
  // Homepage Activities
  'homepage.activities.title': 'Cosa Facciamo',
  'homepage.activities.description': 'Le nostre attività sono pensate per promuovere la cultura cinematografica e creare opportunità per artisti e appassionati.',
  'homepage.activities.festival.title': 'Festival di cortometraggi',
  'homepage.activities.festival.description': 'Il nostro evento principale che celebra il cinema indipendente e i giovani talenti del territorio.',
  'homepage.activities.podcast.title': 'Ciliegie Podcast',
  'homepage.activities.podcast.description': 'Il nostro podcast dedicato al cinema, alle interviste e alle discussioni culturali.',
  'homepage.activities.workshops.title': 'Laboratori e attività culturali',
  'homepage.activities.workshops.description': 'Organizziamo workshop, proiezioni e incontri formativi durante tutto l\'anno.',
  'homepage.activities.cta': 'Scopri di più →',
  
  // Homepage Volunteer
  'homepage.volunteer.title': 'Diventa Volontario',
  'homepage.volunteer.description': 'Unisciti al nostro team di volontari e partecipa attivamente agli eventi dell\'associazione. Contribuisci alla diffusione della cultura cinematografica nel territorio di Eboli.',
  'homepage.volunteer.cta1': 'Candidati ora',
  'homepage.volunteer.cta2': 'Scopri di più',
  
  // Homepage Festival Teaser
  'homepage.festival.title': 'Festival 2025',
  'homepage.festival.description': 'Il nostro festival annuale è il cuore pulsante dell\'associazione. Tre giorni di cinema, arte e cultura nel centro storico di Eboli.',
  'homepage.festival.days': '3',
  'homepage.festival.days.description': 'Un weekend dedicato al cinema e all\'arte',
  'homepage.festival.films': '50+',
  'homepage.festival.films.description': 'Cortometraggi e lungometraggi selezionati',
  'homepage.festival.events': '10+',
  'homepage.festival.events.description': 'Masterclass, incontri e proiezioni esclusive',
  'homepage.festival.cta': '🎬 Vai al Festival',
  
  // Chi Siamo - About Page
  'about.title': 'Chi Siamo',
  'about.subtitle': 'La storia, la missione e le persone dietro MOVIEBOLI APS',
  'about.story.title': 'La Nostra Storia',
  'about.story.p1': 'MOVIEBOLI APS nasce nel 2020 dalla passione di un gruppo di giovani per il cinema e l\'arte. L\'idea è semplice: portare la cultura cinematografica nel cuore di Eboli, creando un ponte tra tradizione e innovazione.',
  'about.story.p2': 'Il nostro nome unisce "Movie" e "Eboli", rappresentando la nostra missione di far diventare la nostra città un punto di riferimento per il cinema indipendente e la cultura artistica nel territorio.',
  'about.story.p3': 'Quello che è iniziato come un piccolo festival locale è cresciuto fino a diventare un evento riconosciuto a livello regionale, attirando artisti, registi e appassionati da tutta Italia.',
  'about.mission.title': 'La Nostra Missione',
  'about.mission.description': 'Promuovere la cultura cinematografica e sostenere i giovani talenti attraverso eventi, festival e iniziative educative nel territorio di Eboli.',
  'about.mission.point1': 'Valorizzare il territorio attraverso la cultura',
  'about.mission.point2': 'Sostenere giovani artisti e registi emergenti',
  'about.mission.point3': 'Creare opportunità di formazione e crescita',
  'about.mission.point4': 'Promuovere il dialogo interculturale',
  'about.values.title': 'I Nostri Valori',
  'about.values.creativity': 'Creatività',
  'about.values.creativity.description': 'Sosteniamo l\'espressione artistica in tutte le sue forme',
  'about.values.community': 'Comunità',
  'about.values.community.description': 'Creiamo legami attraverso la condivisione culturale',
  'about.values.innovation': 'Innovazione',
  'about.values.innovation.description': 'Esploriamo nuovi linguaggi e tecnologie',
  'about.values.inclusion': 'Inclusione',
  'about.values.inclusion.description': 'Accogliamo diversità e prospettive multiple',
  'about.team.title': 'Il Nostro Team',
  'about.team.description': 'Un gruppo di appassionati che lavora per rendere possibile ogni evento',
  'about.join.title': 'Unisciti a Noi',
  'about.join.description': 'Diventa parte della famiglia MOVIEBOLI e contribuisci alla crescita della cultura cinematografica',
  'about.join.volunteer': 'Diventa Volontario',
  'about.join.partner': 'Diventa Partner',
  'about.join.sponsor': 'Sostienici',
  
  // Activities Section
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
  'activities.masterclass.title': 'Masterclass',
  'activities.masterclass.description': 'Incontri formativi con professionisti del cinema per approfondire tecniche e metodologie di produzione.',
  'activities.competitions.title': 'Concorsi e Bandi',
  'activities.competitions.description': 'Opportunità per giovani filmmaker di presentare le proprie opere e ricevere riconoscimenti.',
  'activities.cta.all': 'Tutte le Attività',
  'activities.cta.discover': 'Scopri di più',
  'activities.cta.participate': 'Partecipa',
  
  // Podcast Section
  'podcast.title': 'Ciliegie Podcast',
  'podcast.description': 'Conversazioni sul cinema, interviste con registi e approfondimenti culturali. Il nostro podcast è un viaggio sonoro nel mondo della settima arte.',
  'podcast.section.title': 'Ciliegie Podcast',
  'podcast.section.description': 'Il nostro podcast dedicato al cinema, con episodi settimanali che esplorano il mondo della settima arte attraverso interviste, recensioni e approfondimenti.',
  'podcast.latest.title': 'Ultimo Episodio',
  'podcast.all.title': 'Tutti gli Episodi',
  'podcast.subscribe.title': 'Ascolta su',
  'podcast.episodes.title': 'Episodi Recenti',
  
  // Podcast Episodes
  'podcast.episodes.ep12.title': 'Il Cinema Italiano Contemporaneo',
  'podcast.episodes.ep12.guest': 'Marco Rossi',
  'podcast.episodes.ep12.duration': '45 min',
  'podcast.episodes.ep12.date': '15 Maggio 2023',
  'podcast.episodes.ep11.title': 'Nuove Tecnologie nel Cinema',
  'podcast.episodes.ep11.guest': 'Laura Bianchi',
  'podcast.episodes.ep11.duration': '38 min',
  'podcast.episodes.ep11.date': '1 Maggio 2023',
  'podcast.episodes.ep10.title': 'Cinema Indipendente e Festival',
  'podcast.episodes.ep10.guest': 'Giovanni Verdi',
  'podcast.episodes.ep10.duration': '52 min',
  'podcast.episodes.ep10.date': '15 Aprile 2023',
  'podcast.episodes.ep9.title': 'Donne nel Cinema',
  'podcast.episodes.ep9.guest': 'Sofia Neri',
  'podcast.episodes.ep9.duration': '41 min',
  'podcast.episodes.ep9.date': '1 Aprile 2023',
  'podcast.episodes.ep8.title': 'Cinema e Territorio',
  'podcast.episodes.ep8.guest': 'Antonio Blu',
  'podcast.episodes.ep8.duration': '47 min',
  'podcast.episodes.ep8.date': '15 Marzo 2023',
  'podcast.episodes.ep8.description': 'Come il cinema può valorizzare e raccontare i territori',
  'podcast.cta.all': 'Tutti gli Episodi',
  'podcast.cta.subscribe': 'Iscriviti',
  'podcast.cta.listen': 'Ascolta',
  
  // Past Editions
  'past_editions.title': 'Edizioni Passate',
  'past_editions.description': 'Esplora la storia del nostro festival attraverso le edizioni passate, ognuna con il suo tema unico e i suoi film indimenticabili.',
  'past_editions.2024.title': 'Edizione 2024',
  'past_editions.2024.description': 'Visioni del futuro: il cinema che immagina domani',
  'past_editions.2024.theme': 'Futuro Presente',
  'past_editions.2024.films': '45 cortometraggi',
  'past_editions.2023.title': 'Edizione 2023',
  'past_editions.2023.description': 'Un viaggio attraverso le emozioni del cinema indipendente',
  'past_editions.2023.theme': 'Emozioni in Movimento',
  'past_editions.2023.films': '38 cortometraggi',
  'past_editions.2022.title': 'Edizione 2022',
  'past_editions.2022.description': 'Nuove prospettive e visioni dal mondo del cortometraggio',
  'past_editions.2022.theme': 'Nuove Prospettive',
  'past_editions.2022.films': '32 cortometraggi',
  'past_editions.2021.title': 'Edizione 2021',
  'past_editions.2021.description': 'Il cinema che unisce comunità e cultura',
  'past_editions.2021.theme': 'Cinema e Comunità',
  'past_editions.2021.films': '28 cortometraggi',
  'past_editions.cta.discover': 'Scopri di più',
  'past_editions.cta.archive': 'Archivio Completo',
  'past_editions.cta.gallery': 'Galleria Foto',
  
  // Festival Navigation
  'festival.nav.title': 'FESTIVAL 2025',
  'festival.nav.shorts': 'Cortometraggi',
  'festival.nav.guests': 'Ospiti',
  'festival.nav.program': 'Programma',
  'festival.nav.vote': 'Vota',
  'festival.nav.awards': 'Premi',
  'festival.nav.venues': 'Location',
  'festival.nav.info': 'Info',
  
  // Program Page
  'program.title': 'Programma Festival',
  'program.subtitle': 'Tre giorni di cinema, cortometraggi e ospiti speciali dal 22 al 24 agosto 2025',
  'program.meta.title': 'Programma Festival | MoviEboli Film Festival 2025',
  'program.meta.description': 'Programma completo del MoviEboli Film Festival 2025 - 22-24 Agosto. Cortometraggi, ospiti speciali e eventi.',
  'program.download.title': 'Programma Completo',
  'program.download.description': 'Scarica il programma dettagliato del festival in formato PDF',
  'program.download.button': 'Scarica PDF',
  'program.loading.message': 'Caricamento programma...',
  'program.filter.all': 'Tutti gli eventi',
  'program.filter.films': 'Proiezioni',
  'program.filter.talks': 'Incontri',
  'program.filter.workshops': 'Workshop',
  'program.filter.special': 'Eventi speciali',
  
  // Guests Page
  'guests.title': 'Ospiti del Festival',
  'guests.subtitle': 'Incontra i protagonisti del cinema che parteciperanno al festival',
  'guests.back': 'Torna al Festival',
  'guests.day1': 'Giovedì 22',
  'guests.day2': 'Venerdì 23', 
  'guests.day3': 'Sabato 24',
  'guests.dates': '22-24 Agosto 2025 • Cinema Vittoria di Eboli',
  'guests.meta.title': 'Ospiti del Festival 2025 | MOVIEBOLI Festival',
  'guests.meta.description': 'Scopri gli ospiti speciali del MOVIEBOLI Film Festival 2025: registi, sceneggiatori e professionisti del cinema italiano.',
  'guests.loading.message': 'Caricamento ospiti...',
  'guests.bio.title': 'Biografia',
  'guests.filmography.title': 'Filmografia',
  'guests.events.title': 'Eventi con questo ospite',
  
  // Vote Page
  'vote.title': 'Vota i Cortometraggi',
  'vote.subtitle': 'Esprimi il tuo voto per i cortometraggi in concorso',
  'vote.login_required': 'Accedi per votare',
  'vote.rating.label': 'Il tuo voto:',
  'vote.submit': 'Salva Voto',
  'vote.success': 'Voto salvato con successo!',
  'vote.error': 'Errore nel salvare il voto',
  'vote.rating_system': 'Sistema di rating a 5 stelle',
  'vote.back_to_festival': 'Torna al Festival',
  'vote.success_title': 'Voto registrato!',
  'vote.success_message': 'Grazie per la tua valutazione',
  'vote.remove_vote': 'Rimuovi voto',
  'vote.watch_trailer': 'Guarda Trailer',
  'vote.meta.title': 'Vota i Cortometraggi | MOVIEBOLI Festival',
  'vote.meta.description': 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival',
  'vote.loading.message': 'Caricamento sistema di voto...',
  'vote.instructions': 'Guarda i cortometraggi e vota il tuo preferito',
  'vote.deadline': 'Votazioni aperte fino al 24 agosto',
  
  // Festival Meta Tags
  'festival.meta.title': 'Cortometraggi in Concorso | MOVIEBOLI Festival',
  'festival.meta.description': 'Scopri i cortometraggi in concorso al MOVIEBOLI Festival del Cinema di Eboli',
  'festival.loading.title': 'MoviEboli Festival',
  'festival.loading.message': 'Caricamento cortometraggi...',
  
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
  'event.type.proiezione': 'PROIEZIONE',
  'event.type.dibattito': 'DIBATTITO',
  'event.type.presentazione': 'PRESENTAZIONE',
  
  // Footer
  'footer.copyright': '© 2025 MovieBoli APS. Tutti i diritti riservati.',
  'footer.description': 'Associazione di promozione sociale dedicata alla cultura cinematografica e artistica nel territorio di Eboli.',
  'footer.links.title': 'Link Utili',
  'footer.links.about': 'Chi Siamo',
  'footer.links.activities': 'Attività',
  'footer.links.festival': 'Festival',
  'footer.links.podcast': 'Podcast',
  'footer.links.contact': 'Contatti',
  'footer.links.privacy': 'Privacy Policy',
  'footer.links.terms': 'Termini di Servizio',
  'footer.contact.title': 'Contatti',
  'footer.contact.address': 'Via del Cinema, 1 - 84025 Eboli (SA)',
  'footer.contact.phone': '+39 0828 123456',
  'footer.contact.email': 'info@movieboli.it',
  'footer.social.title': 'Seguici',
  'footer.newsletter.title': 'Newsletter',
  'footer.newsletter.description': 'Iscriviti per ricevere aggiornamenti sul festival e sugli eventi speciali.',
  'footer.newsletter.button': 'Iscriviti',
  'footer.newsletter.placeholder': 'La tua email',
  'footer.newsletter.success': 'Iscrizione completata!',
  'footer.newsletter.error': 'Errore nell\'iscrizione',
  'footer.quote': '"Il cinema è un sogno collettivo che ci unisce attraverso storie universali"',
  
  // Contact
  'contact.title': 'Contattaci',
  'contact.subtitle': 'Siamo qui per rispondere alle tue domande',
  'contact.address': 'Via del Cinema, 1',
  'contact.city': '84025 Eboli (SA)',
  'contact.phone': '+39 0828 123456',
  'contact.email': 'info@movieboli.it',
  'contact.website': 'www.movieboli.it',
  'contact.hours.title': 'Orari di Apertura',
  'contact.hours.weekdays': 'Lun-Ven: 9:00-18:00',
  'contact.hours.weekend': 'Sab: 9:00-13:00',
  'contact.form.title': 'Invia un Messaggio',
  'contact.form.success': 'Messaggio inviato con successo!',
  'contact.form.error': 'Errore nell\'invio del messaggio',
  
  // Buttons
  'button.discover': 'Scopri di più',
  'button.participate': 'Partecipa',
  'button.vote': 'Vota ora',
  'button.book': 'Prenota',
  'button.register': 'Registrati',
  'button.login': 'Accedi',
  'button.logout': 'Esci',
  'button.save': 'Salva',
  'button.cancel': 'Annulla',
  'button.edit': 'Modifica',
  'button.delete': 'Elimina',
  'button.add': 'Aggiungi',
  'button.submit': 'Invia',
  'button.close': 'Chiudi',
  'button.back': 'Indietro',
  'button.next': 'Avanti',
  'button.previous': 'Precedente',
  'button.download': 'Scarica',
  'button.share': 'Condividi',
  'button.like': 'Mi piace',
  'button.subscribe': 'Iscriviti',
  'button.unsubscribe': 'Disiscriviti',
  'button.follow': 'Segui',
  'button.unfollow': 'Non seguire più',
  'button.watch': 'Guarda',
  'button.listen': 'Ascolta',
  'button.read_more': 'Leggi di più',
  'button.show_more': 'Mostra di più',
  'button.show_less': 'Mostra meno',
  
  // Status Messages
  'status.loading': 'Caricamento...',
  'status.error': 'Si è verificato un errore',
  'status.success': 'Operazione completata con successo',
  'status.coming_soon': 'Prossimamente',
  'status.in_progress': 'In corso',
  'status.completed': 'Conclusa',
  'status.cancelled': 'Annullata',
  'status.postponed': 'Rimandata',
  'status.sold_out': 'Sold Out',
  'status.available': 'Disponibile',
  'status.unavailable': 'Non disponibile',
  'status.maintenance': 'In manutenzione',
  'status.offline': 'Offline',
  'status.online': 'Online',
  
  // Form Fields
  'form.name': 'Nome',
  'form.surname': 'Cognome',
  'form.email': 'Email',
  'form.phone': 'Telefono',
  'form.message': 'Messaggio',
  'form.subject': 'Oggetto',
  'form.company': 'Azienda',
  'form.role': 'Ruolo',
  'form.city': 'Città',
  'form.country': 'Paese',
  'form.age': 'Età',
  'form.gender': 'Genere',
  'form.submit': 'Invia',
  'form.reset': 'Reimposta',
  'form.required': 'Campo obbligatorio',
  'form.invalid_email': 'Email non valida',
  'form.invalid_phone': 'Numero di telefono non valido',
  'form.min_length': 'Minimo {min} caratteri',
  'form.max_length': 'Massimo {max} caratteri',
  'form.privacy_consent': 'Accetto la Privacy Policy',
  'form.newsletter_consent': 'Desidero ricevere la newsletter',
  
  // Admin Panel
  'admin.title': 'Pannello Amministrativo',
  'admin.dashboard': 'Dashboard',
  'admin.content.title': 'Gestione Contenuti Sito',
  'admin.content.description': 'Modifica tutti i contenuti testuali del sito MovieBoli',
  'admin.users.title': 'Gestione Utenti',
  'admin.events.title': 'Gestione Eventi',
  'admin.films.title': 'Gestione Film',
  'admin.stats.title': 'Statistiche',
  'admin.settings.title': 'Impostazioni',
  'admin.add_content': 'Aggiungi Contenuto',
  'admin.edit': 'Modifica',
  'admin.save': 'Salva',
  'admin.cancel': 'Annulla',
  'admin.delete_confirm': 'Sei sicuro di voler eliminare questo elemento?',
  'admin.bulk_edit': 'Modifica multipla',
  'admin.export': 'Esporta',
  'admin.import': 'Importa',
  'admin.backup': 'Backup',
  'admin.restore': 'Ripristina',
  
  // Maintenance
  'maintenance.title': 'Sito in Manutenzione',
  'maintenance.message': 'Stiamo effettuando alcuni aggiornamenti al nostro sito web. Torneremo online il prima possibile!',
  'maintenance.thanks': 'Grazie per la pazienza e la comprensione.',
  'maintenance.estimated_time': 'Tempo stimato: 2 ore',
  'maintenance.contact': 'Per urgenze: info@movieboli.it',
  
  // Error Pages
  'error.404.title': 'Pagina non trovata',
  'error.404.message': 'La pagina che stai cercando non esiste.',
  'error.500.title': 'Errore del server',
  'error.500.message': 'Si è verificato un errore interno del server.',
  'error.offline.title': 'Connessione assente',
  'error.offline.message': 'Controlla la tua connessione internet.',
  'error.back_home': 'Torna alla Home',
  'error.try_again': 'Riprova',
  'error.report': 'Segnala il problema',
  
  // Search
  'search.placeholder': 'Cerca...',
  'search.no_results': 'Nessun risultato trovato',
  'search.results_for': 'Risultati per "{query}"',
  'search.suggestions': 'Suggerimenti',
  'search.recent': 'Ricerche recenti',
  'search.clear': 'Cancella ricerche',
  
  // Filters
  'filter.all': 'Tutti',
  'filter.category': 'Categoria',
  'filter.date': 'Data',
  'filter.location': 'Luogo',
  'filter.type': 'Tipo',
  'filter.clear': 'Cancella filtri',
  'filter.apply': 'Applica filtri',
  'filter.results': '{count} risultati',
  
  // Pagination
  'pagination.previous': 'Precedente',
  'pagination.next': 'Successivo',
  'pagination.first': 'Prima',
  'pagination.last': 'Ultima',
  'pagination.page': 'Pagina {page} di {total}',
  'pagination.per_page': 'Elementi per pagina',
  
  // Accessibility
  'accessibility.skip_to_content': 'Vai al contenuto',
  'accessibility.menu': 'Menu di navigazione',
  'accessibility.search': 'Cerca nel sito',
  'accessibility.close_modal': 'Chiudi finestra',
  'accessibility.open_menu': 'Apri menu',
  'accessibility.close_menu': 'Chiudi menu',
  
  // Cookie Consent
  'cookies.title': 'Utilizzo dei Cookie',
  'cookies.message': 'Questo sito utilizza cookie per migliorare l\'esperienza utente.',
  'cookies.accept': 'Accetta',
  'cookies.decline': 'Rifiuta',
  'cookies.settings': 'Impostazioni',
  'cookies.policy': 'Cookie Policy',
  
  // Newsletter
  'newsletter.title': 'Iscriviti alla Newsletter',
  'newsletter.description': 'Ricevi aggiornamenti su eventi, festival e novità',
  'newsletter.email_placeholder': 'Inserisci la tua email',
  'newsletter.subscribe': 'Iscriviti',
  'newsletter.success': 'Iscrizione completata!',
  'newsletter.error': 'Errore nell\'iscrizione',
  'newsletter.already_subscribed': 'Email già iscritta',
  'newsletter.unsubscribe': 'Disiscriviti',
  'newsletter.unsubscribe_success': 'Disiscrizione completata',
  
  // Social Media
  'social.follow_us': 'Seguici sui social',
  'social.share': 'Condividi',
  'social.facebook': 'Facebook',
  'social.instagram': 'Instagram',
  'social.twitter': 'Twitter',
  'social.youtube': 'YouTube',
  'social.linkedin': 'LinkedIn',
  'social.tiktok': 'TikTok',
  
  // Time and Dates
  'time.today': 'Oggi',
  'time.tomorrow': 'Domani',
  'time.yesterday': 'Ieri',
  'time.this_week': 'Questa settimana',
  'time.next_week': 'Prossima settimana',
  'time.this_month': 'Questo mese',
  'time.next_month': 'Prossimo mese',
  'time.minutes_ago': '{minutes} minuti fa',
  'time.hours_ago': '{hours} ore fa',
  'time.days_ago': '{days} giorni fa',
  
  // Months
  'month.january': 'Gennaio',
  'month.february': 'Febbraio',
  'month.march': 'Marzo',
  'month.april': 'Aprile',
  'month.may': 'Maggio',
  'month.june': 'Giugno',
  'month.july': 'Luglio',
  'month.august': 'Agosto',
  'month.september': 'Settembre',
  'month.october': 'Ottobre',
  'month.november': 'Novembre',
  'month.december': 'Dicembre',
  
  // Days of the week
  'day.monday': 'Lunedì',
  'day.tuesday': 'Martedì',
  'day.wednesday': 'Mercoledì',
  'day.thursday': 'Giovedì',
  'day.friday': 'Venerdì',
  'day.saturday': 'Sabato',
  'day.sunday': 'Domenica',
  
  // Festival 2025 - Contenuti Specifici Aggiuntivi
  'festival.2025.welcome.title': 'Benvenuti al MOVIEBOLI Festival 2025',
  'festival.2025.welcome.message': 'La quinta edizione del nostro festival è pronta a stupirvi con storie straordinarie e talenti emergenti.',
  'festival.2025.countdown.title': 'Mancano',
  'festival.2025.countdown.days': 'giorni',
  'festival.2025.countdown.hours': 'ore',
  'festival.2025.countdown.minutes': 'minuti',
  'festival.2025.tickets.title': 'Biglietti',
  'festival.2025.tickets.description': 'Acquista i biglietti per le proiezioni e gli eventi speciali',
  'festival.2025.tickets.single': 'Biglietto singolo evento',
  'festival.2025.tickets.pass': 'Pass festival completo',
  'festival.2025.tickets.student': 'Ridotto studenti',
  'festival.2025.accommodation.title': 'Dove Alloggiare',
  'festival.2025.accommodation.description': 'Hotel e B&B convenzionati per i partecipanti al festival',
  'festival.2025.transport.title': 'Come Raggiungerci',
  'festival.2025.transport.description': 'Informazioni su trasporti e parcheggi',
  'festival.2025.sponsors.title': 'Partner e Sponsor',
  'festival.2025.sponsors.description': 'Ringraziamo tutti i partner che rendono possibile il festival',
  'festival.2025.press.title': 'Area Stampa',
  'festival.2025.press.description': 'Materiali e contatti per giornalisti e media',
  'festival.2025.volunteers.title': 'Volontari',
  'festival.2025.volunteers.description': 'Unisciti al team di volontari del festival',
  'festival.2025.accessibility.title': 'Accessibilità',
  'festival.2025.accessibility.description': 'Il festival è accessibile a tutti, scopri i nostri servizi',
  
  // Festival 2025 - Sezioni Tecniche
  'festival.2025.technical.title': 'Specifiche Tecniche',
  'festival.2025.technical.formats': 'Formati accettati: MP4, MOV, AVI',
  'festival.2025.technical.resolution': 'Risoluzione minima: Full HD 1920x1080',
  'festival.2025.technical.duration': 'Durata massima: 30 minuti',
  'festival.2025.technical.subtitles': 'Sottotitoli in italiano obbligatori per film non italiani',
  'festival.2025.jury.title': 'Giuria',
  'festival.2025.jury.description': 'Professionisti del cinema che valuteranno le opere in concorso',
  'festival.2025.criteria.title': 'Criteri di Valutazione',
  'festival.2025.criteria.story': 'Originalità della storia',
  'festival.2025.criteria.direction': 'Qualità della regia',
  'festival.2025.criteria.technical': 'Aspetti tecnici',
  'festival.2025.criteria.impact': 'Impatto emotivo',
  
  // Workshop e Masterclass 2025
  'festival.2025.workshops.title': 'Workshop e Masterclass',
  'festival.2025.workshops.description': 'Opportunità formative con professionisti del settore',
  'festival.2025.workshop.screenwriting.title': 'Sceneggiatura per Cortometraggi',
  'festival.2025.workshop.screenwriting.description': 'Tecniche narrative per il formato breve',
  'festival.2025.workshop.directing.title': 'Regia Cinematografica',
  'festival.2025.workshop.directing.description': 'Dalla pre-produzione al montaggio finale',
  'festival.2025.workshop.acting.title': 'Recitazione per il Cinema',
  'festival.2025.workshop.acting.description': 'Tecniche di interpretazione davanti alla macchina da presa',
  'festival.2025.workshop.editing.title': 'Montaggio Digitale',
  'festival.2025.workshop.editing.description': 'Software e tecniche di post-produzione',
  'festival.2025.workshop.sound.title': 'Sound Design',
  'festival.2025.workshop.sound.description': 'L\'importanza del suono nel cinema',
  
  // Networking e Eventi Speciali
  'festival.2025.networking.title': 'Eventi di Networking',
  'festival.2025.networking.description': 'Occasioni di incontro tra professionisti e appassionati',
  'festival.2025.aperitif.title': 'Aperitivo di Benvenuto',
  'festival.2025.aperitif.description': 'Giovedì 22 agosto, ore 18:00',
  'festival.2025.gala.title': 'Cena di Gala',
  'festival.2025.gala.description': 'Venerdì 23 agosto, ore 20:30',
  'festival.2025.afterparty.title': 'After Party',
  'festival.2025.afterparty.description': 'Sabato 24 agosto, dopo la premiazione',
  
  // Location e Venue
  'festival.2025.venues.title': 'Le Location del Festival',
  'festival.2025.venues.cinema.title': 'Cinema Vittoria',
  'festival.2025.venues.cinema.description': 'Sala principale per proiezioni e cerimonie',
  'festival.2025.venues.theater.title': 'Teatro Comunale',
  'festival.2025.venues.theater.description': 'Masterclass e incontri con gli autori',
  'festival.2025.venues.square.title': 'Piazza della Repubblica',
  'festival.2025.venues.square.description': 'Proiezioni all\'aperto e eventi pubblici',
  'festival.2025.venues.gallery.title': 'Galleria d\'Arte',
  'festival.2025.venues.gallery.description': 'Mostre fotografiche e installazioni',
  'festival.2025.venues.cafe.title': 'Caffè Letterario',
  'festival.2025.venues.cafe.description': 'Incontri informali e networking',
  
  // Sicurezza e Protocolli
  'festival.2025.safety.title': 'Protocolli di Sicurezza',
  'festival.2025.safety.description': 'La sicurezza di tutti i partecipanti è la nostra priorità',
  'festival.2025.covid.title': 'Misure Sanitarie',
  'festival.2025.covid.description': 'Protocolli aggiornati secondo le normative vigenti',
  'festival.2025.emergency.title': 'Contatti di Emergenza',
  'festival.2025.emergency.description': 'Numeri utili durante il festival',
  
  // Sostenibilità
  'festival.2025.sustainability.title': 'Festival Sostenibile',
  'festival.2025.sustainability.description': 'Il nostro impegno per l\'ambiente',
  'festival.2025.green.title': 'Iniziative Green',
  'festival.2025.green.description': 'Riduciamo l\'impatto ambientale del festival',
  'festival.2025.recycling.title': 'Raccolta Differenziata',
  'festival.2025.recycling.description': 'Punti di raccolta in tutte le location',
  'festival.2025.transport_green.title': 'Mobilità Sostenibile',
  'festival.2025.transport_green.description': 'Incentivi per trasporti pubblici e biciclette',
  
  // App Mobile e Digitale
  'festival.2025.app.title': 'App del Festival',
  'festival.2025.app.description': 'Scarica l\'app ufficiale per seguire il festival',
  'festival.2025.app.features': 'Programma, mappe, notifiche e molto altro',
  'festival.2025.digital.title': 'Esperienza Digitale',
  'festival.2025.digital.description': 'Contenuti esclusivi online per chi non può partecipare',
  'festival.2025.streaming.title': 'Streaming Live',
  'festival.2025.streaming.description': 'Alcuni eventi saranno trasmessi in diretta',
  'festival.2025.social_wall.title': 'Social Wall',
  'festival.2025.social_wall.description': 'Condividi la tua esperienza con #MovieBoli2025',
  
  // Cortometraggio: Place Under Sun
  // Short films
  'shorts.place_under_sun.title': 'Place Under Sun',
  'shorts.place_under_sun.synopsis': 'Shows the beauty of the sun',
  'shorts.place_under_sun.image': 'https://i.ibb.co/35fWHz1b/FL-Poster-CHOIX-DISTRIB-EN-min.jpg',
  'shorts.place_under_sun.director': 'Alexey Evstigneev',
  'shorts.place_under_sun.duration': '12:10 minutes',
  'shorts.place_under_sun.year': '2024',
  'shorts.place_under_sun.bio': 'Alexey Evstigneev was born and raised in Shatura, Russia. He graduated in Documentary Directing from VGIK Moscow and attended Jiří Barta\'s animation workshop at the University of West Bohemia in Pilsen, Czech Republic. His graduation documentary "Golden Buttons" premiered at Vision du Réel and won the IDFA Talent Award, before being selected and awarded at numerous festivals worldwide. Alexey has also participated in CEE Animation Forum, Euro Connection, IDFA Talent Campus, Visions du Réel Lab and Fajr International Film Festival Talent Campus.',
  'shorts.place_under_sun.trailer': 'https://youtube.com/shorts/9jyX-kO4-zk?feature=share',
  'shorts.place_under_sun.unlocked': true,
  
  'shorts.fathers_letters.title': 'Father\'s Letters',
  'shorts.fathers_letters.synopsis': 'In 1934, Professor Vangengheim is sentenced to the Gulag in the Solovki islands. Pretending to embark on a great exploration journey, he writes imaginative letters to his daughter Eleonora, thus protecting her from the truth of his conviction as a "traitor to the homeland".',
  'shorts.fathers_letters.image': 'https://i.ibb.co/35fWHz1b/FL-Poster-CHOIX-DISTRIB-EN-min.jpg',
  'shorts.fathers_letters.director': 'Alexey Evstigneev',
  'shorts.fathers_letters.duration': '12:10 minutes',
  'shorts.fathers_letters.year': '2024',
  'shorts.fathers_letters.bio': 'Alexey Evstigneev was born and raised in Shatura, Russia. He graduated in Documentary Directing from VGIK Moscow and attended Jiří Barta\'s animation workshop at the University of West Bohemia in Pilsen, Czech Republic. His graduation documentary "Golden Buttons" premiered at Vision du Réel and won the IDFA Talent Award, before being selected and awarded at numerous festivals worldwide. Alexey has also participated in CEE Animation Forum, Euro Connection, IDFA Talent Campus, Visions du Réel Lab and Fajr International Film Festival Talent Campus.',
  'shorts.fathers_letters.trailer': 'https://www.youtube.com/shorts/OB5qMNHdSr0',
  'shorts.fathers_letters.unlocked': true,
  
  // Guest Management
  'admin.guests.title': 'Guest Management',
  'admin.guests.description': 'Manage festival guest content',
  'admin.guests.add': 'Add Guest',
  'admin.guests.edit': 'Edit Guest',
  'admin.guests.delete': 'Delete Guest',
  'admin.guests.save': 'Save Changes',
  
  // Guest: Alessandro Rak
  'guests.alessandro_rak.name': 'Alessandro Rak',
  'guests.alessandro_rak.bio': 'Alessandro Rak is an Italian director, screenwriter and illustrator, known for his work in animation. He co-directed animated films such as "The Art of Happiness", "Cinderella the Cat" and "Yaya and Lennie - The Walking Liberty", works that have received numerous international awards. His style blends digital animation with deep and poetic cinematic atmospheres.',
  'guests.alessandro_rak.photo': 'https://i.ibb.co/7J4jNP4h/ALESSANDRO-RAK.jpg',
  'guests.alessandro_rak.event_date': 'August 24, 2025',
  
  // Guest: Francesco Lettieri
  'guests.francesco_lettieri.name': 'Francesco Lettieri',
  'guests.francesco_lettieri.bio': 'Francesco Lettieri is an Italian director and screenwriter, best known for directing music videos for major Italian indie artists like Calcutta and Liberato. He made his cinema debut with the film "Ultras", produced by Netflix, which portrays the world of organized supporters with a raw and poetic perspective.',
  'guests.francesco_lettieri.photo': 'https://i.ibb.co/VptMKV2X/licensed-image.jpg',
  'guests.francesco_lettieri.event_date': null,
  
  // Guest: Luigi D'Oriano
  'guests.luigi_doriano.name': 'Luigi D\'Oriano',
  'guests.luigi_doriano.bio': 'Luigi D\'Oriano is an Italian film editor with experience in art films and documentaries. He has worked with both emerging and established directors, managing narrative rhythm and visual balance in his works. He is a teacher and consultant in post-production.',
  'guests.luigi_doriano.photo': 'https://i.ibb.co/zyMGPT9/LUIGI-D-ORIANO.jpg',
  'guests.luigi_doriano.event_date': 'August 22, 2025',
  
  // Guest: Giuseppe Arena
  'guests.giuseppe_arena.name': 'Giuseppe Arena',
  'guests.giuseppe_arena.bio': 'Giuseppe Arena is an Italian composer and musician, active in film and theater soundtracks. His music is characterized by evocative atmospheres and refined timbral research. He frequently collaborates with theater authors and directors in the independent scene.',
  'guests.giuseppe_arena.photo': 'https://i.ibb.co/WWDttfmZ/GIUSEPPE-ARENA.jpg',
  'guests.giuseppe_arena.event_date': 'August 22, 2025',
  
  // Guest: Emanuele Palumbo
  'guests.emanuele_palumbo.name': 'Emanuele Palumbo',
  'guests.emanuele_palumbo.bio': 'Emanuele Palumbo is an Italian director and videomaker. His work spans music videos, short films, and documentaries, with a direct and engaging visual style. He stands out for his ability to tell intimate stories with an authentic and contemporary perspective.',
  'guests.emanuele_palumbo.photo': 'https://i.ibb.co/9HtZvH3F/EMANUELE-PALUMBO.jpg',
  'guests.emanuele_palumbo.event_date': 'August 22, 2025',
  
  // Guest: Mario Martone
  'guests.mario_martone.name': 'Mario Martone',
  'guests.mario_martone.bio': 'Mario Martone (Naples, 1959) is one of the most important contemporary Italian directors, screenwriters, and theater artists. He began his artistic career founding theater groups like Nobili di Rosa and Falso Movimento, and later Teatri Uniti with Toni Servillo. After a long theater career, he gained recognition in cinema with "Death of a Neapolitan Mathematician" (1992), awarded in Venice. Among his notable films: "L\'amore molesto", "Teatro di guerra", "Noi credevamo", "Il giovane favoloso" (Leopardi\'s biography), "Capri-Revolution" and "Nostalgia" (in competition at Cannes 2022 and selected for the Oscars). He has directed important opera productions, including at Teatro alla Scala. In 2023, he created the documentary about Massimo Troisi "Laggiù qualcuno mi ama", awarded at the David di Donatello.',
  'guests.mario_martone.photo': 'https://i.ibb.co/VptMKV2X/licensed-image.jpg',
  'guests.mario_martone.event_date': 'August 23, 2025',
  
  // Film Management
  'admin.films.title': 'Film Management',
  'admin.films.description': 'Manage program film content',
  'admin.films.add': 'Add Film',
  'admin.films.edit': 'Edit Film',
  'admin.films.delete': 'Delete Film',
  'admin.films.save': 'Save Changes',
  
  // Films
  'films.mixed_by_erry.name': 'Mixed by Erry',
  'films.mixed_by_erry.bio': 'In the 80s in Naples, Enrico "Erry" Frattasio begins creating and selling counterfeit music cassettes for his friends and customers, eventually expanding the business into an international venture.',
  'films.mixed_by_erry.photo': 'https://i.ibb.co/FGby12B/image.png',
  'films.mixed_by_erry.event_date': 'August 22, 2025',
  
  'films.fuori.name': 'Outside',
  'films.fuori.bio': 'It\'s 1980, a writer ends up in prison for an unexpected act: jewelry theft. In prison, she meets other women with whom friendship and bonds develop that are difficult to understand from the outside.',
  'films.fuori.photo': 'https://i.ibb.co/9HZ9nmx2/image.png',
  'films.fuori.event_date': 'August 23, 2025',
  
  'films.arte_felicita.name': 'The Art of Happiness',
  'films.arte_felicita.bio': 'Two brothers, two continents, two lives. One soul. Under a gloomy sky, amid apocalyptic premonitions in a Naples at its peak of decay, Sergio, a taxi driver, receives shocking news.',
  'films.arte_felicita.photo': 'https://i.ibb.co/p6yxsqms/image.png',
  'films.arte_felicita.event_date': 'August 24, 2025',
  'films.arte_felicita.name': 'The Art of Happiness',
  'films.arte_felicita.bio': 'Two brothers, two continents, two lives. One soul. Under a gloomy sky, amid apocalyptic premonitions in a Naples at its peak of decay, Sergio, a taxi driver, receives shocking news.',
  'films.arte_felicita.photo': 'https://i.ibb.co/p6yxsqms/image.png',
  'films.arte_felicita.event_date': 'August 24, 2025',

  // Donations Page Content
  // Hero Section
  // Donations Page Content
  'donazioni.meta.title': 'Donazioni - Sostieni MOVIEBOLI APS',
  'donazioni.meta.description': 'Sostieni MOVIEBOLI APS con una donazione. Il tuo contributo aiuta a promuovere la cultura cinematografica e sostenere i giovani talenti del territorio.',
  'donazioni.meta.keywords': 'donazioni, sostieni, MOVIEBOLI, cinema, cultura, Eboli, associazione',
  'donazioni.meta.og_title': 'Donazioni - Sostieni MOVIEBOLI APS',
  'donazioni.meta.og_description': 'Il tuo contributo ci aiuta a promuovere la cultura cinematografica e a sostenere i giovani talenti del territorio.',

  // Hero Section
  'donazioni.hero.titolo': 'Sostieni MOVIEBOLI',
  'donazioni.hero.sottotitolo': 'Il tuo contributo fa la differenza',
  'donazioni.hero.descrizione': 'Aiutaci a promuovere la cultura cinematografica e a sostenere i giovani talenti del territorio. Ogni donazione, grande o piccola, ci permette di continuare la nostra missione.',
  'donazioni.hero.cta_primario': 'Dona Ora',
  'donazioni.hero.cta_secondario': 'Scopri Come Usiamo i Fondi',

  'donazioni.perche_donare.titolo': 'Perché Donare a MOVIEBOLI?',
'donazioni.perche_donare.descrizione': 'Il tuo sostegno ci permette di continuare a crescere e innovare nel panorama cinematografico del territorio.',
'donazioni.perche_donare.motivi': [
  {
    icona: '🎬',
    titolo: 'Promuoviamo il Cinema Indipendente',
    descrizione: 'Sosteniamo registi emergenti e diamo visibilità a opere cinematografiche innovative e di qualità.'
  },
  {
    icona: '🎓',
    titolo: 'Formiamo i Talenti del Futuro',
    descrizione: 'Organizziamo workshop, masterclass e laboratori per formare la prossima generazione di professionisti del cinema.'
  },
  {
    icona: '🌍',
    titolo: 'Valorizziamo il Territorio',
    descrizione: 'Portiamo cultura e opportunità nel nostro territorio, creando un ponte tra tradizione locale e innovazione artistica.'
  },
  {
    icona: '🤝',
    titolo: 'Creiamo Comunità',
    descrizione: 'Uniamo appassionati, professionisti e curiosi in una rete di persone che credono nel potere trasformativo del cinema.'
  }
],

// Sezione Come Usiamo - chiavi aggiuntive
'donazioni.come_usiamo.utilizzi': [
  {
    nome: 'Festival e Eventi',
    percentuale: 45,
    descrizione: 'Organizzazione del festival annuale, eventi speciali e rassegne cinematografiche',
    colore: 'bg-primary-500'
  },
  {
    nome: 'Formazione e Workshop',
    percentuale: 25,
    descrizione: 'Laboratori, masterclass e corsi di formazione per giovani talenti',
    colore: 'bg-secondary-500'
  },
  {
    nome: 'Supporto agli Artisti',
    percentuale: 20,
    descrizione: 'Borse di studio, premi e sostegno economico per registi emergenti',
    colore: 'bg-accent-500'
  },
  {
    nome: 'Gestione e Amministrazione',
    percentuale: 10,
    descrizione: 'Costi operativi, amministrazione e mantenimento delle attività',
    colore: 'bg-neutral-500'
  }
],
'donazioni.come_usiamo.trasparenza.titolo': 'Trasparenza Totale',
'donazioni.come_usiamo.trasparenza.descrizione': 'Pubblichiamo annualmente un report dettagliato sull\'utilizzo dei fondi ricevuti.',

// Sezione Dona Ora - chiavi aggiuntive
'donazioni.dona_ora.modalita.titolo': 'Modalità di Donazione',
'donazioni.dona_ora.importo.titolo': 'Scegli l\'Importo',
'donazioni.dona_ora.importo.personalizzato_placeholder': 'Inserisci importo personalizzato',
'donazioni.dona_ora.pagamento.titolo': 'Metodo di Pagamento',
'donazioni.dona_ora.metodi_pagamento': [
  {
    id: 'carta',
    nome: 'Carta di Credito',
    descrizione: 'Visa, Mastercard, American Express',
    icon: '💳'
  },
  {
    id: 'paypal',
    nome: 'PayPal',
    descrizione: 'Pagamento sicuro tramite PayPal',
    icon: '🅿️'
  },
  {
    id: 'bonifico',
    nome: 'Bonifico Bancario',
    descrizione: 'Trasferimento diretto sul nostro conto',
    icon: '🏦'
  }
],
'donazioni.dona_ora.cta': 'Dona',
'donazioni.dona_ora.cta_disabilitato': 'Seleziona un importo',
'donazioni.dona_ora.note_sicurezza': 'I tuoi dati sono protetti con crittografia SSL. La donazione è sicura al 100%.',

// Sezione IBAN - struttura corretta
'donazioni.iban': {
  titolo: 'Donazione tramite Bonifico Bancario',
  descrizione: 'Puoi effettuare una donazione anche tramite bonifico bancario utilizzando i seguenti dati:',
  dati_bancari: {
    titolo: 'Dati Bancari',
    intestatario_label: 'Intestatario',
    intestatario: 'MOVIEBOLI APS',
    iban_label: 'IBAN',
    iban: 'IT60 X054 2811 1010 0000 0123 456',
    banca_label: 'Banca',
    banca: 'Banca di Credito Cooperativo',
    copiato_messaggio: 'IBAN copiato negli appunti!'
  },
  istruzioni: {
    titolo: 'Istruzioni',
    causale: {
      titolo: 'Causale',
      testo: 'Inserisci una causale per identificare la donazione.',
      esempio: 'Donazione MOVIEBOLI APS'
    },
    ricevuta: {
      titolo: 'Ricevuta Fiscale',
      testo: 'Riceverai una ricevuta fiscale per la tua donazione.'
    },
    detraibilita: {
      titolo: 'Detraibilità',
      testo: 'La donazione è detraibile fiscalmente secondo le normative vigenti.'
    }
  }
},

  // Other Ways Section
  'donazioni.altri_modi.titolo': 'Altri Modi per Sostenerci',
  'donazioni.altri_modi.sottotitolo': 'Scopri tutte le modalità per supportare MOVIEBOLI APS',
  'donazioni.altri_modi.opzioni': [
    {
      icona: '📋',
      titolo: '5x1000',
      descrizione: 'Destina il tuo 5x1000 a MOVIEBOLI APS. È gratuito e non ti costa nulla.',
      codice_fiscale: '12345678901',
      link: '#5x1000'
    },
    {
      icona: '💝',
      titolo: 'Donazioni in Memoria',
      descrizione: 'Fai una donazione in memoria di una persona cara.',
      link: '#memoria'
    },
    {
      icona: '🎁',
      titolo: 'Donazioni Aziendali',
      descrizione: 'La tua azienda può sostenere MOVIEBOLI e ottenere vantaggi fiscali.',
      link: '#aziendali'
    },
    {
      icona: '⏰',
      titolo: 'Volontariato',
      descrizione: 'Dona il tuo tempo e le tue competenze come volontario.',
      link: '#volontariato'
    }
  ],

  // Testimonials Section
  'donazioni.testimonianze.titolo': 'Cosa Dicono i Nostri Sostenitori',
  'donazioni.testimonianze.sottotitolo': 'Le parole di chi ha scelto di sostenerci',
  'donazioni.testimonianze.lista': [
    {
      nome: 'Maria Rossi',
      ruolo: 'Sostenitrice dal 2022',
      testo: 'MOVIEBOLI rappresenta un\'eccellenza nel panorama culturale del territorio. Sono orgogliosa di sostenerli.',
      foto: '/images/testimonial-1.jpg'
    },
    {
      nome: 'Giuseppe Verdi',
      ruolo: 'Regista',
      testo: 'Grazie a MOVIEBOLI ho avuto l\'opportunità di mostrare il mio lavoro e crescere come artista.',
      foto: '/images/testimonial-2.jpg'
    },
    {
      nome: 'Anna Bianchi',
      ruolo: 'Volontaria',
      testo: 'Essere parte di questa comunità mi ha arricchito umanamente e professionalmente.',
      foto: '/images/testimonial-3.jpg'
    }
  ],

  // Meta tags
  'donations.meta.title': 'Donazioni - Sostieni MOVIEBOLI APS',
  'donations.meta.description': 'Sostieni MOVIEBOLI APS con una donazione. Il tuo contributo aiuta a promuovere la cultura cinematografica e sostenere i giovani talenti del territorio.',
  'donations.meta.keywords': 'donazioni, sostieni, MOVIEBOLI, cinema, cultura, Eboli, associazione'
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
  
  // Durante SSR, restituisci un oggetto mock invece di lanciare un errore
  if (typeof window === 'undefined' && !context) {
    return {
      content: {},
      loading: false,
      error: null,
      getContent: (key, defaultValue = '') => defaultValue,
      updateContent: async () => ({ success: false }),
      loadContent: () => {}
    };
  }
  
  if (!context) {
    throw new Error('useContent deve essere utilizzato all\'interno di un ContentProvider');
  }
  return context;
};