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
import { ReactNode } from 'react';

type Video = {
  baseUrl: string;
  poster: string;
};

export interface HeroVideoProps {
  title: ReactNode;
  subtitle: ReactNode;
  button: {
    label: string;
    href: string;
  };
  video: Video;
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
    <section className={'relative md:h-screen-without-header flex'}>
      <div
        className={
          'h-full w-full bg-slate-200/60 z-1 flex flex-col md:items-center md:justify-center gap-8 p-6 lg:p-10'
        }
      >
        <div className={'w-full max-w-7xl flex flex-col gap-16'}>
          <div className={'flex flex-col items-start gap-8'}>
            <div className={'flex flex-col gap-8'}>
              <div className={'flex gap-2 items-center flex-wrap w-full'}>
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
              <div className={'flex flex-col gap-2'}>
                {title}
                {subtitle}
              </div>
            </div>

            <Button size={'lg'} asChild>
              <Link href={button.href} className={'overflow-hidden'}>
                {button.label}
                <ArrowRightIcon className={'size-4'} />
              </Link>
            </Button>
          </div>
          <Card className={'bg-white/50'}>
            <CardHeader>
              <CardTitle>Nos magasins</CardTitle>
            </CardHeader>
            <CardContent>
              {shops && (
                <div
                  className={'grid md:grid-cols-2 gap-4 w-full overflow-hidden'}
                >
                  {shops.map((shop) => (
                    <Card
                      key={shop.id}
                      className={'bg-white/50 overflow-hidden'}
                    >
                      <CardHeader>
                        <CardTitle>
                          {shop.city && (
                            <a
                              href={
                                notes[shop.city.toLocaleLowerCase()]
                                  .googleMapsLink
                              }
                              target={'_blank'}
                              className={
                                'flex flex-col gap-2 sm:flex-row justify-between'
                              }
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
                        <div className={'flex flex-col gap-2 overflow-hidden'}>
                          {shop.phoneNumber && (
                            <a
                              href={`tel:${shop.phoneNumber}`}
                              className={
                                'flex gap-2 items-center overflow-hidden'
                              }
                              title={shop.phoneNumber}
                            >
                              <Phone className={'size-3'} />
                              <span className={'truncate'}>
                                {shop.phoneNumber}
                              </span>
                            </a>
                          )}
                          {shop.email && (
                            <a
                              href={`mailto:${shop.email}`}
                              className={
                                'flex gap-2 items-center overflow-hidden'
                              }
                              title={shop.email}
                            >
                              <Mail className={'size-3'} />
                              <span className={'truncate'}>{shop.email}</span>
                            </a>
                          )}
                          {shop.address && shop.postalCode && shop.city && (
                            <a
                              href={
                                notes[shop.city.toLocaleLowerCase()]
                                  .googleMapsLink
                              }
                              target={'_blank'}
                              title={`${shop.address}, ${shop.postalCode} ${shop.city}`}
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
              <Button size={'lg'} variant={'secondary'} asChild>
                <Link href={'/contact'}>
                  {'Voir la page contact'}
                  <ArrowRightIcon />
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
        <source
          src={`${video.baseUrl}_av1.mp4`}
          type="video/mp4; codecs=av01"
        />

        <source
          src={`${video.baseUrl}_h265_hvc1.mp4`}
          type="video/mp4; codecs=hvc1"
        />
        <source
          src={`${video.baseUrl}_h265_hev1.mp4`}
          type="video/mp4; codecs=hev1"
        />
        <source
          src={`${video.baseUrl}_vp9.webm`}
          type="video/webm; codecs=vp9"
        />
        <source
          src={`${video.baseUrl}_h264.mp4`}
          type="video/mp4; codecs=avc1"
        />
      </video>
    </section>
  );
};
