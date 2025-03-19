import { PropsWithChildren } from 'react';
import { PublicProviders } from '@/components/system/providers/public-providers';
import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { CartSidebar } from '@/components/common/cart-sidebar/cart-sidebar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PublicProviders>
      <CartSidebar>
        <Header />
        {children}
        <Footer />
      </CartSidebar>
    </PublicProviders>
  );
}
