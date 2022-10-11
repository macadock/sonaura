import { globby } from 'globby';
import { NextApiRequest, NextApiResponse } from 'next';
import { GET_CATEGORIES } from '../../gql/get-categories';
import { GET_PRODUCTS } from '../../gql/get-products';
import { Categories } from '../../gql/__generated__/categories';
import { Products } from '../../gql/__generated__/products';
import { client } from '../_app';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  async function getCategories(): Promise<string[]> {
    const { data } = await client.query<Categories>({
      query: GET_CATEGORIES,
    });

    return data.categories.map((category) => {
      return `  <url>
        <loc>${`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${category.slug}/`}</loc>
        <changefreq>daily</changefreq>
      </url>`;
    });
  }

  async function getProducts(): Promise<string[]> {
    const { data } = await client.query<Products>({
      query: GET_PRODUCTS,
    });

    return data.products.map((product) => {
      return `  <url>
        <loc>${`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${product.category.slug}/${product.slug}/`}</loc>
        <changefreq>daily</changefreq>
      </url>`;
    });
  }

  function addPage(page: string) {
    const route = page
      .replace('src/pages/', '')
      .replace('index', '')
      .replace('.tsx', '')
      .replace('.mdx', '');

    return `  <url>
      <loc>${`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${route}`}</loc>
      <changefreq>daily</changefreq>
    </url>`;
  }

  async function generateSitemap() {
    // Ignore Next.js specific files (e.g., _app.js) and API routes.
    const pages = await globby([
      'src/pages/**/*{.tsx,.mdx}',
      '!src/pages/_*.tsx',
      '!src/pages/api',
      '!src/pages/panier',
      '!src/pages/404.tsx',
    ]);

    const products = await getProducts();
    const categories = await getCategories();

    console.log(
      pages
        .filter((page) => !page.includes('['))
        .map((page) => {
          return page
            .replace('src/pages/', '')
            .replace('index', '')
            .replace('.tsx', '')
            .replace('.mdx', '');
        })
        .join('\n'),
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    ${pages
      .filter((page) => !page.includes('['))
      .map(addPage)
      .join('\n')}
    ${products.map((product) => product).join('\n')}
    ${categories.map((category) => category).join('\n')}
    </urlset>`;
  }

  res.end(await generateSitemap());
}
