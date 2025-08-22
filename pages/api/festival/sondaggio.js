import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  // Gestione CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    switch (req.method) {
      case 'POST':
        return await handlePost(req, res)
      case 'GET':
        return await handleGet(req, res)
      case 'PUT':
        return await handlePut(req, res)
      case 'DELETE':
        return await handleDelete(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}

// POST - Invia nuovo sondaggio
async function handlePost(req, res) {
  const {
    user_id,
    eta,
    genere,
    residenza,
    stato_regione,
    professione,
    titolo_studio,
    mezzo_trasporto,
    visitato_citta,
    film_visti,
    corti_visti,
    interviste_viste,
    conosce_macine,
    puntate_live,
    come_conosciuto,
    newsletter
  } = req.body

  // Validazione dei dati richiesti
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  // Verifica se l'utente ha già inviato un sondaggio
  const { data: existingSurvey, error: checkError } = await supabase
    .from('festival_survey')
    .select('id')
    .eq('user_id', user_id)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing survey:', checkError)
    return res.status(500).json({ error: 'Database error' })
  }

  if (existingSurvey) {
    return res.status(409).json({ 
      error: 'Survey already submitted',
      message: 'Hai già inviato un sondaggio. Puoi modificarlo se necessario.' 
    })
  }

  // Inserisci nuovo sondaggio
  const { data, error } = await supabase
    .from('festival_survey')
    .insert({
      user_id,
      eta: eta ? parseInt(eta) : null,
      genere,
      residenza,
      stato_regione,
      professione,
      titolo_studio,
      mezzo_trasporto,
      visitato_citta,
      film_visti,
      corti_visti,
      interviste_viste,
      conosce_macine,
      puntate_live,
      come_conosciuto,
      newsletter,
      submitted_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error inserting survey:', error)
    return res.status(500).json({ 
      error: 'Failed to save survey',
      message: error.message 
    })
  }

  return res.status(201).json({ 
    message: 'Survey submitted successfully',
    data 
  })
}

// GET - Ottieni sondaggi (utente specifico o statistiche per admin)
async function handleGet(req, res) {
  const { user_id, stats } = req.query

  // Se richieste statistiche (solo admin)
  if (stats === 'true') {
    try {
      const { data, error } = await supabase
        .rpc('get_survey_statistics')

      if (error) {
        console.error('Error getting survey statistics:', error)
        return res.status(500).json({ 
          error: 'Failed to get statistics',
          message: error.message 
        })
      }

      return res.status(200).json({ data })
    } catch (error) {
      console.error('Error calling statistics function:', error)
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'Admin role required for statistics' 
      })
    }
  }

  // Ottieni sondaggio specifico dell'utente
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  const { data, error } = await supabase
    .from('festival_survey')
    .select('*')
    .eq('user_id', user_id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ 
        error: 'Survey not found',
        message: 'No survey found for this user' 
      })
    }
    console.error('Error getting survey:', error)
    return res.status(500).json({ 
      error: 'Failed to get survey',
      message: error.message 
    })
  }

  return res.status(200).json({ data })
}

// PUT - Aggiorna sondaggio esistente
async function handlePut(req, res) {
  const { user_id } = req.query
  const updateData = req.body

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  // Rimuovi campi che non dovrebbero essere aggiornati
  delete updateData.id
  delete updateData.user_id
  delete updateData.created_at
  delete updateData.submitted_at

  // Converti età in numero se presente
  if (updateData.eta) {
    updateData.eta = parseInt(updateData.eta)
  }

  const { data, error } = await supabase
    .from('festival_survey')
    .update(updateData)
    .eq('user_id', user_id)
    .select()
    .single()

  if (error) {
    console.error('Error updating survey:', error)
    return res.status(500).json({ 
      error: 'Failed to update survey',
      message: error.message 
    })
  }

  return res.status(200).json({ 
    message: 'Survey updated successfully',
    data 
  })
}

// DELETE - Elimina sondaggio (solo admin o proprietario)
async function handleDelete(req, res) {
  const { user_id, survey_id } = req.query

  if (!user_id && !survey_id) {
    return res.status(400).json({ 
      error: 'User ID or Survey ID is required' 
    })
  }

  let query = supabase.from('festival_survey').delete()

  if (survey_id) {
    query = query.eq('id', survey_id)
  } else {
    query = query.eq('user_id', user_id)
  }

  const { error } = await query

  if (error) {
    console.error('Error deleting survey:', error)
    return res.status(500).json({ 
      error: 'Failed to delete survey',
      message: error.message 
    })
  }

  return res.status(200).json({ 
    message: 'Survey deleted successfully' 
  })
}

// Funzione di utilità per validare i dati del sondaggio
function validateSurveyData(data) {
  const errors = []

  // Validazioni specifiche
  if (data.eta && (data.eta < 1 || data.eta > 120)) {
    errors.push('Age must be between 1 and 120')
  }

  const validGenders = ['Maschio', 'Femmina', 'Altro']
  if (data.genere && !validGenders.includes(data.genere)) {
    errors.push('Invalid gender value')
  }

  const validEducation = ['Scuola dell\'obbligo', 'Diploma', 'Laurea', 'Altro']
  if (data.titolo_studio && !validEducation.includes(data.titolo_studio)) {
    errors.push('Invalid education level')
  }

  const validTransport = ['Auto', 'Treno', 'Bus', 'Aereo', 'Altro']
  if (data.mezzo_trasporto && !validTransport.includes(data.mezzo_trasporto)) {
    errors.push('Invalid transport method')
  }

  const validYesNo = ['Sì', 'No']
  if (data.visitato_citta && !validYesNo.includes(data.visitato_citta)) {
    errors.push('Invalid city visit value')
  }

  if (data.conosce_macine && !validYesNo.includes(data.conosce_macine)) {
    errors.push('Invalid Macine knowledge value')
  }

  if (data.newsletter && !validYesNo.includes(data.newsletter)) {
    errors.push('Invalid newsletter preference')
  }

  const validFilms = ['1', '2', '3']
  if (data.film_visti && !validFilms.includes(data.film_visti)) {
    errors.push('Invalid films watched value')
  }

  const validShorts = ['1-2', '3-5', '6-8']
  if (data.corti_visti && !validShorts.includes(data.corti_visti)) {
    errors.push('Invalid shorts watched value')
  }

  const validInterviews = ['Nessuna', '1-2', '3 o più']
  if (data.interviste_viste && !validInterviews.includes(data.interviste_viste)) {
    errors.push('Invalid interviews watched value')
  }

  if (data.puntate_live && !validInterviews.includes(data.puntate_live)) {
    errors.push('Invalid live episodes value')
  }

  const validDiscovery = ['Passaparola', 'Amici/parenti', 'Social', 'Giornali', 'TV', 'Altro']
  if (data.come_conosciuto && !validDiscovery.includes(data.come_conosciuto)) {
    errors.push('Invalid discovery method')
  }

  return errors
}