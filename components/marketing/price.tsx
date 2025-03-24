import { clsx } from 'clsx';

export interface PriceProps {
  price: number;
  formatting?: (price: string) => string;
  className?: string;
}

const defaultFormatting = (price: string) => price;

export const Price = ({
  price,
  formatting = defaultFormatting,
  className,
}: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <p className={clsx('text-primary', className)}>
      {formatting(formattedPrice)}
    </p>
  );
};
