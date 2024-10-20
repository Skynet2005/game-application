// src/app/[locale]/layout.tsx

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {getLocale, getMessages} from 'next-intl/server';
import { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "Game Application",
  description: "An innovative game application offering a suite of tools designed to enhance gameplay efficiency and enjoyment.",
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
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider appearance={{
        variables: { colorPrimary: '#002c6e' }
      }}>
        <html lang={locale} suppressHydrationWarning={true}>
          <body className="antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
