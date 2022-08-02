import { NextApiRequest, NextApiResponse } from 'next';
import SendInBlue from 'common/send-in-blue';
import NewsletterSubscriptionInput from 'common/send-in-blue/dto/newsletter-subscription.input';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      let newsletterSubscriptionInput: NewsletterSubscriptionInput;

      try {
        newsletterSubscriptionInput = JSON.parse(req.body);
      } catch (e) {
        newsletterSubscriptionInput = req.body;
      }

      const subscription = await SendInBlue.subscribeToNewsletter(
        newsletterSubscriptionInput,
      );

      res.status(subscription.status).json(await subscription.json());
    } catch (e) {
      res.status(500).json({});
    }
  } else {
    res.status(405);
  }
}
