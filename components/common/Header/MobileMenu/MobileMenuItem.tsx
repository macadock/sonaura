'use client';

import { Item } from '@/components/common/Header';
import { useSelectedLayoutSegment } from 'next/navigation';

type MobileMenuItemProps = {
  item: Item;
};

export const MobileMenuItem = ({ item }: MobileMenuItemProps) => {
  const { href, hideOnMobile } = item;
  const segment = useSelectedLayoutSegment();
  const url = href.replace(/\//, '');
  const isActive = url === segment;

  if (hideOnMobile) {
    return null;
  }

  if (item.type === 'menu') {
    return (
      <>
        {item.subMenu.map((subItem) => {
          const subMenuUrl = subItem.href.replace(/\//, '');
          const isActive = subMenuUrl === segment;
          return (
            <LinkItem key={subItem.title} item={subItem} isActive={isActive} />
          );
        })}
        <hr className="border-b-primary" />
      </>
    );
  }

  return <LinkItem item={item} isActive={isActive} />;
};

type LinkItemProps = {
  item: Item;
  isActive: boolean;
};

const LinkItem = ({ item, isActive = false }: LinkItemProps) => {
  const { title, href, hideOnMobile } = item;

  if (hideOnMobile) {
    return null;
  }

  return (
    <a
      key={title}
      className="p-2 text-base border-bottom border-transparent border-2  hover:border-b-primary aria-selected:border-b-primary transition-all"
      href={href}
      aria-selected={isActive}
    >
      {title}
    </a>
  );
};
