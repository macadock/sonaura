'use client';

import { Product } from '@/lib/supabase/products';
import { Badge } from '@/components/ui/badge';
import { useVariantContext } from '@/app/(marketing)/[categorySlug]/[productSlug]/components/variant-provider';
import { X } from 'lucide-react';

const variantNameMapped: Record<string, string> = {
  color: 'Couleur',
  size: 'Taille',
  frameColor: 'Couleur du cadre',
  positioning: 'Positionnement',
  soundbarColor: 'Couleur de la barre de son',
};

const getVariantName = (name: string) => {
  const translatedName = variantNameMapped[name];

  return translatedName || name;
};

export interface ProductVariantPickerProps {
  product: Product;
}

export const ProductVariantPicker = ({
  product,
}: ProductVariantPickerProps) => {
  const { selectedVariants, handleSelectVariant, clearVariant } =
    useVariantContext();

  if (!product.variants) {
    return null;
  }

  return product.variants.map(({ name, values }) => {
    return (
      <div key={name} className={'flex flex-col gap-2'}>
        <p className={'text-lg font-semibold'}>{getVariantName(name)}</p>
        <div className={'flex gap-2 flex-wrap'}>
          {values.map((value) => {
            const isVariantSelected = selectedVariants.some(
              (variant) =>
                name === variant.name && variant.selectedValue === value,
            );
            return (
              <Badge
                key={value}
                className={'cursor-pointer h-8'}
                variant={isVariantSelected ? 'default' : 'secondary'}
                onClick={() => {
                  handleSelectVariant({
                    name,
                    selectedValue: value,
                  });
                }}
              >
                {value}
                {isVariantSelected && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      clearVariant(name);
                    }}
                    className={'p-1'}
                  >
                    <X className={'size-4'} />
                  </div>
                )}
              </Badge>
            );
          })}
        </div>
      </div>
    );
  });
};
