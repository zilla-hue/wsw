import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin"
  },
  pages: {
    signIn: '/admin/login',
  }
});

export const config = {
  matcher: ["/admin/:path*"]
};