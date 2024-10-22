import "./globals.css";
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';
import { Metadata } from "next";
import { headers } from 'next/headers';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { cn } from '@/lib/utils';

const font = Open_Sans({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'SkyneticStractions',
  description: 'Shattering the usual, SkyneticStractions creates a powerful synthesis of motion and abstract ideation under the infinite digital sky.',
  icons: {
    icon: [{ url: "/logo.png" }],
  }
};

// Root layout component
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Await dynamic APIs like headers() correctly in server-side logic
  const locale = await getLocale();
  const messages = await getMessages();

  // Await the headers API on the server side only
  const headerData = await headers();
  const acceptLanguage = headerData.get('accept-language');

  console.log('Accepted Language:', acceptLanguage);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider appearance={{
        variables: { colorPrimary: '#002c6e' }
      }}>
        <html lang={locale} suppressHydrationWarning={true}>
          {/* Server components (like headers) shouldn't affect the actual HTML rendering */}
          <body className={cn(font.className, "bg-neutral-300 dark:bg-neutral-800")}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="skynetic-theme"
            >
              <ToasterProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
