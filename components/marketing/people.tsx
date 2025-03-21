import Image from 'next/image';

export interface PeopleProps {
  title: string;
  subtitle: string;
  image1: {
    url: string;
    alt: string;
  };
  image2: {
    url: string;
    alt: string;
  };
}

export const People = ({ title, subtitle, image1, image2 }: PeopleProps) => {
  return (
    <section className="mx-6 xl:mx-auto xl:w-full flex flex-col sm:flex-row rounded-lg overflow-hidden bg-primary text-white max-w-7xl xl:m-auto">
      {image1 && (
        <div className={'relative h-72 sm:w-1/3 sm:aspect-[2/1]'}>
          <Image
            src={image1.url}
            alt={image1.alt}
            loading="eager"
            className={'object-cover object-top'}
            fill
          />
        </div>
      )}
      <div className="flex flex-col gap-2 justify-center items-center sm:w-1/3 p-4 text-center">
        <h2 className="font-medium text-2xl md:text-3xl tracking-wider">
          {title}
        </h2>
        <p>{subtitle}</p>
      </div>
      {image2 && (
        <div className={'relative h-72 sm:w-1/3 sm:aspect-[2/1]'}>
          <Image
            src={image2.url}
            alt={image2.alt}
            loading="eager"
            className={'object-cover'}
            fill
          />
        </div>
      )}
    </section>
  );
};
