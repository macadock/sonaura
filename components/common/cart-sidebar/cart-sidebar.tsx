import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { PropsWithChildren } from 'react';
import { CartContent } from '@/components/common/cart-sidebar/cart-content';
import { CartHeader } from '@/components/common/cart-sidebar/cart-header';
import { CartFooter } from '@/components/common/cart-sidebar/cart-footer';

export const CartSidebar = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset className={'min-h-lvh'}>{children}</SidebarInset>
      <Sidebar side={'right'}>
        <SidebarHeader>
          <CartHeader />
        </SidebarHeader>
        <SidebarContent>
          <div className={'px-4 w-full h-full'}>
            <CartContent />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <CartFooter />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
