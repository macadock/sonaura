import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Toaster } from 'react-hot-toast';

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
import Script from 'next/script';
import './styles.css';

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
        <Script
          id="axeptio-consent"
          dangerouslySetInnerHTML={{
            __html: `
              window.axeptioSettings={clientId:"62052fbc77a363af5605a75d",
              };
              (function(d,s) {
                var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                e.async = true; e.src = "//static.axept.io/sdk-slim.js";
                t.parentNode.insertBefore(e, t);
              })(document, "script");
              `,
          }}
        />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </Page>
    </ApolloProvider>
  );
}
