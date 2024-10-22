// /src/components/cyber-rant/controls/FireControl.tsx
"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { updateReaction } from '@/components/cyber-rant/lib/actions/thread.actions';

interface FireControlProps {
  threadId: string;
  fireCount?: number | undefined;
  userId: string;
  initialCount?: string[];
}

export default function FireControl({ threadId, fireCount, userId, initialCount }: FireControlProps) {
  const [liked, setLiked] = useState(false);
  const [currentFireCount, setFireCount] = useState(fireCount);
  const pathname = usePathname();
  const [,startTransition] = useTransition();

  useEffect(() => { if (initialCount && initialCount.includes(userId)) { setLiked(true); } else { setLiked(false); } }, [userId, initialCount]);

  const handleLike = () => {
    const wasLiked = liked;
    startTransition(() => {
      setLiked(!liked);
      updateReaction(threadId, userId, 'fireCount', !wasLiked, pathname || '')
        .then(response => { if ('newCounts' in response) { setFireCount(response.newCounts.fireCount); } })
        .catch(error => console.error('Failed to update Fire:', error));
    });
  };

  return (
    <div className="relative group hover:opacity-100">
      <div className="absolute invisible group-hover:visible bg-transparent text-red-950 dark:text-sky-700 font-bold text-sm rounded-md p-2 -mt-7 -ml-2 z-10">
        Lit!
      </div>
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(); }} className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}>
        <div className="dark:hidden">
          <Image src="/cyberrant/fire.png" alt="Lit!" width={25} height={25} className="cursor-pointer object-contain text-neutral-700" />
        </div>
        <div className="hidden dark:block">
          <Image src="/cyberrant/fire.png" alt="Lit!" width={30} height={30} className="cursor-pointer object-contain text-neutral-300" />
        </div>
        <span className="text-sky-800 font-bold opacity-75">{currentFireCount}</span>
      </button>
    </div>
  );
}
