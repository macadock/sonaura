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
import { Category, Installation } from '@/utils/data';
import { DashboardForm } from '@/components/dashboard/common/DashboardForm';
import {
  categorySchema,
  CategoryType,
} from '@/app/(dashboard)/dashboard/categories/schema';
import { icons } from 'lucide-react';

export type CategoryFormProps = {
  category: Category | null;
};

export const CategoryForm = ({ category }: CategoryFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      slug: category?.slug || '',
      icon: (category?.icon as CategoryType['icon']) || undefined,
    },
  });

  const handleBackButton = useCallback(() => {
    router.push('/dashboard/categories');
  }, [router]);

  const handleSave = useCallback(
    async (form: any) => {
      const payload = {
        ...(category || {}),
        ...form,
      };

      const { error } = await supabase.from('categories').upsert([payload]);
      if (error) {
        toast.error('Erreur lors de la sauvegarde');
      } else {
        toast.success('Catégorie enregistrée avec succès');
        router.push('/dashboard/categories');
      }
    },
    [category, router, supabase],
  );

  return (
    <FormProvider {...form}>
      <DashboardForm
        cardTitle={
          category?.id ? 'Mettre à jour une catégorie' : 'Nouvelle catégorie'
        }
        onClickBackButton={handleBackButton}
        onSubmit={handleSave}
        onImageUploaded={(image) => {
          form.setValue('icon', image);
        }}
        bucket={'categories'}
      >
        <Controller
          control={form.control}
          name={'name'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Nom de la catégorie</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Nom manquant' : undefined}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name={'slug'}
          render={({ field, fieldState: { error } }) => (
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor={field.name}>Slug</Label>
              <Input
                id={field.name}
                type="text"
                className="w-full"
                {...field}
                error={error ? 'Slug manquant' : undefined}
              />
            </div>
          )}
        />
      </DashboardForm>
    </FormProvider>
  );
};
