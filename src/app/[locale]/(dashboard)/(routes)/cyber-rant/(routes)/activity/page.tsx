import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchUser, getActivity } from '@/components/cyber-rant/lib/actions/user.actions';

async function ActivtyPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const activity = await getActivity(userInfo._id);

  return (
    <>
      <div className="text-center h-full">
        <h1 className="font-bold text-red-800">Recent Activity</h1>
        <p className="mt-4 text-gray-500">
          From your latest Rants to interactions with the community, <br />
          keep an eye on what&apos;s buzzing in your digital sphere.
        </p>
        <div className="mt-4">
          <span className="inline-block bg-red-800 text-white py-1 px-3 rounded-full text-sm font-semibold">
            #Latest #Updates
          </span>
          <span className="inline-block bg-gray-600 text-white py-1 px-3 ml-2 rounded-full text-sm font-semibold">
            #StayInformed
          </span>
        </div>
      </div>

      <section className="flex flex-col h-full items-start gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map(activity => (
              <Link
                key={activity._id}
                href={`/cyber-rant/${activity.parentId}`}
              >
                <article className="rant-gradient flex items-center gap-2 rounded-md px-7 py-4">
                  <Image
                    priority
                    src={activity.author.image}
                    alt="CyberAvatar"
                    width={20}
                    height={20}
                    className="rounded-full"
                    style={{ objectFit: 'cover' }}
                  />
                  <p className="!text-small-regular text-neutral-300">
                    <span className="mr-1 text-sky-800">
                      {activity.author.name}
                    </span>
                    Fired back on your CyberRant! 🚀
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="cyberrant-gradient !text-base !leading-snug !font-normal items-start text-neutral-300 p-2 rounded-xl">
            CyberCrickets... Nothing here yet! 🦗
          </p>
        )}
      </section>
    </>
  );
}

export default ActivtyPage;
