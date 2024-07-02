export type InputType = 'string' | 'array' | 'object' | 'boolean';

type CommonProps = {
  optional: boolean;
};

export type InputStringProps = {
  name: string;
  type: 'string';
} & CommonProps;

export type InputArrayProps = {
  name: string;
  type: 'array';
  elements: InputObjectType[];
} & CommonProps;

export type InputBooleanProps = {
  name: string;
  type: 'boolean';
  defaultValue: boolean;
} & CommonProps;

export type InputObjectProps = {
  name: string;
  type: 'object';
  components: Array<InputObjectType>;
} & CommonProps;


export type InputObjectType = InputStringProps | InputArrayProps | InputObjectProps | InputBooleanProps;
