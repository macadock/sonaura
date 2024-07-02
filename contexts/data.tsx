import { CategoryType, getCategories } from '@/lib/supabase/categories';
import { getShops, Shop } from '@/lib/supabase/shops';
import React, { PropsWithChildren, useEffect } from 'react';
import { NavLink } from '@/types';

export interface DataContextValue {
  categories: CategoryType[];
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

export const DataProvider = (props: PropsWithChildren) => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [shops, setShops] = React.useState<Shop[]>([]);

  const fetch = async () => {
    const { data: category } = await getCategories();
    if (category) {
      setCategories(category as unknown as CategoryType[]);
    }

    const { data: shop } = await getShops();
    if (shop) {
      setShops(shop as unknown as Shop[]);
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
