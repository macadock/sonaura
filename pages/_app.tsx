import { Toaster } from 'react-hot-toast';

/* eslint-disable react/prop-types */
import React, { FC } from 'react';
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Sonaura</title>
      </Head>
      <Page>
        <Component {...pageProps} />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </Page>
    </SessionContextProvider>
  );
}

export default appWithTranslation(App as FC);
