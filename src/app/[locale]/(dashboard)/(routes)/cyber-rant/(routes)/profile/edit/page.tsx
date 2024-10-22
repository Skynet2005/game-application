import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import AccountProfile from '@/components/cyber-rant/forms/AccountProfile';

import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

export default async function ProfileEditPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-red-800">Edit Profile</h1>
        <h2 className="text-gray-600 italic">Craft Your Digital Persona 🎨</h2>
        <div className="mt-4">
          <span className="inline-block bg-red-800 text-white py-1 px-3 rounded-full text-sm font-semibold">
            #BeYourself
          </span>
          <span className="inline-block bg-gray-600 text-white py-1 px-3 ml-2 rounded-full text-sm font-semibold">
            #ProfileOverhaul
          </span>
        </div>
        <p className="mt-3 text-[16px] leading-[140%] font-medium text-gray-500">
          Tweak, twist, or totally reinvent. <br />
          Your CyberRant <span className="underline font-bold">Profile</span> is your canvas. 🖌️
        </p>
      </div>
      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}