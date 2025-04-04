import NewsletterSubscriptionInput from '@/SendInBlue/dto/newsletter-subscription.input';
import SendInBlue from '@/SendInBlue';

export async function POST(request: Request) {
  try {
    const newsletterSubscriptionInput: NewsletterSubscriptionInput =
      await request.json();

    const subscription = await SendInBlue.subscribeToNewsletter(
      newsletterSubscriptionInput,
    );

    if (subscription.status === 204) {
      return Response.json({}, { status: 204 });
    }

    return Response.json(await subscription.json(), {
      status: subscription.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
