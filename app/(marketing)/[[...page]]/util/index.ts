import isEmpty from 'lodash/isEmpty';
import { Category, getProducts, Product } from '@/utils/data';

export enum SpecialPage {
  PRODUCT = '[product]',
  CATEGORY = '[category]',
}

export type getPageUrlProps = {
  params: { page: string[] };
  products: Awaited<ReturnType<typeof getProducts>>;
  categories: Array<Category>;
};

export const getPageUrl = ({
  params,
  categories,
  products,
}: getPageUrlProps) => {
  const url = isEmpty(params.page) ? '/' : params.page.join('/');

  const product = products.find((product) => url.includes(product.slug));
  const category = categories.find((category) => url.includes(category.slug));

  if (product && category) {
    return {
      url: SpecialPage.PRODUCT,
      productSlug: product.slug,
      categorySlug: category.slug,
    };
  }

  if (category) {
    return {
      url: SpecialPage.CATEGORY,
      productSlug: null,
      categorySlug: category.slug,
    };
  }

  return { url, productSlug: null, categorySlug: null };
};
