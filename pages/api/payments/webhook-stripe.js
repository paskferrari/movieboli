import Stripe from 'stripe';
import { buffer } from 'micro';
import { sendReceiptEmail, updateDonationRecord } from '../../../lib/compliance';

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

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleSuccessfulPayment(session);
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handlePaymentSuccess(paymentIntent);
        break;
      
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        await handleSubscriptionPayment(invoice);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handlePaymentFailure(failedPayment);
        break;
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleSuccessfulPayment(session) {
  try {
    // Update donation record
    await updateDonationRecord({
      sessionId: session.id,
      status: 'SUCCEEDED',
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_email,
      metadata: session.metadata,
      timestamp: new Date().toISOString()
    });

    // Send receipt email
    await sendReceiptEmail({
      email: session.customer_email,
      amount: session.amount_total / 100,
      currency: session.currency.toUpperCase(),
      donorName: session.metadata.donorName,
      anonymous: session.metadata.anonymous === 'true',
      frequency: session.metadata.frequency,
      transactionId: session.payment_intent
    });
  } catch (error) {
    console.error('Error handling successful payment:', error);
    throw error;
  }
}

async function handlePaymentFailure(paymentIntent) {
  // Log failed payment (for monitoring)
  console.log('Payment failed:', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    lastPaymentError: paymentIntent.last_payment_error?.message
  });
}