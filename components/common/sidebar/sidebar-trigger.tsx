'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';

export const SidebarTrigger = (props: ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return <Button size={'icon'} onClick={toggleSidebar} {...props} />;
};
