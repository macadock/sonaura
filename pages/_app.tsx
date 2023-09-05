import { Toaster } from 'react-hot-toast';

/* eslint-disable react/prop-types */
import React, { FC, StrictMode } from 'react';
import Head from 'next/head';

import Page from 'components/system/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import './styles.css';
import { appWithTranslation } from 'next-i18next';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import supabase from 'lib/supabase';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }) {
  const router = useRouter();

  const isDashboard = router.pathname.includes('/dashboard');

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {isDashboard ? <meta name="robots" content="noindex" /> : false}
        <title>Sonaura</title>
      </Head>
      <StrictMode>
        <Page>
          <Component {...pageProps} />
          <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
          <Script src="https://app.tinyanalytics.io/pixel/mBNeXw7pZDVudKdQ" />
          <Analytics />
        </Page>
      </StrictMode>
    </SessionContextProvider>
  );
}

export default appWithTranslation(App as FC);
