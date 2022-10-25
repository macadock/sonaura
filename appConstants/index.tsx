export { PagesUrls, ApiUrls, getRoutePath } from './appConstants';
export { payplugApi, payplugKey } from './payplug';
export {
  merchantEmail,
  merchantName,
  sendInBlueKey,
  sendInBlueUrl,
} from './send-in-blue';

const TIME_TO_INVALIDATE_CACHE_SEC = 86400; // 1 day

export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;

export default TIME_TO_INVALIDATE_CACHE_SEC;