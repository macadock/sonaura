'use client';

import {
  ContentPageInputs,
  schemaPageInformation,
  SchemaPageInformationType,
} from '@/app/dashboard/contents/add/components/NewContentPageForm';
import { getComponentConfig } from '@/features/page-editor/components/ComponentsSelector';
import { DrawerComponentsSelector } from '@/features/page-editor/components/ComponentsSelector/components/DrawerComponentsSelector';
import { ContentEditorItem } from '@/features/page-editor/components';
import { ComponentConfig, ComponentsEnum } from '@/features/page-editor/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Json } from '@/types/supabase';
import { Page } from '@/utils/data';
import { createClient } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type ContentType = Array<ComponentConfig> & {
  class?: string;
};

export type ContentEditorProps = {
  componentsList: ComponentsEnum[];
  existingData?: ComponentConfig[];
  pageData: Page;
};

export const ContentEditor = ({
  componentsList,
  pageData,
}: ContentEditorProps) => {
  const supabase = createClient();
  const [blocks, setBlocks] = useState<ContentType>(
    ((pageData.content as unknown as { blocks: ContentType })?.blocks).map(
      (block, index) => ({
        ...block,
        schema: getComponentConfig(block.name).schema,
        order: block.order ?? index + 1,
      }),
    ) || [],
  );

  const { control, handleSubmit, getValues } =
    useForm<SchemaPageInformationType>({
      resolver: zodResolver(schemaPageInformation),
      defaultValues: {
        title: pageData.title,
        slug: pageData.slug,
        class: (pageData.content as unknown as { class?: string })?.class || '',
      },
    });
  const handleUpdatePageInformation: SubmitHandler<
    SchemaPageInformationType
  > = async (form) => {
    await supabase
      .from('pages')
      .update({ ...form })
      .eq('id', pageData.id);
  };

  const handleAddComponent = (component: ComponentsEnum) => {
    const config = getComponentConfig(component);
    setBlocks((prev) => {
      return [...prev, { ...config, order: prev.length + 1 }];
    });
  };

  const handleDeleteComponent = (id: string) => {
    setBlocks((prev) => {
      return prev.filter((block) => block.id !== id);
    });
  };

  const handleUpdateProps = (id: string, props: object) => {
    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id);

      if (isEqual(prev[index].content, props)) {
        return prev;
      }

      const newArray = [...prev];
      newArray[index] = { ...newArray[index], content: props };

      return newArray;
    });
  };

  const handleSave = async () => {
    const content = {
      blocks: blocks.map((block) => {
        return {
          id: block.id,
          name: block.name,
          content: block.content,
        };
      }),
      class: getValues('class'),
    } as Json;
    await supabase
      .from('pages')
      .update({ content, slug: getValues('slug'), title: getValues('title') })
      .eq('id', pageData.id);
  };

  const handleUpdateOrder = (id: string, direction: 'up' | 'down') => {
    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id);
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= prev.length) {
        return prev;
      }

      const newArray = [...prev];
      const temp = newArray[index];
      newArray[index] = newArray[newIndex];
      newArray[newIndex] = temp;

      return newArray;
    });
  };

  return (
    <div className="flex flex-col gap-4 max-h-fullPageWithoutHeader overflow-hidden">
      <div className="flex items-center justify-between sticky top-0 border-b p-4">
        <DrawerComponentsSelector
          handleComponentSelected={handleAddComponent}
        />
        <Button onClick={handleSave}>
          <Save strokeWidth={'0.0625rem'} /> Enregistrer
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Informations sur la page</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4 p-4"
              onSubmit={handleSubmit(handleUpdatePageInformation)}
            >
              <ContentPageInputs control={control} showClassInput />
            </form>
          </CardContent>
        </Card>
        {blocks.map((block, index, array) => {
          const isLast = index === array.length - 1;
          const isFirst = index === 0;

          return (
            <ContentEditorItem
              key={block.id}
              {...block}
              defaultValues={block.content}
              handleDelete={handleDeleteComponent}
              handleUpdateProps={handleUpdateProps}
              handleUpdateOrder={handleUpdateOrder}
              isLast={isLast}
              isFirst={isFirst}
            />
          );
        })}
      </div>
    </div>
  );
};
