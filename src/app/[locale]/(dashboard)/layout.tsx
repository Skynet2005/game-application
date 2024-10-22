// app/(dashboard)/layout.tsx
import { Metadata } from "next";
import { headers } from 'next/headers';

import Navbar from "@/components/dashboard/navbar";

export const metadata: Metadata = {
  title: 'Skynetic',
  description: 'Shattering the usual, Skynetic creates a powerful synthesis of motion and abstract ideation under the infinite digital sky.',
}

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {
  const headerData = await headers();
  const acceptLanguage = headerData.get('accept-language');

  console.log('Accepted Language:', acceptLanguage);

  return (
    <main className="flex flex-col items-stretch justify-start h-screen overflow-y-scroll" style={{ zIndex: 0 }}>
      <Navbar />
      <section className="flex flex-col items-stretch justify-start h-full w-full">
        {children}
      </section>
    </main>
  );
}
