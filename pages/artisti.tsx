import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import EditableText from '../components/ui/EditableText'
import { useContent } from '../contexts/ContentContext'

export default function Artisti() {
  const { getContent } = useContent()
  
  return (
    <>
      <Head>
        <title>
          <EditableText 
            contentKey="artisti.meta.title"
            defaultValue="Artisti - Festival Artistico MoviEboli"
            tag="span"
          />
        </title>
        <meta 
          name="description" 
          content={getContent('artisti.meta.description', 'Conosci gli artisti del Festival MoviEboli: performer, musicisti, artisti visivi e creativi da tutto il mondo.')}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <section className="section-padding bg-gradient-to-r from-festival-secondary to-festival-accent">
            <div className="container-custom">
              <div className="text-center text-white">
                <h1 className="font-bebas text-5xl md:text-7xl mb-6">
                  <EditableText 
                    contentKey="artisti.hero.title"
                    defaultValue="ARTISTI"
                    tag="span"
                  />
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                  <EditableText 
                    contentKey="artisti.hero.subtitle"
                    defaultValue="Talenti internazionali per un'esperienza unica"
                    tag="span"
                  />
                </p>
              </div>
            </div>
          </section>
          
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center">
                <h2 className="font-bebas text-4xl md:text-5xl text-festival-dark mb-8">
                  <EditableText 
                    contentKey="artisti.lineup.title"
                    defaultValue="Line-up in arrivo"
                    tag="span"
                  />
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  <EditableText 
                    contentKey="artisti.lineup.description"
                    defaultValue="Stiamo finalizzando una line-up straordinaria con artisti di fama internazionale. Preparati a vivere performance indimenticabili."
                    multiline={true}
                    tag="span"
                  />
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-primary to-festival-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">
                        <EditableText 
                          contentKey="artisti.stats.artists.number"
                          defaultValue="50+"
                          tag="span"
                        />
                      </span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">
                      <EditableText 
                        contentKey="artisti.stats.artists.label"
                        defaultValue="Artisti"
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600">
                      <EditableText 
                        contentKey="artisti.stats.artists.description"
                        defaultValue="Da tutto il mondo"
                        tag="span"
                      />
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-secondary to-festival-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">
                        <EditableText 
                          contentKey="artisti.stats.countries.number"
                          defaultValue="15"
                          tag="span"
                        />
                      </span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">
                      <EditableText 
                        contentKey="artisti.stats.countries.label"
                        defaultValue="Paesi"
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600">
                      <EditableText 
                        contentKey="artisti.stats.countries.description"
                        defaultValue="Rappresentati"
                        tag="span"
                      />
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-accent to-festival-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">
                        <EditableText 
                          contentKey="artisti.stats.performance.number"
                          defaultValue="72h"
                          tag="span"
                        />
                      </span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">
                      <EditableText 
                        contentKey="artisti.stats.performance.label"
                        defaultValue="Performance"
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600">
                      <EditableText 
                        contentKey="artisti.stats.performance.description"
                        defaultValue="Non-stop"
                        tag="span"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}