const apiUrl = process.env.NEXT_PUBLIC_PAYPLUG_API_URL;
const apiKey = process.env.NEXT_PUBLIC_PAYPLUG_SECRET_KEY;

export default class PayPlug {
  static makePayment() {
    apiUrl;
    apiKey;
  }
}
