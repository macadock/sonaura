import zod from 'zod';

export const FeaturedProductsSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string().optional(),
  description: zod.string().optional(),
});
