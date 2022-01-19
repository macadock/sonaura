import React from 'react';

import { Meta, Story } from '@storybook/react';
import ContactCard from '.';
import { Shops } from '../Footer/Footer.fixtures';

export default {
  title: 'Components/ContactCard',
  component: ContactCard,
} as Meta;

export const ImageRight: Story = () => <ContactCard shop={Shops[0]} />;

export const ImageLeft: Story = () => (
  <ContactCard shop={Shops[0]} imageSide="left" />
);
