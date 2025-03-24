import { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import './globals.css';
import { Montserrat } from 'next/font/google';

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
      </body>
    </html>
  );
}
