import { PropsWithChildren } from 'react';
import { PublicProviders } from '@/components/system/providers/public-providers';
import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PublicProviders>
      <div className={'flex flex-col gap-4 min-h-screen'}>
        <Header />
        <main className={'flex-1'}>{children}</main>
        <Footer />
      </div>
    </PublicProviders>
  );
}
