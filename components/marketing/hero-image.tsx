import { clsx } from 'clsx';

export interface HeroImageProps {
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
}

export const HeroImage = ({ title, subtitle, image }: HeroImageProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className={clsx(
        'bg-cover flex flex-col justify-stretch items-stretch aspect-square md:aspect-video lg:aspect-auto lg:h-96',
      )}
    >
      <div className="flex flex-col flex-grow justify-center items-center gap-6 h-full bg-white/50 text-center p-4">
        <h2 className="text-4xl md:text-6xl font-medium">{title}</h2>
        <p className="text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
};
