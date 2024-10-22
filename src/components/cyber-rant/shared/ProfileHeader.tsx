import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: 'User' | 'Community';
}

function ProfileHeader({ accountId, authUserId, name, username, imgUrl, bio, type, }: Props) {
  return (
    <div className="flex w-full flex-col justify-start text-neutral-950 dark:text-neutral-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-sky-800 font-bold">
              {name}
            </h2>
            <p className="text-[16px] leading-[140%] font-medium text-neutral-950 dark:text-neutral-400">
              @{username}
            </p>
          </div>
        </div>
        {accountId === authUserId && type !== 'Community' && (
          <Link href="/cyber-rant/profile/edit">
            <Button className="cyberrant-gradient flex cursor-pointer gap-3 px-4 py-2 border rounded-xl border-neutral-950 dark:border-sky-900 text-neutral-950 dark:text-sky-800 w-fit">
              <Image
                src="/cyberrant/edit-dna.png"
                alt="edit"
                width={20}
                height={20}
              />
              <p className="max-sm:hidden">
                Edit
              </p>
            </Button>
          </Link>
        )}
      </div>
      <p className="mt-6 max-w-lg text-[16px] leading-[140%] font-medium text-neutral-950 dark:text-neutral-300">
        {bio}
      </p>

      <div className="mt-12 h-0.5 w-full bg-neutral-700" />
    </div>
  );
}

export default ProfileHeader;
