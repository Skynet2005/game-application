// app/(dashboard)/layout.tsx
import { Metadata } from 'next';
import Quote from './components/quotes';
import { Montserrat } from 'next/font/google';
import { cn } from "@/lib/utils";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Skynetic',
  description: 'Shattering the usual, Skynetic creates a powerful synthesis of motion and abstract ideation under the infinite digital sky.',
};

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const Hero = () => (
  <div className={cn("flex flex-col w-full md:w-auto bg-neutral-500/75 dark:bg-neutral-900/75 rounded-full p-[20px]", poppins.className)}>
    <h2 className="lg:text-4xl md:text-2xl sm:text-xl xs:text-md font-bold text-sky-950 dark:text-neutral-100 text-center">
      Innovate with Skyneticstractions
    </h2>
    <div className="bg-transparent">
      <Quote />
    </div>
    <p className="text-neutral-100 dark:text-neutral-400 font-light text-sm md:text-lg text-center">
      Transcend the ordinary and step into the realm where motion and abstract thinking collide under the limitless digital sky.
    </p>
  </div>
);

const DashboardLayout = async ({ children, }: { children: React.ReactNode; }) => {
  const headerData = await headers();
  const acceptLanguage = headerData.get('accept-language');

  console.log('Accepted Language:', acceptLanguage);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen mt-[59px] pt-[120px] m-4 overflow-x-hidden">
      <Hero />
      <main className="flex flex-col items-center justify-center w-full md:w-fit h-full pt-[80px]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
