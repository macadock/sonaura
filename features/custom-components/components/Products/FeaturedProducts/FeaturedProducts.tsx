import { Card, CardContent } from '@/components/ui/card';
import { FeaturedProductsSchema } from '@/features/custom-components/components/Products/FeaturedProducts/schema';
import { PropsNameEnum } from '@/features/page-editor';
import Image from 'next/image';
import Link from 'next/link';
import zod from 'zod';
import { Category, Product } from '@/utils/data';
import { getImageUrl } from '@/utils/image/get-product-main-image';

export type FeaturedProductsProps = {
  id?: string;
  content: zod.infer<typeof FeaturedProductsSchema>;
  isPreview?: boolean;
  [PropsNameEnum.PRODUCTS]: Array<Product>;
  [PropsNameEnum.CATEGORIES]: Array<Category>;
};

export const FeaturedProducts = ({
  id,
  content,
  isPreview = false,
  categories,
  products,
}: FeaturedProductsProps) => {
  const parse = FeaturedProductsSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }
  const { title, subtitle, description } = content;

  if (!products || !categories) {
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
      <div className="grid grid-cols-1 md:grid-flow-col md:auto-cols-fr gap-8">
        {products.map((product) => {
          const category = categories.find(
            (category) => category.id === product.categoryId,
          );
          return (
            <Link key={product.id} href={`/${category?.slug}/${product.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 max-w-xs">
                <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6">
                  {isPreview ? (
                    <img
                      src={getImageUrl(product.mainImage)}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      className="h-full w-full object-cover"
                      src={getImageUrl(product.mainImage)}
                      alt={product.name}
                      width={300}
                      height={300}
                    />
                  )}

                  <h3 className="text-lg font-medium">{product.name}</h3>

                  <p className="text-primary">{`${product.price} €`}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
