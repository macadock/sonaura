'use client';

import { useCart } from 'react-use-cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useGetProductsByIds } from '@/lib/data/useGetProductsByIds';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Price } from '@/components/marketing/price';
import { Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export const CartContent = () => {
  const { isEmpty, totalItems, items, removeItem } = useCart();
  const supabaseClient = createClient();

  const { data: products, refetch } = useGetProductsByIds({
    ids: items.map((item) => item.id),
  });

  useEffect(() => {
    refetch();
  }, [refetch, totalItems]);

  const getProductImage = (image: { bucket: string; file: string }): string => {
    const bucket = image['bucket'];
    const file = image['file'];

    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
  };

  if (isEmpty)
    return (
      <div className={'flex flex-col items-center justify-center gap-4 w-full'}>
        <p>Votre panier est vide.</p>
        <Button asChild>
          <Link href={'/occasion'}>{"Découvrez nos produits d'occasion"}</Link>
        </Button>
      </div>
    );

  return (
    <div className={'flex flex-col gap-4 w-full overflow-y-scroll'}>
      {(products || []).map((product) => (
        <Card key={product.id} className={'w-full'}>
          <CardContent>
            <div className={'flex gap-1 w-full justify-between'}>
              <div className={'flex gap-2'}>
                <Link href={`/${product.categories.slug}/${product.slug}`}>
                  <div
                    className={
                      'size-36 aspect-square relative rounded-lg overflow-hidden'
                    }
                  >
                    <Image
                      src={getProductImage(product.mainImage)}
                      alt={product.name}
                      fill
                    />
                  </div>
                </Link>
                <div className={'flex flex-col gap-2'}>
                  <Link href={`/${product.categories.slug}/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p className={'text-sm'}>Quantité : 1</p>
                  {product.price && <Price price={product.price} />}
                </div>
              </div>
              <div className={'flex justify-between items-center'}>
                <Button size={'icon'} onClick={() => removeItem(product.id)}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
