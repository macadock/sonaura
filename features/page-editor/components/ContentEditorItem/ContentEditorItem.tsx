'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getComponent } from '@/features/page-editor/components/ComponentsSelector';
import { getInputs } from '@/features/page-editor/components/ContentEditorItem/util';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Inputs } from '@/features/page-editor/components/ContentEditorItem/components';
import { ComponentConfig } from '@/features/page-editor/types';

export type ContentEditorItem = ComponentConfig & {
  handleDelete: (id: string) => void;
  handleUpdateProps: (id: string, props: object) => void;
  handleUpdateOrder: (id: string, direction: 'up' | 'down') => void;
  defaultValues?: object;
  isLast: boolean;
  isFirst: boolean;
};

export const ContentEditorItem = ({
  schema,
  id,
  name,
  handleDelete,
  handleUpdateProps,
  handleUpdateOrder,
  defaultValues,
  isFirst,
  isLast,
}: ContentEditorItem) => {
  const formMethods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  const DisplayedComponent = getComponent(name);

  const inputsArray = schema ? getInputs({ schema }) : [];

  const values = formMethods.watch();

  useEffect(() => {
    handleUpdateProps(id, values);
  }, [values]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle>{name}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={'outline'}
            title="Remonter le composant"
            onClick={() => {
              handleUpdateOrder(id, 'up');
            }}
            disabled={isFirst}
          >
            <ArrowUp strokeWidth={'0.0625rem'} />
          </Button>
          <Button
            variant={'outline'}
            title="Baisser le composant"
            onClick={() => {
              handleUpdateOrder(id, 'down');
            }}
            disabled={isLast}
          >
            <ArrowDown strokeWidth={'0.0625rem'} />
          </Button>
          <Button
            variant={'destructive'}
            title={'Supprimer'}
            onClick={() => {
              handleDelete(id);
            }}
          >
            <Trash2 strokeWidth={'0.0625rem'} />
            Supprimer
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <DisplayedComponent content={{ ...formMethods.watch() }} isPreview />
      </CardContent>
      <CardFooter>
        <FormProvider {...formMethods}>
          <div className="flex flex-col gap-2">
            {inputsArray.map((input) => {
              return <Inputs key={input.name} input={input} />;
            })}
          </div>
        </FormProvider>
      </CardFooter>
    </Card>
  );
};
