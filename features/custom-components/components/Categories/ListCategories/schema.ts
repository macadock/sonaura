import zod from 'zod';

export const ListCategoriesSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string(),
});
