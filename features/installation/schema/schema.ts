import zod from 'zod';

export type InstallationFormType = zod.infer<typeof InstallationFormSchema>;
export const InstallationFormSchema = zod.object({
  id: zod.string().optional(),
  title: zod.string().min(2),
  description: zod.string().min(2),
  image: zod.instanceof(File, {
    message: 'Required',
  }),
});
