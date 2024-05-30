'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ComponentsEnum } from '@/features/page-editor/types';
import { clsx } from 'clsx';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

const componentsCategories: {
  [key: string]: ComponentsEnum[];
} = {
  form: [ComponentsEnum.CONTACT_FORM],
  hero: [
    ComponentsEnum.HERO_VIDEO,
    ComponentsEnum.HERO_TEXT,
    ComponentsEnum.HERO_IMAGE,
  ],
  categories: [ComponentsEnum.CATEGORIES],
  products: [
    ComponentsEnum.PRODUCTS,
    ComponentsEnum.PRODUCT_LIST_BY_CATEGORY,
    ComponentsEnum.PRODUCT_PAGE,
  ],
  other: [
    ComponentsEnum.ADVICES,
    ComponentsEnum.NEWSLETTER,
    ComponentsEnum.PEOPLE,
    ComponentsEnum.INSTALLATIONS_GRID,
    ComponentsEnum.SHOPS_INFO,
  ],
};

export type DrawerComponentsSelectorProps = {
  handleComponentSelected: (component: ComponentsEnum) => void;
};

export const DrawerComponentsSelector = ({
  handleComponentSelected,
}: DrawerComponentsSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentsEnum | null>(null);

  const handleSelect = () => {
    if (!selectedComponent) {
      return;
    }
    handleComponentSelected(selectedComponent);
    setOpen(false);
    setSelectedComponent(null);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button title="Ajouter un composant" variant={'secondary'}>
          <PlusIcon strokeWidth={'0.0625rem'} />
          Ajouter un composant
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-fullPageWithoutHeader">
        <DrawerHeader>
          <DrawerTitle>Ajouter un nouveau composant</DrawerTitle>
          <DrawerDescription>
            Sélectionnez un composant puis cliquez sur ajouter.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 overflow-y-auto">
          {Object.keys(componentsCategories).map((category) => (
            <div key={category} className="flex flex-col gap-2">
              <h3>{category}</h3>
              <div className="flex gap-2 flex-wrap">
                {componentsCategories[category].map((component) => (
                  <Card
                    key={component}
                    className={clsx('cursor-pointer', {
                      'border-primary': selectedComponent === component,
                    })}
                    onClick={() => {
                      setSelectedComponent(component);
                    }}
                  >
                    <CardContent className="p-6">{component}</CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <Button onClick={handleSelect} disabled={!selectedComponent}>
            Ajouter
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedComponent(null);
              }}
            >
              Annuler
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
