import { Button } from '@/components/ui/button';
import { AdvicesSchema } from '@/features/custom-components/components/Other/Advices/schema';
import Image from 'next/image';
import Link from 'next/link';
import zod from 'zod';

export type AdvicesProps = {
  content: zod.infer<typeof AdvicesSchema>;
  isPreview?: boolean;
};

export const Advices = ({ content, isPreview = false }: AdvicesProps) => {
  const parse = AdvicesSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }
  const { title, subtitle, button, image } = content;
  return (
    <div className=" bg-slate-200 -mx-4 md:-mx-8">
      <div className="flex flex-row gap-6 items-center p-4 mb-14 xl:max-w-7xl xl:m-auto">
        <div className="flex flex-col gap-4">
          <p className="text-2xl md:text-3xl font-semibold tracking-wider">
            {title}
          </p>
          <p className="text-lg font-light">{subtitle}</p>
          <div className="flex">
            {button && (
              <Button size={'lg'}>
                <Link href={button.href}>{button.label}</Link>
              </Button>
            )}
          </div>
        </div>

        {isPreview ? (
          <img
            src={image.url}
            alt={image.alt}
            className="hidden md:block w-1/2 object-cover -mt-20 -mb-36"
          />
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            width={2048}
            height={1365}
            className="hidden md:block w-1/2 object-cover -mt-20 -mb-36"
          />
        )}
      </div>
    </div>
  );
};
