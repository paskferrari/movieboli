import dns from 'dns';
import { promisify } from 'util';

// Promisify DNS functions
const resolveMx = promisify(dns.resolveMx);
const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);

// Lista domini usa-e-getta da bloccare (facilmente espandibile)
const DISPOSABLE_DOMAINS = [
  // Domini temporanei più comuni
  'mailinator.com', 'yopmail.com', 'guerrillamail.com', 'temp-mail.org',
  '10minutemail.com', 'throwaway.email', 'maildrop.cc', 'tempmail.net',
  'getnada.com', 'mailnesia.com', 'sharklasers.com', 'grr.la',
  'mailcatch.com', 'mohmal.com', 'emailondeck.com', 'fakeinbox.com',
  'spamgourmet.com', 'incognitomail.org', 'mytrashmail.com', 'mailexpire.com',
  // Aggiungi altri domini qui quando necessario
];

// TLD sospetti da bloccare
const SUSPICIOUS_TLDS = [
  '.test', '.invalid', '.local', '.localhost', '.example',
  '.onion', '.bit', '.exit', '.i2p'
];

// Rate limiting semplice (in memoria - per produzione usa Redis)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 richieste per IP per minuto

// Funzione per controllare rate limit
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Rimuovi richieste vecchie
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit superato
  }
  
  // Aggiungi questa richiesta
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  return true;
}

// Validazione email con regex robusta
function isValidEmailFormat(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Controlla se il dominio è usa-e-getta
function isDisposableDomain(domain) {
  const lowerDomain = domain.toLowerCase();
  return DISPOSABLE_DOMAINS.includes(lowerDomain);
}

// Controlla TLD sospetti
function hasSuspiciousTLD(domain) {
  const lowerDomain = domain.toLowerCase();
  return SUSPICIOUS_TLDS.some(tld => lowerDomain.endsWith(tld));
}

// Controlla se il dominio ha record DNS validi
async function hasDNSRecords(domain) {
  try {
    // Prima prova con record MX (preferito per email)
    try {
      const mxRecords = await resolveMx(domain);
      if (mxRecords && mxRecords.length > 0) {
        return { valid: true, type: 'MX', records: mxRecords.length };
      }
    } catch (mxError) {
      // MX non trovato, prova con A record
    }
    
    // Prova con record A (IPv4)
    try {
      const aRecords = await resolve4(domain);
      if (aRecords && aRecords.length > 0) {
        return { valid: true, type: 'A', records: aRecords.length };
      }
    } catch (aError) {
      // A record non trovato, prova con AAAA
    }
    
    // Prova con record AAAA (IPv6)
    try {
      const aaaaRecords = await resolve6(domain);
      if (aaaaRecords && aaaaRecords.length > 0) {
        return { valid: true, type: 'AAAA', records: aaaaRecords.length };
      }
    } catch (aaaaError) {
      // Nessun record trovato
    }
    
    return { valid: false, type: 'none', records: 0 };
  } catch (error) {
    console.error('DNS lookup error:', error);
    return { valid: false, type: 'error', records: 0 };
  }
}

// Gestisce alias Gmail per test (tuonome+test@gmail.com)
function normalizeGmailAlias(email) {
  const [localPart, domain] = email.split('@');
  
  if (domain && domain.toLowerCase() === 'gmail.com') {
    // Rimuovi tutto dopo il + per Gmail
    const cleanLocal = localPart.split('+')[0];
    return `${cleanLocal}@${domain}`;
  }
  
  return email;
}

export default async function handler(req, res) {
  // Solo metodo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED'
    });
  }
  
  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
  
  const { email } = req.body;
  
  // Validazione input
  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      ok: false,
      error: 'Email is required',
      code: 'EMAIL_REQUIRED'
    });
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  // 1. Validazione formato email
  if (!isValidEmailFormat(trimmedEmail)) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid email format',
      code: 'INVALID_FORMAT'
    });
  }
  
  const domain = trimmedEmail.split('@')[1];
  
  // 2. Controlla domini usa-e-getta
  if (isDisposableDomain(domain)) {
    return res.status(400).json({
      ok: false,
      error: 'Disposable email addresses are not allowed',
      code: 'DISPOSABLE_EMAIL'
    });
  }
  
  // 3. Controlla TLD sospetti
  if (hasSuspiciousTLD(domain)) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid email domain',
      code: 'SUSPICIOUS_TLD'
    });
  }
  
  // 4. Controlla record DNS
  const dnsCheck = await hasDNSRecords(domain);
  if (!dnsCheck.valid) {
    return res.status(400).json({
      ok: false,
      error: 'Email domain does not exist or is not configured for email',
      code: 'INVALID_DOMAIN'
    });
  }
  
  // 5. Normalizza alias Gmail per test
  const normalizedEmail = normalizeGmailAlias(trimmedEmail);
  
  // Email valida!
  return res.status(200).json({
    ok: true,
    email: normalizedEmail,
    originalEmail: trimmedEmail,
    dnsInfo: {
      type: dnsCheck.type,
      records: dnsCheck.records
    },
    message: 'Email is valid'
  });
}