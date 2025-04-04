import SendCustomerEmailInput from '@/SendInBlue/dto/send-customer-email.input';
import SendInBlue from '@/SendInBlue';

export async function POST(request: Request) {
  try {
    const sendEmailInput: SendCustomerEmailInput = await request.json();

    const email = await SendInBlue.sendCustomerEmail(sendEmailInput);

    return Response.json(await email.json(), {
      status: email.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
