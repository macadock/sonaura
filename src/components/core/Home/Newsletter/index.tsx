/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Container from 'components/system/Container';
import { isEmail } from 'class-validator';
import toast from 'react-hot-toast';
import SendInBlue, { url } from '../../../../sendInBlue';

const Newsletter: React.FC = () => {
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const isValid = isEmail(email);

  const handleSubscribe = async () => {
    if (isValid) {
      const { getHeaders, getBodyNewsletterSubscription } = SendInBlue;

      const subscribe = fetch(`${url}contacts/doubleOptinConfirmation`, {
        method: 'POST',
        headers: getHeaders(),
        body: getBodyNewsletterSubscription(email),
      });

      toast.promise(subscribe, {
        loading: 'Inscription...',
        success: "Vous allez recevoir un email pour confirmer l'inscription",
        error: 'Merci de réessayer votre inscription',
      });
    } else {
      toast.error("Merci d'entrer une adresse email valide");
    }
  };

  return (
    <Box bgcolor={'primary.main'} borderRadius={2}>
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              data-aos={'fade-up'}
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
              {'Inscrivez-vous à notre newsletter'}
            </Typography>
            <Typography
              variant="h6"
              align={'center'}
              sx={{
                color: theme.palette.common.white,
              }}
              data-aos={'fade-up'}
            >
              {'Soyez informé des dernières nouveautés Bang & Olufsen'}
            </Typography>
          </Box>
          <Box width={1} display={'flex'} justifyContent={'center'}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                maxWidth: 400,
                width: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-root': {
                  color: 'white',
                },
                '& .MuiInputAdornment-root svg': {
                  color: 'white !important',
                },
              }}
              data-aos="fade-up"
            >
              <OutlinedInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') handleSubscribe();
                }}
                endAdornment={
                  <InputAdornment
                    sx={{ cursor: 'pointer' }}
                    onClick={handleSubscribe}
                    position="end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width={24}
                      height={24}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </InputAdornment>
                }
                placeholder="Votre adresse email"
              />
              {email !== '' && !isValid && (
                <Typography color={'white'} sx={{ margin: '0.5rem' }}>
                  {"Merci d'entrer une adresse email valide"}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
