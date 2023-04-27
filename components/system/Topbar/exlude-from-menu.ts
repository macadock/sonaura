import { DataContextValue } from 'contexts/data';
import { NavLink } from 'types';

const pagesToExcludeFromMenu = [{ slug: 'occasion', name: 'Nos Occasions' }];

type Categories = DataContextValue['categories'];
type Pages = DataContextValue['pages'];

const moveCategoryToPage = (
  categories: Categories,
  pages: Pages,
): [Categories, Pages] => {
  const customPages: NavLink[] = [];
  const customCategories: Categories = [];

  if (categories && pages) {
    customCategories.push(...categories);
    pagesToExcludeFromMenu.forEach((exclude) => {
      const category = categories.find((c) => c.slug === exclude.slug);
      if (category !== undefined) {
        customPages.push({
          name: category.name,
          slug: `/${category.slug}`,
        });

        const index = customCategories.findIndex(
          (c) => c.slug === exclude.slug,
        );

        if (index !== -1) {
          customCategories.splice(index, 1);
        }
      }
    });

    customPages.push(...pages);
  }

  return [customCategories, customPages];
};

export default moveCategoryToPage;
