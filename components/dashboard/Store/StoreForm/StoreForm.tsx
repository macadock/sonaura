'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  installationSchema,
  InstallationType,
} from '@/app/(dashboard)/dashboard/installations/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Category, Installation, Store } from '@/utils/data';
import { DashboardForm } from '@/components/dashboard/common/DashboardForm';
import {
  categorySchema,
  CategoryType,
} from '@/app/(dashboard)/dashboard/categories/schema';
import { icons } from 'lucide-react';
import {
  storeSchema,
  StoreType,
} from '@/app/(dashboard)/dashboard/stores/schema';

export type StoreFormProps = {
  store: Store | null;
};

export const StoreForm = ({ store }: StoreFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<StoreType>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      city: store?.city || '',
      country: store?.country || '',
      address: store?.address || '',
      postalCode: store?.postalCode || '',
      phoneNumber: store?.phoneNumber || '',
      email: store?.email || '',
      googleMapsUrl: store?.googleMapsUrl || '',
    },
  });

  const handleBackButton = useCallback(() => {
    router.push('/dashboard/stores');
  }, [router]);

  const handleSave = useCallback(
    async (form: any) => {
      const payload = {
        ...(store || {}),
        ...form,
      };

      const { error } = await supabase.from('shops').upsert([payload]);
      if (error) {
        toast.error('Erreur lors de la sauvegarde');
      } else {
        toast.success('Catégorie enregistrée avec succès');
        router.push('/dashboard/stores');
      }
    },
    [store, router, supabase],
  );

  return (
    <FormProvider {...form}>
      <DashboardForm
        cardTitle={store?.id ? 'Mettre à jour un magasin' : 'Nouveau magasin'}
        onClickBackButton={handleBackButton}
        onSubmit={handleSave}
      >
        <Controller
          control={form.control}
          name={'city'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Ville</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Ville manquante' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'country'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Pays</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Pays manquant' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'address'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Adresse</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Adresse manquante' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'postalCode'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Code postal</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Code postal manquant' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'phoneNumber'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Téléphone</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Téléphone manquant ou incorrect' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'email'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Email manquant ou incorrect' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'googleMapsUrl'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Lien Google Maps</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={
                  error ? 'Lien Google Maps manquant ou incorrect' : undefined
                }
              />
            </div>
          )}
        />
      </DashboardForm>
    </FormProvider>
  );
};
