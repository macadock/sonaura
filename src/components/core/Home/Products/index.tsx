import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../../../gql/get-products';
import { Products } from '../../../../../gql/__generated__/products';
import { CircularProgress } from '@mui/material';
import NumberFormat from 'react-number-format';

const Products: React.FC = () => {
  const theme = useTheme();

  const { data: products, loading, error } = useQuery<Products>(GET_PRODUCTS);

  if (error) {
    return null;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          Produits
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Produits mis en avant
        </Typography>
        <Typography
          variant="h6"
          align={'center'}
          color={'text.secondary'}
          data-aos={'fade-up'}
        >
          Vivez une expérience audiovisuelle comme jamais auparavant.
        </Typography>
        <Box display="flex" justifyContent={'center'} marginTop={2}>
          <Button variant="outlined" color="primary" size="large">
            Tout afficher
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {products.products.map((product, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={i}
            data-aos={'fade-up'}
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box display={'block'} width={1} height={1}>
              <Box
                component={Card}
                width={1}
                height={1}
                display={'flex'}
                flexDirection={'column'}
              >
                <CardMedia
                  sx={{
                    position: 'relative',
                    height: { xs: 240, sm: 340, md: 280 },
                    overflow: 'hidden',
                    padding: 3,
                    paddingBottom: 0,
                    background: theme.palette.alternate.main,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component={LazyLoadImage}
                    effect="blur"
                    src={product.mainAsset.url}
                    sx={{
                      width: '100%',
                      '& img': {
                        objectFit: 'cover',
                      },
                    }}
                  />
                  <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    padding={2}
                    width={1}
                  ></Box>
                </CardMedia>
                <CardContent>
                  <Typography
                    variant={'h6'}
                    align={'left'}
                    sx={{ fontWeight: 700 }}
                  >
                    {product.name}
                  </Typography>

                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 700 }} color={'primary'}>
                      <NumberFormat
                        value={product.price}
                        displayType="text"
                        thousandSeparator=" "
                        suffix=" €"
                        decimalSeparator=","
                      />
                    </Typography>
                    <Button
                      variant={'outlined'}
                      startIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          width={20}
                          height={20}
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </Box>
                      }
                    >
                      Ajouter au panier
                    </Button>
                  </CardActions>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
