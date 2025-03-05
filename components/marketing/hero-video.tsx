import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface HeroVideoProps {
  title: string;
  subtitle: string;
  button: {
    label: string;
    href: string;
  };
  video: {
    url: string;
    poster: string;
  };
}

export const HeroVideo = ({
  title,
  subtitle,
  button,
  video,
}: HeroVideoProps) => {
  return (
    <div className="rounded-lg overflow-hidden relative xl:max-w-7xl xl:m-auto">
      <video
        autoPlay
        loop
        muted
        poster={video.poster}
        className="rounded-lg"
        width={'100%'}
      >
        <source src={video.url} type="video/mp4" />
      </video>
      <div className="right-0 top-0 bottom-0 md:bg-slate-100 md:bg-opacity-70 md:rounded-lg mt-4 md:m-4 md:w-1/2 md:absolute md:p-4 md:pl-10 md:text-right font-medium flex flex-col gap-4 xl:gap-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-primary leading-snug font-semibold tracking-wider">
          {title}
        </h1>
        <p className="text-md md:text-lg lg:text-xl font-light">{subtitle}</p>
        <div className="flex md:justify-end mt-8 md:mt-0">
          {button && (
            <Button size={'lg'}>
              <Link href={button.href}>{button.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
