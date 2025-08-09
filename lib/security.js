import crypto from 'crypto';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiting store (in produzione usare Redis)
const rateLimitStore = new Map();

// Encryption utilities
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text) {
  if (!text) return null;
  
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex')
  };
}

export function decrypt(encryptedData) {
  if (!encryptedData || !encryptedData.encrypted) return null;
  
  const { encrypted, iv } = encryptedData;
  const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Rate limiting
export function checkRateLimit(ip, endpoint, maxRequests = 10, windowMs = 60000) {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  const record = rateLimitStore.get(key);
  
  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

// Webhook signature verification
export function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Stripe webhook verification
export function verifyStripeSignature(payload, signature, secret) {
  try {
    const elements = signature.split(',');
    const signatureElements = {};
    
    for (const element of elements) {
      const [key, value] = element.split('=');
      signatureElements[key] = value;
    }
    
    const timestamp = signatureElements.t;
    const signatures = [signatureElements.v1];
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(timestamp + '.' + payload, 'utf8')
      .digest('hex');
    
    return signatures.some(sig => 
      crypto.timingSafeEqual(
        Buffer.from(sig, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      )
    );
  } catch (error) {
    return false;
  }
}

// Idempotency key generation
export function generateIdempotencyKey(data) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data) + Date.now())
    .digest('hex');
}

// Verifica timestamp per replay protection
export function verifyTimestamp(timestamp, tolerance = 300) {
  const now = Math.floor(Date.now() / 1000);
  return Math.abs(now - timestamp) <= tolerance;
}

// PII masking for logs
export function maskPII(data) {
  if (!data || typeof data !== 'object') return data;
  
  const masked = { ...data };
  
  // Mask email
  if (masked.email) {
    const [local, domain] = masked.email.split('@');
    if (local && domain) {
      masked.email = `${local.substring(0, 2)}***@${domain}`;
    }
  }
  
  // Mask card numbers (should never be logged, but safety first)
  if (masked.cardNumber) {
    masked.cardNumber = '****-****-****-' + masked.cardNumber.slice(-4);
  }
  
  // Mask names
  if (masked.firstName) {
    masked.firstName = masked.firstName.charAt(0) + '***';
  }
  if (masked.lastName) {
    masked.lastName = masked.lastName.charAt(0) + '***';
  }
  
  // Remove sensitive fields
  delete masked.cvv;
  delete masked.paymentMethodId;
  delete masked.clientSecret;
  delete masked.password;
  
  return masked;
}

// Headers di sicurezza
// Configurazione CSP dinamica
const isDev = process.env.NODE_ENV === 'development';

const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://js.stripe.com',
    'https://checkout.stripe.com',
    'https://maps.googleapis.com',
    ...(isDev ? ["'unsafe-inline'", "'unsafe-eval'"] : [])
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com'
  ],
  'style-src-elem': [
    "'self'",
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'data:'
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:',
    'http:'
  ],
  'connect-src': [
    "'self'",
    'https://api.stripe.com',
    'https://igxnfduvvarrnywanxsr.supabase.co',
    'https://*.supabase.co',
    'https://fonts.googleapis.com',  // Aggiungi questo
    'https://fonts.gstatic.com'      // Aggiungi questo
  ],
  'frame-src': [
    'https://js.stripe.com',
    'https://hooks.stripe.com',
    'https://checkout.stripe.com'
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"]
};

const cspString = Object.entries(cspDirectives)
  .map(([key, value]) => `${key} ${value.join(' ')}`)
  .join('; ');

export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': cspString
};

// Cleanup function per rate limit store
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Esegui cleanup ogni 5 minuti
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

// Aggiungi queste funzioni mancanti
export const paymentRateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 5, // 5 tentativi
  duration: 60, // per minuto
});

export const paymentRateLimit = paymentRateLimiter;

export const webhookRateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 100, // 100 webhook
  duration: 60, // per minuto
});

export function validateDonationInput(data) {
  const { amount, frequency, email } = data;
  
  // Riga 257 - Modifica la validazione
  if (!amount || amount < 0.10 || amount > 10000) {
    throw new Error('Importo non valido (min 0.10€, max 10.000€)');
  }
  
  if (!['once', 'monthly'].includes(frequency)) {
    throw new Error('Frequenza non valida');
  }
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Email non valida');
  }
  
  return true;
}

export function validateDonationData(data) {
  return validateDonationInput(data);
}

export function sanitizeForLogging(data) {
  return maskPII(data);
}