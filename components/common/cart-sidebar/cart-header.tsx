'use client';

import { SidebarTrigger } from '@/components/common/sidebar/sidebar-trigger';
import { SquareChevronRight } from 'lucide-react';
import React from 'react';
import { useCart } from 'react-use-cart';

export const CartHeader = () => {
  const { totalItems } = useCart();
  return (
    <div className={'w-full flex items-center gap-2'}>
      <SidebarTrigger variant={'outline'}>
        <SquareChevronRight />
      </SidebarTrigger>
      <p className={'text-2xl'}>Panier</p>
      <p>
        {totalItems} produit{totalItems > 1 ? 's' : ''}
      </p>
    </div>
  );
};
