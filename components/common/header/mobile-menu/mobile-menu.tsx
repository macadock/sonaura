'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Menu, SquareChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const MobileMenu = ({ children }: PropsWithChildren) => {
  const { toggleSidebar } = useSidebar();
  return (
    <>
      <Button size={'icon'} onClick={toggleSidebar}>
        <Menu />
      </Button>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className={'flex items-center justify-between p-2 gap-2'}>
            <Image
              src={'/assets/logos/logo.svg'}
              alt={'Sonaura'}
              width={180}
              height={22}
            />
            <Button size={'icon'} variant={'outline'} onClick={toggleSidebar}>
              <SquareChevronLeft />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>{children}</SidebarContent>
      </Sidebar>
    </>
  );
};
