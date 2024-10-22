// src/components/cyber-rant/cards/ThreadCard.tsx
import Image from 'next/image';
import Link from 'next/link';

import { formatDateString } from '@/lib/utils';
import DeleteThread from '../forms/DeleteThread';
import Controls from '@/components/cyber-rant/cards/ControlsCard';
import Repost from '../controls/repost';
// import ShareButton from '../controls/share';

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: { name: string; image: string; id: string };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: { author: { image: string } }[];
  isComment?: boolean;
  heartpulseCount: number;
  fireCount: number;
  thumbsDownCount: number;
  post: string;
  name: string;
  image: string;
}

function ThreadCard(props: Props) {
  const { id, currentUserId, parentId, content, author, community, createdAt, comments, isComment, heartpulseCount, fireCount, thumbsDownCount, image } = props;

  return (
    <article className={`lightgray-gradient border-2 border-neutral-950 dark:border-none flex w-full flex-col my-2 rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
      <div className="flex items-start pt-2 justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/cyber-rant/profile/${author.id}`}>
              <Image
                src={author.image}
                alt="user_community_image"
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="relative mt-2 w-0.5 grow rounded-full bg-sky-800 dark:bg-red-950" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/cyber-rant/profile/${author.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-sky-700">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-neutral-950 dark:text-neutral-300">{content}</p>
            {image && (
              <div className="mt-2 flex justify-center pr-[50px]">
                <Link href={image} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={image}
                    alt="Rant Image"
                    width={200}
                    height={200}
                    className="rounded-xl cursor-pointer"
                  />
                </Link>
              </div>
            )}
            <div className="mt-5 flex flex-row gap-3">
              <Controls
                threadId={id}
                fireCount={fireCount}
                heartpulseCount={heartpulseCount}
                thumbsDownCount={thumbsDownCount}
                userId={currentUserId}
                initialCount={[]}
              />
              <Link href={`/cyber-rant/cyberrant/${id}`}>
                <Image
                  src='/cyberrant/reply-dark.png'
                  alt='reply'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain min-w-[24px] min-h-[24px]'
                />
              </Link>
              <Repost />
              {/* <ShareButton
                post={post}
                name={name}
              /> */}
            </div>
            {isComment && comments.length > 0 && (
              <Link href={`/cyber-rant/cyberrant/${id}`}>
                <p className='mt-1 font-bold text-red-800'>
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
              </Link>
            )}
          </div>
        </div>
        <DeleteThread
          threadId={id}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              priority alt={`user_${index}`}
              width={24} height={24}
              className={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
            />
          ))}
          <Link href={`/cyber-rant/cyberrant/${id}`} passHref>
            <p className="mt-1 text-subtle-medium text-red-900">
              <span className="text-neutral-300">{comments.length}</span>
              {` Repl${comments.length > 1 ? 'ies' : 'y'}`}
            </p>
          </Link>
        </div>
      )}
      {!isComment && community && (
        <Link href={`/cyber-rant/communities/${community.id}`} passHref>
          <div className="mt-5 flex items-center">
            <p className="text-neutral-500">{formatDateString(createdAt)}</p>
            <p className="text-sky-700 mx-1">- {community.name} Community</p>
            <Image src={community.image} priority alt={community.name} width={30} height={30} className="ml-1 rounded-full object-cover" />
          </div>
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
