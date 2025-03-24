import { HeroText } from '@/components/marketing/hero-text';
import { HeroImage } from '@/components/marketing/hero-image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professionels',
};

export default function ProfessionalsPage() {
  return (
    <div className={'flex flex-col bg-tertiary'}>
      <HeroText
        title={
          <h1 className={'text-4xl font-semibold leading-snug'}>
            Intégrateur audiovisuel, architecte d’intérieur, hôtelier ou
            restaurateur ?
          </h1>
        }
        subtitle={
          <p className={'text-xl font-light text-gray-700'}>
            Proposez des produits haut de gamme et design. Compatibilité KNX,
            Control 4 et Savant. Nos équipes vous accompagnent dans tous vos
            projets, pour vous ou vos clients.
          </p>
        }
        fullHeight
        showContact
      />
      <HeroImage
        title={
          <h2 className="text-4xl md:text-6xl font-medium uppercase">
            Intégration
          </h2>
        }
        subtitle={
          <p className="text-lg md:text-xl">
            Tous nos produits communiquent entre eux et sont capables de jouer
            ensemble.
          </p>
        }
        image={{
          url: '/assets/image/professionals/integration.webp',
        }}
        fullHeight
      />
      <HeroImage
        title={
          <h2 className="text-4xl md:text-6xl font-medium uppercase">Design</h2>
        }
        subtitle={
          <p className="text-lg md:text-xl">
            Des matériaux de qualité, un design irréprochable.
          </p>
        }
        image={{
          url: '/assets/image/professionals/design.webp',
        }}
        fullHeight
      />
      <HeroImage
        title={
          <h2 className="text-4xl md:text-6xl font-medium uppercase">
            Élégance
          </h2>
        }
        subtitle={
          <p className="text-lg md:text-xl">
            {"Des produits pensés jusqu'aux moindres détails."}
          </p>
        }
        image={{
          url: '/assets/image/professionals/elegance.webp',
        }}
        fullHeight
      />
      <HeroText
        title={
          <h2 className={'text-4xl font-semibold leading-snug'}>
            Contactez-nous
          </h2>
        }
        fullHeight
        showContact
      />
    </div>
  );
}
