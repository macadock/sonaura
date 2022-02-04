import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';

import Page from '../src/components/system/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import { AppProps } from 'next/app';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Sonaura</title>
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
