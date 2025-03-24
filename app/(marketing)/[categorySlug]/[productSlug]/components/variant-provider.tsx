'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

type SelectedVariant = {
  name: string;
  selectedValue: string;
};

type VariantContextType = {
  selectedVariants: Array<SelectedVariant>;
  handleSelectVariant: (variant: SelectedVariant) => void;
  clearVariant: (variantId: string) => void;
};

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const VariantProvider = ({ children }: PropsWithChildren) => {
  const [selectedVariants, setSelectedVariants] = useState<
    Array<SelectedVariant>
  >([]);

  const handleSelectVariant = (variant: SelectedVariant) => {
    setSelectedVariants((prev) => {
      const isAlreadySelected = prev.find(({ name }) => name === variant.name);

      if (isAlreadySelected) {
        return [...prev.filter(({ name }) => name !== variant.name), variant];
      }

      return [...prev, variant];
    });
  };

  const clearVariant = (variantName: string) => {
    setSelectedVariants((prev) => {
      return prev.filter((v) => v.name !== variantName);
    });
  };

  const value = {
    selectedVariants,
    handleSelectVariant,
    clearVariant,
  };

  return (
    <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
  );
};

export const useVariantContext = () => {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error('useVariantProvider must be used within a VariantProvider');
  }
  return context;
};
