import { HeroImageSchema } from '@/features/custom-components/components/Hero';
import zod from 'zod';
import { clsx } from 'clsx';

export type HeroImageProps = {
  content: zod.infer<typeof HeroImageSchema>;
  isPreview?: boolean;
};

export const HeroImage = ({ content }: HeroImageProps) => {
  const parse = HeroImageSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }

  const { title, subtitle, image, fullHeight = false } = content;

  return (
    <div
      style={{
        backgroundImage: `url(${image.url})`,
      }}
      className={clsx(
        'bg-cover flex flex-col justify-stretch items-stretch max-h-fullPageWithoutHeader',
        {
          'h-fullPageWithoutHeader bg-fixed': fullHeight,
          'h-halfPageWithoutHeader bg-center': !fullHeight,
        },
      )}
    >
      <div className="flex flex-col flex-grow justify-center items-center gap-6 h-full bg-white bg-opacity-20 text-white text-center p-4">
        <h2 className="text-3xl md:text-6xl font-medium uppercase">{title}</h2>
        <p className="text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
};
