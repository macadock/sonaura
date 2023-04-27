import { Category, getCategories } from 'lib/supabase/categories';
import { getShops, Shop } from 'lib/supabase/shops';
import React, { useEffect } from 'react';
import { NavLink } from 'types';

export interface DataContextValue {
  categories: Category[];
  pages: NavLink[];
  shops: Shop[];
}

const pages: NavLink[] = [
  {
    slug: '/professionnels',
    name: 'Professionnels',
  },
  {
    slug: '/realisations',
    name: 'Réalisations',
  },
  {
    slug: '/contact',
    name: 'Contact',
  },
];

export const DataContext = React.createContext<DataContextValue>({
  categories: [],
  pages,
  shops: [],
});

export const DataProvider: React.FC = (props) => {
  const [categories, setCategories] = React.useState(null);
  const [shops, setShops] = React.useState(null);

  const fetch = async () => {
    const { data: category } = await getCategories();
    if (category) {
      setCategories(category);
    }

    const { data: shop } = await getShops();
    if (shop) {
      setShops(shop);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <DataContext.Provider {...props} value={{ categories, pages, shops }} />
  );
};

export const useSiteData = (): DataContextValue =>
  React.useContext(DataContext);
