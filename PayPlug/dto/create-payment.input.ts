import { Product } from 'lib/supabase/products';

export default class CreatePaymentInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  amount: number;
  products: Product[];
}
