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
        title={
          <h1 className={'text-2xl md:text-4xl font-medium leading-snug'}>
            {'Sonaura, distributeur '}
            <span className={'whitespace-nowrap'}>Bang & Olufsen</span>
            {' et multimarques, vous accompagne dans votre projet audiovisuel.'}
          </h1>
        }
        subtitle={
          <h2 className={'text-lg md:text-2xl text-gray-700'}>
            {'Devis et visite à domicile gratuit.'}
          </h2>
        }
        button={{
          label: 'Prendre rendez-vous avec nos experts',
          href: '/projet',
        }}
        video={{
          baseUrl: '/assets/video/home/home_video',
          poster: '/assets/video/home/home_video_poster.webp',
        }}
        tags={[
          'Salle de cinéma privée',
          'Téléviseurs',
          'Home cinéma',
          'Enceintes nomades',
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
          url: '/assets/image/home/gerant_annecy.webp',
          alt: "Gérant du magasin d'Annecy",
        }}
        image1={{
          url: '/assets/image/home/gerant_lyon.webp',
          alt: 'Gérant du magasin de Lyon',
        }}
      />
      <ListCategories title={'Catégories'} subtitle={'Explorez nos produits'} />
      <Advices
        title={'Laissez vous guider.'}
        subtitle={
          'Toutes nos équipes vous conseillent les produits Bang & Olufsen qui répondront à vos besoins.'
        }
        image={{
          url: '/assets/image/home/banner.webp',
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
      <Newsletter />
    </div>
  );
}
