// src/app/(dashboard)/(routes)/cyber-rant/layout.tsx
import { Metadata } from 'next';
import { config } from 'dotenv';

import LeftSidebar from '@/components/cyber-rant/shared/LeftSidebar';
import Bottombar from '@/components/cyber-rant/shared/Bottombar';
import RightSidebar from '@/components/cyber-rant/shared/RightSidebar';

config();

export const metadata: Metadata = {
  title: 'Skynetic: CyberRants',
  description: 'Dive into the vortex of creativity as CyberRant fuses the prowess of artificial intelligence with the art of digital expression. Share, explore, and resonate in a universe crafted by algorithms and inspired by imagination.',
};
export default function CyberRantLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <main>
      <section className="flex flex-row flex-grow flex-shrink text-neutral-950 dark:text-neutral-300 bg-neutral-300 dark:bg-neutral-950">
        <LeftSidebar />
        <section className="flex flex-col w-full flex-1 px-2 pr-2 max-md:pb-32 sm:px-10 flex-grow flex-shrink">
          <div className="flex flex-col justify-start max-w-4xl pt-[120px] flex-grow flex-shrink">
            {children}
          </div>
        </section>
        {/* @ts-ignore */}
        <RightSidebar />
        <Bottombar />
      </section >
    </main>
  );
}
