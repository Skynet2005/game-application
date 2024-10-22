// src/components/cyber-rant/controls/HeartPulseControl.tsx
"use client";
import { HeartPulse } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { updateReaction } from '@/components/cyber-rant/lib/actions/thread.actions';

interface HeartPulseControlProps {
  threadId: string;
  heartpulseCount?: number | undefined;
  userId: string;
  initialCount?: string[];
}

export default function HeartPulseControl({ threadId, heartpulseCount, userId, initialCount }: HeartPulseControlProps) {
  const [liked, setLiked] = useState(false);
  const [currentHeartPulseCount, setHeartPulseCount] = useState(heartpulseCount);
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => { if (initialCount && initialCount.includes(userId)) { setLiked(true); } else { setLiked(false); } }, [userId, initialCount]);

  const handleLike = () => {
    const wasLiked = liked;
    startTransition(() => {
      setLiked(!liked);
      updateReaction(threadId, userId, 'heartpulseCount', !wasLiked, pathname || '')
        .then(response => { if ('newCounts' in response) { setHeartPulseCount(response.newCounts.heartpulseCount); } })
        .catch(error => console.error('Failed to update HeartpulseCount:', error));
    });
  };

  return (
    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLike(); }} className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}>
      <HeartPulse fill={liked ? "#9bc4e2" : "#0a0a0a"} className="w-5 h-5 text-yellow-300" />
      <span className="text-yellow-300 font-bold opacity-50">{currentHeartPulseCount}</span>
    </button>
  );
}
