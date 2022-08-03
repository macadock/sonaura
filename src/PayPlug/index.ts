import { getRoutePath, PagesUrls, payplugApi, payplugKey } from 'appConstants';
import CreatePaymentInput from 'PayPlug/dto/create-payment.input';

export default class PayPlug {
  private static getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${payplugKey}`);
    headers.append('PayPlug-Version', '2019-08-06');

    return headers;
  }

  public static makePayment(
    createPaymentInput: CreatePaymentInput,
  ): Promise<Response> {
    const url = `${payplugApi}/payments`;
    const cancelUrl = getRoutePath({ page: PagesUrls.CHECKOUT_PAGE });
    const returnUrl = getRoutePath({ page: PagesUrls.SUCCESS_PAYMENT_PAGE });

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      country,
      amount,
    } = createPaymentInput;

    const formattedAmount = amount * 100;

    const addressInput = {
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_phone_number: phoneNumber,
      address1: address,
      postcode: postalCode,
      city: city,
      country: country.code,
      language: 'fr',
    };

    const body = JSON.stringify({
      amount: formattedAmount,
      currency: 'EUR',
      billing: {
        ...addressInput,
      },
      shipping: {
        ...addressInput,
        delivery_type: 'SHIP_TO_STORE',
      },
      hosted_payment: {
        cancel_url: cancelUrl,
        return_url: returnUrl,
      },
    });

    return fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      mode: 'no-cors',
      body,
    });
  }
}
