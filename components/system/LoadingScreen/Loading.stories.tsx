import React from 'react';

import { Meta, Story } from '@storybook/react';
import LoadingScreen from '.';

export default {
  title: 'Components/LoadingScreen',
  component: LoadingScreen,
} as Meta;

export const Default: Story = () => <LoadingScreen />;
