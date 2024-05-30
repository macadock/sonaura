import { InputStringProps } from '@/features/page-editor/types';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';

export const InputStringComponent = (props: InputStringProps) => {
  const { control } = useFormContext();
  const { name, optional } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input placeholder={name} type={'text'} required={!optional} {...field} />
      )}
    />
  );
};
