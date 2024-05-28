import {
  checkoutFormTypes,
  Country,
} from '@/components/core/Checkout/checkout.validator';
import { Product } from '@/lib/supabase/products';

export default class CreatePaymentInput implements checkoutFormTypes {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  country: Country | null;
  city: string;
  postalCode: string;
  email: string;
  amount: number;
  products: Product[];
}
