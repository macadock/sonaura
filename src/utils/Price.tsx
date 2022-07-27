import NumberFormat from 'react-number-format';

interface Props {
  priceWithCents?: number;
  formatedPrice?: number;
}

const Price: React.FC<Props> = ({ priceWithCents = 0, formatedPrice }) => {
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
