import { FeaturedProducts } from '@/features/custom-components';
import { ComponentProps } from 'react';
import { PropsNameEnum } from '@/features/page-editor';
import { Product } from '@/utils/data';

export type FeaturedPreOwnedProductsProps = Omit<
  ComponentProps<typeof FeaturedProducts>,
  'products'
> & {
  [PropsNameEnum.PREOWNED_PRODUCTS]: Array<Product>;
};

export const FeaturedPreOwnedProducts = ({
  preOwnedProducts,
  ...props
}: FeaturedPreOwnedProductsProps) => {
  const filteredProducts = (preOwnedProducts || []).sort((a, b) => {
    const createdAtA = new Date(a.created_at);
    const createdAtB = new Date(b.created_at);

    return createdAtB.getTime() - createdAtA.getTime();
  });

  return (
    <FeaturedProducts {...props} products={filteredProducts.slice(0, 3)} />
  );
};
