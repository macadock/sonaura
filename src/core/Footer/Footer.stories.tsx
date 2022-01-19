import React from 'react';

import { Meta, Story } from '@storybook/react';
import Footer from '.';
import { ShopsFixtures } from './Footer.fixtures';

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta;

export const Default: Story = () => <Footer />;
Default.parameters = {
  apolloClient: {
    mocks: ShopsFixtures,
  },
};
