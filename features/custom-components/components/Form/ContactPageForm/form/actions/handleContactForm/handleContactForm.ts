'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const handleContactForm = async (formData: FormData) => {
  const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    postalCode: z.string().min(5),
    message: z.string().min(10),
  });

  const parse = schema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });

  if (!parse.success) {
    return parse.error.message;
  }

  const data = parse.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { firstName, lastName, email, message, phone, postalCode } = data;

  const { error } = await supabase.from('contacts').insert([
    {
      first_name: firstName,
      last_name: lastName,
      email,
      message,
      phone,
      postal_code: postalCode,
    },
  ]);

  if (error) {
    return error.message;
  }
  console.log('success');
};
