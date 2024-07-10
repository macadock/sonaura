import zod from 'zod';

export const installationSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
  images: zod.object({
    bucket: zod.string().min(1),
    file: zod.string().min(1),
  }),
});

export type InstallationType = zod.infer<typeof installationSchema>;
