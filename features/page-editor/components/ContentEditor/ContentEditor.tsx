import { getComponentConfig } from '@/features/page-editor/components/ComponentsSelector';
import { DrawerComponentsSelector } from '@/features/page-editor/components/ComponentsSelector/components/DrawerComponentsSelector';
import { ContentEditorItem } from '@/features/page-editor/components';
import { ComponentConfig, ComponentsEnum } from '@/features/page-editor/types';
import isEqual from 'lodash/isEqual';
import React, { useMemo } from 'react';
import { PageType } from '@/app/(dashboard)/dashboard/pages/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

type ContentType = PageType['content']['blocks'];

export type ContentEditorProps = {
  content: ContentType;
  onChange: (value: ContentType) => void;
};

export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  const blocks = useMemo<Array<ComponentConfig>>(() => {
    if (!content) {
      return [];
    }

    return content.map((block, index) => ({
      ...(block as ComponentConfig),
      schema: getComponentConfig(block.name as ComponentsEnum).schema,
      order: block.order ?? index + 1,
    }));
  }, [content]);

  const handleAddComponent = (component: ComponentsEnum) => {
    onChange([
      ...content,
      {
        name: component,
        content: {},
        id: crypto.randomUUID(),
        order: content.length + 1,
      },
    ]);
  };

  const handleDeleteComponent = (id: string) => {
    onChange(content.filter((block) => block.id !== id));
  };

  const handleUpdateProps = (id: string, props: object) => {
    const index = content.findIndex((block) => block.id === id);

    if (isEqual(content[index].content, props)) {
      return;
    }

    const newArray = [...content];
    newArray[index] = { ...newArray[index], content: props };

    onChange(newArray);
  };

  const handleUpdateOrder = (id: string, direction: 'up' | 'down') => {
    const index = content.findIndex((block) => block.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= content.length) {
      return;
    }

    const newArray = [...content];
    const temp = newArray[index];
    newArray[index] = newArray[newIndex];
    newArray[newIndex] = temp;

    onChange(newArray);
  };

  return (
    <Collapsible defaultOpen={true}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className={'flex justify-between'}>
              <div className={'flex items-center gap-2'}>
                <CollapsibleTrigger>
                  <ChevronsUpDown />
                </CollapsibleTrigger>
                {'Composants de la page'}
              </div>
              <DrawerComponentsSelector
                handleComponentSelected={handleAddComponent}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
              {blocks.map((block, index, array) => {
                const isLast = index === array.length - 1;
                const isFirst = index === 0;

                return (
                  <ContentEditorItem
                    key={block.id}
                    {...block}
                    handleDelete={handleDeleteComponent}
                    handleUpdateProps={handleUpdateProps}
                    handleUpdateOrder={handleUpdateOrder}
                    isLast={isLast}
                    isFirst={isFirst}
                  />
                );
              })}
            </div>
            {blocks.length === 0 && (
              <div className="flex items-center justify-center h-40">
                Aucun composant ajouté
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
