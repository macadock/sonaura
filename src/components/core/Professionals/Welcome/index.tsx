/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Welcome: React.FC = () => {
  const GridItemHeadlineBlock = () => (
    <Box>
      <Typography
        variant="h3"
        align={'center'}
        gutterBottom
        sx={{
          fontWeight: 900,
        }}
      >
        Intégrateur audiovisuel, architecte d’intérieur ou designer ?
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        align={'center'}
        sx={{
          fontWeight: 400,
        }}
      >
        Proposez des produits haut de gamme et design.
        <br /> Nos équipes vous accompagnent dans tous vos projets, pour vous ou
        vos clients.
      </Typography>
    </Box>
  );

  // const GridItemPartnersBlock = () => (
  //   <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
  //     {[
  //       'https://assets.maccarianagency.com/svg/logos/airbnb-original.svg',
  //       'https://assets.maccarianagency.com/svg/logos/amazon-original.svg',
  //       'https://assets.maccarianagency.com/svg/logos/fitbit-original.svg',
  //       'https://assets.maccarianagency.com/svg/logos/netflix-original.svg',
  //       'https://assets.maccarianagency.com/svg/logos/google-original.svg',
  //       'https://assets.maccarianagency.com/svg/logos/paypal-original.svg',
  //     ].map((item, i) => (
  //       <Box maxWidth={80} marginTop={2} marginRight={4} key={i}>
  //         <Box
  //           component="img"
  //           height={1}
  //           width={1}
  //           src={item}
  //           alt="..."
  //           sx={{
  //             filter:
  //               theme.palette.mode === 'dark'
  //                 ? 'brightness(0) invert(0.7)'
  //                 : 'contrast(0) brightness(0)',
  //           }}
  //         />
  //       </Box>
  //     ))}
  //   </Box>
  // );

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent={'center'}
          >
            <GridItemHeadlineBlock />
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent={'center'}
          >
            <GridItemPartnersBlock />
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Welcome;
