import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "fr", "de", "pt"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/", "/en", "/:locale/sign-in"],
  // ignoredRoutes: ["/en"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/(de|en|fr|pt)/:path*/"],
};
