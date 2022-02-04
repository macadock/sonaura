import { Box } from '@mui/material';
import Container from 'components/system/Container';
import { Legal } from '../../../gql/__generated__/legal';

interface Props {
  legals: Legal;
}

const LegalNoticeView: React.FC<Props> = ({ legals }) => {
  return (
    <Container>
      <Box sx={{ whiteSpace: 'break-spaces' }}>
        {legals.legals[0].legalNotice}
      </Box>
    </Container>
  );
};

export default LegalNoticeView;
