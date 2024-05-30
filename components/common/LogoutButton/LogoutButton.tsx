import { Button } from '@/components/ui/button';
import { handleSignOut } from '@/utils/auth';

export function LogoutButton() {
  return (
    <form action={handleSignOut}>
      <Button type="submit" variant={'outline'}>
        Déconnexion
      </Button>
    </form>
  );
}
