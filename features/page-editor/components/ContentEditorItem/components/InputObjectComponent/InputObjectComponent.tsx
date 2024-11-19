import { Inputs } from '@/features/page-editor/components/ContentEditorItem/components/Inputs';
import { InputObjectProps } from '@/features/page-editor/types';

export const InputObjectComponent = (props: InputObjectProps) => {
  const { components, name, control } = props;
  return (
    <div className="flex items-center gap-2">
      <h1>{name}</h1>
      <div className="flex gap-2">
        {components.map((component) => {
          return (
            <Inputs key={component.name} input={component} control={control} />
          );
        })}
      </div>
    </div>
  );
};
