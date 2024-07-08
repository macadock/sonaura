'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Home,
  Layers,
  Package,
  PackageCheck,
  Settings,
  Store,
  Tags,
  User,
  Users2,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '@/components/common/LogoutButton';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const items = {
  main: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Produits',
      href: '/dashboard/products',
      icon: Package,
    },
    {
      title: 'Réalisations',
      href: '/dashboard/installations',
      icon: PackageCheck,
    },
    {
      title: 'Catégories',
      href: '/dashboard/categories',
      icon: Tags,
    },
    {
      title: 'Magasins',
      href: '/dashboard/stores',
      icon: Store,
    },
    {
      title: 'Contacts',
      href: '/dashboard/contact',
      icon: Users2,
    },
    {
      title: 'Contenus',
      href: '/dashboard/contents',
      icon: Layers,
    },
  ],
  secondary: [
    {
      title: 'Paramètres',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ],
};

export const DashboardHeader = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {items.main.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                  {
                    'bg-accent text-accent-foreground': pathname === item.href,
                    'text-muted-foreground': pathname !== item.href,
                  },
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        {items.secondary.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                  {
                    'bg-accent text-accent-foreground': pathname === item.href,
                    'text-muted-foreground': pathname !== item.href,
                  },
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">User</span>
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
};
