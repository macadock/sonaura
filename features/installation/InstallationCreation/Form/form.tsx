'use client';

import { Controller, useForm } from 'react-hook-form';
import {
  InstallationFormSchema,
  InstallationFormType,
} from '@/features/installation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import 'cropperjs/dist/cropper.css';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageCropper } from '@/components/common';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Installation } from '@/utils/data';
import isEqual from 'lodash/isEqual';
import { BUCKET_NAME } from '@/features/config';

export type InstallationFormProps = {
  installation?: Installation;
};

export const InstallationForm = ({ installation }: InstallationFormProps) => {
  const [isOpenImageCropper, setIsOpenImageCropper] = useState(false);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const isUpdating = Boolean(installation);

  const { control, handleSubmit, setValue } = useForm<InstallationFormType>({
    resolver: zodResolver(InstallationFormSchema),
    defaultValues:
      isUpdating && installation
        ? {
            id: installation.id,
            title: installation.title,
            description: installation.description,
          }
        : undefined,
  });
  const getImage = async () => {
    if (!isUpdating || !installation) {
      return;
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(installation.image as string);

    if (data) {
      setValue('image', new File([data], installation.image as string));
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  const onSubmit = async (formData: InstallationFormType) => {
    const supabase = createClient();

    const isImageEqual = isEqual(
      formData.image.name,
      installation?.image as string,
    );

    const image = isImageUpdated
      ? {
          file: crypto.randomUUID(),
        }
      : {
          file: formData.image.name,
        };

    if (isImageUpdated) {
      const { data: file } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(image.file, formData.image);
    }

    const { data } = await supabase
      .from('installations')
      .upsert({
        ...formData,
        image,
      })
      .select('id')
      .single();

    if (!isUpdating) {
      router.push(`/dashboard/installations/${data?.id}`);
    }
  };

  return (
    <form
      className={'p-4 flex flex-col gap-4 lg:w-3/4 lg:m-auto'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button>{isUpdating ? 'Mettre à jour' : 'Ajouter'}</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder={field.name} error={error?.message} />
          )}
          name={'title'}
          control={control}
        />
        <Controller
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder={field.name} error={error?.message} />
          )}
          name={'description'}
          control={control}
        />
      </div>
      <Controller
        render={({ field, fieldState: { error } }) => {
          const { value, ...rest } = field;
          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) {
              return;
            }
            setIsImageUpdated(true);
            field.onChange(e.target.files?.[0]);

            const reader = new FileReader();
            reader.onload = (e) => {};
            reader.readAsDataURL(file);
          };

          const image = value
            ? new Blob([value], { type: value.type })
            : undefined;

          const handleSave = (blob: Blob) => {
            setIsImageUpdated(true);
            setValue('image', new File([blob], value.name));
          };

          return (
            <>
              <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <div className={'flex gap-2'}>
                  <Input
                    {...rest}
                    id="picture"
                    type="file"
                    accept={'image/*'}
                    onChange={onChange}
                    className={'max-w-sm'}
                    error={error?.message}
                  />
                  {value && (
                    <Button
                      type={'button'}
                      variant={'secondary'}
                      onClick={() => {
                        setIsOpenImageCropper(true);
                      }}
                    >
                      Editer l'image
                    </Button>
                  )}
                </div>
              </div>
              {value && (
                <>
                  <img
                    alt={'Image preview'}
                    src={URL.createObjectURL(value)}
                    className={
                      'max-h-halfPageWithoutHeader w-full object-contain'
                    }
                  />
                  <ImageCropper
                    image={image}
                    handleSave={handleSave}
                    open={isOpenImageCropper}
                    onOpenChange={setIsOpenImageCropper}
                  />
                </>
              )}
            </>
          );
        }}
        name={'image'}
        control={control}
      />
    </form>
  );
};
