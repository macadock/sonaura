import { PeopleSchema } from '@/features/custom-components/components/Other/People/schema';
import Image from 'next/image';
import zod from 'zod';

export type PeopleProps = {
  content: zod.infer<typeof PeopleSchema>;
  isPreview?: boolean;
};

export const People = ({ content, isPreview = false }: PeopleProps) => {
  const parse = PeopleSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }
  const { title, subtitle, images } = content;
  const image1 = images[0];
  const image2 = images[1];
  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden bg-primary text-white xl:max-w-7xl xl:m-auto">
      {image1 && (
        <>
          {isPreview ? (
            <img
              src={image1.url}
              alt={image1.alt}
              className="md:w-1/3 object-cover"
            />
          ) : (
            <Image
              src={image1.url}
              alt={image1.alt}
              width={2048}
              height={1365}
              loading="eager"
              className="md:w-1/3 object-cover"
            />
          )}
        </>
      )}
      <div className="flex flex-col gap-2 justify-center items-center md:w-1/3 p-4 text-center">
        <h2 className="font-medium text-2xl md:text-3xl tracking-wider">
          {title}
        </h2>
        <p>{subtitle}</p>
      </div>
      {image2 && (
        <>
          {isPreview ? (
            <img
              src={image2.url}
              alt={image2.alt}
              className="md:w-1/3 object-cover"
            />
          ) : (
            <Image
              src={image2.url}
              alt={image2.alt}
              width={2048}
              height={1365}
              loading="eager"
              className="md:w-1/3 object-cover"
            />
          )}
        </>
      )}
    </div>
  );
};
