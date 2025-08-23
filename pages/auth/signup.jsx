import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdvancedSignUpForm from '../../components/auth/AdvancedSignUpForm';

const SignUpPage = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSignUpSuccess = (data) => {
    setSuccessMessage(data.message);
    // Opzionale: redirect dopo qualche secondo
    setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
  };
  
  const handleSignUpError = (error) => {
    console.error('Signup failed:', error);
  };
  
  return (
    <>
      <Head>
        <title>Registrati - MovieBoli</title>
        <meta name="description" content="Crea il tuo account MovieBoli" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            MovieBoli
          </h1>
          
          {successMessage ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          ) : (
            <AdvancedSignUpForm 
              onSuccess={handleSignUpSuccess}
              onError={handleSignUpError}
            />
          )}
          
          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
              Hai già un account? Accedi
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;