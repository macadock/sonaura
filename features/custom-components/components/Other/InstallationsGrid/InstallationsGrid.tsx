'use client';

import { PropsNameEnum } from '@/features/page-editor';

import { Installation } from '@/utils/data';
import './installations-grid.css';
import { createClient } from '@/lib/supabase/client';
import { getImageUrl } from '@/utils/image/get-image-url';
import isEmpty from 'lodash/isEmpty';

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
        if (!item.images) {
          return null;
        }
        const src = getImageUrl(item.images);

        return (
          <div key={item.id} className="rounded-lg shadow-lg">
            <img
              src={src}
              width={1080}
              height={1080}
              alt={item.title || ''}
              loading={index <= 6 ? 'eager' : 'lazy'}
            />
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
