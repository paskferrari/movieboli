import Stripe from 'stripe';
import { paymentRateLimiter, securityHeaders, maskPII } from '../../../lib/security';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Applica headers di sicurezza
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await paymentRateLimiter.consume(clientIP);

    const { amount, frequency, email, name, anonymous, payment_method_types = ['card'] } = req.body;

    // Validazione input
    // Riga 24 - Modifica la validazione (importi in centesimi per Stripe)
    if (!amount || amount < 10 || amount > 1000000) { // 0.10€ - 10.000€
      return res.status(400).json({ error: 'Importo non valido (min 0.10€, max 10.000€)' });
    }

    if (!['once', 'monthly'].includes(frequency)) {
      return res.status(400).json({ error: 'Frequenza non valida' });
    }

    if (!anonymous && !email) {
      return res.status(400).json({ error: 'Email richiesta per donazioni non anonime' });
    }

    // Idempotency key
    const idempotencyKey = req.headers['x-idempotency-key'];
    if (!idempotencyKey) {
      return res.status(400).json({ error: 'Idempotency key richiesta' });
    }

    // Crea payment intent
    const paymentIntentData = {
      amount,
      currency: 'eur',
      payment_method_types,
      metadata: {
        frequency,
        anonymous: anonymous.toString(),
        email: anonymous ? 'anonymous' : email,
        name: anonymous ? 'anonymous' : (name || 'N/A'),
        organization: 'MOVIEBOLI APS'
      },
      description: `Donazione ${frequency === 'monthly' ? 'mensile' : 'una tantum'} a MOVIEBOLI APS`,
      receipt_email: anonymous ? null : email,
      setup_future_usage: frequency === 'monthly' ? 'off_session' : null
    };

    const paymentIntent = await stripe.paymentIntents.create(
      paymentIntentData,
      { idempotencyKey }
    );

    // Log sanitizzato
    console.log('Payment Intent creato:', maskPII({
      id: paymentIntent.id,
      amount,
      frequency,
      anonymous,
      timestamp: new Date().toISOString()
    }));

    res.status(200).json({
      client_secret: paymentIntent.client_secret,
      id: paymentIntent.id
    });

  } catch (error) {
    if (error.type === 'StripeCardError') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Rate limit exceeded') {
      res.status(429).json({ error: 'Troppi tentativi. Riprova più tardi.' });
    } else {
      console.error('Errore Payment Intent:', maskPII(error));
      res.status(500).json({ error: 'Errore interno del server' });
    }
  }
}