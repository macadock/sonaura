'use client';

import { useCart } from 'react-use-cart';
import Link from 'next/link';
import { useGetProductsByIds } from '@/lib/data/useGetProductsByIds';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Price } from '@/components/marketing/price';
import Image from 'next/image';
import React, { useEffect } from 'react';
import supabase from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { useSidebar } from '@/components/ui/sidebar';

export const CartContent = () => {
  const { isEmpty, items, removeItem, totalItems } = useCart();
  const { toggleSidebar } = useSidebar();

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsByIds({
    ids: items.map((item) => item.id),
  });

  useEffect(() => {
    refetch();
  }, [refetch, totalItems]);

  const getProductImage = (image: { bucket: string; file: string }): string => {
    const bucket = image['bucket'];
    const file = image['file'];

    const { data } = supabase.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
  };

  if (isEmpty) {
    return (
      <div
        className={
          'w-full h-full flex flex-col justify-center items-center gap-2'
        }
      >
        <p>Votre panier est vide.</p>
        <Button size={'lg'} onClick={toggleSidebar} asChild>
          <Link
            href={'/occasion'}
            className={'text-primary underline decoration-primary text-center'}
          >
            {"Découvrez nos produits d'occasion"}
          </Link>
        </Button>
      </div>
    );
  }

  if (isLoading || !products) {
    return (
      <div className={'w-full h-full flex justify-center items-center'}>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className={'w-full h-full flex flex-col gap-2'}>
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent>
            <div className={'flex flex-col gap-1 w-full'}>
              <Link href={`/${product.categories.slug}/${product.slug}`}>
                <div
                  className={
                    'w-full aspect-square relative rounded-lg overflow-hidden'
                  }
                >
                  <Image
                    src={getProductImage(product.mainImage)}
                    alt={product.name}
                    fill
                  />
                </div>
                <p>{product.name}</p>
              </Link>
              <div className={'flex justify-between items-center'}>
                {product.price && <Price price={product.price} />}
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
