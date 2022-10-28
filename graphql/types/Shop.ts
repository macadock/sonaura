import {
  nonNull,
  objectType,
  stringArg,
  extendType,
  inputObjectType,
} from 'nexus';

export const Shop = objectType({
  name: 'Shop',
  definition(t) {
    t.string('id');
    t.string('city');
    t.string('country');
    t.string('address');
    t.string('postalCode');
    t.string('phoneNumber');
    t.string('image');
    t.string('googleMapsUrl');
    t.string('email');
    t.json('openHours');
  },
});

export const CreateShopInput = inputObjectType({
  name: 'CreateShopInput',
  definition: (t) => {
    t.nonNull.string('city');
    t.nonNull.string('country');
    t.nonNull.string('address');
    t.nonNull.string('postalCode');
    t.nonNull.string('phoneNumber');
    t.nonNull.string('image');
    t.nonNull.string('googleMapsUrl');
    t.nonNull.string('email');
    t.nullable.json('openHours');
  },
});

export const UpdateShopInput = inputObjectType({
  name: 'UpdateShopInput',
  definition: (t) => {
    t.nonNull.string('id');
    t.nonNull.string('city');
    t.nullable.string('country');
    t.nullable.string('address');
    t.nullable.string('postalCode');
    t.nullable.string('phoneNumber');
    t.nullable.string('image');
    t.nullable.string('googleMapsUrl');
    t.nullable.string('email');
    t.nullable.json('openHours');
  },
});

export const getAllShops = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('shops', {
      type: 'Shop',
      resolve: async (root, args, ctx) => {
        return ctx.prisma.shop.findMany();
      },
    });
  },
});

export const shopById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('shopById', {
      type: 'Shop',
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.shop.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const createShop = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createShop', {
      type: 'Shop',
      args: { createShopInput: nonNull(CreateShopInput) },
      resolve: async (root, { createShopInput }, ctx) => {
        return ctx.prisma.shop.create({
          data: {
            ...createShopInput,
          },
        });
      },
    });
  },
});

export const updateShop = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateShop', {
      type: 'Shop',
      args: { updateShopInput: nonNull(UpdateShopInput) },
      resolve: async (root, { updateShopInput }, ctx) => {
        return ctx.prisma.shop.update({
          where: {
            id: updateShopInput.id,
          },
          data: {
            ...updateShopInput,
          },
        });
      },
    });
  },
});

export const deleteShop = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteShop', {
      type: 'Shop',
      args: { id: nonNull(stringArg()) },
      resolve: async (root, { id }, ctx) => {
        return ctx.prisma.shop.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
