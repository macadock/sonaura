import zod from 'zod';

export const PeopleSchema = zod.object({
  title: zod.string(),
  images: zod.array(
    zod.object({
      id: zod.string(),
      alt: zod.string(),
      url: zod.string(),
    }),
  ),
  subtitle: zod.string(),
});
