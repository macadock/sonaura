import React, { useState } from 'react';

import { Meta, Story } from '@storybook/react';
import Drawer from '.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
} as Meta;

export const Default: Story = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleState = () => {
    setOpen(!open);
  };

  return <Drawer open onClose={handleState} />;
};
