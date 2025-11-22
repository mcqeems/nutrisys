import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { loginSchema } from '@/lib/validation/auth';
import { getPresignedUrl } from '@/lib/actions/postUserImage';

// Helper to convert S3 key to presigned URL
async function getImageUrl(imageKey: string | null): Promise<string | null> {
  if (!imageKey) return null;
  // If it's already a full URL, return it
  if (imageKey.startsWith('http')) return imageKey;
  // Otherwise, generate presigned URL from S3 key
  try {
    return await getPresignedUrl(imageKey);
  } catch {
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Use JWT session strategy to support credentials sign-in
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!parsed.success) {
          // Invalid input
          return null;
        }
        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) return null;

        // Convert S3 key to presigned URL
        const imageUrl = await getImageUrl(user.image);

        // Return minimal user object with presigned URL
        return { id: user.id, name: user.name, email: user.email, image: imageUrl };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Pass user ID to JWT token on sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass user ID from JWT to session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
