import zod from 'zod';
import { ContactPageFormSchema } from '@/features/custom-components';
import { ContactForm } from '@/features/custom-components/components/Form/ContactPageForm/form/ContactForm';

export type ContactFormProps = {
  content: zod.infer<typeof ContactPageFormSchema>;
}

export const ContactPageForm = ({ content }: ContactFormProps) => {
  const parse = ContactPageFormSchema.safeParse(content)

  if (!parse.success) {
    return null
  }

  const { title } = content

  return (
    <div className="flex flex-col gap-4 p-4 bg-background md:text-center lg:gap-12 lg:p-12">
      <h2 className="text-2xl font-medium lg:text-3xl">
        {title}
      </h2>
      <ContactForm />
    </div>
  );
};