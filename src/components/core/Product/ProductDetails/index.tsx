import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';
import { Product } from '../../../../../gql/__generated__/product';

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const theme = useTheme();
  const [size, setSize] = useState<Product['product']['sizes'][number]>(null);
  const [color, setColor] =
    useState<Product['product']['colors'][number]>(null);
  const [positionning, setPositionning] =
    useState<Product['product']['positionnings'][number]>(null);
  const [frameColor, setFrameColor] =
    useState<Product['product']['frameColors'][number]>(null);
  const [sounbarColor, setSoundbarColor] =
    useState<Product['product']['sounbarColors'][number]>(null);
  const [supportColor, setSupportColor] =
    useState<Product['product']['supportColors'][number]>(null);

  return (
    <Box>
      <Box
        padding={1}
        display={'inline-flex'}
        borderRadius={1}
        bgcolor={'primary.main'}
        marginBottom={1}
      >
        <Typography sx={{ color: 'common.white', lineHeight: 1 }}>
          nouveau
        </Typography>
      </Box>
      <Typography variant={'h4'} fontWeight={700}>
        {product.product.name}
      </Typography>
      <Box marginY={3}>
        <Box display={'flex'}>
          {product.product.price && (
            <Typography variant={'h5'} fontWeight={700}>
              <NumberFormat
                value={product.product.price}
                displayType="text"
                thousandSeparator=" "
                suffix=" €"
                decimalSeparator=","
              />
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant={'subtitle2'} color={'text.secondary'}>
        {product.product.description}
      </Typography>
      <Box marginY={3}>
        {product?.product.sizes.length > 0 && (
          <Box>
            <Typography>
              Taille :{' '}
              <Typography component={'span'} fontWeight={700}>
                {size?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.sizes.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setSize(item)}
                  sx={{
                    borderRadius: 1,
                    padding: 1,
                    border: `2px solid ${
                      size?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Typography>{item.name}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        {product?.product.colors.length > 0 && (
          <Box marginY={2}>
            <Typography>
              Couleur :{' '}
              <Typography component={'span'} fontWeight={700}>
                {color?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.colors.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setColor(item)}
                  sx={{
                    borderRadius: '100%',
                    padding: 0.5,
                    border: `2px solid ${
                      color?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '100%',
                      padding: 1.5,
                      bgcolor: item.colorCode.hex,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        {product?.product.frameColors.length > 0 && (
          <Box marginY={2}>
            <Typography>
              Couleur du cadre :{' '}
              <Typography component={'span'} fontWeight={700}>
                {frameColor?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.frameColors.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setFrameColor(item)}
                  sx={{
                    borderRadius: '100%',
                    padding: 0.5,
                    border: `2px solid ${
                      frameColor?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '100%',
                      padding: 1.5,
                      bgcolor: item.colorCode.hex,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        {product?.product.sounbarColors.length > 0 && (
          <Box marginY={2}>
            <Typography>
              Couleur de la barre de son :{' '}
              <Typography component={'span'} fontWeight={700}>
                {sounbarColor?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.sounbarColors.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setSoundbarColor(item)}
                  sx={{
                    borderRadius: '100%',
                    padding: 0.5,
                    border: `2px solid ${
                      sounbarColor?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '100%',
                      padding: 1.5,
                      bgcolor: item.colorCode.hex,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        {product?.product.supportColors.length > 0 && (
          <Box marginY={2}>
            <Typography>
              Couleur du support :{' '}
              <Typography component={'span'} fontWeight={700}>
                {supportColor?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.supportColors.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setSupportColor(item)}
                  sx={{
                    borderRadius: '100%',
                    padding: 0.5,
                    border: `2px solid ${
                      supportColor?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '100%',
                      padding: 1.5,
                      bgcolor: item.colorCode.hex,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        {product?.product.positionnings.length > 0 && (
          <Box>
            <Typography>
              Support :{' '}
              <Typography component={'span'} fontWeight={700}>
                {positionning?.name || ''}
              </Typography>
            </Typography>
            <Stack direction={'row'} spacing={1} marginTop={0.5}>
              {product.product.positionnings.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => setPositionning(item)}
                  sx={{
                    borderRadius: 1,
                    padding: 1,
                    border: `2px solid ${
                      positionning?.id === item.id
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    cursor: 'pointer',
                  }}
                >
                  <Typography>{item.name}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      {/* <Stack marginTop={3} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'large'}
          fullWidth
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width={20}
              height={20}
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Ajouter en favoris
        </Button>
        <Button
          variant={'contained'}
          color={'primary'}
          size={'large'}
          fullWidth
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width={20}
              height={20}
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          }
        >
          Ajouter au panier
        </Button>
      </Stack> */}
      <Box marginY={3}>
        <Typography>Nous sommes à votre écoute.</Typography>
        <Stack direction={'row'} spacing={2} marginTop={0.5}>
          <Button
            sx={{
              color: 'text.secondary',
            }}
            href="/contact"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            }
          >
            Appelez-nous
          </Button>
          <Button
            sx={{
              color: 'text.secondary',
            }}
            href="/contact"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          >
            Contactez-nous
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetails;
