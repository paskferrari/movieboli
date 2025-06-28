import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Artisti() {
  return (
    <>
      <Head>
        <title>Artisti - Festival Artistico MoviEboli</title>
        <meta 
          name="description" 
          content="Conosci gli artisti del Festival MoviEboli: performer, musicisti, artisti visivi e creativi da tutto il mondo."
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <section className="section-padding bg-gradient-to-r from-festival-secondary to-festival-accent">
            <div className="container-custom">
              <div className="text-center text-white">
                <h1 className="font-bebas text-5xl md:text-7xl mb-6">ARTISTI</h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                  Talenti internazionali per un'esperienza unica
                </p>
              </div>
            </div>
          </section>
          
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center">
                <h2 className="font-bebas text-4xl md:text-5xl text-festival-dark mb-8">
                  Line-up in arrivo
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Stiamo finalizzando una line-up straordinaria con artisti di fama internazionale. 
                  Preparati a vivere performance indimenticabili.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-primary to-festival-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">50+</span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">Artisti</h3>
                    <p className="text-gray-600">Da tutto il mondo</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-secondary to-festival-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">15</span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">Paesi</h3>
                    <p className="text-gray-600">Rappresentati</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-festival-accent to-festival-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bebas text-2xl">72h</span>
                    </div>
                    <h3 className="font-bebas text-2xl text-festival-dark mb-2">Performance</h3>
                    <p className="text-gray-600">Non-stop</p>
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