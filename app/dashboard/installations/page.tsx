import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import InstallationTable from '@/components/dashboard/Installations/InstallationTable/InstallationTable';

export default function Dashboard() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
        </TabsList>
        <Link
          href={'/dashboard/installations/add'}
          className="ml-auto flex items-center gap-2"
        >
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Ajouter une réalisation
            </span>
          </Button>
        </Link>
      </div>
      <TabsContent value="all">
        <InstallationTable />
      </TabsContent>
    </Tabs>
  );
}
