import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const AdvancedSignUpForm = ({ onSuccess, onError }) => {
  const { signUp } = useAuth();
  
  // Stati del form
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    honeypot: '' // Campo honeypot invisibile per bloccare bot
  });
  
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  
  // Regex per validazione email client-side
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Domini usa-e-getta da bloccare (lista base client-side)
  const disposableDomains = [
    'mailinator.com', 'yopmail.com', 'guerrillamail.com', 'temp-mail.org',
    '10minutemail.com', 'throwaway.email', 'maildrop.cc', 'tempmail.net'
  ];
  
  // TLD sospetti
  const suspiciousTlds = ['.test', '.invalid', '.local', '.localhost', '.example'];
  
  // Validazione email client-side
  const validateEmailClientSide = (email) => {
    const errors = [];
    
    if (!email) {
      errors.push('Email è richiesta');
      return errors;
    }
    
    if (!emailRegex.test(email)) {
      errors.push('Formato email non valido');
      return errors;
    }
    
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (disposableDomains.includes(domain)) {
      errors.push('Email temporanee non sono permesse');
    }
    
    if (suspiciousTlds.some(tld => domain?.endsWith(tld))) {
      errors.push('Dominio email non valido');
    }
    
    return errors;
  };
  
  // Validazione password
  const validatePassword = (password) => {
    const errors = [];
    
    if (!password) {
      errors.push('Password è richiesta');
      return errors;
    }
    
    if (password.length < 8) {
      errors.push('Password deve essere di almeno 8 caratteri');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password deve contenere almeno una lettera minuscola');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password deve contenere almeno una lettera maiuscola');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password deve contenere almeno un numero');
    }
    
    return errors;
  };
  
  // Gestione cambio input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Rimuovi errori quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Reset validazione email quando cambia
    if (name === 'email') {
      setEmailValidated(false);
    }
  };
  
  // Validazione email server-side
  const validateEmailServerSide = async (email) => {
    setIsValidating(true);
    
    try {
      const response = await fetch('/api/validate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!data.ok) {
        return { valid: false, error: data.error };
      }
      
      return { valid: true, normalizedEmail: data.email };
    } catch (error) {
      console.error('Email validation error:', error);
      return { valid: false, error: 'Errore di connessione. Riprova.' };
    } finally {
      setIsValidating(false);
    }
  };
  
  // Gestione blur email (validazione quando l'utente esce dal campo)
  const handleEmailBlur = async () => {
    const email = formData.email.trim();
    
    if (!email) return;
    
    // Prima validazione client-side
    const clientErrors = validateEmailClientSide(email);
    if (clientErrors.length > 0) {
      setErrors(prev => ({ ...prev, email: clientErrors[0] }));
      return;
    }
    
    // Poi validazione server-side
    const serverValidation = await validateEmailServerSide(email);
    if (!serverValidation.valid) {
      setErrors(prev => ({ ...prev, email: serverValidation.error }));
      setEmailValidated(false);
    } else {
      setErrors(prev => ({ ...prev, email: null }));
      setEmailValidated(true);
      // Aggiorna con email normalizzata se diversa
      if (serverValidation.normalizedEmail !== email) {
        setFormData(prev => ({ ...prev, email: serverValidation.normalizedEmail }));
      }
    }
  };
  
  // Gestione submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Controllo honeypot (se compilato, è un bot)
    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }
    
    setIsSubmitting(true);
    const newErrors = {};
    
    // Validazione completa
    const emailErrors = validateEmailClientSide(formData.email);
    if (emailErrors.length > 0) {
      newErrors.email = emailErrors[0];
    }
    
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Le password non coincidono';
    }
    
    // Se ci sono errori, fermati
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Se email non è stata validata server-side, fallo ora
    if (!emailValidated) {
      const serverValidation = await validateEmailServerSide(formData.email);
      if (!serverValidation.valid) {
        setErrors({ email: serverValidation.error });
        setIsSubmitting(false);
        return;
      }
      setEmailValidated(true);
    }
    
    try {
      // Procedi con registrazione Supabase
      await signUp(formData.email, formData.password);
      
      if (onSuccess) {
        onSuccess({
          email: formData.email,
          message: 'Registrazione completata! Controlla la tua email per confermare l\'account.'
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.message || 'Errore durante la registrazione';
      setErrors({ submit: errorMessage });
      
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Registrati
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : emailValidated 
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="tua@email.com"
              required
            />
            
            {/* Indicatori di stato */}
            <div className="absolute right-3 top-2.5">
              {isValidating && (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
              {!isValidating && emailValidated && (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {!isValidating && errors.email && (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        {/* Campo Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Almeno 8 caratteri"
            required
          />
          
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        {/* Campo Conferma Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Conferma Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Ripeti la password"
            required
          />
          
          <AnimatePresence>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        {/* Campo Honeypot (invisibile) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />
        
        {/* Errore generale */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border border-red-200 rounded-md p-3"
            >
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsante Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting || isValidating || !emailValidated}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting || isValidating || !emailValidated
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          } text-white`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Registrazione...
            </div>
          ) : (
            'Registrati'
          )}
        </motion.button>
        
        {/* Info validazione */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Email temporanee non sono permesse</p>
          <p>• La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola e un numero</p>
          <p>• Supportiamo alias Gmail per test (es. tuonome+test@gmail.com)</p>
        </div>
      </form>
    </motion.div>
  );
};

export default AdvancedSignUpForm;