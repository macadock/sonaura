import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { uniqueName } from '..';
import { PagesUrls } from '../../../../appConstants';

const Success: React.FC = () => {
  useEffect(() => {
    if (sessionStorage) {
      sessionStorage.removeItem(uniqueName);
    }
  }, []);

  return (
    <Box textAlign={'center'}>
      <Typography variant={'h2'} marginTop={'5rem'}>
        {'Commande validée'}
      </Typography>
      <Typography variant={'h4'} marginY={'2rem'}>
        {'Sonaura vous remercie pour votre commande'}
      </Typography>
      <Typography whiteSpace={'break-spaces'} marginBottom={'2rem'}>
        {
          "Vous allez recevoir un email de confirmation récapitulant la commande.\n Vous serez informé de l'état d'avancement de la commande."
        }
      </Typography>
      <Button href={PagesUrls.HOMEPAGE} variant={'contained'}>
        {"Retour à la page d'accueil"}
      </Button>
    </Box>
  );
};

export default Success;
