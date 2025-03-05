type ItemCommon = {
  title: string;
  href: string;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
};

type PageItem = ItemCommon & {
  type: 'page';
};

type MenuItem = ItemCommon & {
  type: 'menu';
  subMenu: Item[];
};

export type Item = PageItem | MenuItem;
