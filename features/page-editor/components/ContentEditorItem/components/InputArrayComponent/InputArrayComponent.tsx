import { InputArrayProps } from '@/features/page-editor/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import isEmpty from 'lodash/isEmpty';
import { Minus, Plus } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const InputArrayComponent = (props: InputArrayProps) => {
  const { control } = useFormContext();
  const { elements, name } = props;

  return (
    <div className="flex items-center gap-2">
      <h1>{name}</h1>
      <div className="flex flex-col gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const value = field.value as {
              id: string;
              [key: string]: string;
            }[];

            const onChange = ({
              id,
              key,
              value,
            }: {
              id: string;
              key: string;
              value: string;
            }) => {
              const cleanedKey = key.replace(`${name}.`, '');

              if (isEmpty(field.value)) {
                field.onChange([{ id, [cleanedKey]: value }]);
              } else {
                const values = field.value as { id: string }[];
                const currentValue = values.find((value) => value.id === id);
                field.onChange([
                  ...values.filter((value) => value.id !== id),
                  { ...currentValue, [cleanedKey]: value },
                ]);
              }
            };

            const addElement = () => {
              field.onChange([...value, { id: crypto.randomUUID() }]);
            };

            return (
              <>
                {value.map(({ id }) => {
                  const removeElement = () => {
                    field.onChange(value.filter((value) => value.id !== id));
                  };

                  return (
                    <div key={id} className="flex gap-2">
                      {elements.map((element) => {
                        if (element.name.includes('id')) {
                          return null;
                        }

                        return (
                          <Input
                            value={
                              value.find((value) => value.id === id)?.[
                                element.name.replace(`${name}.`, '')
                              ] || ''
                            }
                            placeholder={element.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              onChange({
                                id,
                                key: element.name,
                                value: e.target.value,
                              });
                            }}
                            key={element.name}
                          />
                        );
                      })}
                      <Button
                        variant={'destructive'}
                        onClick={removeElement}
                        title="Supprimer"
                      >
                        <Minus />
                      </Button>
                    </div>
                  );
                })}
                <Button
                  variant={'outline'}
                  onClick={addElement}
                  title="Ajouter"
                >
                  <Plus />
                  Ajouter
                </Button>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};
