import React from 'react';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import {
  Categories,
  FeaturedProducts,
  Hero,
  Newsletter,
  Overview,
  Products,
} from './components';

const Ecommerce: React.FC = () => {
  return (
    <Main>
      <Container>
        <Hero />
      </Container>
      <Container paddingY={0}>
        <Overview />
      </Container>
      <Container>
        <Categories />
      </Container>
      <Box bgcolor={'secondary.main'}>
        <Container>
          <FeaturedProducts />
        </Container>
      </Box>
      <Container>
        <Products />
      </Container>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default Ecommerce;
