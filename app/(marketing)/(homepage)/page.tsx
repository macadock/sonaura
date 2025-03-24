import { HeroVideo } from '@/components/marketing/hero-video';
import { ListCategories } from '@/components/marketing/list-categories';
import { People } from '@/components/marketing/people';
import { Advices } from '@/components/marketing/advices';
import { Newsletter } from '@/components/marketing/newsletter';
import { ProductsGrid } from '@/components/marketing/products-grid';
import { createClient } from '@/lib/supabase/server';

export default async function Homepage() {
  const supabaseClient = await createClient();

  async function getFeaturedProducts() {
    const { data } = await supabaseClient
      .from('products')
      .select('*, categories(slug)')
      .eq('onHomepage', true)
      .order('created_at', { ascending: false })
      .limit(3);

    return data || [];
  }

  async function getPreOwnedProducts() {
    const { data } = await supabaseClient
      .from('products')
      .select('*, categories(slug)')
      .order('created_at', { ascending: false });

    return (
      data
        ?.filter((product) => product.categories.slug === 'occasion')
        .slice(0, 3) || []
    );
  }

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
      <ProductsGrid
        id={'products'}
        title={
          <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
            Produits mis en avant
          </h2>
        }
        subtitle={<p className="uppercase text-base">Produits</p>}
        description={
          <p className="text-base md:text-xl font-light">
            Vivez une expérience audiovisuelle comme jamais auparavant.
          </p>
        }
        products={await getFeaturedProducts()}
      />
      <ProductsGrid
        title={
          <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
            Produits d'occasion
          </h2>
        }
        subtitle={<p className="uppercase text-base">Occasion</p>}
        description={
          <p className="text-base md:text-xl font-light">
            Prolongez la vie de produits Bang & Olufsen tout en vous faisant
            plaisir.
          </p>
        }
        products={await getPreOwnedProducts()}
      />
      <Newsletter />
    </div>
  );
}
