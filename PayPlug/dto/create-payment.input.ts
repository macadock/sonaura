import {
  checkoutFormTypes,
  Country,
} from 'components/core/Checkout/checkout.validator';

export default class CreatePaymentInput implements checkoutFormTypes {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  country: Country;
  city: string;
  postalCode: string;
  email: string;
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;
}
