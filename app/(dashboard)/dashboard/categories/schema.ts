import zod from 'zod';

export const categorySchema = zod.object({
  name: zod.string().min(1),
  slug: zod.string().min(1),
  icon: zod.object({
    bucket: zod.string().min(1),
    file: zod.string().min(1),
  }),
});

export type CategoryType = zod.infer<typeof categorySchema>;
