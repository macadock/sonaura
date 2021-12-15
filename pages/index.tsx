import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nous serons bientôt là | Sonaura</title>
        <meta property="og:title" content="Nous serons bientôt là | Sonaura" key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Wrapper>
        <StyledText variant='h1'>Nous serons<br/> bientôt là.</StyledText>
      </Wrapper>
    </>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const StyledText = styled(Typography)`
  color: #fff;
`

export default Home
