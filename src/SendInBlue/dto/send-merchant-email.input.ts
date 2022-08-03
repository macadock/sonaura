export default class SendMerchantEmailInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  templateId: number;
  params?: {
    [key: string]: string;
  };
}
