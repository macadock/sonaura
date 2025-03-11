import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export interface AdvicesProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
    alt: string;
  };
  button?: {
    label: string;
    href: string;
  };
}

export const Advices = ({ title, subtitle, image, button }: AdvicesProps) => {
  return (
    <div className=" bg-slate-200">
      <div className="flex flex-row gap-6 items-center px-6 my-8 md:my-0 xl:max-w-7xl xl:m-auto">
        <div className="flex flex-1 flex-col gap-4 items-stretch justify-stretch">
          <p className="text-2xl md:text-3xl font-semibold tracking-wider">
            {title}
          </p>
          <p className="text-lg font-light">{subtitle}</p>
          {button && (
            <div className="flex">
              <Button size={'lg'}>
                <Link href={button.href}>{button.label}</Link>
              </Button>
            </div>
          )}
        </div>

        <div
          className={
            'flex-1 hidden md:block w-1/2 lg:w-1/3 h-full relative aspect-square'
          }
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className={'object-scale-down'}
          />
        </div>
      </div>
    </div>
  );
};
