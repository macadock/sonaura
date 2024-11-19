import { Button } from '@/components/ui/button';
import { handleSignIn, redirectUserToPage } from '@/utils/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion | Sonaura',
};

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ message: string; email_sent?: string }>;
}) {
  await redirectUserToPage();

  const { message, email_sent } = await searchParams;

  return (
    <div className="flex flex-col w-full p-8 max-w-md justify-center gap-2 m-auto">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={handleSignIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          autoComplete={'email'}
          type={'email'}
          required
        />

        <Button type="submit" disabled={!!email_sent}>
          Demander lien de connexion
        </Button>

        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
