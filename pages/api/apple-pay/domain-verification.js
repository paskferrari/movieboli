export default function handler(req, res) {
  // Serve the Apple Pay domain verification file
  const verificationContent = process.env.APPLE_PAY_DOMAIN_VERIFICATION;
  
  if (!verificationContent) {
    return res.status(404).json({ error: 'Domain verification file not found' });
  }
  
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(verificationContent);
}