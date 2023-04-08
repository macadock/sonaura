import { Box } from '@mui/material';
import { Installation } from 'lib/supabase/installations';

import Card from './Card';

interface Props {
  installations: Installation[];
}

const Column: React.FC<Props> = ({ installations }) => {
  return (
    <Box>
      {installations.map((installation, i) => (
        <Card installation={installation} key={i} />
      ))}
    </Box>
  );
};

export default Column;
