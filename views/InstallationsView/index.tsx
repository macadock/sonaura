import React from 'react';

import { Container } from '@mui/material';
import Hero from 'components/core/Installations/Hero';
import Main from 'components/core/Installations/Main';
import { Installation } from 'lib/supabase/installations';

interface Props {
  installations: Installation[];
}

const InstallationView: React.FC<Props> = ({ installations }) => {
  return (
    <React.Fragment>
      <Hero />
      <Container>
        <Main installations={installations} />
      </Container>
    </React.Fragment>
  );
};

export default InstallationView;
