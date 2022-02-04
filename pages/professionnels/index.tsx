import TIME_TO_INVALIDATE_CACHE_SEC from '../../src/constants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import ProfessionalsView from 'views/ProfessionalsView';
import getNavbarItems from '../../src/components/system/_getNavbarItems';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';

const Professionnels: NextPage<{ categories: Categories; pages: Pages }> = ({
  pages,
  categories,
}) => {
  return (
    <Main categories={categories} pages={pages}>
      <ProfessionalsView />
    </Main>
  );
};

export const getStaticProps = async () => {
  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      categories,
      pages,
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Professionnels;
