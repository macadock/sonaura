import { Box } from '@mui/material';
import Categories from 'components/core/Home/Categories';
import Banner from 'components/core/Home/Banner';
import Hero from 'components/core/Home/Hero';
import Newsletter from 'components/core/Home/Newsletter';
import People from 'components/core/Home/People';
import Products from 'components/core/Home/Products';
import Container from 'components/system/Container';
import React from 'react';
import { Categories as Cat } from '../../gql/__generated__/categories';
import PreOwnedProducts from '../../components/core/Home/PreOwnedProducts';

interface Props {
  categories: Cat;
}

const HomeView: React.FC<Props> = ({ categories }) => {
  return (
    <React.Fragment>
      <Container>
        <Hero />
      </Container>
      <Container paddingY={0}>
        <People />
      </Container>
      <Container>
        <Categories categories={categories} />
      </Container>
      <Box bgcolor={'secondary.main'}>
        <Container>
          <Banner />
        </Container>
      </Box>
      <Container>
        <Products />
      </Container>
      <Container>
        <PreOwnedProducts />
      </Container>
      <Container>
        <Newsletter />
      </Container>
    </React.Fragment>
  );
};

export default HomeView;
