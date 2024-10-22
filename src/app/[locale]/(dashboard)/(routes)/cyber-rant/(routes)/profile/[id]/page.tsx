// src/app/(dashboard)/(routes)/cyber-rant/(routes)/profile/edit/page.tsx
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { profileTabs } from '@/components/cyber-rant/constants/constants';
import ThreadsTab from '@/components/cyber-rant/shared/ThreadsTab';
import ProfileHeader from '@/components/cyber-rant/shared/ProfileHeader';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

export default async function ProfileEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section className="whitespace-pre-wrap">
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map(tab => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab align-center justify-center text-center">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-fit"
                />
                <p className="max-sm:hidden text-neutral-950 dark:text-red-800 p-2">{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-md p-2 text-neutral-950 dark:text-red-800">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map(tab => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-neutral-950 dark:text-neutral-200"
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}


