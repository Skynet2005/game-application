// /src/components/cyber-rant/card/ControlsCard.tsx
"use client";
import FireControl from '../controls/FireControl';
import HeartPulseControl from '../controls/HeartPulseControl';
import ThumbsDownControl from '../controls/ThumbsDownControl';

interface ControlProps {
  threadId: string;
  fireCount?: number | undefined;
  heartpulseCount?: number | undefined;
  thumbsDownCount?: number | undefined;
  userId: string;
  initialCount?: string[];
}

export default function Controls({ threadId, fireCount = 0, heartpulseCount = 0, thumbsDownCount = 0, userId, initialCount = [] }: ControlProps) {
  return (
    <div className="flex space-x-4">
      <FireControl
        threadId={threadId}
        fireCount={fireCount > 0 ? fireCount : undefined}
        userId={userId}
        initialCount={initialCount}
      />
      <HeartPulseControl
        threadId={threadId}
        heartpulseCount={heartpulseCount > 0 ? heartpulseCount : undefined}
        userId={userId}
        initialCount={initialCount}
      />
      <ThumbsDownControl
        threadId={threadId}
        thumbsDownCount={thumbsDownCount > 0 ? thumbsDownCount : undefined}
        userId={userId}
        initialCount={initialCount}
      />
    </div>
  );
}
