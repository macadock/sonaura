import { Json } from 'types/supabase';

export default class SendMerchantEmailInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  templateId: number;
  params?: Json;
}
