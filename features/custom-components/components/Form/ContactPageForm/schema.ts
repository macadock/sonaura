import zod from 'zod';

export const ContactPageFormSchema = zod.object({
  title: zod.string(),
})
