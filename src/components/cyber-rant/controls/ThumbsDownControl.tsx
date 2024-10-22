// /src/components/cyber-rant/controls/ThumbsDownControl.tsx
"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { updateReaction } from '@/components/cyber-rant/lib/actions/thread.actions';

interface ThumbsDownControlProps {
  threadId: string;
  thumbsDownCount?: number | undefined;
  userId: string;
  initialCount?: string[];
}

export default function ThumbsDownControl({ threadId, thumbsDownCount, userId, initialCount }: ThumbsDownControlProps) {
  const [liked, setLiked] = useState(false);
  const [currentThumbsDownCount, setThumbsDownCount] = useState(thumbsDownCount);
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => { if (initialCount && initialCount.includes(userId)) { setLiked(true); } else { setLiked(false); } }, [userId, initialCount]);

  const handleLike = () => {
    const wasLiked = liked;
    startTransition(() => {
      setLiked(!liked);
      updateReaction(threadId, userId, 'thumbsDownCount', !wasLiked, pathname || '')
        .then(response => { if ('newCounts' in response) { setThumbsDownCount(response.newCounts.thumbsDownCount); } })
        .catch(error => console.error('Failed to update Thumbs Down:', error));
    });
  };

  return (
    <div className="relative group hover:opacity-100">
      <div className="absolute invisible group-hover:visible bg-transparent text-red-950 dark:text-sky-700 font-bold text-sm rounded-md p-2 -mt-7 -ml-4 z-10">
        Dislike
      </div>
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(); }} className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}>
        <div className="dark:hidden">
          <Image src="/cyberrant/thumbs-down.png" alt="Dislike" width={25} height={25} className="cursor-pointer object-contain text-neutral-700" />
        </div>
        <div className="hidden dark:block">
          <Image src="/cyberrant/thumbs-down.png" alt="Dislike" width={30} height={30} className="cursor-pointer object-contain text-neutral-300" />
        </div>
        <span className="text-red-800 font-bold opacity-50">{currentThumbsDownCount}</span>
      </button>
    </div>
  );
}
