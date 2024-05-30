import { DesktopMenuItem } from '@/components/common/Header/DesktopMenu/DesktopMenuItem';
import { Item } from '@/components/common/Header/Header';

type DesktopMenuProps = {
  items: Item[];
  prefix?: string;
};

export const DesktopMenu = ({ items, prefix }: DesktopMenuProps) => {
  return (
    <nav className="grid-flow-col gap-2 hidden lg:grid">
      {items.map((item) => (
        <DesktopMenuItem key={item.title} item={item} prefix={prefix} />
      ))}
    </nav>
  );
};
