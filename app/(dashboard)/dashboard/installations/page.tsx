import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InstallationTable } from '@/components/dashboard/Installations/InstallationTable/InstallationTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function InstallationDashboard() {
  return (
    <Card className={'flex flex-col overflow-hidden h-full w-full'}>
      <div className={'flex gap-2 items-center justify-between'}>
        <CardHeader>
          <CardTitle>Réalisations</CardTitle>
          <CardDescription>
            Ajouter ou mettre à jour des réalisations.
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <Link
            href={'/dashboard/installations/add'}
            className="ml-auto flex items-center gap-2"
          >
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter une réalisation
              </span>
            </Button>
          </Link>
        </CardHeader>
      </div>
      <CardContent className={'flex overflow-hidden'}>
        <InstallationTable />
      </CardContent>
    </Card>
  );
}
