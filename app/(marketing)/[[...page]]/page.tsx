import { getPageUrl, SpecialPage } from '@/app/(marketing)/[[...page]]/util';
import {
  asyncDataMapping,
  getComponent,
  getComponentAsyncData,
  getComponentConfig,
} from '@/features/page-editor/components/ComponentsSelector';
import { ComponentConfig } from '@/features/page-editor/types';

import { getCategories, getPage, getProducts } from '@/utils/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';

export type PageProps = {
  params: Promise<{ page: string[] }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const categories = await getCategories();
  const products = await getProducts();

  const params = await props.params;

  const { url, categorySlug, productSlug } = getPageUrl({
    params,
    categories,
    products,
  });

  if (url === SpecialPage.PRODUCT) {
    const product = products.find((product) => product.slug === productSlug);

    if (product) {
      return {
        title: `${product.name} | Sonaura`,
      };
    }
  }

  if (url === SpecialPage.CATEGORY) {
    const category = categories.find(
      (category) => category.slug === categorySlug,
    );

    if (category) {
      return {
        title: `${category.name} | Sonaura`,
      };
    }
  }

  const { data } = await getPage({ url });

  if (data) {
    return {
      title: `${data.title} | Sonaura`,
    };
  }

  return {};
}

export default async function Home(props: PageProps) {
  const categories = await getCategories();
  const products = await getProducts();

  const params = await props.params;

  const { url, categorySlug, productSlug } = getPageUrl({
    params,
    categories,
    products,
  });

  const { data } = await getPage({ url });

  if (!data) {
    return notFound();
  }

  const blocks =
    (
      data.content as unknown as {
        blocks: Array<ComponentConfig & { order: number }>;
      }
    )?.blocks || '';
  const classes = (data.content as unknown as { class: string })?.class || '';

  const orderedBlocks = blocks.sort((a, b) => a?.order - b?.order);

  const asyncData = await getComponentAsyncData({
    components: orderedBlocks.map((block) => block.name),
    categorySlug,
    productSlug,
  });

  return (
    <div className={clsx(classes)}>
      {orderedBlocks.map((block, index) => {
        const Component = getComponent(block.name);

        const config = getComponentConfig(block.name);

        const props = Object.keys(config?.asyncData || {}).reduce(
          (acc, key) => {
            const propsKey =
              asyncDataMapping[key as keyof typeof asyncDataMapping].propsName;
            return { ...acc, [propsKey]: asyncData?.[propsKey] };
          },
          {},
        );

        return <Component key={index} content={block.content} {...props} />;
      })}
    </div>
  );
}
