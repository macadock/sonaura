'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={'default'}
      size={'lg'}
      disabled={pending}
      aria-disabled={pending}
    >
      Envoyer
    </Button>
  );
}
