import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Move authOptions to a separate config file
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "admin@wsw.org"
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "••••••••"
        }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const result = loginSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (!result.success) {
            return null;
          }

          // Demo credentials for development
          if (
            credentials.email === "admin@wsw.org" &&
            credentials.password === "admin123"
          ) {
            return {
              id: "1",
              name: "Admin User",
              email: credentials.email,
              role: "admin"
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
};

// Create and export the route handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };