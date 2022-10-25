import NumberFormat from 'react-number-format';

interface Props {
  priceWithCents?: number;
  formatedPrice?: number;
}

const Price: React.FC<Props> = ({ priceWithCents, formatedPrice }) => {
  const emptyNumber = !(Boolean(priceWithCents) || Boolean(formatedPrice));

  if (emptyNumber) {
    return null;
  }

  return (
    <NumberFormat
      value={formatedPrice || priceWithCents / 100}
      displayType="text"
      thousandSeparator=" "
      suffix=" €"
      decimalSeparator=","
    />
  );
};

export default Price;
