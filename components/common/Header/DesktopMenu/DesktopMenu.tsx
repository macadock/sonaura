import { DesktopMenuItem } from '@/components/common/Header/DesktopMenu/DesktopMenuItem';
import { Item } from '@/components/common/Header/Header';
import { Cart } from '@/components/common/Header/Cart';

type DesktopMenuProps = {
  items: Item[];
  prefix?: string;
};

export const DesktopMenu = ({ items, prefix }: DesktopMenuProps) => {
  return (
    <nav className="grid-flow-col gap-2 hidden lg:grid items-center">
      {items.map((item) => (
        <DesktopMenuItem key={item.title} item={item} prefix={prefix} />
      ))}
      <Cart />
    </nav>
  );
};
