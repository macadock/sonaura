import { PropsWithChildren } from 'react';
import { PublicProviders } from '@/components/system/providers/public-providers';
import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PublicProviders>
      <Header />
      <main>{children}</main>
      <Footer />
    </PublicProviders>
  );
}
