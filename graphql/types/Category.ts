import {
  objectType,
  stringArg,
  extendType,
  inputObjectType,
  nonNull,
} from 'nexus';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('slug');
    t.string('icon');
  },
});

export const CreateCategoryInput = inputObjectType({
  name: 'CreateCategoryInput',
  definition: (t) => {
    t.nonNull.string('name');
    t.nonNull.string('slug');
    t.nonNull.string('icon');
  },
});

export const UpdateCategoryInput = inputObjectType({
  name: 'UpdateCategoryInput',
  definition: (t) => {
    t.nonNull.string('id');
    t.nullable.string('name');
    t.nullable.string('slug');
    t.nullable.string('icon');
  },
});

export const getAllCategories = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('categories', {
      type: 'Category',
      resolve: async (root, args, ctx) => {
        return ctx.prisma.category.findMany();
      },
    });
  },
});

export const categoryById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('categoryById', {
      type: 'Category',
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.category.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const createCategory = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createCategory', {
      type: 'Category',
      args: { createCategoryInput: nonNull(CreateCategoryInput) },
      resolve: async (root, { createCategoryInput }, ctx) => {
        return ctx.prisma.category.create({
          data: {
            ...createCategoryInput,
          },
        });
      },
    });
  },
});

export const updateCategory = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateCategory', {
      type: 'Category',
      args: { updateCategoryInput: nonNull(UpdateCategoryInput) },
      resolve: async (root, { updateCategoryInput }, ctx) => {
        return ctx.prisma.category.update({
          where: {
            id: updateCategoryInput.id,
          },
          data: {
            ...updateCategoryInput,
          },
        });
      },
    });
  },
});

export const deleteCategory = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteCategory', {
      type: 'Category',
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.category.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
