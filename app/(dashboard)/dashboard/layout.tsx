import { PrivateProviders } from '@/components/system/Providers';

import { Roles, getUser, getUserRole } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import { PropsWithChildren } from 'react';
import { DashboardHeader } from '@/components/dashboard/common';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Sonaura',
};

const allowedRoles: Roles[] = ['ADMIN', 'EDITOR'];

export default async function RootLayout({ children }: PropsWithChildren) {
  const { user } = await getUser();

  if (!user) {
    redirect(encodeURI('/login'));
  }

  const userRole = await getUserRole();

  if (userRole && !allowedRoles.includes(userRole)) {
    redirect(encodeURI('/'));
  }

  return (
    <PrivateProviders>
      <div className="flex h-svh w-full flex-col bg-muted/40 sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 flex h-full w-full">
          {children}
        </main>
      </div>
      <div className={'toaster'}>
        <Toaster richColors closeButton />
      </div>
    </PrivateProviders>
  );
}
