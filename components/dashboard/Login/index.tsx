import React, { FormEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/system/Container';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { websiteUrl } from 'appConstants';
import { Alert } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const supabase = useSupabaseClient();

  const onChange: OutlinedTextFieldProps['onChange'] = (event) => {
    setEmail(event.target.value);
    setEmailSent(false);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${websiteUrl}/dashboard`,
        },
      });
      setEmailSent(true);
    } catch (e) {}
  };

  return (
    <Box bgcolor={'alternate.main'} height={'100vh'}>
      <Container maxWidth={800}>
        <Box marginBottom={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Connexion
          </Typography>
        </Box>
        <Card sx={{ p: { xs: 4, md: 6 } }}>
          <form onSubmit={onSubmit}>
            <Box
              display="flex"
              gap={4}
              flexDirection={'column'}
              width={1}
              margin={'0 auto'}
            >
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                value={email}
                onChange={onChange}
                fullWidth
              />
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                disabled={emailSent === true}
              >
                Connexion
              </Button>
              {emailSent ? (
                <Alert severity={'info'}>
                  Vous allez recevoir un email avec un lien de connexion
                </Alert>
              ) : null}
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
