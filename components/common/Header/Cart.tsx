'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/navigation';

export const Cart = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isEmpty, items, removeItem, totalItems } = useCart();

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={'right'}>
      <DrawerTrigger>
        <ShoppingCart className={'text-primary'} />
      </DrawerTrigger>
      <DrawerContent
        className={
          'bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0'
        }
      >
        <DrawerHeader>
          <DrawerTitle>Panier</DrawerTitle>
        </DrawerHeader>
        {isEmpty ? (
          <div
            className={
              'h-full w-full flex flex-col gap-4 justify-center items-center'
            }
          >
            <p>Votre panier est vide</p>
            <Button
              onClick={() => {
                router.push('/occasion');
                setOpen(false);
              }}
            >
              {"Découvrez nos produits d'occasion"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 overflow-y-auto">
            <p>Cart content</p>
          </div>
        )}
        <DrawerFooter>
          {!isEmpty && (
            <>
              <Button variant={'secondary'}>Afficher le panier</Button>
              <Button>Poursuivre la commande</Button>)
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
