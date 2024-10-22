// src/app/cyber-rant/(routes)/search/page.tsx
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import UserCard from '@/components/cyber-rant/cards/UserCard';
import Searchbar from '@/components/cyber-rant/shared/Searchbar';
import Pagination from '@/components/cyber-rant/shared/Pagination';

import { fetchUser, fetchUsers } from '@/components/cyber-rant/lib/actions/user.actions';

async function SearchPage(props: { searchParams: Promise<{ [key: string]: string | undefined }>; }) {
  const searchParams = await props.searchParams;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <div className="text-center mb-10">
        <h1 className="text-red-800 font-bold">Search</h1>
        <h2 className="text-gray-600 italic">Find Your Next CyberAlly or Tribe</h2>
        <p className="mt-3 text-[16px] leading-[140%] font-medium text-neutral-400">
          On the hunt for allies or communities, CyberTracker? 🎯
        </p>
        <div className="mt-4">
          <span className="inline-block bg-red-800 text-neutral-950 dark:text-neutral-300 py-1 px-3 rounded-full text-sm font-semibold">
            #TrackYourTribe
          </span>
          <span className="inline-block bg-gray-600 text-neutral-950 dark:text-neutral-300 py-1 px-3 ml-2 rounded-full text-sm font-semibold">
            #FindYourAlly
          </span>
        </div>
        <p className="mt-4 text-gray-500">
          Whether you&apos;re searching for a like-minded individual or a vibrant community, <br />
          your next alliance is just a search query away. 🔍
        </p>
      </div>
      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map(person => (
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
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section >
  );
}

export default SearchPage;
