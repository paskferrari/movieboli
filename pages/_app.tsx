import '../styles/globals.css';
import '../styles/movieboli-design-system.css';
import { AuthProvider } from '../contexts/AuthContext';
import { ContentProvider } from '../contexts/ContentContext';
import { BrandingProvider } from '../contexts/BrandingContext';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrandingProvider>
          <Component {...pageProps} />
        </BrandingProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default MyApp;