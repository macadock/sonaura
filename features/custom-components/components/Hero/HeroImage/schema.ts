import zod from 'zod';

export const HeroImageSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string(),
  image: zod.object({
    alt: zod.string(),
    url: zod.string(),
  }),
  fullHeight: zod.boolean().optional()
});
