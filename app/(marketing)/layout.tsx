import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
