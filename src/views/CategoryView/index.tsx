import { Category } from '../../../gql/__generated__/category';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import ProductGrid from '../../components/core/ProductGrid';
import React from 'react';

interface Props {
  category: Category;
}

const CategoryView: React.FC<Props> = ({ category }) => {
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h1">{category.category.name}</Typography>
        <ProductGrid />
      </Container>
    </React.Fragment>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export default CategoryView;
