import { FeaturedProductsSchema } from '@/features/custom-components/components/Products/FeaturedProducts/schema';
import { PropsNameEnum } from '@/features/page-editor';
import zod from 'zod';
import { Product } from '@/utils/data';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getImageUrl } from '@/utils/image/get-image-url';
import { getFormattedPrice } from '@/utils/price';

export type FeaturedProductsProps = {
  id?: string;
  content: zod.infer<typeof FeaturedProductsSchema>;
  isPreview?: boolean;
  [PropsNameEnum.PRODUCTS]: Array<Product>;
};

export const FeaturedProducts = ({
  id,
  content,
  isPreview = false,
  products,
}: FeaturedProductsProps) => {
  const parse = FeaturedProductsSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }
  const { title, subtitle, description } = content;

  if (!products) {
    return null;
  }

  return (
    <div
      id={id}
      className="flex flex-col gap-6 justify-center text-center md:px-9 xl:max-w-7xl xl:m-auto"
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
      <div className="grid gap-8 auto-cols-fr sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/${product.categories?.slug}/${product.slug}`}
              className={'w-full h-full'}
            >
              <Card className="w-full h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6">
                  <img
                    src={getImageUrl(product.mainImage, {
                      width: 300,
                      height: 300,
                    })}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    width={300}
                    height={300}
                  />

                  <h3 className="text-lg font-medium">{product.name}</h3>

                  {product.price && (
                    <p className="text-primary">{`${getFormattedPrice(product.price)}`}</p>
                  )}
                  {product.fromPrice && (
                    <p className="text-primary">{`À partir de ${getFormattedPrice(product.fromPrice)}`}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
