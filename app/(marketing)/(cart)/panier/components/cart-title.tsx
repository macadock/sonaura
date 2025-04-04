'use client';

import { useCart } from 'react-use-cart';
import React from 'react';

export const CartTitle = () => {
  const { totalItems, isEmpty } = useCart();

  if (isEmpty) {
    return null;
  }

  return (
    <h2
      className={'text-xl'}
    >{`${totalItems} produit${totalItems > 1 ? 's' : ''} d'occasion`}</h2>
  );
};
