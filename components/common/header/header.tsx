import Link from 'next/link';
import Image from 'next/image';
import { DesktopMenu } from '@/components/common/header/desktop-menu';
import {
  Categories,
  MobileMenu,
  Pages,
} from '@/components/common/header/mobile-menu';
import { ShoppingCart } from 'lucide-react';
import { SidebarTrigger } from '@/components/common/sidebar/sidebar-trigger';

export const Header = async () => {
  return (
    <header className="w-full flex items-center justify-between p-2 sm:p-4 md:px-8 border-b sticky top-0 bg-background z-10">
      <Link
        href={'/'}
        className={'max-w-full w-44 md:w-36 lg:w-44 flex flex-col gap-2'}
      >
        <div className={'relative h-5'}>
          <Image src={'/assets/logos/logo.svg'} alt={'Sonaura'} fill />
        </div>
        <p className="text-xs">
          Distributeur Bang &amp; Olufsen Auvergne Rhône-Alpes
        </p>
      </Link>
      <div className={'flex items-center gap-2'}>
        <div className={'hidden md:block'}>
          <DesktopMenu />
        </div>
        <div className={'md:hidden'}>
          <MobileMenu>
            <Categories />
            <Pages />
          </MobileMenu>
        </div>
        <SidebarTrigger>
          <ShoppingCart />
        </SidebarTrigger>
      </div>
      {/*</div>*/}
    </header>
  );
};
