/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Link from 'next/link';
import { Categories } from 'gql/__generated__/categories';
import { useTranslation } from 'next-i18next';
import { useTheme } from '@mui/material';

interface Props {
  categories: Categories;
}

const Categories: React.FC<Props> = ({ categories }) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const { t } = useTranslation('homepage', { keyPrefix: 'categories' });

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
          {t('subtitle')}
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
          {t('title')}
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {categories.categories.map((category, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Link href={`/${category.slug}`} passHref>
                <Box
                  display={'block'}
                  width={1}
                  height={1}
                  sx={{
                    textDecoration: 'none',
                    transition: 'all .2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box
                    component={Card}
                    padding={4}
                    width={1}
                    height={1}
                    bgcolor={'alternate.main'}
                    data-aos={'fade-up'}
                    data-aos-delay={i * 100}
                    data-aos-offset={100}
                    data-aos-duration={600}
                  >
                    <Box
                      position={'relative'}
                      display={'flex'}
                      justifyContent={'center'}
                      sx={{ height: 100 }}
                    >
                      <Box
                        component="img"
                        sx={{
                          color: 'primary.dark',
                          objectFit: 'contain',
                          filter: mode === 'dark' ? 'invert(1)' : 'invert(0)',
                        }}
                        src={category.file.url}
                      />
                    </Box>
                    <Typography
                      variant={'subtitle1'}
                      align={'center'}
                      sx={{ fontWeight: 500, marginTop: 2 }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Categories;
