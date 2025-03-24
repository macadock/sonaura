import { PropsWithChildren } from 'react';
import { PublicProviders } from '@/components/system/providers/public-providers';
import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { CartSidebar } from '@/components/common/cart-sidebar/cart-sidebar';
import { BreakpointsHelper } from '@/components/common/breakpoint-helper';
import { Analytics } from '@/components/system/analytics/analytics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Sonaura',
    default: 'Distributeur Bang & Olufsen Auvergne Rhône-Alpes',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PublicProviders>
      <CartSidebar>
        <Header />
        {children}
        <Footer />
        <BreakpointsHelper />
        <Analytics />
      </CartSidebar>
    </PublicProviders>
  );
}
