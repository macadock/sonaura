import { NumericFormat } from 'react-number-format';

interface Props {
  price: number;
}

const Price = ({ price }: Props) => {
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
