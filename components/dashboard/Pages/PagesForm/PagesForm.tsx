'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Page } from '@/utils/data';
import { DashboardForm } from '@/components/dashboard/common/DashboardForm';
import { pageSchema, PageType } from '@/app/(dashboard)/dashboard/pages/schema';
import { ContentEditor } from '@/features/page-editor';

export type PagesFormProps = {
  page: Page | null;
};

export const PagesForm = ({ page }: PagesFormProps) => {
  const router = useRouter();
  const supabase = createClient();

  const searchParams = useSearchParams();
  const showAdvancedOptions = searchParams.get('advanced') === 'true';

  const form = useForm<PageType>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      id: page?.id,
      title: page?.title || '',
      slug: page?.slug || '',
      content: (page?.content as PageType['content']) || {
        blocks: [],
        class: 'flex flex-col gap-8 p-4 md:p-8',
      },
    },
  });

  const handleBackButton = useCallback(() => {
    router.push('/dashboard/pages');
  }, [router]);

  const handleSave = useCallback(
    async (form: any) => {
      const payload = { ...form };
      if (!payload.id) {
        delete payload.id;
      }

      const { error } = await supabase.from('pages').upsert([payload]);
      if (error) {
        toast.error('Erreur lors de la sauvegarde');
      } else {
        toast.success('Page enregistrée avec succès');
        router.push('/dashboard/pages');
      }
    },
    [router, supabase],
  );

  return (
    <FormProvider {...form}>
      <div className={'flex flex-col gap-2 w-full'}>
        <DashboardForm
          cardTitle={page?.id ? 'Mettre à jour une page' : 'Nouvelle page'}
          onClickBackButton={handleBackButton}
          onSubmit={handleSave}
          allowCardCollapse
        >
          <div className={'flex gap-2 w-full mt-2'}>
            <Controller
              control={form.control}
              name={'title'}
              render={({ field, fieldState: { error } }) => (
                <div className={'flex flex-col gap-2 w-full'}>
                  <Label htmlFor={field.name}>Nom de la page</Label>
                  <Input
                    id={field.name}
                    type="text"
                    className="w-full"
                    {...field}
                    error={error ? 'Nom de la page manquant' : undefined}
                  />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name={'slug'}
              render={({ field, fieldState: { error } }) => (
                <div className={'flex flex-col gap-2 w-full'}>
                  <Label htmlFor={field.name}>URL de la page</Label>
                  <Input
                    id={field.name}
                    type="text"
                    className="w-full"
                    {...field}
                    error={error ? 'URL manquante' : undefined}
                  />
                </div>
              )}
            />
          </div>
          <Controller
            name={'content'}
            control={form.control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  {showAdvancedOptions && (
                    <div className={'flex flex-col gap-2'}>
                      <Label htmlFor={field.name}>
                        Tailwind classes (advanced)
                      </Label>
                      <Input
                        id={field.name}
                        type="text"
                        className="w-full"
                        {...field}
                        onChange={(event) => {
                          field.onChange({
                            ...field.value,
                            class: event.target.value,
                          });
                        }}
                        value={field.value.class}
                        error={
                          error ? 'Erreur sur les classes Tailwind' : undefined
                        }
                      />
                    </div>
                  )}
                </>
              );
            }}
          />
        </DashboardForm>
        <Controller
          name={'content'}
          control={form.control}
          render={({ field }) => {
            return (
              <ContentEditor
                content={field.value.blocks}
                onChange={(blocks) => {
                  field.onChange({
                    ...field.value,
                    blocks,
                  });
                }}
              />
            );
          }}
        />
      </div>
    </FormProvider>
  );
};
