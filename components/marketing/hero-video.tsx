import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { Phone, ArrowRightIcon, Mail, MapPin } from 'lucide-react';
import { ReviewStars } from '@/components/marketing/ReviewStars';
import { Badge } from '@/components/ui/badge';

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
  tags: Array<string>;
}

const notes: {
  [key: string]: {
    note: number;
    googleMapsLink: string;
  };
} = {
  annecy: {
    note: 5,
    googleMapsLink: 'https://maps.app.goo.gl/dE4Apdcc3RsSXp2G7',
  },
  lyon: {
    note: 4.6,
    googleMapsLink: 'https://maps.app.goo.gl/DWtqKP368EehfFsv8',
  },
};

export const HeroVideo = async ({
  title,
  subtitle,
  button,
  video,
  tags = [],
}: HeroVideoProps) => {
  const supabaseClient = await createClient();

  const { data: shops } = await supabaseClient.from('shops').select('*');

  return (
    <div className={'relative w-full md:h-lvh flex'}>
      <div
        className={
          'h-full w-full bg-slate-200/70 z-1 flex flex-col md:items-center md:justify-center gap-8 p-6 lg:p-10'
        }
      >
        <div
          className={
            'w-full md:w-3/4 lg:w-2/3 mx-auto max-w-7xl flex flex-col gap-16'
          }
        >
          <div className={'flex flex-col gap-8'}>
            <div className={'flex flex-col gap-1'}>
              <h1 className={'text-3xl md:text-5xl font-medium leading-snug'}>
                {title}
              </h1>
              <div className={'flex gap-2 items-center flex-wrap'}>
                {tags.map((word) => (
                  <Badge
                    key={word}
                    variant={'secondary'}
                    className={'md:text-base'}
                  >
                    {word}
                  </Badge>
                ))}
              </div>
            </div>
            <h2 className={'text-lg md:text-2xl text-gray-700'}>{subtitle}</h2>
            <div className={'flex'}>
              <Button size={'lg'}>
                <Link href={button.href} className={'flex items-center gap-2'}>
                  {button.label}
                  <ArrowRightIcon className={'size-4'} />
                </Link>
              </Button>
            </div>
          </div>
          <Card className={'bg-white/50'}>
            <CardHeader>
              <CardTitle>Nos magasins</CardTitle>
            </CardHeader>
            <CardContent>
              {shops && (
                <div className={'grid md:grid-cols-2 gap-4 w-full'}>
                  {shops.map((shop) => (
                    <Card key={shop.id} className={'bg-white/50'}>
                      <CardHeader>
                        <CardTitle>
                          {shop.city && (
                            <a
                              href={
                                notes[shop.city.toLocaleLowerCase()]
                                  .googleMapsLink
                              }
                              target={'_blank'}
                              className={'flex justify-between'}
                            >
                              {shop.city}
                              <ReviewStars
                                note={notes[shop.city.toLocaleLowerCase()].note}
                                totalStars={5}
                                className={
                                  'size-4 text-primary data-[fill=true]:fill-primary'
                                }
                              />
                            </a>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={'text-sm'}>
                        <div className={'flex flex-col gap-2'}>
                          {shop.phoneNumber && (
                            <a
                              href={`tel:${shop.phoneNumber}`}
                              className={'flex gap-2 items-center'}
                            >
                              <Phone className={'size-3'} />
                              <span>{shop.phoneNumber}</span>
                            </a>
                          )}
                          {shop.email && (
                            <a
                              href={`mailto:${shop.email}`}
                              className={'flex gap-2 items-center'}
                            >
                              <Mail className={'size-3'} />
                              <span>{shop.email}</span>
                            </a>
                          )}
                          {shop.address && shop.postalCode && shop.city && (
                            <a
                              href={
                                notes[shop.city.toLocaleLowerCase()]
                                  .googleMapsLink
                              }
                              target={'_blank'}
                              className={'flex gap-2 items-center'}
                            >
                              <MapPin className={'size-3'} />
                              <span>{`${shop.address}, ${shop.postalCode} ${shop.city}`}</span>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant={'secondary'}>
                <Link href={'/contact'}>
                  <div className={'flex gap-2 items-center'}>
                    {'Voir la page contact'}
                    <ArrowRightIcon />
                  </div>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={video.poster}
        className={'absolute z-0 object-cover w-full h-full'}
      >
        <source src={video.url} type="video/mp4" />
      </video>
    </div>
  );
};
