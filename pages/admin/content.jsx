import React, { useState, useEffect } from 'react';
import AdminRoute from '../../components/auth/AdminRoute';
import { useContent } from '../../contexts/ContentContext';
import { supabase, isDemoMode } from '../../lib/supabase';

// Organizzazione dei contenuti per sezioni del sito
const siteStructure = {
  'homepage': {
    title: '🏠 Homepage',
    description: 'Contenuti della pagina principale',
    icon: '🏠',
    color: 'bg-blue-50 border-blue-200',
    sections: {
      'hero': {
        title: 'Hero Section',
        keys: ['homepage.hero.title', 'homepage.hero.subtitle', 'homepage.hero.description', 'homepage.hero.cta1', 'homepage.hero.cta2']
      },
      'about': {
        title: 'Chi Siamo',
        keys: ['homepage.about.title', 'homepage.about.mission.title', 'homepage.about.mission.p1', 'homepage.about.mission.p2', 'homepage.about.cta', 'homepage.about.since', 'homepage.about.since.description']
      },
      'activities': {
        title: 'Cosa Facciamo',
        keys: ['homepage.activities.title', 'homepage.activities.description', 'homepage.activities.festival.title', 'homepage.activities.festival.description', 'homepage.activities.podcast.title', 'homepage.activities.podcast.description', 'homepage.activities.workshops.title', 'homepage.activities.workshops.description', 'homepage.activities.cta']
      },
      'volunteer': {
        title: 'Volontariato',
        keys: ['homepage.volunteer.title', 'homepage.volunteer.description', 'homepage.volunteer.cta1', 'homepage.volunteer.cta2']
      },
      'festival': {
        title: 'Festival Teaser',
        keys: ['homepage.festival.title', 'homepage.festival.description', 'homepage.festival.days', 'homepage.festival.days.description', 'homepage.festival.films', 'homepage.festival.films.description', 'homepage.festival.events', 'homepage.festival.events.description', 'homepage.festival.cta']
      }
    }
  },
  'navigation': {
    title: '🧭 Navigazione',
    description: 'Menu e link di navigazione',
    icon: '🧭',
    color: 'bg-green-50 border-green-200',
    sections: {
      'main': {
        title: 'Menu Principale',
        keys: ['nav.home', 'nav.about', 'nav.podcast', 'nav.festival', 'nav.donations', 'nav.activities', 'nav.program', 'nav.vote', 'nav.book']
      },
      'festival': {
        title: 'Navigazione Festival',
        keys: ['festival.nav.title', 'festival.nav.shorts', 'festival.nav.guests', 'festival.nav.program', 'festival.nav.vote']
      }
    }
  },
  'festival': {
    title: '🎬 Festival',
    description: 'Pagine e contenuti del festival',
    icon: '🎬',
    color: 'bg-purple-50 border-purple-200',
    sections: {
      'general': {
        title: 'Informazioni Generali',
        keys: ['festival.title', 'festival.subtitle', 'festival.description', 'festival.dates', 'festival.location', 'festival.competition.title', 'festival.competition.description', 'festival.competition.back', 'festival.shorts.title']
      },
      'program': {
        title: 'Programma',
        keys: ['program.title', 'program.subtitle', 'program.download.title', 'program.download.description', 'program.download.button', 'program.loading.message']
      },
      'guests': {
        title: 'Ospiti',
        keys: ['guests.title', 'guests.subtitle', 'guests.back', 'guests.day1', 'guests.day2', 'guests.day3', 'guests.dates', 'guests.loading.message']
      },
      'vote': {
        title: 'Sistema di Voto',
        keys: ['vote.title', 'vote.subtitle', 'vote.login_required', 'vote.rating.label', 'vote.submit', 'vote.success', 'vote.error', 'vote.rating_system', 'vote.back_to_festival', 'vote.success_title', 'vote.success_message', 'vote.remove_vote', 'vote.watch_trailer', 'vote.loading.message']
      },
      'events': {
        title: 'Tipi di Eventi',
        keys: ['event.type.apertura', 'event.type.film', 'event.type.cortometraggi', 'event.type.talk', 'event.type.panel', 'event.type.masterclass', 'event.type.workshop', 'event.type.incontro', 'event.type.aperitivo', 'event.type.premiazione', 'event.type.festa', 'event.type.evento']
      },
      'meta': {
        title: 'Meta Tags',
        keys: ['festival.meta.title', 'festival.meta.description', 'guests.meta.title', 'guests.meta.description', 'program.meta.title', 'program.meta.description', 'vote.meta.title', 'vote.meta.description']
      },
      'loading': {
        title: 'Messaggi di Caricamento',
        keys: ['festival.loading.title', 'festival.loading.message']
      }
    }
  },
  'activities': {
    title: '🎭 Attività',
    description: 'Sezioni delle attività dell\'associazione',
    icon: '🎭',
    color: 'bg-orange-50 border-orange-200',
    sections: {
      'main': {
        title: 'Sezione Principale',
        keys: ['activities.section.title', 'activities.section.description', 'activities.cta.all', 'activities.cta.discover']
      },
      'festival_activity': {
        title: 'Festival del Cortometraggio',
        keys: ['activities.festival.title', 'activities.festival.description']
      },
      'podcast': {
        title: 'Podcast',
        keys: ['activities.podcast.title', 'activities.podcast.description']
      },
      'workshops': {
        title: 'Workshop e Laboratori',
        keys: ['activities.workshop.title', 'activities.workshop.description']
      },
      'screenings': {
        title: 'Proiezioni Speciali',
        keys: ['activities.screenings.title', 'activities.screenings.description']
      },
      'meetings': {
        title: 'Incontri con Autori',
        keys: ['activities.meetings.title', 'activities.meetings.description']
      },
      'education': {
        title: 'Progetti Educativi',
        keys: ['activities.education.title', 'activities.education.description']
      }
    }
  },
  'podcast': {
    title: '🎙️ Podcast',
    description: 'Contenuti del podcast Ciliegie',
    icon: '🎙️',
    color: 'bg-red-50 border-red-200',
    sections: {
      'main': {
        title: 'Sezione Principale',
        keys: ['podcast.section.title', 'podcast.section.description', 'podcast.cta.all']
      },
      'episodes': {
        title: 'Episodi',
        keys: ['podcast.episode.12.title', 'podcast.episode.12.guest', 'podcast.episode.12.duration', 'podcast.episode.12.date', 'podcast.episode.11.title', 'podcast.episode.11.guest', 'podcast.episode.11.duration', 'podcast.episode.11.date', 'podcast.episode.10.title', 'podcast.episode.10.guest', 'podcast.episode.10.duration', 'podcast.episode.10.date']
      }
    }
  },
  'about': {
    title: '👥 Chi Siamo',
    description: 'Pagina e contenuti about',
    icon: '👥',
    color: 'bg-teal-50 border-teal-200',
    sections: {
      'main': {
        title: 'Sezione Principale',
        keys: ['about.title', 'about.subtitle']
      },
      'story': {
        title: 'La Nostra Storia',
        keys: ['about.story.title', 'about.story.p1', 'about.story.p2', 'about.story.p3']
      },
      'mission': {
        title: 'Missione',
        keys: ['mission.title', 'mission.description']
      }
    }
  },
  'footer': {
    title: '🦶 Footer',
    description: 'Contenuti del footer del sito',
    icon: '🦶',
    color: 'bg-gray-50 border-gray-200',
    sections: {
      'main': {
        title: 'Informazioni Principali',
        keys: ['footer.copyright', 'footer.description', 'footer.quote']
      },
      'sections': {
        title: 'Sezioni Footer',
        keys: ['footer.links.title', 'footer.contact.title', 'footer.newsletter.title']
      },
      'newsletter': {
        title: 'Newsletter',
        keys: ['footer.newsletter.description', 'footer.newsletter.button', 'footer.newsletter.placeholder']
      }
    }
  },
  'contact': {
    title: '📞 Contatti',
    description: 'Informazioni di contatto',
    icon: '📞',
    color: 'bg-indigo-50 border-indigo-200',
    sections: {
      'main': {
        title: 'Informazioni di Contatto',
        keys: ['contact.address', 'contact.city', 'contact.phone', 'contact.email', 'contact.website']
      }
    }
  },
  'ui': {
    title: '🎨 Interfaccia',
    description: 'Elementi dell\'interfaccia utente',
    icon: '🎨',
    color: 'bg-pink-50 border-pink-200',
    sections: {
      'buttons': {
        title: 'Pulsanti',
        keys: ['button.discover', 'button.participate', 'button.vote', 'button.book', 'button.register', 'button.login', 'button.save', 'button.cancel', 'button.edit', 'button.delete', 'button.add']
      },
      'status': {
        title: 'Messaggi di Stato',
        keys: ['status.loading', 'status.error', 'status.success', 'status.coming_soon', 'status.in_progress', 'status.completed']
      },
      'forms': {
        title: 'Moduli',
        keys: ['form.name', 'form.email', 'form.message', 'form.submit', 'form.required']
      }
    }
  },
  'admin': {
    title: '⚙️ Amministrazione',
    description: 'Contenuti dell\'area admin',
    icon: '⚙️',
    color: 'bg-yellow-50 border-yellow-200',
    sections: {
      'main': {
        title: 'Pannello Admin',
        keys: ['admin.title', 'admin.content.title', 'admin.content.description', 'admin.add_content', 'admin.edit', 'admin.save', 'admin.cancel']
      },
      'maintenance': {
        title: 'Manutenzione',
        keys: ['maintenance.title', 'maintenance.message', 'maintenance.thanks']
      }
    }
  },
  'archive': {
    title: '📚 Archivio',
    description: 'Edizioni passate e archivio',
    icon: '📚',
    color: 'bg-emerald-50 border-emerald-200',
    sections: {
      'main': {
        title: 'Edizioni Passate',
        keys: ['past_editions.title', 'past_editions.description', 'past_editions.cta.discover', 'past_editions.cta.archive']
      },
      'editions': {
        title: 'Singole Edizioni',
        keys: ['past_editions.2023.title', 'past_editions.2023.description', 'past_editions.2022.title', 'past_editions.2022.description', 'past_editions.2021.title', 'past_editions.2021.description']
      }
    }
  }
};

const ContentManagement = () => {
  const { content, updateContent, getContent } = useContent();
  const [activeSection, setActiveSection] = useState('homepage');
  const [activeSubsection, setActiveSubsection] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState({ key: '', value: '' });

  const handleSave = async (key, value) => {
    const result = await updateContent(key, value);
    if (result.success) {
      setEditingKey(null);
    }
  };

  const handleAddNew = async () => {
    if (!newContent.key || !newContent.value) return;
    
    const result = await updateContent(newContent.key, newContent.value);
    if (result.success) {
      setNewContent({ key: '', value: '' });
      setShowAddForm(false);
    }
  };

  const filteredSections = Object.entries(siteStructure).filter(([key, section]) => {
    if (!searchTerm) return true;
    return section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           section.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentSection = siteStructure[activeSection];
  const currentSubsection = activeSubsection ? currentSection?.sections[activeSubsection] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🎬 Gestione Contenuti Sito</h1>
              <p className="text-gray-600 mt-1">Modifica tutti i contenuti testuali organizzati per sezioni</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca sezioni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>➕</span>
                Aggiungi Contenuto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Sezioni */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-semibold text-gray-900">Sezioni del Sito</h2>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredSections.map(([key, section]) => (
                  <div key={key}>
                    <button
                      onClick={() => {
                        setActiveSection(key);
                        setActiveSubsection(null);
                      }}
                      className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors ${
                        activeSection === key ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{section.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{section.title}</div>
                          <div className="text-sm text-gray-500">{section.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {Object.keys(section.sections).length} sottosezioni
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentSection && (
              <div className="space-y-6">
                {/* Sezione Header */}
                <div className={`rounded-lg border-2 p-6 ${currentSection.color}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{currentSection.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentSection.title}</h2>
                      <p className="text-gray-600">{currentSection.description}</p>
                    </div>
                  </div>
                </div>

                {/* Sottosezioni */}
                <div className="grid gap-4">
                  {Object.entries(currentSection.sections).map(([subKey, subsection]) => (
                    <div key={subKey} className="bg-white rounded-lg shadow-sm border">
                      <button
                        onClick={() => setActiveSubsection(activeSubsection === subKey ? null : subKey)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{subsection.title}</h3>
                            <p className="text-sm text-gray-500">{subsection.keys.length} contenuti</p>
                          </div>
                          <span className={`transform transition-transform ${
                            activeSubsection === subKey ? 'rotate-180' : ''
                          }`}>
                            ⬇️
                          </span>
                        </div>
                      </button>
                      
                      {activeSubsection === subKey && (
                        <div className="p-4 space-y-4">
                          {subsection.keys.map((key) => (
                            <div key={key} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="font-mono text-sm text-blue-600 mb-2">{key}</div>
                                  {editingKey === key ? (
                                    <textarea
                                      defaultValue={getContent(key)}
                                      onBlur={(e) => handleSave(key, e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.ctrlKey) {
                                          handleSave(key, e.target.value);
                                        }
                                        if (e.key === 'Escape') {
                                          setEditingKey(null);
                                        }
                                      }}
                                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      rows={3}
                                      autoFocus
                                    />
                                  ) : (
                                    <div 
                                      className="text-gray-900 cursor-pointer hover:bg-gray-100 p-2 rounded"
                                      onClick={() => setEditingKey(key)}
                                    >
                                      {getContent(key) || <span className="text-gray-400 italic">Valore non impostato</span>}
                                    </div>
                                  )}
                                </div>
                                <button
                                  onClick={() => setEditingKey(key)}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  ✏️ Modifica
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Aggiungi Contenuto */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Aggiungi Nuovo Contenuto</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Chiave (es: homepage.hero.new_title)"
                value={newContent.key}
                onChange={(e) => setNewContent(prev => ({ ...prev, key: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Valore del contenuto"
                value={newContent.value}
                onChange={(e) => setNewContent(prev => ({ ...prev, value: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddNew}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                ✅ Salva
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                ❌ Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentManagementPage = () => {
  return (
    <AdminRoute>
      <ContentManagement />
    </AdminRoute>
  );
};

export default ContentManagementPage;