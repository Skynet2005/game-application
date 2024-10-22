// app/(dashboard)/(routes)/taskneticminder/layout.tsx
import { Metadata } from 'next';
import Image from 'next/image';

import { Heading } from '@/components/ui/heading';

export const metadata: Metadata = {
  title: 'TaskneticMinder',
  description: 'Unleashing the kinetic energy of productivity, TaskneticMinder is your dynamic conductor for orchestrating tasks. Its not just about getting things done; its about accelerating your workflow and transforming your lists into a symphony of success.',
};

export default function TaskneticMinderLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <main className="h-full p-4 pt-[100px] space-y-2">
      <Heading
        title="TaskneticMinder"
        description="Increase Production, Knock out your lists."
        icon={() => (
          <div className="bg-yellow-200/10 text-white p-1 border rounded-lg">
            <Image
              src="/dashboard/todolist.png"
              alt="TaskneticMinder"
              width={40}
              height={40}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}
      />
      <section className="md:pl-20 h-full">{children}</section>
    </main>
  );
}
