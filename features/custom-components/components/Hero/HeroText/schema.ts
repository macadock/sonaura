import zod from 'zod';

export const HeroTextSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string().optional(),
  fullHeight: zod.boolean().optional(),
  showContact: zod.boolean().optional(),
})
