'use client';

import { useCart } from 'react-use-cart';
import { Price } from '@/components/marketing/price';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const OrderSummary = () => {
  const { cartTotal, isEmpty, totalItems } = useCart();

  const vat = cartTotal * 0.2;

  return (
    <div className={'flex-1 flex flex-col gap-4'}>
      <p className={'text-xl font-medium'}>Résumé de la commande</p>
      <div
        className={
          'p-6 min-w-80 bg-tertiary rounded-lg flex flex-col justify-between sticky top-0'
        }
      >
        <div className={'flex flex-col gap-6 w-full'}>
          <p
            className={'text-xl font-medium'}
          >{`${totalItems} produit${totalItems > 1 ? 's' : ''} d'occasion`}</p>
          <div className={'flex flex-col gap-2'}>
            <div className={'flex justify-between items-center'}>
              <p>Sous-total</p>
              <Price price={cartTotal} className={'!text-foreground'} />
            </div>
            <div className={'flex justify-between items-center'}>
              <p>dont TVA</p>
              <Price price={vat} className={'!text-foreground'} />
            </div>
          </div>
          <div
            className={
              'flex justify-between items-center font-medium text-xl text-primary'
            }
          >
            <p>Total</p>
            <Price price={cartTotal} />
          </div>
          <Button disabled={isEmpty} type={'submit'}>
            Effectuer le paiement
          </Button>
        </div>
      </div>
    </div>
  );
};
