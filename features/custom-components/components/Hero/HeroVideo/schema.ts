import zod from 'zod';

export const HeroVideoSchema = zod.object({
  title: zod.string(),
  subtitle: zod.string(),
  video: zod.object({
    url: zod.string(),
    poster: zod.string(),
  }),
  button: zod.object({
    label: zod.string(),
    href: zod.string(),
  }),
});
