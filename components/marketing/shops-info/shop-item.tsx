import { Shop } from '@/lib/supabase/shops';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cloneElement, createElement, ReactElement, ReactNode } from 'react';

export interface ShopItemProps {
  shop: Shop;
}

export const ShopItem = ({ shop }: ShopItemProps) => {
  const { city, phoneNumber, email, address, postalCode, googleMapsUrl } = shop;

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-2xl font-medium">{city}</p>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        <ShopAttributeItem
          label={'Téléphone'}
          value={phoneNumber}
          href={`tel:${phoneNumber?.replaceAll(' ', '')}`}
          icon={<Phone />}
        />
        <ShopAttributeItem
          label={'E-mail'}
          value={email}
          href={`mailto:${email}`}
          icon={<Mail />}
        />
        <ShopAttributeItem
          label={'Adresse'}
          value={`${address}, ${postalCode} ${city}`}
          icon={<MapPin />}
        />
      </div>
      <iframe
        style={{
          minHeight: '25rem',
        }}
        src={googleMapsUrl || ''}
        loading={'lazy'}
      />
    </div>
  );
};

const ShopAttributeItem = ({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: ReactNode;
  icon: ReactElement;
  href?: string;
}) => {
  const iconElement = cloneElement(icon, {
    className: 'size-4 text-primary',
  });

  const wrapper = createElement(
    href ? 'a' : 'div',
    {
      className: 'text-base flex items-center gap-2',
      ...(href && { href }),
    },
    iconElement,
    createElement('p', {}, value),
  );

  return (
    <div>
      <p className={'sr-only'}>{label}</p>
      {wrapper}
    </div>
  );
};
