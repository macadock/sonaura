import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userId = token.sub;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      session.user.role = user.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
