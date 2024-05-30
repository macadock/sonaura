import { InputBooleanProps } from '@/features/page-editor/types';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

export const InputBooleanComponent = (props: InputBooleanProps) => {
  const { control, watch } = useFormContext();
  const { name, optional, defaultValue } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest} }) => {
        return (
        <div className="flex items-center gap-2">
          <Checkbox id={name} required={!optional} {...rest} checked={value}
                    onCheckedChange={onChange}  />
          <label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {name}
          </label>
        </div>
  )}
}
/>
)
  ;
};
