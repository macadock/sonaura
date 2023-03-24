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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}
