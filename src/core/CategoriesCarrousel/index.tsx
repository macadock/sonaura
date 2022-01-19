import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { GET_CATEGORIES } from '../../../gql/get-categories';
import { Categories } from '../../../gql/__generated__/categories';

const CategoriesCarrousel: React.FC = () => {
  const theme = useTheme();
  const { data: categories } = useQuery<Categories>(GET_CATEGORIES);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Wrapper isdesktop={isDesktop}>
      {categories &&
        categories?.categories.map((category) => (
          <Link href={'/category/' + category.slug} key={category.id}>
            <StyledCard isdesktop={isDesktop}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={category.file?.url}
                  alt={category.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Link>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ isdesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isdesktop }) => (isdesktop ? 'row' : 'column')};
  justify-content: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const StyledCard = styled(Card)<{ isdesktop: boolean }>`
  width: ${({ isdesktop }) => (isdesktop ? '20rem' : '100%')};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isdesktop }) => (isdesktop ? 'margin: 1rem;' : 'margin-bottom: 2rem;')}
`;

export default CategoriesCarrousel;
