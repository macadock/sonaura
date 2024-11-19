'use client';

import { handleContactForm } from '@/features/custom-components/components/Form/ContactPageForm/form/actions/handleContactForm/handleContactForm';
import { SubmitButton } from '@/features/custom-components/components/Form/ContactPageForm/form/SubmitButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';

export const ContactForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await handleContactForm(formData);
        ref.current?.reset();
      }}
      className="flex flex-col gap-4 lg:w-1/2 lg:m-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="text" placeholder="Prénom" name="firstName" required />
        <Input type="text" placeholder="Nom" name="lastName" required />
        <Input type="email" placeholder="E-mail" name="email" required />
        <Input type="phone" placeholder="Téléphone" name="phone" />
        <Input
          type="text"
          placeholder="Code postal"
          name="postalCode"
          className="col-span-full"
        />
      </div>
      <Textarea rows={4} placeholder="Message" name="message" required />
      <SubmitButton />
    </form>
  );
};
