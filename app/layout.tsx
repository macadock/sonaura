import { Montserrat } from 'next/font/google';

import { GoogleTagManager } from '@next/third-parties/google';

import { PropsWithChildren } from 'react';
import { BreakpointsHelper } from '@/components/common/breakpoint-helper';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Distributeur Bang & Olufsen Auvergne Rhône-Alpes | Sonaura',
};

const montserrat = Montserrat({
  subsets: ['latin'],
});

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const gtmId = process.env.GOOGLE_TAG_MANAGER_ID;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      {!isDev && gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className={`min-h-screen ${montserrat.className} text-balance`}>
        {children}
        <BreakpointsHelper />
      </body>
    </html>
  );
}
