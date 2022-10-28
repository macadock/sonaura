import {
  objectType,
  stringArg,
  extendType,
  inputObjectType,
  nonNull,
  list,
} from 'nexus';
import { Category } from './Category';
import { Shop } from './Shop';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('description');
    t.nullable.int('fromPrice');
    t.string('mainAsset');
    t.nullable.int('price');
    t.nullable.int('quantity');
    t.string('slug');
    t.field('category', {
      type: Category,
      resolve: ({ id }, __, ctx) =>
        ctx.prisma.product
          .findUnique({
            where: {
              id,
            },
          })
          .category(),
    });
    t.nullable.field('shop', {
      type: Shop,
      resolve: ({ id }, __, ctx) =>
        ctx.prisma.product
          .findUnique({
            where: {
              id,
            },
          })
          .shop(),
    });
  },
});

export const CreateProductInput = inputObjectType({
  name: 'CreateProductInput',
  definition: (t) => {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nullable.int('fromPrice');
    t.nonNull.string('mainAsset');
    t.nullable.int('price');
    t.nullable.int('quantity');
    t.nonNull.string('slug');
    t.nonNull.string('categoryId');
    t.nullable.string('shopId');
  },
});

export const UpdateProductInput = inputObjectType({
  name: 'UpdateProductInput',
  definition: (t) => {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('description');
    t.nullable.int('fromPrice');
    t.nullable.string('mainAsset');
    t.nullable.int('price');
    t.nullable.int('quantity');
    t.nullable.string('slug');
    t.nullable.string('categoryId');
    t.nullable.string('shopId');
  },
});

export const getAllProducts = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('products', {
      type: Product,
      resolve: async (root, args, ctx) => {
        return ctx.prisma.product.findMany();
      },
    });
  },
});

export const productById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('productById', {
      type: Product,
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.product.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const productByIds = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('productByIds', {
      type: Product,
      args: { ids: nonNull(list(stringArg())) },
      resolve: async (root, { ids }, ctx) => {
        return ctx.prisma.product.findMany({
          where: {
            id: { in: ids },
          },
        });
      },
    });
  },
});

export const productBySlug = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('productBySlug', {
      type: Product,
      args: { slug: nonNull(stringArg()) },
      resolve: async (root, { slug }, ctx) => {
        return ctx.prisma.product.findUnique({
          where: {
            slug,
          },
        });
      },
    });
  },
});

export const createProduct = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createProduct', {
      type: Product,
      args: { createProductInput: nonNull(CreateProductInput) },
      resolve: async (root, { createProductInput }, ctx) => {
        return ctx.prisma.product.create({
          data: {
            ...createProductInput,
          },
        });
      },
    });
  },
});

export const updateProduct = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateProduct', {
      type: Product,
      args: { updateProductInput: nonNull(UpdateProductInput) },
      resolve: async (root, { updateProductInput }, ctx) => {
        return ctx.prisma.product.update({
          where: {
            id: updateProductInput.id,
          },
          data: {
            ...updateProductInput,
          },
        });
      },
    });
  },
});

export const deleteProduct = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteProduct', {
      type: Product,
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.product.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
