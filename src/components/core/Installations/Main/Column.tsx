import { Box } from '@mui/material';
import { InstallationFragment } from '../../../../gql/__generated__/installation-fragment';

import Card from './Card';

interface Props {
  installations: InstallationFragment[];
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
