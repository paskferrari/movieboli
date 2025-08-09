import Stripe from 'stripe';
import { validateDonationData, generateIdempotencyKey } from '../../../lib/security';
import { logPaymentAttempt } from '../../../lib/compliance';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // Implement rate limiting logic here

    // Validate input data
    const { amount, frequency, donorInfo, successUrl, cancelUrl } = req.body;
    const validation = validateDonationData({ amount, frequency, donorInfo });
    
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors });
    }

    // Generate idempotency key
    const idempotencyKey = req.headers['x-idempotency-key'] || generateIdempotencyKey();

    // Log payment attempt (non-PII only)
    await logPaymentAttempt({
      amount,
      frequency,
      method: 'stripe',
      timestamp: new Date().toISOString(),
      clientIp: clientIp.substring(0, clientIp.lastIndexOf('.')) + '.xxx' // Mask IP
    });

    // Create Stripe session
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Donazione MOVIEBOLI APS${frequency === 'monthly' ? ' - Mensile' : ''}`,
              description: 'Sostieni la cultura cinematografica',
            },
            unit_amount: amount,
            ...(frequency === 'monthly' && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: frequency === 'monthly' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: donorInfo.email,
      metadata: {
        donorName: donorInfo.name || 'Anonimo',
        anonymous: donorInfo.anonymous.toString(),
        frequency,
      },
      // Enable SCA/3DS
      payment_intent_data: frequency !== 'monthly' ? {
        setup_future_usage: 'off_session',
      } : undefined,
      // GDPR compliance
      consent_collection: {
        terms_of_service: 'required',
      },
    };

    // Add Apple Pay if supported
    if (req.headers['user-agent']?.includes('Safari')) {
      sessionParams.payment_method_types.push('apple_pay');
    }

    const session = await stripe.checkout.sessions.create(
      sessionParams,
      {
        idempotencyKey,
      }
    );

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}