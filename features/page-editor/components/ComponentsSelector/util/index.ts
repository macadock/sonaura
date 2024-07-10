import {
  asyncDataMapping,
  componentsMapping,
} from '@/features/page-editor/components/ComponentsSelector/config';
import {
  AsyncDataEnum,
  ComponentConfig,
  ComponentsEnum,
} from '@/features/page-editor/types';
import { cookies } from 'next/headers';

export const getComponentsList = () => {
  return Object.values(ComponentsEnum);
};

export const getComponent = (name: ComponentsEnum) => {
  return componentsMapping[name].component;
};

export const getComponentConfig: (
  component: ComponentsEnum,
) => ComponentConfig = (name: ComponentsEnum) => {
  return {
    ...componentsMapping[name].getConfig(),
    name,
    id: crypto.randomUUID(),
  };
};

export const getComponentAsyncData = async ({
  components = [],
  cookieStore,
  categorySlug,
  productSlug,
}: {
  components: ComponentsEnum[];
  cookieStore: ReturnType<typeof cookies>;
  productSlug: string | null;
  categorySlug: string | null;
}): Promise<{ [key: string]: () => Promise<any> } | null> => {
  const keys = new Set<AsyncDataEnum>();

  components.forEach((component) => {
    const config = getComponentConfig(component);
    const hasAsyncData = Boolean(config?.asyncData);
    if (hasAsyncData && config.asyncData) {
      Object.keys(config.asyncData).forEach((key) => {
        keys.add(key as AsyncDataEnum);
      });
    }
  });

  if (keys.size === 0) {
    return null;
  }

  const promises = Array.from(keys).map((key) => {
    const asyncData = asyncDataMapping[key as AsyncDataEnum];
    const props: { [key: string]: any } = {};
    if (
      [
        AsyncDataEnum.GET_PRODUCTS_BY_CATEGORY,
        AsyncDataEnum.GET_CATEGORY_BY_SLUG,
      ].includes(key)
    ) {
      props['categorySlug'] = categorySlug;
    }

    if (key === AsyncDataEnum.GET_PRODUCT_BY_SLUG) {
      props['productSlug'] = productSlug;
    }

    return asyncData.function({ cookieStore, ...props });
  });

  const response = await Promise.allSettled(promises);
  return response.reduce((acc, r, index) => {
    if (r.status === 'rejected') {
      return acc;
    }

    const functionKey = Array.from(keys)[index];
    const key = asyncDataMapping[functionKey as AsyncDataEnum]?.propsName;

    return {
      ...acc,
      [key]: r.value,
    };
  }, {});
};
