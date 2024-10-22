// src/app/dashboard/(routes)/cyber-rant/(routes)/communities/(routes)/community-onboarding/page.tsx
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Satisfy, Abril_Fatface } from 'next/font/google';
import cn from 'clsx';

import CommunityProfile from '@/components/cyber-rant/forms/CommunityProfile';
import { ModeToggle } from "@/components/old/ui/mode-toggle";
import { fetchCommunityDetails } from '@/components/cyber-rant/lib/actions/community.actions';

export interface CommunityData {
  id: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const font = Satisfy({ weight: '400', subsets: ['latin'] });
const font2 = Abril_Fatface({ weight: '400', subsets: ['latin'] });

async function CommunityOnboardingPage() {
  const user = await currentUser();
  console.log('USER: ', user)
  if (!user) return null;

  const communityData = await fetchCommunityDetails(user.id);
  console.log('COMMUNITY DATA: ', communityData)
  if (communityData?.onboarded) redirect('/dashboard');

  return (
    <main className="sky-gradient main-container h-full custom-scrollbar border-2 border-neutral-950 dark:border-red-800 mx-auto flex max-w-3xl flex-col justify-start px-[10px] py-[50px] rounded-xl">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <h1 className={cn("font-bold text-3xl text-center text-neutral-950 dark:text-red-800", font2.className)}>
        Community Onboarding
      </h1>
      <p className={cn("mt-3 font-semibold text-center text-red-800 dark:text-neutral-400", font.className)}>
        Complete your community profile!
      </p>

      <section className="p-5">
        <CommunityProfile community={communityData} btnTitle="create" />
      </section>
    </main>
  );
}

export default CommunityOnboardingPage;
