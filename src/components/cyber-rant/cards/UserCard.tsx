'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();
  const isCommunity = personType === 'Community';

  return (
    <article className="cyberrant-gradient border border-neutral-950 dark:border-none h-auto min-w-[74px] rounded-xl text-[12px] text-light-1 p-2">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            priority
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-[16px] leading-[140%] font-bold text-neutral-950 dark:text-sky-800">{name}</h4>
          <p className="text-[14px] leading-[140%] font-normal text-neutral-950 dark:text-neutral-400">#{username}</p>
        </div>
      </div>
      <div className="w-full text-center">
        <Button
          onClick={() => {
            if (isCommunity) {
              router.push(`/cyber-rant/communities/${id}`);
            } else {
              router.push(`/cyber-rant/profile/${id}`);
            }
          }}
          className="sky-gradient h-auto min-w-[74px] rounded-xl border border-neutral-950 dark:border-red-800 text-[12px] text-neutral-950 dark:text-red-900 font-bold mt-1"
        >
          View
        </Button>
      </div>
    </article>
  );
}

export default UserCard;
