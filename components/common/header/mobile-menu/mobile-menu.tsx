import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { SidebarTrigger } from '@/components/common/sidebar/sidebar-trigger';
import { Menu } from 'lucide-react';

export const MobileMenu = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <SidebarTrigger>
        <Menu />
      </SidebarTrigger>
      <Sidebar>
        <SidebarHeader>
          <div className={'flex items-center justify-between p-2 gap-2'}>
            <Image
              src={'/assets/logos/logo.svg'}
              alt={'Sonaura'}
              width={180}
              height={22}
            />
          </div>
        </SidebarHeader>
        <SidebarContent>{children}</SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
