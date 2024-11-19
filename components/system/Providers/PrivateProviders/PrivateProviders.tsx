'use client';

import { PropsWithChildren } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

export const PrivateProviders = ({ children }: PropsWithChildren) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
