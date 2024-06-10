export { PagesUrls, ApiUrls, getRoutePath } from './appConstants';
export { payplugApi, payplugKey } from './payplug';
export {
  merchantEmail,
  merchantName,
  sendInBlueKey,
  sendInBlueUrl,
} from './send-in-blue';

const TIME_TO_INVALIDATE_CACHE_SEC = 30;

export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;

export const websiteUrl =
  siteEnv === 'local'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;

export default TIME_TO_INVALIDATE_CACHE_SEC;
