'use server';
import { PropsNameEnum } from '@/features/page-editor';
import { installations } from '@/app/(marketing)/mocks';
import Image from 'next/image';

import './installations-grid.css';
import { Installation } from '@/utils/data';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { BUCKET_NAME } from '@/features/config';

export type InstallationsGridProps = {
  [PropsNameEnum.INSTALLATIONS]: Array<Installation>;
  isPreview?: boolean;
};

export const InstallationsGrid = ({
  installations,
  isPreview,
}: InstallationsGridProps) => {
  if (!installations) {
    return null;
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <div
      id="installations-container"
      className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl xl:m-auto"
    >
      {installations.map((item, index) => {
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(item.image as string);

        console.log(data);

        return (
          <div key={item.id} className="rounded-lg shadow-lg">
            {isPreview ? (
              <img
                src={data.publicUrl}
                width={1080}
                height={1080}
                alt={item.title}
                loading={index <= 6 ? 'eager' : 'lazy'}
              />
            ) : (
              <Image
                src={data.publicUrl}
                width={1080}
                height={1080}
                alt={item.title}
                loading={index <= 6 ? 'eager' : 'lazy'}
              />
            )}
            <div className="installations-content bg-white p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-base">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
