import { GoogleTagManager } from '@next/third-parties/google';

export const Analytics = () => {
  const env = process.env.NODE_ENV;
  const isDev = env === 'development';
  const gtmId = process.env.GOOGLE_TAG_MANAGER_ID;

  if (isDev || !gtmId) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
};
