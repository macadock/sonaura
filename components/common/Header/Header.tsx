import { DesktopMenu } from '@/components/common/Header/DesktopMenu';
import { MobileMenu } from '@/components/common/Header/MobileMenu';
import Image from 'next/image';
import { getCategories } from '@/utils/data';
import { cookies } from 'next/headers';
import CartDrawer from '@/components/core/Cart/CartDrawer';
import React from 'react';

type ItemCommon = {
  title: string;
  href: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
};

type PageItem = ItemCommon & {
  type: 'page';
};

type MenuItem = ItemCommon & {
  type: 'menu';
  subMenu: Item[];
};

export type Item = PageItem | MenuItem;

export const Header = async () => {
  const cookieStore = cookies();
  const categories = await getCategories({ cookieStore });

  const items: Item[] = [
    {
      href: '/categories',
      title: 'Catégories',
      type: 'menu',
      subMenu: categories.map((category) => ({
        href: `/${category.slug}`,
        title: category.name,
        type: 'page',
        hideOnDesktop: category.name.includes('Occasions'),
      })),
    },
    {
      href: '/occasions',
      title: 'Occasions',
      type: 'page',
      hideOnMobile: true,
    },
    {
      href: '/professionnels',
      title: 'Professionnels',
      type: 'page',
    },
    {
      href: '/realisations',
      title: 'Réalisations',
      type: 'page',
    },
    {
      href: '/contact',
      title: 'Contact',
      type: 'page',
    },
  ];

  return (
    <header className="w-full flex items-center justify-between p-4 md:px-8 border-b sticky top-0 bg-background z-10 h-[var(--headerHeight)]">
      <div className="flex-grow flex gap-2 justify-between items-center max-w-7xl m-auto">
        <a className="w-52 flex flex-col gap-2" href={'/'}>
          <Image
            src="/assets/logos/logo.svg"
            alt="Sonaura"
            loading={'eager'}
            width="180"
            height="22"
            className="dark:invert"
          />
          <p className="text-xs">
            Distributeur Bang &amp; Olufsen Auvergne Rhône-Alpes
          </p>
        </a>
        <DesktopMenu items={items} />
        <MobileMenu items={items} />
      </div>
    </header>
  );
};
