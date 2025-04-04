import CreatePaymentInput from '@/PayPlug/dto/create-payment.input';
import PayPlug from '@/PayPlug';
import SendCustomerEmailInput from '@/SendInBlue/dto/send-customer-email.input';
import SendInBlue from '@/SendInBlue';

export async function POST(request: Request) {
  try {
    const createPaymentInput: CreatePaymentInput = await request.json();

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
    const json = await payment.json();
    return Response.json(await payment.json(), {
      status: payment.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
