import { clsx } from 'clsx';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleUserRound } from 'lucide-react';

export interface HeroTextProps {
  title: ReactNode;
  subtitle?: ReactNode;
  showContact?: boolean;
  fullHeight?: boolean;
}

export const HeroText = ({
  title,
  subtitle,
  showContact,
  fullHeight,
}: HeroTextProps) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center gap-6 px-6 py-12 text-center',
        {
          'h-screen-without-header': fullHeight,
        },
      )}
    >
      {title}
      {subtitle}
      {showContact && (
        <div className="flex flex-col items-center gap-4">
          <div className={'flex items-center gap-2'}>
            <CircleUserRound className={'size-4'} />
            <p className={'font-medium'}>Frank VILIN</p>
          </div>
          <div className={'flex flex-col sm:flex-row gap-0 sm:gap-4'}>
            <Button variant={'link'} size={'sm'} asChild>
              <Link href={'tel:+33689210978'}>06 89 21 09 78</Link>
            </Button>
            <Button variant={'link'} size={'sm'} asChild>
              <Link href={'mailto:frank@sonaura.fr'}>frank@sonaura.fr</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
