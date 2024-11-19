import zod from 'zod';

export enum ComponentsEnum {
  HERO_VIDEO = 'hero-video',
  HERO_IMAGE = 'hero-image',
  HERO_TEXT = 'hero-text',
  CATEGORIES = 'categories',
  FEATURED_PRODUCTS = 'products',
  FEATURED_PREOWNED_PRODUCTS = 'featured-preowned-products',
  ADVICES = 'advices',
  PEOPLE = 'people',
  CONTACT_FORM = 'contact-form',
  NEWSLETTER = 'newsletter',
  PRODUCT_LIST_BY_CATEGORY = 'product-list-by-category',
  PRODUCT_PAGE = 'product-page',
  INSTALLATIONS_GRID = 'installations-grid',
  SHOPS_INFO = 'shops-info',
}

export type ComponentMappingData = {
  component: React.FC<any>;
  getConfig: () => ComponentConfigBase;
};

export type ComponentConfigBase = {
  schema: zod.ZodObject<any> | null;
  asyncData?: AsyncData;
};

export type ComponentConfig = ComponentConfigBase & {
  name: ComponentsEnum;
  id: string;
  content?: object;
  order?: number;
};

export enum AsyncDataEnum {
  GET_CATEGORIES = 'getCategories',
  GET_CATEGORY_BY_SLUG = 'getCategoryBySlug',
  GET_PRODUCTS = 'getProducts',
  GET_PRODUCTS_BY_CATEGORY = 'getProductsByCategory',
  GET_PRODUCT_BY_SLUG_AND_CATEGORY_SLUG = 'getProductBySlugAndCategorySlug',
  GET_INSTALLATIONS = 'getInstallations',
  GET_SHOPS = 'getShops',
  GET_PREOWNED_PRODUCTS = 'getPreOwnedProducts',
  GET_NEW_PRODUCTS = 'getNewProducts',
  GET_FEATURED_PRODUCTS = 'getFeaturedProducts',
}

export type AsyncData = {
  [K in AsyncDataEnum]?: boolean;
};
