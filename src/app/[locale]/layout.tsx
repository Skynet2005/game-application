import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
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
