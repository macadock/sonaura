import { NextApiRequest, NextApiResponse } from 'next';
import SendInBlue from 'common/send-in-blue';
import SendMerchantEmailInput from '../../../common/send-in-blue/dto/send-merchant-email.input';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      let sendEmailInput: SendMerchantEmailInput;

      try {
        sendEmailInput = JSON.parse(req.body);
      } catch (e) {
        sendEmailInput = req.body;
      }

      const email = await SendInBlue.sendMerchantEmail(sendEmailInput);

      res.status(email.status).json(await email.json());
    } catch (e) {
      res.status(500).json({});
    }
  } else {
    res.status(405);
  }
}
