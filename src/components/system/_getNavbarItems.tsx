import { GET_CATEGORIES } from '../../../gql/get-categories';
import { GET_PAGES_HEADER } from '../../../gql/get-pages';
import { Categories } from '../../../gql/__generated__/categories';
import { Pages } from '../../../gql/__generated__/pages';
import { client } from '../../../pages/_app';

const getNavbarItems = async (): Promise<{
  categories: Categories;
  pages: Pages;
}> => {
  const { data: categories } = await client.query<Categories>({
    query: GET_CATEGORIES,
  });

  const { data: pages } = await client.query<Pages>({
    query: GET_PAGES_HEADER,
  });

  return {
    categories,
    pages,
  };
};

export default getNavbarItems;
