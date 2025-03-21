import { createClient } from '@/lib/supabase/server';
import './installations-grid.css';

export const InstallationGrid = async () => {
  const supabaseClient = await createClient();
  const { data: installations } = await supabaseClient
    .from('installations')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div
      id={'installations-container'}
      className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl xl:m-auto"
    >
      {(installations || []).map((item, index) => {
        if (!item.images) {
          return null;
        }

        const { bucket, file } = item.images;

        const {
          data: { publicUrl },
        } = supabaseClient.storage.from(bucket).getPublicUrl(file, {
          transform: {
            quality: 75,
            width: 800,
            height: 800,
          },
        });

        return (
          <div key={item.id} className="rounded-lg shadow-lg">
            <img
              src={publicUrl}
              width={1080}
              height={1080}
              alt={item.title || ''}
              loading={index <= 3 ? 'eager' : 'lazy'}
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
