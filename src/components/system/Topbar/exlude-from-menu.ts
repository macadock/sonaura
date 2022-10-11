import { Categories } from '../../../gql/__generated__/categories';
import { Pages } from '../../../gql/__generated__/pages';

const pagesToExcludeFromMenu = [{ slug: 'occasion', name: 'Nos Occasions' }];

const moveCategoryToPage = (
  categories: Categories['categories'],
  pages: Pages['pages'],
): [Categories['categories'], Pages['pages']] => {
  const customPages: Pages['pages'] = [];
  const customCategories: Categories['categories'] = [];

  if (categories && pages) {
    customCategories.push(...categories);
    pagesToExcludeFromMenu.forEach((exclude) => {
      const category = categories.find((c) => c.slug === exclude.slug);
      if (category !== undefined) {
        customPages.push({
          id: category.id,
          name: category.slug,
          pageType: 'Page',
          title: exclude.name,
          url: `/${category.slug}`,
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
