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
  DASHBOARD_HOME = '/dashboard',
  DASHBOARD_CATEGORIES = '/dashboard/categories',
  DASHBOARD_SHOPS = '/dashboard/shops',
  DASHBOARD_PRODUCTS = '/dashboard/products',
}

export enum ApiUrls {
  MAKE_PAYMENT = '/api/payment/new',
  SUBSCRIBE_NEWSLETTER = '/api/newsletter/subscribe',
  SEND_CUSTOMER_EMAIL = '/api/email/customer',
  SEND_MERCHANT_EMAIL = '/api/email/merchant',
  GRAPHQL_ENDPOINT = '/api/graphql',
}

interface Props {
  page?: PagesUrls;
  api?: ApiUrls;
}

export function getRoutePath({ page, api }: Props): string {
  const websiteUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  if (api) {
    return `${websiteUrl}${api}`;
  }

  return `${websiteUrl}${page}`;
}
