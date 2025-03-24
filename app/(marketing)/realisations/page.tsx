import { HeroImage } from '@/components/marketing/hero-image';
import { InstallationGrid } from '@/components/marketing/installation-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations',
};

export default function InstallationsPage() {
  return (
    <div className={'flex flex-col'}>
      <HeroImage
        title={
          <h1 className={'text-3xl md:text-6xl font-medium'}>
            Nos réalisations
          </h1>
        }
        subtitle={
          <p className={'text-lg md:text-xl'}>
            {"Vous aussi profitez d'une installation sur mesure"}
          </p>
        }
        image={{
          url: '/assets/image/installations/installation_hero.webp',
        }}
      />
      <InstallationGrid />
    </div>
  );
}
