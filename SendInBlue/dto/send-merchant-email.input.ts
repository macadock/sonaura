import { Json } from 'types/supabase';

export default class SendMerchantEmailInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  templateId: number;
  params?: Json;
}
