'use client';

import { PropsWithChildren } from 'react';
import { CartProvider } from 'react-use-cart';

export const PublicProviders = ({ children }: PropsWithChildren) => {
  return <CartProvider>{children}</CartProvider>;
};
