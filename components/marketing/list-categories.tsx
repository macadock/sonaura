import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export interface ListCategoriesProps {
  title: string;
  subtitle: string;
}

export const ListCategories = async ({
  title,
  subtitle,
}: ListCategoriesProps) => {
  const supabaseClient = await createClient();
  const { data: categories } = await supabaseClient
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (!categories) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 justify-center text-center md:px-9 px-6">
      <div className="flex flex-col gap-2">
        <p className="uppercase text-base">{title}</p>
        <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
          {subtitle}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-flow-col md:auto-cols-fr gap-8 xl:max-w-5xl xl:m-auto">
        {categories.map((category) => {
          const { bucket, file } = category.icon as {
            bucket: string;
            file: string;
          };

          const {
            data: { publicUrl },
          } = supabaseClient.storage.from(bucket).getPublicUrl(file, {
            transform: {
              quality: 75,
              width: 100,
              height: 100,
            },
          });

          return (
            <Link key={category.id} href={`/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6">
                  <Image
                    src={publicUrl}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                  <h3>{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
