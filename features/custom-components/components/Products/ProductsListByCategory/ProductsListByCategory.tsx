import { FeaturedProducts } from '@/features/custom-components/components/Products/FeaturedProducts';
import { PropsNameEnum } from '@/features/page-editor';
import { Category, Product } from '@/utils/data';

export type ProductsListByCategoryProps = {
  isPreview?: boolean;
  [PropsNameEnum.PRODUCTS]: Array<Product>;
  [PropsNameEnum.CATEGORY]: Category;
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
