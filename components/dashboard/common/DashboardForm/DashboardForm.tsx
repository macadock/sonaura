import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronsUpDown, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Controller, useFormContext } from 'react-hook-form';
import { getImageUrl } from '@/utils/image/get-image-url';
import React, { PropsWithChildren, useCallback } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { clsx } from 'clsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type ImageType = {
  file: string;
  bucket: string;
};

export type DashboardFormProps = {
  cardTitle: string;
  onClickBackButton: () => void;
  onSubmit: (form: unknown) => void | Promise<void>;
  onImageUploaded?: (image: ImageType) => void;
  imagesSettings?: {
    bucket: string;
    name: string;
    alt: string;
  };
  allowCardCollapse?: boolean;
};

export const DashboardForm = ({
  children,
  cardTitle,
  onClickBackButton,
  onSubmit,
  onImageUploaded,
  imagesSettings,
  allowCardCollapse = false,
}: PropsWithChildren<DashboardFormProps>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const supabase = createClient();
  const handleUploadImage = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }
      if (!imagesSettings || !onImageUploaded) {
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
    [imagesSettings, onImageUploaded, supabase.storage],
  );

  return (
    <div className="flex flex-col flex-1 gap-4">
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
          <Button onClick={handleSubmit(onSubmit, console.error)} size="sm">
            Enregistrer
          </Button>
        </div>
      </div>

      <div
        className={clsx('grid gap-4 lg:gap-8', {
          'md:grid-cols-[1fr_250px] lg:grid-cols-3': imagesSettings,
        })}
      >
        <Collapsible
          defaultOpen={true}
          className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                <div className={'flex items-center gap-2'}>
                  {allowCardCollapse && (
                    <CollapsibleTrigger>
                      <ChevronsUpDown />
                    </CollapsibleTrigger>
                  )}
                  {cardTitle}
                </div>
              </CardTitle>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">{children}</div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
        {imagesSettings && (
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
                            src={getImageUrl(field.value, {
                              width: 300,
                              height: 300,
                            })}
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
        )}
      </div>
    </div>
  );
};
