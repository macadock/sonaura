import React from 'react';

import { Meta, Story } from '@storybook/react';
import Slideshow from '.';
import { SlideshowFixtures } from './Slideshow.fixtures';

export default {
  title: 'Components/Slideshow',
  component: Slideshow,
} as Meta;

export const Default: Story = () => <Slideshow />;

Default.parameters = {
  apolloClient: {
    mocks: SlideshowFixtures,
  },
};
