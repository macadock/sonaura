import { Box } from '@mui/material';
import Categories from 'components/core/Home/Categories';
import FeaturedProducts from 'components/core/Home/FeaturedProducts';
import Hero from 'components/core/Home/Hero';
import Newsletter from 'components/core/Home/Newsletter';
import Overview from 'components/core/Home/Overview';
import Products from 'components/core/Home/Products';
import Container from 'components/system/Container';
import React from 'react';
import { Categories as Cat } from '../../../gql/__generated__/categories';

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
        <Overview />
      </Container>
      <Container>
        <Categories categories={categories} />
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
    </React.Fragment>
  );
};

export default HomeView;
