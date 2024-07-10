import zod from 'zod';

export const storeSchema = zod.object({
  city: zod.string().min(1),
  country: zod.string().min(1),
  address: zod.string().min(1),
  postalCode: zod.string().min(1),
  phoneNumber: zod.string().min(1),
  googleMapsUrl: zod.string().url().min(1),
  email: zod.string().email().min(1),
});

export type StoreType = zod.infer<typeof storeSchema>;
