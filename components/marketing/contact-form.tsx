'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';
import SendEmailInput from '@/SendInBlue/dto/send-customer-email.input';
import { ApiUrls, getRoutePath } from '@/appConstants';
import { Product } from '@/lib/supabase/products';
import { ReactNode } from 'react';

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
  phoneNumber: z.string().min(10),
  message: z.string().min(10, {
    message: 'Le message doit contenir au moins 10 caractères.',
  }),
  shop: z.enum(['annecy', 'lyon'], {
    message: 'Merci de sélectionner un magasin.',
  }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

export interface ContactFormProps {
  product?: Product;
  onSubmitSuccessful?: () => void;
}

export const ContactForm = ({
  product,
  onSubmitSuccessful,
}: ContactFormProps) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitSuccessful;

  async function onSubmit(values: ContactFormValues) {
    const { firstName, lastName, email, phoneNumber, message, shop } = values;

    const messageBody = `
    Boutique sélectionnée: ${shop} \n\n
    ${product ? `Produit choisi : ${product.name} \n\n` : ''}
    ${message}
    `;

    const customerBody: SendEmailInput = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      message: messageBody,
      templateId: {
        customer: 3,
        merchant: 4,
      },
    };

    const url = getRoutePath({ api: ApiUrls.SEND_CUSTOMER_EMAIL });

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(customerBody),
    });

    if (response.ok) {
      form.reset();
      onSubmitSuccessful?.();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
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
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Dites nous en le plus possible sur votre projet."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shop"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Quel magasin est le plus proche de vous ?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="annecy" />
                    </FormControl>
                    <FormLabel className="font-normal">Annecy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="lyon" />
                    </FormControl>
                    <FormLabel className="font-normal">Lyon</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'flex gap-2'}>
          <Button size={'lg'} type="submit" disabled={isSubmitting}>
            Envoyer
          </Button>
          {isSubmitted && (
            <div className={'flex items-center gap-2 md:col-span-2'}>
              <CheckCircle className={'size-4'} />
              <p>Demande envoyée avec succès.</p>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};
