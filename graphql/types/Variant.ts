import {
  objectType,
  stringArg,
  extendType,
  inputObjectType,
  nonNull,
  enumType,
} from 'nexus';
import { VariantType as PrismaVariantType } from '@prisma/client';

export const VariantType = enumType({
  name: 'VariantType',
  members: PrismaVariantType,
});

export const VariantValue = objectType({
  name: 'VariantValue',
  definition(t) {
    t.nullable.string('id');
    t.string('value');
    t.nullable.string('colorHex');
  },
});

export const Variant = objectType({
  name: 'Variant',
  definition(t) {
    t.string('id');
    t.string('uniqueName');
    t.field('type', {
      type: VariantType,
    });
    t.list.field('values', {
      type: VariantValue,
      resolve: ({ id }, __, ctx) =>
        ctx.prisma.variant
          .findUnique({
            where: {
              id,
            },
          })
          .values(),
    });
  },
});

export const CreateVariantInput = inputObjectType({
  name: 'CreateVariantsInput',
  definition: (t) => {
    t.nonNull.string('productId');
    t.nonNull.string('uniqueName');
    t.nonNull.field('type', {
      type: VariantType,
    });
  },
});

export const UpdateVariantInput = inputObjectType({
  name: 'UpdateVariantsInput',
  definition: (t) => {
    t.nonNull.string('variantId');
    t.nullable.string('uniqueName');
    t.nonNull.field('type', {
      type: VariantType,
    });
  },
});

export const getVariantsByProduct = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('variantsByProductId', {
      type: Variant,
      args: { id: nonNull(stringArg()) },
      resolve: (root, { id }, ctx) => {
        return ctx.prisma.product
          .findUnique({
            where: {
              id,
            },
          })
          .variants();
      },
    });
  },
});

export const createVariant = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createVariant', {
      type: Variant,
      args: { createVariantInput: nonNull(CreateVariantInput) },
      resolve: (root, { createVariantInput }, ctx) => {
        return ctx.prisma.variant.create({
          data: {
            ...createVariantInput,
          },
        });
      },
    });
  },
});

export const updateVariant = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateVariant', {
      type: Variant,
      args: { updateVariantInput: nonNull(UpdateVariantInput) },
      resolve: (root, { updateVariantInput }, ctx) => {
        return ctx.prisma.variant.update({
          where: {
            id: updateVariantInput.variantId,
          },
          data: {
            ...updateVariantInput,
          },
        });
      },
    });
  },
});

export const deleteVariant = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteVariant', {
      type: Variant,
      args: { id: nonNull(stringArg()) },
      resolve: (root, { id }, ctx) => {
        return ctx.prisma.variant.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
