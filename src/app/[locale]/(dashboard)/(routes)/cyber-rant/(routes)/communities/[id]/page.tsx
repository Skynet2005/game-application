import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import UserCard from '@/components/cyber-rant/cards/UserCard';
import ThreadsTab from '@/components/cyber-rant/shared/ThreadsTab';
import CommunityProfileHeader from '@/components/cyber-rant/shared/CommunityProfileHeader';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { communityTabs } from '@/components/cyber-rant/constants/constants';

import { fetchCommunityDetails } from '@/components/cyber-rant/lib/actions/community.actions';
import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

async function CommunitiesIdPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await currentUser();
  if (!user) return null;

  const communityData = await fetchCommunityDetails(params.id);

  return (
    <section className="items-center justify-center">
      <CommunityProfileHeader
        accountId={communityData.id}
        authUserId={user.id}
        name={communityData.name}
        username={communityData.username}
        imgUrl={communityData.image}
        bio={communityData.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map(tab => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  priority
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityData.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityData._id}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityData.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="requests" className="w-full text-light-1">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityData._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default CommunitiesIdPage;
