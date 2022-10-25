import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Container from 'components/system/Container';
import { Legal } from 'gql/__generated__/legal';

interface Props {
  legals: Legal;
}

const PrivacyPolicyView: React.FC<Props> = ({ legals }) => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '1rem',
        }}
      >
        <Typography variant="h1">Politique de confidentialité</Typography>
      </Box>
      <Box sx={{ whiteSpace: 'break-spaces' }}>
        {legals.legals[0].privacyPolicy}
      </Box>
    </Container>
  );
};

export default PrivacyPolicyView;
