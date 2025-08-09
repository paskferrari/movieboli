import Stripe from 'stripe';
import { checkRateLimit, securityHeaders, maskPII, generateIdempotencyKey } from '../../../lib/security';

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
    const rateLimit = checkRateLimit(clientIP, 'create-checkout-session', 5, 60000);
    
    if (!rateLimit.allowed) {
      return res.status(429).json({ 
        error: 'Troppi tentativi. Riprova tra qualche minuto.',
        retryAfter: rateLimit.retryAfter 
      });
    }

    const { amount, frequency, donorInfo } = req.body;

    // Validazione input
    if (!amount || amount < 500 || amount > 1000000) { // 5€ - 10.000€
      return res.status(400).json({ error: 'Importo non valido (min 5€, max 10.000€)' });
    }

    if (!['once', 'monthly'].includes(frequency)) {
      return res.status(400).json({ error: 'Frequenza non valida' });
    }

    if (!donorInfo.anonymous && !donorInfo.email) {
      return res.status(400).json({ error: 'Email richiesta per donazioni non anonime' });
    }

    // Idempotency key
    const idempotencyKey = req.headers['x-idempotency-key'] || generateIdempotencyKey(req.body);

    // Determina il tipo di sessione
    const isRecurring = frequency === 'monthly';
    
    // Crea la sessione di checkout
    const sessionData = {
      payment_method_types: ['card'],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donazioni/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donazioni?canceled=true`,
      metadata: {
        frequency,
        anonymous: donorInfo.anonymous.toString(),
        email: donorInfo.anonymous ? 'anonymous' : donorInfo.email,
        firstName: donorInfo.anonymous ? 'anonymous' : donorInfo.firstName,
        lastName: donorInfo.anonymous ? 'anonymous' : donorInfo.lastName,
        idempotencyKey
      },
      customer_email: donorInfo.anonymous ? undefined : donorInfo.email,
      billing_address_collection: 'auto',
      locale: 'it'
    };

    if (isRecurring) {
      // Per donazioni ricorrenti, crea un prodotto e prezzo
      const product = await stripe.products.create({
        name: 'Donazione Mensile MOVIEBOLI',
        description: 'Sostieni MOVIEBOLI con una donazione mensile'
      }, { idempotencyKey: `product_${idempotencyKey}` });

      const price = await stripe.prices.create({
        unit_amount: amount,
        currency: 'eur',
        recurring: {
          interval: 'month'
        },
        product: product.id
      }, { idempotencyKey: `price_${idempotencyKey}` });

      sessionData.line_items = [{
        price: price.id,
        quantity: 1
      }];
    } else {
      // Per donazioni una tantum
      sessionData.line_items = [{
        price_data: {
          currency: 'eur',
          unit_amount: amount,
          product_data: {
            name: 'Donazione MOVIEBOLI',
            description: 'Sostieni MOVIEBOLI APS nella promozione della cultura cinematografica'
          }
        },
        quantity: 1
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionData, {
      idempotencyKey
    });

    console.log('Checkout session created:', maskPII({
      sessionId: session.id,
      amount,
      frequency,
      email: donorInfo.anonymous ? 'anonymous' : donorInfo.email
    }));

    res.status(200).json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Checkout session creation failed:', maskPII({
      error: error.message,
      stack: error.stack
    }));

    if (error.type === 'StripeCardError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Errore interno del server' });
  }
}