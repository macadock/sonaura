import { Item } from '@/components/common/Header';
import { DesktopMenu } from '@/components/common/Header/DesktopMenu';
import { LogoutButton } from '@/components/common/LogoutButton';

import { Roles, getUser, getUserRole } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { PropsWithChildren } from 'react';

const Items: Item[] = [
  {
    href: '/dashboard/contact',
    title: 'Contact',
    type: 'page',
  },
  {
    href: '/dashboard/contents',
    title: 'Contenus',
    type: 'page',
  },
  {
    href: '/dashboard/installations',
    title: 'Réalisations',
    type: 'page',
  },
  {
    type: 'menu',
    title: 'Produits',
    href: '/dashboard/products',
    subMenu: [
      {
        href: '/dashboard/products/list',
        title: 'Neufs',
        type: 'page',
      },
      {
        href: '/dashboard/products/pre-owned',
        title: 'Occasions',
        type: 'page',
      },
    ],
  },
  {
    type: 'menu',
    title: 'Paramètres',
    href: '/dashboard/settings',
    subMenu: [
      {
        href: '/dashboard/settings/categories',
        title: 'Catégories',
        type: 'page',
      },
      {
        href: '/dashboard/settings/shops',
        title: 'Magasins',
        type: 'page',
      },
    ],
  },
];

const allowedRoles: Roles[] = ['ADMIN', 'EDITOR'];

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookiesStore = cookies();
  const { user } = await getUser(cookiesStore);

  if (!user) {
    redirect(encodeURI('/login'));
  }

  const userRole = await getUserRole(cookiesStore);

  if (userRole && !allowedRoles.includes(userRole)) {
    redirect(encodeURI('/'));
  }

  return (
    <>
      <header className="w-full flex items-center justify-between p-4 md:px-8 border-b sticky top-0 bg-background z-10 h-[var(--headerHeight)]">
        <div className="flex-grow flex gap-2 justify-between items-center max-w-7xl m-auto">
          <div className="w-52 flex flex-col gap-2">
            <a href={'/dashboard'}>
              <Image
                src="/assets/logos/logo.svg"
                alt="Sonaura"
                loading={'eager'}
                width="180"
                height="22"
                className="dark:invert"
              />
            </a>
            <a className="text-xs" href="/" target="_blank">
              Voir le site
            </a>
          </div>
          <div className="flex items-center gap-2">
            <DesktopMenu items={Items} prefix="dashboard/" />
            <LogoutButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
