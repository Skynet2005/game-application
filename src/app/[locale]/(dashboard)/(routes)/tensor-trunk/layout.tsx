// src/app/(dashboard)/(routes)/tensor-trunk/layout.tsx
import type { Metadata } from 'next';
import { SideMenu } from '@/app/[locale]/(dashboard)/(routes)/tensor-trunk/components/sidemenu';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tensor Trunk',
  description: 'Personal Storage for Generated Material',
};

export default function TensorTrunkLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <main className="h-full relative">
      <div className="p-2 pt-20">
        <Heading
          title="Tensor-Trunk"
          description="Store your generated Stuff!"
          icon={() => (
            <div className="bg-cyan-700/10 text-white p-1 border rounded-xl">
              <Image
                src="/dashboard/tensortrunk.png"
                alt="Tensor-Trunk"
                width={40}
                height={40}
                sizes="(max-width: 768px) 100vw, 48rem"
              />
            </div>
          )}
        />
      </div>
      <div className="flex flex-row justify-between p-2">
        <div className="">
          <SideMenu />
        </div>
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
}
