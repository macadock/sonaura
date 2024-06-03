import { Montserrat } from 'next/font/google';

import { PropsWithChildren } from 'react';
import { BreakpointsHelper } from '@/components/common';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={`min-h-screen ${montserrat.className}`}>
        {children}
        <BreakpointsHelper />
      </body>
    </html>
  );
}
