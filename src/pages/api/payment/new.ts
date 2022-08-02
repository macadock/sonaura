import { NextApiRequest, NextApiResponse } from 'next';
import PayPlug from 'common/payplug';
import CreatePaymentInput from 'common/payplug/dto/create-payment.input';

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

      res.status(payment.status).json(await payment.json());
    } catch (e) {
      res.status(500).json({});
    }
  } else {
    res.status(405);
  }
}
