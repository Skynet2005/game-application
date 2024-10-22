import { currentUser } from '@clerk/nextjs';
import { Satisfy, Abril_Fatface } from 'next/font/google';
import cn from 'clsx';
import UserCard from '../cards/UserCard';
import { fetchCommunities } from '@/components/cyber-rant/lib/actions/community.actions';
import { fetchUsers } from '@/components/cyber-rant/lib/actions/user.actions';

const font = Satisfy({ weight: '400', subsets: ['latin'] });
const font2 = Abril_Fatface({ weight: '400', subsets: ['latin'] });

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({ userId: user.id, pageSize: 4 });
  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className="custom-scrollbar sticky top-0 z-20 max-w-[250px] flex h-screen w-full flex-col justify-between overflow-y-auto border-l px-4 border-neutral-950 dark:border-neutral-200 pb-5 pt-[80px] hide-below-md">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className={cn("text-md font-bold text-red-700", font2.className)} >
          🎮 Squad Up<span className="text-neutral-950 dark:text-neutral-300">:</span> <span className="text-sky-800">CyberTribe</span> 🎮<br />
        </h3>
        <p className={cn("text-md text-neutral-800 dark:text-neutral-400 text-center", font.className)} >
          Assemble your digital dream team.
        </p>
        <div className="mt-7 flex flex-col gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map(community => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="text-base text-light-3">
              Scouting the digital frontier. 🕵️‍♂️
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start max-w-[210px] pt-[10px]">
        <h3 className={cn("text-md font-bold text-red-700", font2.className)} >
          🛠️ AI Allies <span className="text-neutral-950 dark:text-neutral-300">&</span> <span className="text-sky-800">Comrades</span> 🛠️
        </h3>
        <p className={cn("text-md text-neutral-800 dark:text-neutral-400 text-center", font.className)} >
          Connect with like-minded tech warriors.
        </p>
        <div className="mt-7 flex flex-col gap-10">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map(person => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="text-base text-neutral-950 dark:text-neutral-300">
              It&apos;s quiet... too quiet. 🌑
            </p>
          )}
        </div>
      </div>
    </section>

  );
}

export default RightSidebar;
