import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import Head from 'next/head';

import Page from 'components/system/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { AppProps } from 'next/app';
import './styles.css';
import { CartProvider } from 'react-use-cart';
import { appWithTranslation } from 'next-i18next';
import { Session } from 'next-auth';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_GRAPHCMS_PUBLIC_KEY;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type Props = AppProps & {
  pageProps: {
    session: Session;
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }: Props) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <CartProvider>
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
        </CartProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App as FC);
