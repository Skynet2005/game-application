// src/app/(dashboard)/(routes)/cyber-rant/(routes)/page.tsx
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import ThreadCard from '@/components/cyber-rant/cards/ThreadCard';
import Pagination from '@/components/cyber-rant/shared/Pagination';

import { Heading } from '@/components/ui/heading';

import { fetchPosts } from '@/components/cyber-rant/lib/actions/thread.actions';
import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

async function CyberRant(props: { searchParams: Promise<{ [key: string]: string | undefined }>; }) {
  const searchParams = await props.searchParams;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchPosts(searchParams.page ? +searchParams.page : 1, 30);

  return (
    <>
      <div className="flex flex-col h-full flex-1 max-md:pb-[90px] overflow-y-auto flex-grow flex-shrink">
        <div className="cyberrant-gradient border border-neutral-950 dark:border-2 dark:border-sky-950 rounded-xl pt-2">
          <Heading
            title="CyberRants"
            description="Your digital soapbox! Where bytes & pixels unleash their thoughts into the virtual void! Share your e-opinions, one rant at a time."
            icon={() => (
              <div className="bg-neutral-950/10 p-1 border rounded">
                <Image
                  src="/dashboard/cyberrants.png"
                  alt="Cyber Rants"
                  width={150}
                  height={150}
                />
              </div>
            )}
            titleClassName="text-neutral-950 dark:text-sky-700"
            descriptionClassName="text-sky-700 dark:text-neutral-400"
          />
        </div>
        <section className="mt-1 flex flex-col">
          {result.posts.length === 0 ? (
            <p className="no-result">No Rants found</p>
          ) : (
            <>
              {result.posts.map(post => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  heartpulseCount={post.heartpulseCount}
                  fireCount={post.fireCount}
                  thumbsDownCount={post.thumbsDownCount}
                  post={post._id.toString()}
                  name={post.author.name}
                  image={post.imageUrl}
                />
              ))}
            </>
          )}
        </section>

        <Pagination
          path="/"
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}

export default CyberRant;
