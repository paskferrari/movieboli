// Funzioni per l'invio di email (placeholder)

export async function sendReceiptEmail(emailData) {
  console.log('Receipt email would be sent:', {
    to: emailData.email,
    amount: emailData.amount,
    timestamp: new Date().toISOString()
  });
  
  // TODO: Implementare invio email reale con servizio come SendGrid, Resend, etc.
  return { success: true, message: 'Email logged (not sent in development)' };
}