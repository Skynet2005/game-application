import MobileNav from '@/components/old/shared/MobileNav'
import Sidebar from '@/components/old/shared/Sidebar'
import { Toaster } from '@/components/old/ui/toaster'
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="root">
        <Sidebar />
        <MobileNav />

        <div className="root-container">
          <div className="wrapper">
            {children}
          </div>
        </div>

        <Toaster />
      </main>
    </NextIntlClientProvider>
  )
}

export default Layout
