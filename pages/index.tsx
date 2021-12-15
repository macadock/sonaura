import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <StyledText variant='h1'>Nous serons<br/> bientôt là.</StyledText>
    </Wrapper>
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
