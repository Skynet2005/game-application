// src/app/(dashboard)/(routes)/cyber-rant/(routes)/communities/edit/page.tsx
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import CommunityProfile from '@/components/cyber-rant/forms/CommunityProfile';

import { fetchCommunityDetails } from '@/components/cyber-rant/lib/actions/community.actions';

export default async function ProfileEditPage() {
  const user = await currentUser();
  if (!user) return null;

  const communityData = await fetchCommunityDetails(user.id);
  if (communityData?.onboarded) redirect('/dashboard');
  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-red-800">Edit Community</h1>
        <h2 className="text-gray-600 italic">Manage Your Community 🎨</h2>
        <div className="mt-4">
          <span className="inline-block bg-red-800 text-white py-1 px-3 rounded-full text-sm font-semibold">
            #BeYourself
          </span>
          <span className="inline-block bg-gray-600 text-white py-1 px-3 ml-2 rounded-full text-sm font-semibold">
            #CommunityOverhaul
          </span>
        </div>
        <p className="mt-3 text-[16px] leading-[140%] font-medium text-gray-500">
          Tweak, twist, or totally reinvent. <br />
          Your CyberRant <span className="underline font-bold">Community</span> is your canvas. 🖌️
        </p>
      </div>
      <section className="mt-12">
        <CommunityProfile community={communityData} btnTitle="Update" />
      </section>
    </>
  );
}
