import { categories } from '@/app/(marketing)/mocks';
import { Card, CardContent } from '@/components/ui/card';
import { ListCategoriesSchema } from '@/features/custom-components/components/Categories/ListCategories/schema';
import { PropsNameEnum } from '@/features/page-editor';
import Link from 'next/link';
import zod from 'zod';

export type ListCategoriesProps = {
  content: zod.infer<typeof ListCategoriesSchema>;
  isPreview?: boolean;
  [PropsNameEnum.CATEGORIES]: typeof categories;
};

export const ListCategories = ({
  content,
  isPreview = false,
  categories,
}: ListCategoriesProps) => {
  const parse = ListCategoriesSchema.safeParse(content);

  if (!parse.success) {
    return null;
  }

  if (!categories) {
    return null;
  }
  const { subtitle, title } = content;
  return (
    <div className="flex flex-col gap-6 justify-center text-center md:px-9">
      <div className="flex flex-col gap-2">
        <p className="uppercase text-base">{title}</p>
        <h2 className="text-xl md:text-3xl font-semibold tracking-wider">
          {subtitle}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-flow-col md:auto-cols-fr gap-8 xl:max-w-5xl xl:m-auto">
        {categories.map((category) => (
          <Link key={category.id} href={`/${category.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
