// i18n.ts

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "fr", "de", "pt"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./src/lang/${locale}.json`)).default,
  };
});
