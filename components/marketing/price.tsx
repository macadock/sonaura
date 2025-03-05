export interface PriceProps {
  price: number;
  formatting?: (price: string) => string;
}

const defaultFormatting = (price: string) => price;

export const Price = ({
  price,
  formatting = defaultFormatting,
}: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return <p className="text-primary">{formatting(formattedPrice)}</p>;
};
