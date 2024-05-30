import { getPageUrl } from '@/app/(marketing)/[[...page]]/util';
import {
  asyncDataMapping,
  getComponent,
  getComponentAsyncData,
  getComponentConfig,
} from '@/features/page-editor/components/ComponentsSelector';
import { ComponentConfig } from '@/features/page-editor/types';

import { getCategories, getPage, getProducts } from '@/utils/data';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';

export type PageProps = {
  params: { page: string[] };
};

export const metadata: Metadata = {
  title: 'Distributeur Bang & Olufsen Auvergne Rhône-Alpes | Sonaura',
};

export default async function Home({ params }: PageProps) {
  const cookieStore = cookies();
  const categories = await getCategories(cookieStore);
  const products = await getProducts(cookieStore);

  const { url, categorySlug, productSlug } = getPageUrl({
    params,
    categories,
    products,
  });

  const { data } = await getPage({ url, cookieStore });

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
    cookieStore,
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
