import {
  InputArrayComponent,
  InputObjectComponent,
  InputStringComponent,
} from '@/features/page-editor/components/ContentEditorItem/components';
import {
  InputArrayProps, InputBooleanProps,
  InputObjectProps,
  InputObjectType,
  InputStringProps,
  InputType,
} from '@/features/page-editor/types';
import { ReactNode } from 'react';
import {
  InputBooleanComponent
} from '@/features/page-editor/components/ContentEditorItem/components/InputBooleanComponent';

export type InputsProps = {
  input: InputObjectType;
};

const inputsMap: {
  [K in InputType]: (props: InputObjectType) => ReactNode;
} = {
  string: (props) => <InputStringComponent {...props as InputStringProps } />,
  array: (props) => <InputArrayComponent {...props as InputArrayProps} />,
  object: (props) => <InputObjectComponent {...props as InputObjectProps} />,
  boolean: (props) => <InputBooleanComponent {...props as InputBooleanProps} />,
};

export const Inputs = ({ input }: InputsProps) => {
  const Component = inputsMap[input.type];
  return <Component {...input} />;
};
