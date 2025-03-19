import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Price } from '@/components/marketing/price';
import Image from 'next/image';

type Variant = 'featured' | 'pre-owned';

export interface FeaturedProductsProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  variant: Variant;
}

export const FeaturedProducts = async ({
  id,
  title,
  subtitle,
  description,
  variant = 'featured',
}: FeaturedProductsProps) => {
  const supabaseClient = await createClient();

  const getProducts = async (variant: Variant) => {
    if (variant === 'featured') {
      const { data } = await supabaseClient
        .from('products')
        .select('*, categories(slug)')
        .eq('onHomepage', true)
        .order('created_at', { ascending: false })
        .limit(3);

      return data;
    }

    if (variant === 'pre-owned') {
      const { data } = await supabaseClient
        .from('products')
        .select('*, categories(slug)')
        .order('created_at', { ascending: false });
      return data
        ?.filter((product) => product.categories.slug === 'occasion')
        .slice(0, 3);
    }

    return null;
  };

  const products = await getProducts(variant);

  return (
    <div
      id={id}
      className="flex flex-col gap-6 justify-center text-center md:px-9 xl:max-w-7xl xl:m-auto px-6"
    >
      <div className="flex flex-col gap-2">
        {subtitle && <p className="uppercase text-base">{subtitle}</p>}
        {title && (
          <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base md:text-xl font-light">{description}</p>
        )}
      </div>
      {products && (
        <div className="grid gap-8 auto-cols-fr sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => {
            const { bucket, file } = product.mainImage as {
              bucket: string;
              file: string;
            };

            const {
              data: { publicUrl },
            } = supabaseClient.storage.from(bucket).getPublicUrl(file, {
              transform: {
                quality: 75,
                width: 800,
                height: 800,
              },
            });

            return (
              <Link
                key={product.id}
                href={`/${product.categories?.slug}/${product.slug}`}
                className={'w-full h-full'}
              >
                <Card className="w-full h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6 overflow-hidden">
                    <div className={'relative size-48 max-w-full'}>
                      <Image
                        src={publicUrl}
                        alt={product.name}
                        fill
                        objectFit={'contain'}
                      />
                    </div>

                    <h3 className="text-lg font-medium">{product.name}</h3>

                    {product.price && <Price price={product.price} />}
                    {product.fromPrice && (
                      <Price
                        price={product.fromPrice}
                        formatting={(price) => `À partir de ${price}`}
                      />
                      // <p className="text-primary">{`À partir de ${getFormattedPrice(product.fromPrice)}`}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
