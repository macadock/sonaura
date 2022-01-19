import React from 'react';

import { Meta, Story } from '@storybook/react';
import CategoriesCarrousel from '.';
import { CategoriesFixtures } from './CategoriesCarrousel.fixtures';

export default {
  title: 'Components/CategoriesCarrousel',
  component: CategoriesCarrousel,
} as Meta;

export const Default: Story = () => <CategoriesCarrousel />;
Default.parameters = {
  apolloClient: {
    mocks: CategoriesFixtures,
  },
};
