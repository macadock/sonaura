import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';
import type { cookies } from 'next/headers';
import isEmpty from 'lodash/isEmpty';

export const getPage = async ({
  url,
  cookieStore,
}: {
  url: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);

  return supabase.from('pages').select('*').eq('slug', url).limit(1).single();
};

export const getPages = (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookieStore);
  return supabase.from('pages').select('*');
};

export type Page = Database['public']['Tables']['pages']['Row'];

export type Image = {
  url: string;
  alt: string;
};

export type Button = {
  label: string;
  href: string;
};

export type Video = {
  url: string;
  poster: string;
};

export type HomePageContent = {
  hero: {
    video: Video;
    title: string;
    subtitle: string;
    button: Button;
  };
  categories: {
    title: string;
    subtitle: string;
  };
  people: {
    title: string;
    subtitle: string;
    images: Image[];
  };
  advices: {
    title: string;
    subtitle: string;
    button: Button;
    image: Image;
  };
  new: {
    title: string;
    subtitle: string;
    description: string;
    id: string;
  };
  preOwned: {
    title: string;
    subtitle: string;
    description: string;
    id: string;
  };
};
