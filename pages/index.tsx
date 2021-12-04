import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { Box } from '@mui/system'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Image src="/assets/image/XL.jpg" />
      <Image src="/assets/image/XL.jpg" />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  height: 100vh;
`

const Image = styled('img')`
  width: 100%;
  height:100%;
  object-fit:cover;
`

export default Home
