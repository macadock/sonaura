'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, PropsWithChildren } from 'react';
import { useGetProductsByIds } from '@/lib/data/useGetProductsByIds';
import { useCart } from 'react-use-cart';
import CreatePaymentInput from '@/PayPlug/dto/create-payment.input';
import { formatPhoneNumber } from '@/utils/phone-number';
import { ApiUrls, getRoutePath } from '@/appConstants';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Le prénom doit contenir au moins 2 caractères.',
  }),
  lastName: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  email: z.string().email({
    message: 'Merci de saisir une adresse email valide.',
  }),
  phoneNumber: z.string().min(10, {
    message: 'Merci de saisir un téléphone à 10 chiffres.',
  }),
  city: z.string(),
  postalCode: z.string(),
  address: z.string(),
});

export type CheckoutFormValues = z.infer<typeof formSchema>;

export const CheckoutForm = ({ children }: PropsWithChildren) => {
  const { totalItems, items, cartTotal } = useCart();
  const router = useRouter();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      city: '',
      postalCode: '',
      address: '',
    },
  });

  const { data: products, refetch } = useGetProductsByIds({
    ids: items.map((item) => item.id),
  });

  useEffect(() => {
    refetch();
  }, [refetch, totalItems]);

  async function onSubmit(values: CheckoutFormValues) {
    if (!form.formState.isValid) {
      return;
    }
    const body: CreatePaymentInput = {
      ...values,
      phoneNumber: formatPhoneNumber(values.phoneNumber),
      amount: cartTotal,
      products: products || [],
    };

    const url = getRoutePath({ api: ApiUrls.MAKE_PAYMENT });

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(data.hosted_payment.payment_url);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className={'flex flex-col md:flex-row gap-4'}>
          <div className={'flex-1 flex flex-col gap-4'}>
            <p className={'text-xl font-medium'}>Adresse de facturation</p>
            <div className={'grid md:grid-cols-2 gap-6'}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" type={'email'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Code postal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Ville" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {children}
        </div>
      </form>
    </Form>
  );
};
