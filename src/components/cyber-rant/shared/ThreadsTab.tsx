import { redirect } from 'next/navigation';
import { fetchCommunityPosts } from '@/components/cyber-rant/lib/actions/community.actions';
import { fetchUserPosts } from '@/components/cyber-rant/lib/actions/user.actions';
import ThreadCard from '../cards/ThreadCard';

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: { name: string; image: string; id: string };
    community: { id: string; name: string; image: string } | null;
    createdAt: string;
    children: { author: { image: string } }[];
    heartpulseCount?: number;
    fireCount?: number;
    thumbsDownCount?: number;
    post?: string;
    name?: string;
    image?: string;
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;
  if (accountType === 'Community') { result = await fetchCommunityPosts(accountId); } else { result = await fetchUserPosts(accountId); }
  if (!result) { redirect('/cyber-rant/'); }

  return (
    <section className="mt-9 flex flex-col gap-5">
      {result.threads.map(thread => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User' ?
              { name: result.name, image: result.image, id: result.id } :
              { name: thread.author.name, image: thread.author.image, id: thread.author.id }
          }
          community={
            accountType === 'Community' ?
              { name: result.name, id: result.id, image: result.image } :
              thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          heartpulseCount={thread.heartpulseCount || 0}
          fireCount={thread.fireCount || 0}
          thumbsDownCount={thread.thumbsDownCount || 0}
          post={thread._id}
          name={thread.author.name}
          image={thread.image || ''}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
