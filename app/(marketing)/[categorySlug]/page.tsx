import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProductsGrid } from '@/components/marketing/products-grid';
import type { Metadata } from 'next';

export type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const supabaseClient = await createClient();
  const { categorySlug } = await props.params;

  const { data: category } = await supabaseClient
    .from('categories')
    .select('*')
    .limit(1)
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) {
    return {};
  }

  return {
    title: `${category.name}`,
  };
};

export default async function CategoryPage(props: PageProps) {
  const supabaseClient = await createClient();
  const { categorySlug } = await props.params;

  const { data: category } = await supabaseClient
    .from('categories')
    .select('*')
    .limit(1)
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category?.id) {
    return notFound();
  }

  const { data, error } = await supabaseClient
    .from('products')
    .select('*, categories (slug)')
    .eq('categoryId', category.id);

  if (error) {
    return notFound();
  }

  return (
    <section className={'flex flex-col gap-12 p-4 md:p-8'}>
      <ProductsGrid
        products={data}
        title={
          <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
            {category.name}
          </h2>
        }
        description={
          <CategoryDescription isPreowned={category.slug === 'occasion'} />
        }
      />
    </section>
  );
}

const CategoryDescription = ({ isPreowned }: { isPreowned: boolean }) => {
  if (isPreowned)
    return (
      <div className={'flex flex-col gap-2 text-base md:text-xl font-light'}>
        <p>
          {
            "Nos produits d'occasion sont garantis 3 mois, sauf exception mentionnée en description du produit d'occasion et produits d'exposition."
          }
        </p>
      </div>
    );

  return null;
};
