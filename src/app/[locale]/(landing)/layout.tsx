import '@/app/globals.css';
import { headers } from 'next/headers';

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const headerData = await headers();
  const acceptLanguage = headerData.get('accept-language');

  console.log('Accepted Language:', acceptLanguage);

  return (
    <main className="h-full bg-neutral-900 overflow-auto">
      <div className="mx-auto max-w-screen-xl pt-10 md:pt-10 h-full w-full">
        {children}
      </div>
    </main>
  );
};

export default LandingLayout;
