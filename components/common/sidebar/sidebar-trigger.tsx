'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const SidebarTrigger = (props: ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={toggleSidebar}
      className={cn('cursor-pointer', props.className)}
      {...props}
    />
  );
};
