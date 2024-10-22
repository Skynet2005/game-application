import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
// import { headers } from 'next/headers';

const intlMiddleware = createMiddleware({
  locales: ["en", "fr", "de", "pt"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: async (req) => {
    // Use headers as needed
    const acceptLanguage = req.headers.get('accept-language');
    console.log('Accepted Language:', acceptLanguage);
    return intlMiddleware(req);
  },
  publicRoutes: [
    "/",
    "/en",
    "/:locale/sign-in",
    "/api/webhook",
    "/api/webhook/clerk",
    "/api/og",
    "/api/uploadthing",
  ],
  ignoredRoutes: [
    "/landing",
    "/api/webhook/clerk",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/(de|en|fr|pt)/:path*/"],
};
