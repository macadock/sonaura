'use client';

import { Product } from '@/lib/supabase/products';
import { Price } from '@/components/marketing/price';
import { Button } from '@/components/ui/button';
import { useCart } from 'react-use-cart';
import { ProductForm } from '@/app/(marketing)/[categorySlug]/[productSlug]/components/product-form';
import { useVariantContext } from '@/app/(marketing)/[categorySlug]/[productSlug]/components/variant-provider';
import { useMemo } from 'react';

export interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const { addItem, items } = useCart();
  const { selectedVariants } = useVariantContext();

  const isPreOwnedProduct = product.categories.slug === 'occasion';
  const productButtonCta = isPreOwnedProduct
    ? 'Être recontacté'
    : 'Demander un devis';

  const handleAddToCart = () => {
    if (!product.price) {
      return;
    }

    addItem({
      id: product.id,
      quantity: 1,
      price: product.price,
    });
  };

  const { price, isFromPrice } = useMemo(() => {
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

      if (matchingVariant && matchingVariant.price) {
        return {
          price: +matchingVariant.price,
          isFromPrice: false,
        };
      }
    }

    return {
      price: product.price || product.fromPrice,
      isFromPrice: !!product.fromPrice,
    };
  }, [product, selectedVariants]);

  const formatPrice = (price: string) => {
    return `À partir de ${price}`;
  };

  return (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'text-2xl font-medium'}>{product.name}</h1>
      <div className={'flex gap-2 items-center'}>
        {price && (
          <Price
            price={price}
            className={'text-lg'}
            formatting={isFromPrice ? formatPrice : undefined}
          />
        )}
        {isPreOwnedProduct && (
          <p className={'text-sm'}>prix hors livraison et installation</p>
        )}
      </div>
      <p className={'whitespace-break-spaces text-sm'}>{product.description}</p>
      {isPreOwnedProduct && (
        <Button
          onClick={handleAddToCart}
          disabled={items.some((item) => product.id === item.id)}
        >
          Ajouter au panier
        </Button>
      )}
      <ProductForm title={productButtonCta} product={product}>
        <Button variant={isPreOwnedProduct ? 'secondary' : 'default'}>
          {productButtonCta}
        </Button>
      </ProductForm>
    </div>
  );
};
