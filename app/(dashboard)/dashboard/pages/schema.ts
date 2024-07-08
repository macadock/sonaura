import zod from 'zod';

export const pageSchema = zod.object({
  id: zod.string().uuid().optional(),
  title: zod.string(),
  slug: zod.string(),
  content: zod.object({
    blocks: zod.array(
      zod.object({
        id: zod.string(),
        name: zod.string(),
        content: zod.object({}),
        order: zod.number().optional(),
      }),
    ),
    class: zod.string().optional(),
  }),
});

export type PageType = zod.infer<typeof pageSchema>;
