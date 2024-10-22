import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Searchbar from "@/components/cyber-rant/shared/Searchbar";
import Pagination from "@/components/cyber-rant/shared/Pagination";
import CommunityCard from "@/components/cyber-rant/cards/CommunityCard";

import { fetchUser } from "@/components/cyber-rant/lib/actions/user.actions";
import { fetchCommunities } from "@/components/cyber-rant/lib/actions/community.actions";

async function CommunitiesPage(props: { searchParams: Promise<{ [key: string]: string | undefined }>; }) {
  const searchParams = await props.searchParams;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-red-800">CyberTribe Communities</h1>
        <h2 className="text-gray-600 italic">Forge Connections!</h2>
        <div className="mt-4">
          <span className="inline-block bg-red-800 text-white py-1 px-3 rounded-full text-sm font-semibold">
            #Unity #Engage
          </span>
          <span className="inline-block bg-gray-600 text-white py-1 px-3 ml-2 rounded-full text-sm font-semibold">
            #CyberTribe
          </span>
        </div>
        <p className="mt-4 text-gray-500">
          Discover new tribes or build your own. <br />
          In the realm of CyberRant, your community is your fortress.
        </p>
      </div>


      <div className='mt-5'>
        <Searchbar routeType='communities' />
      </div>

      <section className='flex flex-wrap gap-4 items-center justify-center mt-10 p-2'>
        {result.communities.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default CommunitiesPage;
