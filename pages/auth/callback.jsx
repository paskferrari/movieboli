import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Gestisce il callback di conferma email
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Errore durante la conferma:', error)
          setError('Errore durante la conferma dell\'account')
          return
        }

        if (data?.session) {
          // Utente confermato con successo, reindirizza alla pagina voti
          router.push('/festival/vota?confirmed=true')
        } else {
          // Nessuna sessione, reindirizza al login
          router.push('/festival/vota?login=true')
        }
      } catch (err) {
        console.error('Errore:', err)
        setError('Si è verificato un errore imprevisto')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-movieboli-neroProfondo flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-movieboli-violaPrincipale mx-auto mb-4"></div>
          <p className="text-movieboli-crema">Conferma account in corso...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-movieboli-neroProfondo flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-movieboli-crema mb-4">Errore di Conferma</h1>
          <p className="text-movieboli-crema/80 mb-6">{error}</p>
          <button
            onClick={() => router.push('/festival/vota')}
            className="bg-movieboli-violaPrincipale text-white px-6 py-3 rounded-xl hover:bg-movieboli-violaPrincipale/80 transition-colors"
          >
            Torna alla pagina voti
          </button>
        </div>
      </div>
    )
  }

  return null
}