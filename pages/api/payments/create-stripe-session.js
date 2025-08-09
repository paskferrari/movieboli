import Stripe from 'stripe';
import { validateDonationInput, generateIdempotencyKey, paymentRateLimit } from '../../../lib/security';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Rate limiting
  await new Promise((resolve, reject) => {
    paymentRateLimit(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { amount, frequency, email, name, paymentType, successUrl, cancelUrl } = req.body;

    // Validazione input
    validateDonationInput({ amount: amount / 100, email, frequency });

    // Configurazione sessione Stripe
    const sessionConfig = {
      payment_method_types: paymentType === 'apple_pay' ? ['card'] : ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Donazione MOVIEBOLI APS${frequency === 'monthly' ? ' - Mensile' : frequency === 'yearly' ? ' - Annuale' : ''}`,
              description: 'Sostieni la cultura cinematografica e i giovani talenti',
              images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logo-movieboli.png`]
            },
            unit_amount: amount,
            ...(frequency !== 'one-time' && {
              recurring: {
                interval: frequency === 'monthly' ? 'month' : 'year'
              }
            })
          },
          quantity: 1
        }
      ],
      mode: frequency === 'one-time' ? 'payment' : 'subscription',
      success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
      metadata: {
        donorEmail: email || 'anonymous',
        donorName: name || 'anonymous',
        frequency,
        organization: 'MOVIEBOLI_APS'
      },
      payment_intent_data: frequency === 'one-time' ? {
        metadata: {
          donorEmail: email || 'anonymous',
          donorName: name || 'anonymous',
          frequency,
          organization: 'MOVIEBOLI_APS'
        }
      } : undefined,
      customer_email: email || undefined,
      billing_address_collection: 'auto',
      shipping_address_collection: null,
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: false
      },
      consent_collection: {
        terms_of_service: 'required'
      }
    };

    // Apple Pay configuration
    if (paymentType === 'apple_pay') {
      sessionConfig.payment_method_options = {
        card: {
          request_three_d_secure: 'automatic'
        }
      };
    }

    // Creazione sessione con idempotency key
    const session = await stripe.checkout.sessions.create(
      sessionConfig,
      {
        idempotencyKey: generateIdempotencyKey()
      }
    );

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Errore creazione sessione Stripe:', error);
    res.status(500).json({ 
      error: 'Errore interno del server',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}