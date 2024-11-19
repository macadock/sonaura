import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CategoryTable } from '@/components/dashboard/Categories/CategoryTable/CategoryTable';

export default function InstallationDashboard() {
  return (
    <Card className={'flex flex-col overflow-hidden h-full w-full'}>
      <div className={'flex gap-2 items-center justify-between'}>
        <CardHeader>
          <CardTitle>Catégories</CardTitle>
          <CardDescription>
            Ajouter ou mettre à jour des catégories.
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <Link
            href={'/dashboard/categories/add'}
            className="ml-auto flex items-center gap-2"
          >
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter une catégorie
              </span>
            </Button>
          </Link>
        </CardHeader>
      </div>
      <CardContent className={'flex overflow-hidden'}>
        <CategoryTable />
      </CardContent>
    </Card>
  );
}
