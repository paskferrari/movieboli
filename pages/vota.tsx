import Head from 'next/head'
import Layout from '../components/Layout'
import { useState } from 'react'

export default function Vota() {
  const [selectedCategory, setSelectedCategory] = useState('miglior-film')
  const [votes, setVotes] = useState<{[key: string]: string}>({})
  const [hasVoted, setHasVoted] = useState(false)

  const categories = [
    { id: 'miglior-film', name: 'Miglior Film', icon: '🎬' },
    { id: 'miglior-regia', name: 'Miglior Regia', icon: '🎭' },
    { id: 'miglior-attore', name: 'Miglior Attore', icon: '🎪' },
    { id: 'miglior-attrice', name: 'Miglior Attrice', icon: '⭐' },
    { id: 'miglior-sceneggiatura', name: 'Miglior Sceneggiatura', icon: '📝' },
    { id: 'premio-pubblico', name: 'Premio del Pubblico', icon: '❤️' }
  ]

  const nominees = {
    'miglior-film': [
      { id: 'film1', title: 'Luci della Città', director: 'Marco Rossi', country: 'Italia' },
      { id: 'film2', title: 'Memorie di Pietra', director: 'Anna Verdi', country: 'Francia' },
      { id: 'film3', title: 'Il Vento del Sud', director: 'Giuseppe Bianchi', country: 'Spagna' },
      { id: 'film4', title: 'Oltre il Confine', director: 'Maria Neri', country: 'Germania' }
    ],
    'miglior-regia': [
      { id: 'dir1', title: 'Marco Rossi', subtitle: 'per "Luci della Città"', country: 'Italia' },
      { id: 'dir2', title: 'Anna Verdi', subtitle: 'per "Memorie di Pietra"', country: 'Francia' },
      { id: 'dir3', title: 'Giuseppe Bianchi', subtitle: 'per "Il Vento del Sud"', country: 'Spagna' },
      { id: 'dir4', title: 'Maria Neri', subtitle: 'per "Oltre il Confine"', country: 'Germania' }
    ],
    'miglior-attore': [
      { id: 'act1', title: 'Luca Ferrari', subtitle: 'in "Luci della Città"', country: 'Italia' },
      { id: 'act2', title: 'Pierre Dubois', subtitle: 'in "Memorie di Pietra"', country: 'Francia' },
      { id: 'act3', title: 'Carlos Martinez', subtitle: 'in "Il Vento del Sud"', country: 'Spagna' },
      { id: 'act4', title: 'Hans Mueller', subtitle: 'in "Oltre il Confine"', country: 'Germania' }
    ],
    'miglior-attrice': [
      { id: 'act5', title: 'Sofia Romano', subtitle: 'in "Luci della Città"', country: 'Italia' },
      { id: 'act6', title: 'Claire Moreau', subtitle: 'in "Memorie di Pietra"', country: 'Francia' },
      { id: 'act7', title: 'Isabella Garcia', subtitle: 'in "Il Vento del Sud"', country: 'Spagna' },
      { id: 'act8', title: 'Emma Schmidt', subtitle: 'in "Oltre il Confine"', country: 'Germania' }
    ],
    'miglior-sceneggiatura': [
      { id: 'scr1', title: 'Marco Rossi & Elena Blu', subtitle: 'per "Luci della Città"', country: 'Italia' },
      { id: 'scr2', title: 'Anna Verdi', subtitle: 'per "Memorie di Pietra"', country: 'Francia' },
      { id: 'scr3', title: 'Giuseppe Bianchi & Team', subtitle: 'per "Il Vento del Sud"', country: 'Spagna' },
      { id: 'scr4', title: 'Maria Neri', subtitle: 'per "Oltre il Confine"', country: 'Germania' }
    ],
    'premio-pubblico': [
      { id: 'pub1', title: 'Luci della Città', director: 'Marco Rossi', country: 'Italia' },
      { id: 'pub2', title: 'Memorie di Pietra', director: 'Anna Verdi', country: 'Francia' },
      { id: 'pub3', title: 'Il Vento del Sud', director: 'Giuseppe Bianchi', country: 'Spagna' },
      { id: 'pub4', title: 'Oltre il Confine', director: 'Maria Neri', country: 'Germania' }
    ]
  }

  const handleVote = (categoryId: string, nomineeId: string) => {
    setVotes({
      ...votes,
      [categoryId]: nomineeId
    })
  }

  const handleSubmitVotes = () => {
    // Qui andrà la logica per l'invio dei voti
    setHasVoted(true)
    alert('Grazie per aver votato! I tuoi voti sono stati registrati.')
  }

  const currentNominees = nominees[selectedCategory as keyof typeof nominees] || []
  const totalVotes = Object.keys(votes).length
  const totalCategories = categories.length

  if (hasVoted) {
    return (
      <>
        <Head>
          <title>Voto Completato - MoviEboli Film Festival</title>
        </Head>
        
        <Layout>
          <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-bebas text-4xl text-festival-dark mb-4">
                Grazie per aver votato!
              </h1>
              <p className="text-gray-600 mb-8">
                I tuoi voti sono stati registrati con successo. I risultati saranno annunciati 
                durante la cerimonia di chiusura del festival.
              </p>
              <button 
                onClick={() => setHasVoted(false)}
                className="bg-festival-primary text-white px-6 py-3 rounded-lg hover:bg-festival-primary/90 transition-colors"
              >
                Vota di Nuovo
              </button>
            </div>
          </div>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Vota i Tuoi Preferiti - MoviEboli Film Festival</title>
        <meta 
          name="description" 
          content="Vota i tuoi film e artisti preferiti del MoviEboli Film Festival. La tua opinione conta!"
        />
        <meta name="keywords" content="voto, festival, cinema, MoviEboli, premi, concorso" />
      </Head>
      
      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-festival-primary to-festival-secondary py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="font-bebas text-5xl md:text-7xl text-white mb-6 tracking-wide">
                  Vota i Tuoi Preferiti
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  La tua opinione conta! Vota nelle diverse categorie del festival
                </p>
              </div>
            </div>
          </section>

          {/* Voting Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Categories Sidebar */}
                  <div className="lg:col-span-1">
                    <h2 className="font-staatliches text-2xl text-festival-dark mb-6">
                      Categorie
                    </h2>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                            selectedCategory === category.id
                              ? 'bg-festival-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              {votes[category.id] && (
                                <div className="text-sm opacity-75">✓ Votato</div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="mt-8 p-4 bg-festival-light rounded-lg">
                      <div className="text-sm text-gray-600 mb-2">
                        Progresso: {totalVotes}/{totalCategories}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-festival-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(totalVotes / totalCategories) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Nominees */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-staatliches text-3xl text-festival-dark">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </h2>
                      {votes[selectedCategory] && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          ✓ Voto registrato
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentNominees.map((nominee) => (
                        <div
                          key={nominee.id}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            votes[selectedCategory] === nominee.id
                              ? 'border-festival-primary bg-festival-primary/5 ring-2 ring-festival-primary/20'
                              : 'border-gray-200 hover:border-festival-primary/50 hover:shadow-md'
                          }`}
                          onClick={() => handleVote(selectedCategory, nominee.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-festival-dark mb-2 text-lg">
                                {nominee.title}
                              </h3>
                              {'subtitle' in nominee && nominee.subtitle && (
                                <p className="text-gray-600 mb-2">
                                  {nominee.subtitle}
                                </p>
                              )}
                              {'director' in nominee && nominee.director && (
                                <p className="text-gray-600 mb-2">
                                  Regia: {nominee.director}
                                </p>
                              )}
                              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                {nominee.country}
                              </span>
                            </div>
                            <div className="ml-4">
                              {votes[selectedCategory] === nominee.id ? (
                                <div className="w-6 h-6 bg-festival-primary rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {totalVotes > 0 && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleSubmitVotes}
                      className="bg-festival-primary text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-festival-primary/90 transition-colors duration-300"
                    >
                      Invia i Miei Voti ({totalVotes}/{totalCategories})
                    </button>
                    <p className="text-sm text-gray-600 mt-4">
                      Puoi votare in tutte le categorie o solo in quelle che preferisci
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}