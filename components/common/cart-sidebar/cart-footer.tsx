'use client';

import { Button } from '@/components/ui/button';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const CartFooter = () => {
  const { isEmpty } = useCart();
  const router = useRouter();
  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-2'}>
        <p className={'text-sm'}>
          <span className={'font-medium'}>
            {"Besoin d'une livraison ou d'une installation ? "}
          </span>
          <span>{'Nous sommes là pour répondre à vos besoins.'}</span>
        </p>
        <Link
          href={'/contact'}
          className={'text-sm underline decoration-primary'}
        >
          Nos magasins
        </Link>
      </div>
      <div className={'flex flex-col gap-2'}>
        <Button
          variant={'ghost'}
          size={'lg'}
          onClick={() => router.push('/panier')}
        >
          Afficher le panier
        </Button>
        <Button
          size={'lg'}
          disabled={isEmpty}
          onClick={() => router.push('/panier/commander')}
        >
          Poursuvre la commande
        </Button>
      </div>
    </div>
  );
};
