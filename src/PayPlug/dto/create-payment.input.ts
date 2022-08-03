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
}
