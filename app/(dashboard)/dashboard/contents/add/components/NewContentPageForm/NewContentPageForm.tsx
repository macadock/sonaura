'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form';
import zod from 'zod';

export const schemaPageInformation = zod.object({
  title: zod.string(),
  slug: zod.string(),
  class: zod.string().optional(),
});

export type SchemaPageInformationType = zod.infer<typeof schemaPageInformation>;

export const NewContentPageForm = () => {
  const supabase = createClient();
  const router = useRouter();

  const { control, handleSubmit } = useForm<SchemaPageInformationType>({
    resolver: zodResolver(schemaPageInformation),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  const handleAddPage: SubmitHandler<SchemaPageInformationType> = async (
    form,
  ) => {
    const newPage = {
      title: form.title,
      slug: form.slug,
      content: {
        blocks: [],
        class: '',
      },
    };

    const { data } = await supabase
      .from('pages')
      .insert(newPage)
      .select()
      .single();

    if (data) {
      router.push(`/dashboard/contents/${data.id}`);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(handleAddPage)}
    >
      <ContentPageInputs control={control} />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

export const ContentPageInputs = ({
  control,
  showClassInput = false,
}: {
  control: Control<SchemaPageInformationType>;
  showClassInput?: boolean;
}) => {
  return (
    <>
      <Controller
        control={control}
        name={'title'}
        render={({ field }) => {
          return <Input placeholder={field.name} {...field} />;
        }}
      />
      <Controller
        control={control}
        name={'slug'}
        render={({ field }) => {
          return <Input placeholder={field.name} {...field} />;
        }}
      />
      {showClassInput && (
        <Controller
          name={'class'}
          control={control}
          render={({ field }) => {
            return <Input placeholder={field.name} {...field} />;
          }}
        />
      )}
    </>
  );
};
