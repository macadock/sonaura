import DefaultErrorPage from 'next/error';
import { useQuery } from '@apollo/client';
import LoadingScreen from 'core/LoadingScreen';
import { useEffect, useState } from 'react';
import { GET_CATEGORY } from '../../../gql/get-categories';
import {
  Category,
  CategoryVariables,
} from '../../../gql/__generated__/category';
import { Box, Typography } from '@mui/material';
import { Main } from 'layouts';
import styled from 'styled-components';
import ProductGrid from './ProductGrid';

interface Props {
  slug: string;
}

const CategoryView: React.FC<Props> = ({ slug }) => {
  const [isError, setIsError] = useState(false);

  const { data, loading } = useQuery<Category, CategoryVariables>(
    GET_CATEGORY,
    {
      variables: {
        slug: slug,
      },
    },
  );

  useEffect(() => {
    if (data?.category === null && !loading) {
      setIsError(true);
    }
  }, [data]);

  if (loading) {
    return (
      <Main>
        <LoadingScreen />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <DefaultErrorPage statusCode={404} />
      </Main>
    );
  }

  return (
    <Main>
      <Container>
        <Typography variant="h1">{data?.category?.name}</Typography>
        <ProductGrid />
      </Container>
    </Main>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export default CategoryView;
