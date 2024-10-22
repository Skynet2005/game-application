// src/app/(dashboard)/(routes)/cyber-rant/(routes)/cyberrant/[id]/page.tsx
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import Error from '@/app/[locale]/error';

import Comment from '@/components/cyber-rant/forms/Comment';
import ThreadCard from '@/components/cyber-rant/cards/ThreadCard';

import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';
import { fetchThreadById } from '@/components/cyber-rant/lib/actions/thread.actions';

// Utility function to convert MongoDB objects to plain objects
function toPlainObject(obj: any) { return obj && obj.toObject ? obj.toObject() : obj; }

export const revalidate = 0;

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const thread = await fetchThreadById(params.id);
    if (!thread) { console.error("Thread is undefined"); return <Error />; }

    const threadPlainObj = toPlainObject(thread);
    const serializedChildren = thread.children.map(toPlainObject);
    const authorPlainObj = toPlainObject(threadPlainObj.author);
    const communityPlainObj = toPlainObject(threadPlainObj.community);

    return (
      <section className="relative">
        <div>
          <ThreadCard
            id={threadPlainObj._id.toString()}
            currentUserId={user.id}
            parentId={threadPlainObj.parentId}
            content={threadPlainObj.text}
            author={authorPlainObj}
            community={communityPlainObj}
            createdAt={threadPlainObj.createdAt}
            comments={serializedChildren}
            heartpulseCount={threadPlainObj.threadId}
            fireCount={threadPlainObj.threadId}
            thumbsDownCount={threadPlainObj.threadId}
            post={threadPlainObj._id.toString()}
            name={authorPlainObj.name}
            image={threadPlainObj.imageId}
          />
        </div>

        <div className="mt-7">
          <Comment
            threadId={params.id}
            currentUserImg={user.imageUrl}
            currentUserId={JSON.stringify(userInfo._id)}
          />
        </div>

        <div className="mt-10">
          {serializedChildren.map((childItem: any) => (
            <ThreadCard
              key={childItem._id}
              id={childItem._id}
              currentUserId={user.id}
              parentId={childItem.parentId}
              content={childItem.text}
              author={childItem.author}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
              heartpulseCount={childItem.threadId}
              fireCount={childItem.threadId}
              thumbsDownCount={childItem.threadId}
              post={childItem._id.toString()}
              name={childItem.author.name}
              image={childItem.imageId}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('An error occurred:', error);
    return <Error />;
  }
}

