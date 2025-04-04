import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div
      className={
        'flex flex-col gap-4 items-center justify-center p-8 md:p-12 text-center h-screen-without-header'
      }
    >
      <h1 className={'text-3xl'}>{'Commande validée'}</h1>
      <p className={'text-2xl'}>
        {'Sonaura vous remercie pour votre commande'}
      </p>
      <div>
        <p>
          {
            'Vous allez recevoir un email de confirmation récapitulant la commande.'
          }
        </p>
        <p>{"Vous serez informé de l'état d'avancement de la commande."}</p>
      </div>
      <Button asChild>
        <Link href={'/'} replace>
          {"Retour à la page d'accueil"}
        </Link>
      </Button>
    </div>
  );
}
