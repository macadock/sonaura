import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={css`body {margin: 0;}`} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
