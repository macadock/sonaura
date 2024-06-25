import { PrivateProviders } from '@/components/system/Providers';

import { Roles, getUser, getUserRole } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PropsWithChildren } from 'react';
import { DashboardHeader } from '@/components/dashboard';

const allowedRoles: Roles[] = ['ADMIN', 'EDITOR'];

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookiesStore = cookies();
  const { user } = await getUser(cookiesStore);

  if (!user) {
    redirect(encodeURI('/login'));
  }

  const userRole = await getUserRole(cookiesStore);

  if (userRole && !allowedRoles.includes(userRole)) {
    redirect(encodeURI('/'));
  }

  return (
    <PrivateProviders>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </PrivateProviders>
  );
}
