import { SingleProduct } from './single-product';
import { ReactNode } from 'react';
import { Product } from '@/lib/supabase/products';

export interface FeaturedProductsProps {
  id?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  products: Array<Product>;
}

export const ProductsGrid = ({
  id,
  title,
  subtitle,
  description,
  products = [],
}: FeaturedProductsProps) => {
  return (
    <section
      id={id}
      className="flex flex-col gap-6 justify-center text-center md:px-9 max-w-7xl m-auto px-6 w-full"
    >
      <div className="flex flex-col gap-2">
        {subtitle}
        {title}
        {description}
      </div>
      {products && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <SingleProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
