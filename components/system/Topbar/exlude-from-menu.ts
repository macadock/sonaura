const pagesToExcludeFromMenu = [{ slug: 'occasion', name: 'Nos Occasions' }];

const moveCategoryToPage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: any,
): any => {
  const customPages = [];
  const customCategories = [];

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
