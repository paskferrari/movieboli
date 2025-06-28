import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Programma() {
  return (
    <>
      <Head>
        <title>Programma - Festival Artistico MoviEboli</title>
        <meta 
          name="description" 
          content="Scopri il programma completo del Festival Artistico MoviEboli con tutti gli eventi, spettacoli e performance."
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <section className="section-padding bg-gradient-to-r from-festival-primary to-festival-secondary">
            <div className="container-custom">
              <div className="text-center text-white">
                <h1 className="font-bebas text-5xl md:text-7xl mb-6">PROGRAMMA</h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                  Tre giorni di arte, cultura e spettacolo
                </p>
              </div>
            </div>
          </section>
          
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center">
                <h2 className="font-bebas text-4xl md:text-5xl text-festival-dark mb-8">
                  Programma in arrivo
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Il programma dettagliato del festival sarà disponibile a breve. 
                  Iscriviti alla nostra newsletter per essere il primo a conoscere tutti gli eventi.
                </p>
                <div className="mt-8">
                  <button className="btn-primary">
                    Iscriviti alla Newsletter
                  </button>
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