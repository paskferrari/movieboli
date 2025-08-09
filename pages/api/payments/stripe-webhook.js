import { buffer } from 'micro';
import Stripe from 'stripe';
import { verifyStripeSignature, verifyTimestamp, webhookRateLimiter, sanitizeForLogging } from '../../../lib/security';
import { sendReceiptEmail } from '../../../lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // Rate limiting per webhook
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await webhookRateLimiter.consume(clientIP);

    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];

    // Verifica firma
    const event = verifyStripeSignature(buf, signature, endpointSecret);
    
    // Verifica timestamp per replay protection
    if (!verifyTimestamp(event.created)) {
      return res.status(400).json({ error: 'Timestamp troppo vecchio' });
    }

    // Log evento
    console.log('Webhook Stripe ricevuto:', sanitizeForLogging({
      type: event.type,
      id: event.id,
      timestamp: new Date().toISOString()
    }));

    // Gestisci eventi
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      case 'invoice.payment_succeeded': // Per pagamenti ricorrenti
        await handleRecurringPaymentSuccess(event.data.object);
        break;
      
      default:
        console.log(`Evento non gestito: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Errore webhook:', sanitizeForLogging(error));
    res.status(400).json({ error: 'Webhook error' });
  }
}

async function handlePaymentSuccess(paymentIntent) {
  try {
    const { metadata, amount, receipt_email } = paymentIntent;
    
    // Salva donazione nel database (se necessario)
    // await saveDonation(paymentIntent);
    
    // Invia ricevuta email
    if (receipt_email && metadata.anonymous !== 'true') {
      await sendReceiptEmail({
        email: receipt_email,
        amount: amount / 100,
        frequency: metadata.frequency,
        name: metadata.name,
        paymentId: paymentIntent.id,
        date: new Date()
      });
    }
    
    console.log('Pagamento elaborato con successo:', sanitizeForLogging({
      id: paymentIntent.id,
      amount: amount / 100,
      frequency: metadata.frequency
    }));
    
  } catch (error) {
    console.error('Errore elaborazione pagamento:', sanitizeForLogging(error));
  }
}

async function handlePaymentFailed(paymentIntent) {
  console.log('Pagamento fallito:', sanitizeForLogging({
    id: paymentIntent.id,
    last_payment_error: paymentIntent.last_payment_error
  }));
}

async function handleRecurringPaymentSuccess(invoice) {
  // Gestisci pagamenti ricorrenti
  console.log('Pagamento ricorrente:', sanitizeForLogging({
    id: invoice.id,
    amount: invoice.amount_paid / 100
  }));
}