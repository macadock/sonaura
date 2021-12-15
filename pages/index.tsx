import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { useQuery } from '@apollo/client'
import { GET_SETTINGS } from '../gql/get-settings'
import { Settings } from '../gql/__generated__/settings'
import Slideshow, { MediaType, SlideshowMedia } from '../components/Slideshow'

const Home: NextPage = () => {

  const { data, loading } = useQuery<Settings>(GET_SETTINGS)
  
  const settings = data?.settings[0]

  const medias: SlideshowMedia[] = [
    {type: MediaType.IMAGE, url: '/assets/image/01.jpg', alt:'Image'},
    {type: MediaType.IMAGE, url: '/assets/image/02.jpg', alt:'Image'},
  ]

  return (
    <>
      <Head>
        <title>Accueil - {settings?.title} </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Wrapper>
        <Slideshow medias={medias} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled(Box)`
  width: 100%;
  height: 100vh;
`

const Image = styled('img')`
  width: 100%;
  height:80%;
  object-fit:cover;
`

export default Home
