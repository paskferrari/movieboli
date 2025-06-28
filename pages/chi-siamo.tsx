import Head from 'next/head'
import Layout from '../components/Layout'

export default function ChiSiamo() {
  return (
    <>
      <Head>
        <title>Chi Siamo - MoviEboli Film Festival</title>
        <meta 
          name="description" 
          content="Scopri la storia e la missione del MoviEboli Film Festival, il festival cinematografico più innovativo del Sud Italia."
        />
        <meta name="keywords" content="chi siamo, festival, cinema, MoviEboli, storia, missione" />
      </Head>
      
      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-festival-primary to-festival-secondary py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="font-bebas text-5xl md:text-7xl text-white mb-6 tracking-wide">
                  Chi Siamo
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  La storia di un festival che celebra l'arte cinematografica e la creatività
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg mx-auto">
                  <h2 className="font-staatliches text-3xl text-festival-dark mb-6">
                    La Nostra Storia
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Il MoviEboli Film Festival nasce dalla passione per il cinema e dalla volontà di 
                    creare un ponte tra tradizione e innovazione nel panorama cinematografico italiano. 
                    Fondato nel cuore della Basilicata, il festival si è rapidamente affermato come 
                    uno degli eventi più attesi del Sud Italia.
                  </p>
                  
                  <h2 className="font-staatliches text-3xl text-festival-dark mb-6 mt-12">
                    La Nostra Missione
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Promuovere il cinema d'autore, sostenere i giovani talenti e creare un dialogo 
                    culturale che unisca diverse generazioni di appassionati. Il nostro festival 
                    è un laboratorio creativo dove sperimentazione e tradizione si incontrano.
                  </p>
                  
                  <h2 className="font-staatliches text-3xl text-festival-dark mb-6 mt-12">
                    I Nostri Valori
                  </h2>
                  <ul className="text-gray-700 space-y-3">
                    <li>• <strong>Innovazione:</strong> Sosteniamo le nuove forme di espressione cinematografica</li>
                    <li>• <strong>Inclusività:</strong> Creiamo spazi aperti a tutti, senza barriere</li>
                    <li>• <strong>Qualità:</strong> Selezioniamo opere di alto valore artistico</li>
                    <li>• <strong>Territorio:</strong> Valorizziamo la cultura e le tradizioni locali</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-festival-light py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-bebas text-4xl text-festival-dark mb-4">
                  Il Nostro Team
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Un gruppo di professionisti appassionati che lavora tutto l'anno per 
                  rendere possibile questa straordinaria esperienza cinematografica.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-festival-primary to-festival-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">DS</span>
                  </div>
                  <h3 className="font-staatliches text-xl text-festival-dark mb-2">Direttore Artistico</h3>
                  <p className="text-gray-600">Responsabile della selezione e programmazione</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-festival-secondary to-festival-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">CO</span>
                  </div>
                  <h3 className="font-staatliches text-xl text-festival-dark mb-2">Coordinamento</h3>
                  <p className="text-gray-600">Gestione logistica e organizzazione eventi</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-festival-accent to-festival-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">PR</span>
                  </div>
                  <h3 className="font-staatliches text-xl text-festival-dark mb-2">Comunicazione</h3>
                  <p className="text-gray-600">Promozione e relazioni con i media</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}