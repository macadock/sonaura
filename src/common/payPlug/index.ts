import axios, { AxiosRequestHeaders } from 'axios';
import { checkoutFormTypes } from '../../components/core/Cart/Checkout/checkout.validator';

export const apiUrl = process.env.NEXT_PUBLIC_PAYPLUG_API_URL;
export const apiKey = process.env.NEXT_PUBLIC_PAYPLUG_SECRET_KEY;

// const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

export default class PayPlug {
  static makePayment(amount: number, values: checkoutFormTypes) {
    const url = `${apiUrl}/payments`;
    const formatedAmount = amount * 100;
    const {
      fullName,
      email,
      address,
      city,
      postalCode,
      country,
      hasBillingAddress,
      billingAddress,
      billingCity,
      billingCountry,
      billingPostalCode,
    } = values;

    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${apiKey}`,
      'PayPlug-Version': '2019-08-06',
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      amount: formatedAmount,
      currency: 'EUR',
      billing: {
        first_name: fullName,
        last_name: fullName,
        email,
        // add mobile_phone_number E164 standard,
        address1: hasBillingAddress ? billingAddress : address,
        postcode: hasBillingAddress ? billingPostalCode : postalCode,
        city: hasBillingAddress ? billingCity : city,
        country: hasBillingAddress ? billingCountry.code : country.code,
        language: 'fr',
      },
      shipping: {
        first_name: fullName,
        last_name: fullName,
        email,
        // add mobile_phone_number E164 standard,
        address1: address,
        postcode: postalCode,
        city: city,
        country: country.code,
        language: 'fr',
        delivery_type: hasBillingAddress ? 'NEW' : 'BILLING',
      },
    });

    const payment = axios.post(url, body, headers);

    console.log(payment);
  }
}
