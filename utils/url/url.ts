export const getUrl = () => {
  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;

  if (!vercelUrl) {
    return new URL('http://localhost:3000');
  }

  return new URL(`https://${vercelUrl}`);
};
