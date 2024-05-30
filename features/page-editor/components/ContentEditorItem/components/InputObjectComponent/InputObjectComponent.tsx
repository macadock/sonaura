import { Inputs } from '@/features/page-editor/components/ContentEditorItem/components/Inputs';
import { InputObjectProps } from '@/features/page-editor/types';

export const InputObjectComponent = (props: InputObjectProps) => {
  const { components, name } = props;
  return (
    <div className="flex items-center gap-2">
      <h1>{name}</h1>
      <div className="flex gap-2">
        {components.map((component) => {
          return <Inputs input={component} />;
        })}
      </div>
    </div>
  );
};
