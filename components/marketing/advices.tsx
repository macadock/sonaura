import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <div className=" bg-slate-200 -mx-4 md:-mx-8">
      <div className="flex flex-row gap-6 items-center p-4 mb-14 xl:max-w-7xl xl:m-auto">
        <div className="flex flex-col gap-4">
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

        <img
          src={image.url}
          alt={image.alt}
          width={2048}
          height={1365}
          className="hidden md:block w-1/2 object-cover -mt-20 -mb-36"
        />
      </div>
    </div>
  );
};
