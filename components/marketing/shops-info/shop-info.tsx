import { Shop } from '@/lib/supabase/shops';
import { ShopItem } from './shop-item';

export interface ShopInfoProps {
  shops: Array<Shop>;
}

export const ShopInfo = ({ shops }: ShopInfoProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {shops.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </section>
  );
};
