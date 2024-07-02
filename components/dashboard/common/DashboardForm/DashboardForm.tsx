import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { getImageUrl } from '@/utils/image/get-image-url';
import React, { PropsWithChildren, useCallback } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

type ImageType = {
  file: string;
  bucket: string;
};

export type DashboardFormProps = {
  cardTitle: string;
  onClickBackButton: () => void;
  onSubmit: (form: unknown) => void | Promise<void>;
  onImageUploaded: (image: ImageType) => void;
  imagesSettings: {
    bucket: string;
    name: string;
    alt: string;
  };
};

export const DashboardForm = ({
  children,
  cardTitle,
  onClickBackButton,
  onSubmit,
  onImageUploaded,
  imagesSettings,
}: PropsWithChildren<DashboardFormProps>) => {
  const { control, handleSubmit } = useFormContext();
  const supabase = createClient();
  const handleUploadImage = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      const { bucket } = imagesSettings;
      const fileName = crypto.randomUUID();
      const uploadFile = supabase.storage
        .from(bucket)
        .upload(fileName, files[0]);

      toast.promise(uploadFile, {
        success: () => {
          onImageUploaded({
            bucket,
            file: fileName,
          });
          return 'Fichier enregistré avec succès';
        },
        error: "Erreur lors de l'enregistrement du fichier",
        loading: 'Enregistrement du fichier en cours...',
      });
    },
    [onImageUploaded, supabase.storage],
  );

  return (
    <form
      className="flex flex-col mx-auto max-w-[59rem] flex-1 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-4">
        <Button type={'button'} variant="link" onClick={onClickBackButton}>
          <ChevronLeft className="h-4 w-4" />
          <p>Retour</p>
        </Button>
        <div className="items-center gap-2 ml-auto flex">
          <Button
            type={'button'}
            variant="outline"
            size="sm"
            onClick={onClickBackButton}
          >
            Annuler
          </Button>
          <Button type={'submit'} size="sm">
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">{children}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                control={control}
                name={imagesSettings.name}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="grid gap-2">
                      {field.value ? (
                        <img
                          alt={imagesSettings.alt}
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={getImageUrl(field.value)}
                          width="300"
                        />
                      ) : (
                        <img
                          alt={imagesSettings.alt}
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                        />
                      )}
                      <div className="grid grid-cols-3 gap-2">
                        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                          <input
                            id={field.name}
                            name={field.name}
                            hidden
                            type="file"
                            multiple
                            accept={'image/*'}
                            onChange={async (e) => {
                              handleUploadImage(e.target.files);
                            }}
                          />
                        </label>
                      </div>
                      {error && (
                        <p className="text-destructive text-xs">
                          Image manquante
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};
