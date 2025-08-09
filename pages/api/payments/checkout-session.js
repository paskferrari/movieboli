import Stripe from 'stripe';
import { securityHeaders } from '../../../lib/security';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Applica headers di sicurezza
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Session ID richiesto' });
    }

    // Recupera i dettagli della sessione da Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Pagamento non completato' });
    }

    // Restituisci solo i dati necessari
    res.status(200).json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      mode: session.mode,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      metadata: session.metadata
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}