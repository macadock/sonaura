import { Box } from '@mui/system';
import Container from 'components/system/Container';
import { Legal } from '../../../gql/__generated__/legal';

interface Props {
  legals: Legal;
}

const PrivacyPolicyView: React.FC<Props> = ({ legals }) => {
  return (
    <Container>
      <Box sx={{ whiteSpace: 'break-spaces' }}>
        {legals.legals[0].privacyPolicy}
      </Box>
    </Container>
  );
};

export default PrivacyPolicyView;
