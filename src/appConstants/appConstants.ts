export enum PagesUrls {
  HOMEPAGE = '/',
  CATEGORY = '/[category]',
  PRODUCT = '/[category]/[product]',
  CONTACT = '/contact',
  LEGAL_NOTICE = '/mentions-legales',
  PRIVACY_POLICY = '/politique-de-confidentialite',
  CART = '/panier',
  CHECKOUT_PAGE = '/panier/commander',
  SUCCESS_PAYMENT_PAGE = '/panier/success/[orderId]',
  PROFESSIONALS = '/professionnels',
  INSTALLATIONS = '/realisations',
}

export enum ApiUrls {
  MAKE_PAYMENT = '/api/payment/new',
  SUBSCRIBE_NEWSLETTER = '/api/newsletter/subscribe',
  SEND_CUSTOMER_EMAIL = '/api/email/customer',
  SEND_MERCHANT_EMAIL = '/api/email/merchant',
}

interface Props {
  page?: PagesUrls;
  api?: ApiUrls;
}

export default function getRoutePath({ page, api }: Props): string {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  if (api) {
    return `${websiteUrl}${api}`;
  }

  return `${websiteUrl}${page}`;
}
