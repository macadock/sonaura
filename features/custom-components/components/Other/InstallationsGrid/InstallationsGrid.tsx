'use client';

import { PropsNameEnum } from '@/features/page-editor';
import Image from 'next/image';

import { Installation } from '@/utils/data';
import { pick } from 'lodash';
import './installations-grid.css';
import { createClient } from '@/lib/supabase/client';

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

  const supabase = createClient();

  return (
    <div
      id="installations-container"
      className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl xl:m-auto"
    >
      {installations.map((item, index) => {
        const { bucket, file } = pick(item, ['bucket', 'file']) as {
          bucket: string;
          file: string;
        };
        const { data } = supabase.storage.from(bucket).getPublicUrl(file);

        return (
          <div key={item.id} className="rounded-lg shadow-lg">
            {isPreview ? (
              <img
                src={data.publicUrl}
                width={1080}
                height={1080}
                alt={item.title || ''}
                loading={index <= 6 ? 'eager' : 'lazy'}
              />
            ) : (
              <Image
                src={data.publicUrl}
                width={1080}
                height={1080}
                alt={item.title || ''}
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
