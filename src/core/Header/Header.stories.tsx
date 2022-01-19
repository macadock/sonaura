import React from 'react';

import { Meta, Story } from '@storybook/react';
import Header from './Header';
import { PagesFixtures } from './Header.fixtures';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

export const Default: Story = () => <Header />;
Default.parameters = {
  apolloClient: {
    mocks: PagesFixtures,
  },
};
