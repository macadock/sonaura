import { HeroVideo } from '@/components/marketing/hero-video';
import { ListCategories } from '@/components/marketing/list-categories';
import { People } from '@/components/marketing/people';
import { Advices } from '@/components/marketing/advices';
import { Newsletter } from '@/components/marketing/newsletter';
import { FeaturedProducts } from '@/components/marketing/featured-products';

export default async function Homepage() {
  return (
    <div className={'flex flex-col gap-8'}>
      <HeroVideo
        title={'Bang & Olufsen vous accompagne dans votre projet audiovisuel.'}
        subtitle={'Devis et visite à domicile gratuit.'}
        button={{
          label: 'Prendre rendez-vous avec nos experts',
          href: '/projet',
        }}
        video={{
          url: 'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/home_video',
          poster:
            'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/professionnals/slide-1',
        }}
        tags={[
          'TV',
          'Enceintes nomades',
          'Home cinéma',
          'Salle de cinéma privée',
          'Vidéoprojecteur',
          'Domotique',
          'Toutes marques',
        ]}
      />
      <People
        title={'Passionnés'}
        subtitle={
          'Vos boutiques de Lyon et Annecy sont gérées par des passionnés qui sont présents pour partager leur passion Bang & Olufsen et leur savoir-faire.'
        }
        image2={{
          url: 'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/gerant_grenoble',
          alt: 'Gérant Grenoble',
        }}
        image1={{
          url: 'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/gerant_lyon',
          alt: 'Gérant Lyon',
        }}
      />
      <ListCategories title={'Catégories'} subtitle={'Explorez nos produits'} />
      <Advices
        title={'Laissez vous guider.'}
        subtitle={
          'Toutes nos équipes vous conseillent les produits Bang & Olufsen qui répondront à vos besoins.'
        }
        image={{
          url: 'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/banner_image',
          alt: 'TV',
        }}
        button={{
          href: '/contact',
          label: 'Contactez nos magasins',
        }}
      />
      <FeaturedProducts
        id={'products'}
        variant={'featured'}
        title={'Produits mis en avant'}
        subtitle={'Produits'}
        description={
          'Vivez une expérience audiovisuelle comme jamais auparavant.'
        }
      />
      <FeaturedProducts
        variant={'pre-owned'}
        title={"Produits d'occasion"}
        subtitle={'Occasion'}
        description={
          'Prolongez la vie de produits Bang & Olufsen tout en vous faisant plaisir.'
        }
      />
      <div className={'p-6'}>
        <Newsletter />
      </div>
    </div>
  );
}
