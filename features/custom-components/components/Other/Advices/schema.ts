import zod from 'zod';

export const AdvicesSchema = zod.object({
  image: zod.object({
    alt: zod.string(),
    url: zod.string(),
  }),
  title: zod.string(),
  button: zod.object({
    href: zod.string(),
    label: zod.string(),
  }),
  subtitle: zod.string(),
});
