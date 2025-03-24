import { clsx } from 'clsx';
import { ReactNode } from 'react';

export interface HeroImageProps {
  title: ReactNode;
  subtitle: ReactNode;
  image: {
    url: string;
  };
  fullHeight?: boolean;
}

export const HeroImage = ({
  title,
  subtitle,
  image,
  fullHeight,
}: HeroImageProps) => {
  return (
    <section
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className={clsx('bg-cover flex flex-col justify-stretch items-stretch', {
        'h-screen-without-header bg-fixed': fullHeight,
        'h-96 aspect-square md:aspect-video lg:aspect-auto': !fullHeight,
      })}
    >
      <div className="flex flex-col flex-grow justify-center items-center gap-6 h-full bg-white/50 text-center p-4">
        {title}
        {subtitle}
      </div>
    </section>
  );
};
