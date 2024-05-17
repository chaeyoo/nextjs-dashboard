import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from './app/lib/server/prisma';
import { authOptions } from '@/app/lib/auth';
import { Mngr, User } from './app/lib/definitions';
async function getUser(mngrId: string): Promise<Mngr | undefined> {
  try {
    const existMngr = await prisma.sy_mngr.findFirst({
      where: {
        mngr_id: mngrId,
      },
    });
    const res = {
      email: existMngr?.email,
      mngr_nm: existMngr?.mngr_nm,
      mngr_no: String(existMngr?.mngr_no),
      mngr_pswd: existMngr?.mngr_pswd,
    } as Mngr;
    
    return res;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {  handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authOptions,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ mngrId: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { mngrId, password } = parsedCredentials.data;
          const user = await getUser(mngrId);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.mngr_pswd);
          if (passwordsMatch) {
            const mngr = {
              email: user.email,
              name: user.mngr_nm,
              mngrNo: String(user.mngr_no),
            } as User
            console.log(user, 'user')
            console.log(mngr, 'mngr')
            return mngr;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
 