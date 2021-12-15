import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <Global styles={css`body {margin: 0;}`} />
      <Header/>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
