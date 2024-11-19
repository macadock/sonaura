import { handleSignOut } from '@/utils/auth';

export function LogoutButton() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Déconnexion</button>
    </form>
  );
}
