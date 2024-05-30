import { categories, products } from '@/app/(marketing)/mocks';
import { FeaturedProducts } from '@/features/custom-components/components/Products/FeaturedProducts';
import { PropsNameEnum } from '@/features/page-editor';

export type ProductsListByCategoryProps = {
  isPreview?: boolean;
  [PropsNameEnum.PRODUCTS]: typeof products;
  [PropsNameEnum.CATEGORY]: (typeof categories)[number];
};

export const ProductsListByCategory = ({
  products,
  category,
}: ProductsListByCategoryProps) => {
  if (!products || !category) {
    return null;
  }

  return (
    <FeaturedProducts
      categories={[category]}
      products={products}
      content={{
        title: category.name,
      }}
    />
  );
};
