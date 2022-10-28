import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import Contact from 'components/core/Contact/Contact';
import Form from 'components/core/Contact/Form';
import Hero from 'components/core/Contact/Hero';
import Container from 'components/system/Container';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shops: any;
}

const ContactView: React.FC<Props> = ({ shops }) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.alternate.main,
          backgroundImage: `linear-gradient(120deg, ${theme.palette.alternate.dark} 0%, ${theme.palette.background.paper} 100%)`,
          marginTop: -13,
          paddingTop: 13,
        }}
      >
        <Container>
          <Hero />
        </Container>
      </Box>
      {shops && <Contact shops={shops.shops} />}
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Form />
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default ContactView;
