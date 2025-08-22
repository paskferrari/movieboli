// Script per analizzare le prenotazioni e calcolare i posti realmente disponibili
const fs = require('fs');

// Leggi il file delle prenotazioni
const bookingsData = JSON.parse(fs.readFileSync('./logTabellaPrenotazioni.json', 'utf8'));

// Mappatura eventi legacy ai nuovi ID podcast
const legacyEventMapping = {
  '22-agosto': 'podcast-mixed-by-erry-2025',        // Mixed by Erry
  '23-agosto-sera': 'podcast-mario-martone-2025',   // Mario Martone  
  '24-agosto': 'podcast-alessandro-rak-2025'        // Alessandro Rak
};

// Conta prenotazioni per evento
const eventCounts = {};

bookingsData.forEach(booking => {
  if (booking.stato === 'confermata') {
    let eventoId = booking.evento_id;
    
    // Mappa eventi legacy ai nuovi ID
    if (legacyEventMapping[eventoId]) {
      eventoId = legacyEventMapping[eventoId];
    }
    
    // Conta solo eventi podcast
    if (eventoId.startsWith('podcast-')) {
      if (!eventCounts[eventoId]) {
        eventCounts[eventoId] = 0;
      }
      eventCounts[eventoId]++;
    }
  }
});

console.log('=== ANALISI PRENOTAZIONI PODCAST ===');
console.log('Posti totali per evento: 25');
console.log('');

Object.keys(eventCounts).forEach(eventoId => {
  const prenotati = eventCounts[eventoId];
  const disponibili = Math.max(0, 25 - prenotati);
  const status = disponibili === 0 ? 'SOLD OUT' : 'ATTIVO';
  
  console.log(`${eventoId}:`);
  console.log(`  - Prenotazioni confermate: ${prenotati}`);
  console.log(`  - Posti disponibili: ${disponibili}`);
  console.log(`  - Status: ${status}`);
  console.log('');
});

// Genera SQL per aggiornare il database
console.log('=== SQL PER AGGIORNARE DATABASE ===');
Object.keys(eventCounts).forEach(eventoId => {
  const prenotati = eventCounts[eventoId];
  const disponibili = Math.max(0, 25 - prenotati);
  const status = disponibili === 0 ? 'sold_out' : 'attivo';
  
  console.log(`UPDATE podcast_eventi SET`);
  console.log(`  posti_prenotati = ${prenotati},`);
  console.log(`  posti_disponibili = ${disponibili},`);
  console.log(`  stato_evento = '${status}',`);
  console.log(`  ultimo_aggiornamento_posti = NOW()`);
  console.log(`WHERE evento_id = '${eventoId}';`);
  console.log('');
});

console.log('=== EVENTI NON TROVATI (potrebbero essere nuovi) ===');
const allPodcastEvents = ['podcast-mixed-by-erry-2025', 'podcast-mario-martone-2025', 'podcast-alessandro-rak-2025'];
allPodcastEvents.forEach(eventoId => {
  if (!eventCounts[eventoId]) {
    console.log(`${eventoId}: Nessuna prenotazione trovata`);
  }
});