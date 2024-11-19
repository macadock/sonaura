import {
  InputArrayComponent,
  InputObjectComponent,
  InputStringComponent,
} from '@/features/page-editor/components/ContentEditorItem/components';
import {
  InputArrayProps,
  InputBooleanProps,
  InputObjectProps,
  InputObjectType,
  InputStringProps,
  InputType,
} from '@/features/page-editor/types';
import { ReactNode } from 'react';
import { InputBooleanComponent } from '@/features/page-editor/components/ContentEditorItem/components/InputBooleanComponent';
import { Control } from 'react-hook-form';

export type InputsProps = {
  input: InputObjectType;
  control?: Control;
};

const inputsMap: {
  [K in InputType]: (props: InputObjectType) => ReactNode;
} = {
  string: (props) => <InputStringComponent {...(props as InputStringProps)} />,
  array: (props) => <InputArrayComponent {...(props as InputArrayProps)} />,
  object: (props) => <InputObjectComponent {...(props as InputObjectProps)} />,
  boolean: (props) => (
    <InputBooleanComponent {...(props as InputBooleanProps)} />
  ),
};

export const Inputs = ({ input, control }: InputsProps) => {
  const Component = inputsMap[input.type];
  return <Component {...input} control={control} />;
};
