import { Json } from 'types/supabase';

export default class SendCustomerEmailInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone: string;
  templateId: {
    customer: number;
    merchant: number;
  };
  includeListIds?: number[];
  params?: Json;
}
