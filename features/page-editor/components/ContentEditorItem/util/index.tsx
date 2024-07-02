import zod from 'zod';
import { InputObjectType } from '@/features/page-editor/types';

export const getInputs = ({
  schema,
  parent,
}: {
  schema: zod.ZodObject<any>;
  parent?: string;
}) => {
  const inputs: InputObjectType[] = [];
  if (!schema?.shape) {
    return inputs;
  }
  const values = Object.entries(schema.shape);

  values.forEach(([key, value]) => {
    if (value instanceof zod.ZodOptional) {
      const shape = zod.object({
        key: value._def.innerType,
      });

      const inputsResult = getInputs({
        schema: shape,
      });

      inputsResult.forEach((input) => {
        inputs.push({
          ...input,
          name: parent ? `${parent}.${key}` : key,
          optional: true,
        });
      });
    }

    if (value instanceof zod.ZodString) {
      inputs.push({
        name: parent ? `${parent}.${key}` : key,
        type: 'string',
        optional: false,
      });
    }

    if (value instanceof zod.ZodBoolean) {
      inputs.push({
        name: parent ? `${parent}.${key}` : key,
        type: 'boolean',
        optional: false,
        defaultValue: false,
      });

    }

    if (value instanceof zod.ZodObject) {
      const subInputs = getInputs({
        schema: value,
        parent: key,
      });

      inputs.push({
        type: 'object',
        components: subInputs,
        name: key,
        optional: false,
      });
    }

    if (value instanceof zod.ZodArray) {
      const subInputs = getInputs({
        schema: value.element,
        parent: key,
      });

      inputs.push({
        type: 'array',
        elements: subInputs,
        name: key,
        optional: false,
      });
    }
  });

  return inputs;
};
