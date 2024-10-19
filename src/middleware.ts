// src/middleware.ts

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Define the supported locales for the application
  locales: ["en", "fr", "de", "pt"],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(fr|en|de|pt)/:path*"],
};
