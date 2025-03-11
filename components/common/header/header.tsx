import Link from 'next/link';
import Image from 'next/image';
import { DesktopMenu } from '@/components/common/header/desktop-menu';
import {
  Categories,
  MobileMenu,
  Pages,
} from '@/components/common/header/mobile-menu';
import { SidebarProvider } from '@/components/ui/sidebar';

export const Header = async () => {
  return (
    <header className="w-full flex items-center justify-between p-4 md:px-8 border-b sticky top-0 bg-background z-10 h-[var(--headerHeight)]">
      <div className="flex-grow flex gap-2 justify-between items-center max-w-7xl m-auto">
        <Link href={'/'} className={'w-44 md:w-36 lg:w-44 flex flex-col gap-2'}>
          <div className={'relative h-5'}>
            <Image src={'/assets/logos/logo.svg'} alt={'Sonaura'} fill />
          </div>
          <p className="text-xs">
            Distributeur Bang &amp; Olufsen Auvergne Rhône-Alpes
          </p>
        </Link>
        <div className={'hidden md:block'}>
          <DesktopMenu />
        </div>
        <div className={'md:hidden'}>
          <SidebarProvider defaultOpen={false}>
            <MobileMenu>
              <Categories />
              <Pages />
            </MobileMenu>
          </SidebarProvider>
        </div>
      </div>
    </header>
  );
};
