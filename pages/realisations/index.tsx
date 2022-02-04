import TIME_TO_INVALIDATE_CACHE_SEC from '../../src/constants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import InstallationView from 'views/InstallationsView';
import getNavbarItems from '../../src/components/system/_getNavbarItems';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';

const Realisations: NextPage<{ categories: Categories; pages: Pages }> = ({
  categories,
  pages,
}) => {
  return (
    <Main categories={categories} pages={pages}>
      <InstallationView />
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

export default Realisations;
