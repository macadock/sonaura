import { Button } from '@/components/ui/button';
import { handleSignIn, handleSignUp, redirectUserToPage } from '@/utils/auth';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  await redirectUserToPage();

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
          required
        />
        <label className="text-md" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          autoComplete={'current-password'}
          required
        />
        <Button type="submit">Se connecter</Button>
        <Button formAction={handleSignUp} variant={'outline'}>
          S'inscrire
        </Button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
