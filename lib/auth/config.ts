import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Firebase',
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
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          if (user) {
            // Get additional user data from Firestore if needed
            return {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              role: 'admin' // You might want to fetch this from Firestore
            };
          }

          return null;
        } catch (error) {
          console.error('Firebase auth error:', error);
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
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).uid = token.uid;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
}; 