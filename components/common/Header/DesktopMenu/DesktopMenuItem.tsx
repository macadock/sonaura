'use client';

import { Item } from '@/components/common/Header';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';

type DesktopMenuItemProps = {
  item: Item;
  prefix?: string;
};

export const DesktopMenuItem = ({ item, prefix }: DesktopMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const { title, href, hideOnDesktop } = item;
  const segment = useSelectedLayoutSegment();
  const url = href.replace(/\//, '');
  const isActive = url === `${prefix || ''}${segment}`;

  if (hideOnDesktop) {
    return null;
  }

  if (item.type === 'menu') {
    return (
      <div
        className="relative"
        key={title}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <button
          className="p-2 text-base border-bottom border-transparent border-2  hover:border-b-primary aria-selected:border-b-primary transition-all"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <div className="flex gap-2">
            <p>{title}</p>
            {open ? (
              <ChevronUpIcon strokeWidth={'0,0625rem'} />
            ) : (
              <ChevronDownIcon strokeWidth={'0,0625rem'} />
            )}
          </div>
        </button>
        {open && (
          <div className="absolute top-full left-0 bg-background rounded-lg shadow-lg">
            {item.subMenu.map((subItem) => {
              const subMenuUrl = subItem.href.replace(/\//, '');
              const isActive = subMenuUrl === segment;

              if (subItem.hideOnDesktop) {
                return null;
              }

              return (
                <Link
                  key={subItem.title}
                  href={subItem.href}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="whitespace-nowrap block p-2 text-base border-bottom border-transparent border-2 hover:border-b-primary aria-selected:border-b-primary transition-all"
                  aria-selected={isActive}
                >
                  <p>{subItem.title}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      key={title}
      className="p-2 text-base border-bottom border-transparent border-2  hover:border-b-primary aria-selected:border-b-primary transition-all"
      href={href}
      aria-selected={isActive}
    >
      <p>{title}</p>
    </Link>
  );
};
