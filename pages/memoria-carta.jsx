'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import EditableText from '../components/EditableText'

const MemoriaCarta = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tutti')
  const [searchTerm, setSearchTerm] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [savedItems, setSavedItems] = useState(new Set())

  // Gestione scroll per effetti
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dati della memoria carta (archivio digitale)
  const memoriaItems = [
    {
      id: 1,
      titolo: "Manifesto MOVIEBOLI 2023",
      categoria: "Manifesti",
      anno: "2023",
      descrizione: "Manifesto ufficiale della prima edizione del festival cinematografico MOVIEBOLI.",
      formato: "PDF",
      dimensioni: "70x100 cm",
      colore: "Quadricromia",
      tags: ["festival", "cinema", "manifesto", "2023"]
    },
    {
      id: 2,
      titolo: "Programma Festival 2023",
      categoria: "Programmi",
      anno: "2023",
      descrizione: "Programma completo degli eventi e proiezioni del festival 2023.",
      formato: "PDF",
      dimensioni: "A4",
      colore: "Quadricromia",
      tags: ["programma", "eventi", "proiezioni", "2023"]
    },
    {
      id: 3,
      titolo: "Locandina Cortometraggi",
      categoria: "Locandine",
      anno: "2023",
      descrizione: "Locandina promozionale per la sezione cortometraggi in concorso.",
      formato: "PDF",
      dimensioni: "50x70 cm",
      colore: "Quadricromia",
      tags: ["cortometraggi", "concorso", "locandina"]
    },
    {
      id: 4,
      titolo: "Brochure Istituzionale",
      categoria: "Brochure",
      anno: "2023",
      descrizione: "Brochure di presentazione dell'associazione MOVIEBOLI e delle sue attività.",
      formato: "PDF",
      dimensioni: "A5",
      colore: "Quadricromia",
      tags: ["istituzionale", "associazione", "attività"]
    },
    {
      id: 5,
      titolo: "Biglietti Festival",
      categoria: "Biglietti",
      anno: "2023",
      descrizione: "Design dei biglietti d'ingresso per le proiezioni del festival.",
      formato: "PDF",
      dimensioni: "10x5 cm",
      colore: "Quadricromia",
      tags: ["biglietti", "ingresso", "proiezioni"]
    },
    {
      id: 6,
      titolo: "Cartoline Promozionali",
      categoria: "Cartoline",
      anno: "2023",
      descrizione: "Serie di cartoline promozionali per la diffusione del festival.",
      formato: "PDF",
      dimensioni: "15x10 cm",
      colore: "Quadricromia",
      tags: ["cartoline", "promozionale", "diffusione"]
    }
  ]

  const categories = ['Tutti', 'Manifesti', 'Programmi', 'Locandine', 'Brochure', 'Biglietti', 'Cartoline']

  // Filtro items
  const filteredItems = memoriaItems.filter(item => {
    const matchesCategory = selectedCategory === 'Tutti' || item.categoria === selectedCategory
    const matchesSearch = item.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.descrizione.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Gestione salvataggio
  const toggleSave = (itemId) => {
    const newSavedItems = new Set(savedItems)
    if (newSavedItems.has(itemId)) {
      newSavedItems.delete(itemId)
    } else {
      newSavedItems.add(itemId)
    }
    setSavedItems(newSavedItems)
  }

  // Varianti animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-movieboli-nero text-movieboli-crema">
      <Head>
        <title><EditableText contentKey="memoria_carta_page_title" defaultText="Memoria Carta - MOVIEBOLI Festival" /></title>
        <meta name="description" content={<EditableText contentKey="memoria_carta_page_description" defaultText="Archivio digitale dei materiali grafici e promozionali del MOVIEBOLI Festival" />} />
        <meta name="keywords" content={<EditableText contentKey="memoria_carta_page_keywords" defaultText="memoria carta, archivio, manifesti, programmi, MOVIEBOLI, festival" />} />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-16 px-4 bg-gradient-to-br from-movieboli-nero via-movieboli-bordeaux/10 to-movieboli-nero overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Elementi decorativi */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-movieboli-violaPrincipale/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-movieboli-crema/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-movieboli-violaPrincipale/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-movieboli-violaPrincipale via-movieboli-crema to-movieboli-violaPrincipale bg-clip-text text-transparent">
              <EditableText contentKey="memoria_carta_hero_title" defaultText="Memoria Carta" />
            </h1>
            <p className="text-xl md:text-2xl text-movieboli-crema/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              <EditableText contentKey="memoria_carta_hero_subtitle" defaultText="Archivio digitale dei materiali grafici e promozionali del MOVIEBOLI Festival" />
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 text-movieboli-crema/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
              </svg>
              <span>{memoriaItems.length} <EditableText contentKey="memoria_carta_documents_label" defaultText="documenti archiviati" /></span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span><EditableText contentKey="memoria_carta_materials_period" defaultText="Materiali dal 2023" /></span>
            </div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-movieboli-violaPrincipale to-movieboli-crema mx-auto" />
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione Filtri e Ricerca */}
      <motion.section 
        className="py-12 px-4 bg-movieboli-bordeaux/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Barra di ricerca */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={<EditableText contentKey="memoria_carta_search_placeholder" defaultText="Cerca nei documenti..." />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-movieboli-bordeaux/20 border border-movieboli-violaPrincipale/30 rounded-xl text-movieboli-crema placeholder-movieboli-crema/50 focus:outline-none focus:border-movieboli-violaPrincipale focus:ring-2 focus:ring-movieboli-violaPrincipale/20 transition-all duration-200"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-movieboli-crema/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtri categorie */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-movieboli-violaPrincipale text-movieboli-nero'
                    : 'bg-movieboli-bordeaux/20 text-movieboli-crema/80 hover:bg-movieboli-violaPrincipale/20 hover:text-movieboli-violaPrincipale'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sezione Archivio */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-movieboli-nero via-movieboli-bordeaux/5 to-movieboli-nero"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-movieboli-violaPrincipale">
              <EditableText contentKey="memoria_carta_archive_title" defaultText="Archivio Documenti" />
            </h2>
            <p className="text-movieboli-crema/80 text-lg max-w-2xl mx-auto">
              <EditableText contentKey="memoria_carta_archive_description" defaultText="Esplora la collezione completa dei materiali grafici del festival" />
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory + searchTerm}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredItems.map((item) => {
                const isSaved = savedItems.has(item.id)
                
                return (
                  <motion.div
                    key={item.id}
                    className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    {/* Badge Categoria */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
                        {item.categoria}
                      </span>
                    </div>

                    {/* Bottone Salva */}
                    <div className="absolute top-4 right-4 z-10">
                      <motion.button
                        onClick={() => toggleSave(item.id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          isSaved
                            ? 'bg-movieboli-violaPrincipale text-movieboli-nero'
                            : 'bg-movieboli-bordeaux/40 text-movieboli-crema/70 hover:bg-movieboli-violaPrincipale/20'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Anteprima Documento */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center">
                        <div className="text-center text-movieboli-crema/60">
                          <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm">{item.formato}</p>
                          <p className="text-xs text-movieboli-crema/40">{item.dimensioni}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
                    </div>

                    {/* Contenuto Card */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
                        {item.titolo}
                      </h3>
                      <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-3">
                        <span>{item.anno}</span>
                        <span>{item.colore}</span>
                      </div>
                      <p className="text-movieboli-crema/80 text-sm mb-4 line-clamp-3">
                        {item.descrizione}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-movieboli-violaPrincipale/10 text-movieboli-violaPrincipale text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Bottoni Azione */}
                      <div className="flex gap-3">
                        <motion.button
                          className="flex-1 py-2 px-4 bg-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale/80 text-movieboli-nero font-medium rounded-xl transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Visualizza</span>
                          </div>
                        </motion.button>
                        <motion.button
                          className="py-2 px-4 bg-movieboli-bordeaux/20 hover:bg-movieboli-bordeaux/30 text-movieboli-crema border border-movieboli-violaPrincipale/30 rounded-xl transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Messaggio nessun risultato */}
          {filteredItems.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-movieboli-crema mb-2">
                <EditableText contentKey="memoria_carta_no_results_title" defaultText="Nessun documento trovato" />
              </h3>
              <p className="text-movieboli-crema/60">
                <EditableText contentKey="memoria_carta_no_results_description" defaultText="Prova a modificare i filtri o il termine di ricerca" />
              </p>
            </motion.div>
          )}

          {/* Informazioni Archivio */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="bg-movieboli-bordeaux/20 rounded-2xl p-8 max-w-3xl mx-auto border border-movieboli-violaPrincipale/20">
              <h3 className="text-2xl font-bold text-movieboli-violaPrincipale mb-4">
                <EditableText contentKey="memoria_carta_info_title" defaultText="Informazioni sull'Archivio" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-movieboli-crema/80">
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">
                    <EditableText contentKey="memoria_carta_info_digital" defaultText="Tutti i documenti sono in formato digitale ad alta risoluzione" />
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-sm">
                    <EditableText contentKey="memoria_carta_info_protected" defaultText="Archivio protetto e costantemente aggiornato" />
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <p className="text-sm">
                    <EditableText contentKey="memoria_carta_info_share" defaultText="Condividi e scarica i materiali per uso promozionale" />
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-movieboli-violaPrincipale/10 rounded-xl">
                <p className="text-sm text-movieboli-crema/70">
                  <strong><EditableText contentKey="memoria_carta_note_label" defaultText="Nota:" /></strong> <EditableText contentKey="memoria_carta_note_text" defaultText="Tutti i materiali sono proprietà intellettuale di MOVIEBOLI. L'uso è consentito per scopi promozionali e informativi del festival." />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default MemoriaCarta