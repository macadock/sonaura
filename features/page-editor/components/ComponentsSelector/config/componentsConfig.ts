import {
  HeroVideo,
  HeroVideoSchema,
  ListCategories,
  ListCategoriesSchema,
  FeaturedProducts,
  FeaturedProductsSchema,
  Advices,
  AdvicesSchema,
  People,
  PeopleSchema,
  NewsletterSignUp,
  HeroText,
  HeroTextSchema,
  HeroImage,
  HeroImageSchema, ShopsInfo, ContactPageForm, ContactPageFormSchema,
} from '@/features/custom-components';
import { ProductPage } from '@/features/custom-components/components/Products/ProductPage';
import { ProductsListByCategory } from '@/features/custom-components/components/Products/ProductsListByCategory';
import {
  AsyncDataEnum,
  ComponentMappingData,
  ComponentsEnum,
} from '@/features/page-editor/types';
import {
  getCategories,
  getProductsByCategory,
  getProducts,
  getProductBySlug,
  getCategoryBySlug, getShops, getPreOwnedProducts,
} from '@/utils/data';
import { cookies } from 'next/headers';
import {
  InstallationsGrid,
} from '@/features/custom-components/components/Other/InstallationsGrid';
import { getInstallations } from '@/utils/data/installations';

export const componentsMapping: {
  [K in ComponentsEnum]: ComponentMappingData;
} = {
  [ComponentsEnum.HERO_VIDEO]: {
    component: HeroVideo,
    getConfig: () => ({
      schema: HeroVideoSchema,
    }),
  },
  [ComponentsEnum.CATEGORIES]: {
    component: ListCategories,
    getConfig: () => ({
      schema: ListCategoriesSchema,
      asyncData: {
        [AsyncDataEnum.GET_CATEGORIES]: true,
      },
    }),
  },
  [ComponentsEnum.PRODUCTS]: {
    component: FeaturedProducts,
    getConfig: () => ({
      schema: FeaturedProductsSchema,
      asyncData: {
        [AsyncDataEnum.GET_CATEGORIES]: true,
        [AsyncDataEnum.GET_PRODUCTS]: true,
      },
    }),
  },
  [ComponentsEnum.ADVICES]: {
    component: Advices,
    getConfig: () => ({
      schema: AdvicesSchema,
    }),
  },
  [ComponentsEnum.PEOPLE]: {
    component: People,
    getConfig: () => ({
      schema: PeopleSchema,
    }),
  },
  [ComponentsEnum.NEWSLETTER]: {
    component: NewsletterSignUp,
    getConfig: () => ({
      schema: null,
    }),
  },
  [ComponentsEnum.PRODUCT_LIST_BY_CATEGORY]: {
    component: ProductsListByCategory,
    getConfig: () => ({
      schema: null,
      asyncData: {
        [AsyncDataEnum.GET_PRODUCTS_BY_CATEGORY]: true,
        [AsyncDataEnum.GET_CATEGORY_BY_SLUG]: true,
      },
    }),
  },
  [ComponentsEnum.PRODUCT_PAGE]: {
    component: ProductPage,
    getConfig: () => ({
      schema: null,
      asyncData: {
        [AsyncDataEnum.GET_PRODUCT_BY_SLUG]: true,
        [AsyncDataEnum.GET_CATEGORY_BY_SLUG]: true,
      },
    }),
  },
  [ComponentsEnum.HERO_TEXT]: {
    component: HeroText,
    getConfig: () => ({
      schema: HeroTextSchema,
    }),
  },
  [ComponentsEnum.HERO_IMAGE]: {
    component: HeroImage,
    getConfig: () => ({
      schema: HeroImageSchema,
    }),
  },
  [ComponentsEnum.INSTALLATIONS_GRID]: {
    component: InstallationsGrid,
    getConfig: () => ({
      schema: null,
      asyncData: {
        [AsyncDataEnum.GET_INSTALLATIONS]: true,
      }
    }),
  },
  [ComponentsEnum.SHOPS_INFO]: {
    component: ShopsInfo,
    getConfig: () => ({
      schema: null,
      asyncData: {
        [AsyncDataEnum.GET_SHOPS]: true
      }
    })
  },
[ComponentsEnum.CONTACT_FORM]: {
    component: ContactPageForm,
    getConfig: () => ({
      schema: ContactPageFormSchema,
    }),
  },
};



export enum PropsNameEnum {
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
  CATEGORY = 'category',
  PRODUCT = 'product',
  INSTALLATIONS = 'installations',
  SHOPS = 'shops'
}

export type AsyncDataProps<T = any> = {
  cookieStore: ReturnType<typeof cookies>;
} & T;

export const asyncDataMapping: {
  [K in AsyncDataEnum]: {
    propsName: string;
    function: (props?: AsyncDataProps) => Promise<unknown>;
  };
} = {
  [AsyncDataEnum.GET_CATEGORIES]: {
    function: getCategories,
    propsName: PropsNameEnum.CATEGORIES,
  },
  [AsyncDataEnum.GET_CATEGORY_BY_SLUG]: {
    function: getCategoryBySlug,
    propsName: PropsNameEnum.CATEGORY,
  },
  [AsyncDataEnum.GET_PRODUCTS]: {
    function: getProducts,
    propsName: PropsNameEnum.PRODUCTS,
  },
  [AsyncDataEnum.GET_PRODUCTS_BY_CATEGORY]: {
    function: getProductsByCategory,
    propsName: PropsNameEnum.PRODUCTS,
  },
  [AsyncDataEnum.GET_PRODUCT_BY_SLUG]: {
    function: getProductBySlug,
    propsName: PropsNameEnum.PRODUCT,
  },
  [AsyncDataEnum.GET_INSTALLATIONS]: {
    function: getInstallations,
    propsName: PropsNameEnum.INSTALLATIONS,
  },
  [AsyncDataEnum.GET_SHOPS]: {
    function: getShops,
    propsName: PropsNameEnum.SHOPS
  },
  [AsyncDataEnum.GET_PREOWNED_PRODUCTS]: {
    function: getPreOwnedProducts,
    propsName: PropsNameEnum.PRODUCTS,
  }
};
