import { PropsNameEnum } from '@/features/page-editor';
import { Category, Product } from '@/utils/data';
import { getImageUrl } from '@/utils/image/get-image-url';

export type ProductPageProps = {
  [PropsNameEnum.PRODUCT]: Product;
  [PropsNameEnum.CATEGORY]: Category;
  isPreview?: boolean;
};

export const ProductPage = ({
  product,
  category,
  isPreview = false,
}: ProductPageProps) => {
  if (!product || !category) {
    return null;
  }

  return (
    <div className="px-8 py-4 xl:max-w-7xl xl:m-auto">
      <div className="flex gap-2 text-xs truncate md:text-sm">
        <a href="/" className="hover:underline">
          Sonaura
        </a>
        <p>/</p>
        <a href={`/${category.slug}`} className="hover:underline">
          {category.name}
        </a>
        <p>/</p>
        <p>{product.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:pt-8">
        <img
          src={getImageUrl(product.mainImage)}
          alt={product.name}
          width={600}
          height={600}
          className="md:sticky top-8"
          loading="eager"
        />
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-xl">{product.description}</p>
        </div>
      </div>
    </div>
  );
};
