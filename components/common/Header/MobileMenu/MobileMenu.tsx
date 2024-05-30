import { Item } from '@/components/common/Header';

import { MobileMenuItem } from '@/components/common/Header/MobileMenu/MobileMenuItem';
import './mobile-menu.css';

type MobileMenuProps = {
  items: Item[];
};

const MENU_ID = 'mobile-menu-toggle';

export const MobileMenu = ({ items }: MobileMenuProps) => {
  return (
    <>
      <label role="button" htmlFor={MENU_ID} className="px-1 py-2 lg:hidden">
        Menu
      </label>
      <input type="checkbox" id={MENU_ID} defaultChecked={false} hidden />

      <div className="mobile-menu-content">
        <nav className="flex flex-col gap-2 h-full lg:hidden">
          {items.map((item) => (
            <MobileMenuItem key={item.title} item={item} />
          ))}
        </nav>
      </div>
    </>
  );
};
