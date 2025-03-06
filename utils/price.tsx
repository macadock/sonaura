import { NumericFormat } from 'react-number-format';

interface Props {
  price: number;
}

const Price: React.FC<Props> = ({ price }) => {
  const emptyNumber = !(Boolean(price) || Boolean(price));

  if (emptyNumber) {
    return null;
  }

  return (
    <NumericFormat
      value={price}
      displayType="text"
      thousandSeparator=" "
      suffix=" €"
      decimalSeparator=","
    />
  );
};

export default Price;

export const getFormattedPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};
