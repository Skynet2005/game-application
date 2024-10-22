// CreateRantsPage.server.js
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import PostThread from '@/components/cyber-rant/forms/PostThread';

import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

export default async function CreateRantsPage() {
  const user = await currentUser();
  // If there is no user, return null to not render anything.
  if (!user) return null;
  // Fetch additional user information.
  const userInfo = await fetchUser(user.id);
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));
  // If the user has not completed onboarding, redirect them.
  if (!plainUserInfo?.onboarded) { redirect('/onboarding'); return null; }
  // Convert ObjectId to string
  const userIdString = String(userInfo._id);
  // Debugging
  console.log("Converted userId:", userIdString);

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-sky-800">Create a... <span className="font-bold underline text-xl text-red-800">CyberRant!</span></h1>
        <h2 className="text-gray-600 italic">Unleash Your Digital Voice in the CyberRealm</h2>
        <div className="mt-4">
          <span className="inline-block bg-sky-800 text-white py-1 px-3 rounded-full text-sm font-semibold">#AI #Art #Expression</span>
          <span className="inline-block bg-red-800 text-white py-1 px-3 ml-2 rounded-full text-sm font-semibold">#JoinTheRevolution</span>
        </div>
        <p className="mt-4 text-gray-500">
          Got an idea? A thought? A digital masterpiece? <br />
          <span className="text-sky-800 font-semibold">CyberRant</span> is your stage!
        </p>
      </div>
      <div className="flex flex-col h-full">
        <PostThread userId={userIdString} />
      </div>
    </>
  );
}
