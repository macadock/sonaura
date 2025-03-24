'use client';

import { Product } from '@/lib/supabase/products';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PropsWithChildren, useState } from 'react';
import { ContactForm } from '@/components/marketing/contact-form';

export interface ProductFormProps {
  product: Product;
  title: string;
}

export const ProductForm = ({
  product,
  title,
  children,
}: PropsWithChildren<ProductFormProps>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ContactForm
          product={product}
          onSubmitSuccessful={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
