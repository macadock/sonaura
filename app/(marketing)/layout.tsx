import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

import { PropsWithChildren } from 'react';
import { PublicProviders } from '@/components/system/Providers/PublicProviders';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PublicProviders>
      <Header />
      <main>{children}</main>
      <Footer />
    </PublicProviders>
  );
}
