// src/components/cyber-rant/cards/CommunityCard.tsx
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: { image: string; }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="cyberrant-gradient w-full px-4 py-5 sm:w-96 rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/cyber-rant/communities/${id}`} className="relative h-16 w-16">
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/cyber-rant/communities/${id}`}>
            <h4 className="text-base-semibold text-light-1">{name}</h4>
          </Link>
          <p className="text-[12px] leading-[16px] font-medium text-neutra-300">@{username}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/cyber-rant/communities/${id}`}>
          <Button size="sm" className="sky-gradient rounded-xl bg-primary-500 px-5 py-1.5 text-[14px] leading-[140%] font-normal">
            View
          </Button>
        </Link>
        <div className="relative group hover:opacity-100">
          {/* Tooltip */}
          <span className="absolute z-10 bottom-full pb-2 text-sm text-neutral-950 dark:text-sky-800 bg-transparent rounded-md opacity-0 group-hover:opacity-100">
            CyberTribe Admin Tool
          </span>
          {/* Button */}
          <Link href="/organization-profile">
            <Button size="sm" className="sky-gradient px-5 py-1.5 text-[14px] leading-[140%] font-normal rounded-xl">
              Manage CyberTribe
            </Button>
          </Link>
        </div>


        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${index !== 0 && '-ml-2'
                  } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-[12px] leading-[16px] font-medium text-sky-800">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
