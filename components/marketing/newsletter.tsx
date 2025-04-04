'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ApiUrls, getRoutePath } from '@/appConstants';

const formSchema = z.object({
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide',
  }),
});

export const Newsletter = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;

    const url = getRoutePath({ api: ApiUrls.SUBSCRIBE_NEWSLETTER });

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    form.reset();
  }

  return (
    <section className="bg-primary w-full p-4 md:px-8 md:py-14 text-center flex flex-col justify-center items-center gap-6">
      <div className={'max-w-7xl mx-auto flex flex-col gap-4'}>
        <h2 className="text-xl md:text-3xl font-medium">
          Inscrivez-vous à la newsletter Sonaura
        </h2>
        <p className="text-base md:text-xl">Tenez-vous informé</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'w-full md:w-2/3 flex flex-col gap-2 m-auto'}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={'placeholder:text-gray-300 text-white'}
                      placeholder="Votre adresse email"
                      type={'email'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type={'submit'}
              variant={'ghost'}
              className={'cursor-pointer text-white'}
            >
              {"S'inscrire"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
