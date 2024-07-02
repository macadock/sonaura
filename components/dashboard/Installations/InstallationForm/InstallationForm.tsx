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
import { Installation } from '@/utils/data';
import { DashboardForm } from '@/components/dashboard/common/DashboardForm';

export type InstallationFormProps = {
  installation: Installation | null;
};

export const InstallationForm = ({ installation }: InstallationFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<InstallationType>({
    resolver: zodResolver(installationSchema),
    defaultValues: {
      title: installation?.title || '',
      description: installation?.description || '',
      images: (installation?.images as InstallationType['images']) || undefined,
    },
  });

  const handleBackButton = useCallback(() => {
    router.push('/dashboard/installations');
  }, [router]);

  const handleSave = useCallback(
    async (form: any) => {
      const payload = {
        ...(installation || {}),
        ...form,
      };

      const { error } = await supabase.from('installations').upsert([payload]);
      if (error) {
        toast.error('Erreur lors de la sauvegarde');
      } else {
        toast.success('Installation enregistrée avec succès');
        router.push('/dashboard/installations');
      }
    },
    [installation, router, supabase],
  );

  return (
    <FormProvider {...form}>
      <DashboardForm
        cardTitle={
          installation?.id
            ? 'Mettre à jour une installation'
            : 'Nouvelle installation'
        }
        onClickBackButton={handleBackButton}
        onSubmit={handleSave}
        onImageUploaded={(image) => {
          form.setValue('images', image);
        }}
        imagesSettings={{
          bucket: 'installations',
          name: 'images',
          alt: "Image de l'installation",
        }}
      >
        <Controller
          control={form.control}
          name={'title'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Titre</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Titre manquant' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'description'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Description</Label>
              <Textarea id={field.name} {...field} className="min-h-40" />
              {error && (
                <p className="text-destructive text-xs">
                  Description manquante
                </p>
              )}
            </div>
          )}
        />
      </DashboardForm>
    </FormProvider>
  );
};
