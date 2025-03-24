'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { Product } from '@/lib/supabase/products';
import { useVariantContext } from '@/app/(marketing)/[categorySlug]/[productSlug]/components/variant-provider';
import { useMemo, useState } from 'react';

export interface ProductCarouselProps {
  product: Product;
}

export const ProductCarousel = ({ product }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedVariants } = useVariantContext();
  const supabaseClient = createClient();

  const { images, hasVariantsShown } = useMemo(() => {
    const numberOfVariants = product.variants?.length || 0;

    const hasAllVariantsSelected = selectedVariants.length === numberOfVariants;

    if (
      hasAllVariantsSelected &&
      numberOfVariants > 0 &&
      product.variantsImages
    ) {
      const matchingVariant = product.variantsImages.find((variantImage) =>
        variantImage.variants.every((variant) => {
          const selectedVariant = selectedVariants.find(
            (selectedVariant) => selectedVariant.name === variant.name,
          );

          return (
            selectedVariant && selectedVariant.selectedValue === variant.value
          );
        }),
      );

      if (matchingVariant && matchingVariant.image) {
        return {
          images: [product.mainImage, matchingVariant.image],
          hasVariantsShown: true,
        };
      }
    }

    return { images: [product.mainImage], hasVariantsShown: false };
  }, [product, selectedVariants]);

  const getImageUrl = ({ file, bucket }: { file: string; bucket: string }) => {
    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(file, {
      transform: {
        quality: 75,
        resize: 'contain',
        width: 1080,
      },
    });

    return data.publicUrl;
  };

  const handleImageClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className={'flex flex-col gap-2 w-full max-h-screen-without-header'}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.file}>
              <Card>
                <CardContent className="relative aspect-square">
                  <Image
                    src={getImageUrl(image)}
                    alt={product.name}
                    className={'object-contain'}
                    fill
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className={'flex items-center justify-start gap-2'}>
        {images.map((image, index) => (
          <div
            key={image.file}
            className={'relative aspect-square h-16 cursor-pointer'}
            onClick={() => handleImageClick(index)}
          >
            {index >= 1 && <Bubble />}
            <Image
              src={getImageUrl(image)}
              alt={product.name}
              className={'object-contain'}
              fill
            />
          </div>
        ))}
      </div>
      {hasVariantsShown && (
        <div className={'flex items-center gap-2'}>
          <Bubble />
          <p className={'text-sm'}>Dépend des options sélectionnées</p>
        </div>
      )}
    </div>
  );
};

const Bubble = () => {
  return <div className={'size-2 bg-primary rounded-full'} />;
};
