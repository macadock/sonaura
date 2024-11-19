import { Montserrat } from 'next/font/google';

import { PropsWithChildren } from 'react';
import { BreakpointsHelper } from '@/components/common';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distributeur Bang & Olufsen Auvergne Rhône-Alpes | Sonaura',
};

const montserrat = Montserrat({
  subsets: ['latin'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={`min-h-screen ${montserrat.className} text-balance`}>
        {children}
        <BreakpointsHelper />
      </body>
    </html>
  );
}
