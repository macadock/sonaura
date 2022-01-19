import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import Container from 'components/Container';
import { Main } from 'layouts';
import { GET_SHOPS } from '../../../gql/get-shops';
import { Shops } from '../../../gql/__generated__/shops';
import { Contact, Form, Hero } from './components';

const ContactView: React.FC = () => {
  const theme = useTheme();

  const { data: shops, loading } = useQuery<Shops>(GET_SHOPS);

  return (
    <Main>
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
    </Main>
  );
};

export default ContactView;
