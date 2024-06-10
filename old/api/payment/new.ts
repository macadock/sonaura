import { NextApiRequest, NextApiResponse } from 'next';
import PayPlug from '@/PayPlug';
import CreatePaymentInput from '@/PayPlug/dto/create-payment.input';
import SendInBlue from '@/SendInBlue';
import SendCustomerEmailInput from '../../../SendInBlue/dto/send-customer-email.input';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      let createPaymentInput: CreatePaymentInput;

      try {
        createPaymentInput = JSON.parse(req.body);
      } catch (e) {
        createPaymentInput = req.body;
      }

      const payment = await PayPlug.makePayment(createPaymentInput);

      const sendEmailInput: SendCustomerEmailInput = {
        firstName: createPaymentInput.firstName,
        lastName: createPaymentInput.lastName,
        email: createPaymentInput.email,
        message: '',
        phone: createPaymentInput.phoneNumber,
        templateId: {
          customer: 10,
          merchant: 11,
        },
        params: {
          products: createPaymentInput.products,
        },
      };

      await SendInBlue.sendCustomerEmail(sendEmailInput);

      res.status(payment.status).json(await payment.json());
    } catch (e) {
      res.status(500).json({});
    }
  } else {
    res.status(405);
  }
}
