import { Box } from '@mui/material';

import Card from './Card';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  installations: any[];
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
