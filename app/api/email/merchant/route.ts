import SendMerchantEmailInput from '@/SendInBlue/dto/send-merchant-email.input';
import SendInBlue from '@/SendInBlue';

export async function POST(request: Request) {
  try {
    const sendEmailInput: SendMerchantEmailInput = await request.json();

    const email = await SendInBlue.sendMerchantEmail(sendEmailInput);

    return Response.json(await email.json(), {
      status: email.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
