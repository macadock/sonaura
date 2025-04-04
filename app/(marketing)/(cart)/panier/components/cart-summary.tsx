'use client';

import { useCart } from 'react-use-cart';
import { Price } from '@/components/marketing/price';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const CartSummary = () => {
  const { cartTotal, isEmpty } = useCart();
  const router = useRouter();

  const vat = cartTotal * 0.2;

  return (
    <div
      className={
        'p-6 min-w-80 bg-tertiary rounded-lg flex flex-col justify-between sticky top-0'
      }
    >
      <div className={'flex flex-col gap-6 w-full'}>
        <p className={'text-xl font-medium'}>Résumé</p>
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
        <Button
          disabled={isEmpty}
          onClick={() => router.push('/panier/commander')}
        >
          Commander
        </Button>
      </div>
      <div className={'text-sm flex flex-col gap-1'}>
        <p>{"Besoin d'une livraison et/ou d'une installation ?"}</p>
        <p>Nous sommes là pour répondre à vos besoins.</p>
        <Link href={'/contact'} className={'text-primary'}>
          Consulter nos coordonnées
        </Link>
      </div>
    </div>
  );
};
