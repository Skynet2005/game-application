'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteThread } from '@/components/cyber-rant/lib/actions/thread.actions';

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({ threadId, currentUserId, authorId, parentId, isComment }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === '/cyber-rant') return null;

  return (
    <Image
      src="/cyberrant/delete.png"
      alt="delete"
      width={35}
      height={35}
      onClick={async () => {
        await deleteThread(JSON.parse(threadId), pathname || '');
        if (!parentId || !isComment) { router.push('/cyber-rant'); }
      }}
      className="cursor-pointer object-contain"
    />
  );
}

export default DeleteThread;
