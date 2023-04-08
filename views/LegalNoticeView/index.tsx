import { Box, Typography } from '@mui/material';
import Container from 'components/system/Container';

interface Props {
  legals: any;
}

const LegalNoticeView: React.FC<Props> = ({ legals }) => {
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
        <Typography variant="h1">Mentions légales</Typography>
      </Box>
      <Box sx={{ whiteSpace: 'break-spaces' }}>
        {legals.legals[0].legalNotice}
      </Box>
    </Container>
  );
};

export default LegalNoticeView;
