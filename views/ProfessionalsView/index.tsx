import React, { useEffect } from 'react';
import { Box, Container, NoSsr } from '@mui/material';
import Welcome from 'components/core/Professionals/Welcome';
import Integration from 'components/core/Professionals/Integration';
import Design from 'components/core/Professionals/Design';
import Contact from 'components/core/Professionals/Contact';
import Elegance from 'components/core/Professionals/Elegance';
import Image from 'next/image';
import supabase from 'lib/supabase';

const getImage = (name: string): string => {
  const { data } = supabase.storage
    .from('marketing')
    .getPublicUrl(`professionnals/${name}`);
  return data.publicUrl;
};

const ProfessionalsView: React.FC = () => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  const scrollTo = (id: string): void => {
    setTimeout(() => {
      const element: HTMLElement = document.querySelector(`#${id}`);
      if (!element) {
        return;
      }

      window.scrollTo({ left: 0, top: element.offsetTop, behavior: 'smooth' });
    });
  };

  return (
    <React.Fragment>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={'alternate.main'}
        marginTop={-13}
        paddingTop={13}
        position={'relative'}
      >
        <Container>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Welcome />
            <Box
              marginTop={4}
              position={'absolute'}
              bottom={{ xs: '0', sm: '2rem' }}
            >
              <NoSsr>
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width={{ xs: 30, sm: 40 }}
                  height={{ xs: 30, sm: 40 }}
                  onClick={() => scrollTo('agency__portfolio-item--js-scroll')}
                  sx={{ cursor: 'pointer' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </Box>
              </NoSsr>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        className={'jarallax'}
        data-jarallax
        data-speed="0.2"
        position={'relative'}
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        id="agency__portfolio-item--js-scroll"
      >
        <Image
          className={'jarallax-img'}
          src={getImage('slide-1')}
          layout={'fill'}
          objectFit={'cover'}
        />
        <Container>
          <Integration />
        </Container>
      </Box>
      <Box
        className={'jarallax'}
        data-jarallax
        data-speed="0.2"
        position={'relative'}
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
      >
        <Image
          className={'jarallax-img'}
          src={getImage('slide-2')}
          layout={'fill'}
          objectFit={'cover'}
        />

        <Container>
          <Design />
        </Container>
      </Box>
      <Box
        className={'jarallax'}
        data-jarallax
        data-speed="0.2"
        position={'relative'}
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        id="agency__portfolio-item--js-scroll"
      >
        <Image
          className={'jarallax-img'}
          src={getImage('slide-3')}
          layout={'fill'}
          objectFit={'cover'}
        />
        <Container>
          <Elegance />
        </Container>
      </Box>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={'alternate.main'}
      >
        <Container>
          <Contact />
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ProfessionalsView;
