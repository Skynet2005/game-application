import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import AccountProfile from '@/components/cyber-rant/forms/AccountProfile';
import { ModeToggle } from "@/components/old/ui/mode-toggle";
import { fetchUser } from '@/components/cyber-rant/lib/actions/user.actions';

async function OnboardingPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect('/dashboard');

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // console.log('USERINFO:, ', userInfo?.username)
  // console.log('USER, ', user?.username)
  return (
    <main className="main-container h-full custom-scrollbar bg-neutral-300 dark:bg-neutral-800 mx-auto flex max-w-3xl flex-col justify-start px-[10px] py-[50px] rounded-xl">
      <div className="relative top-1 left-[200px]">
        <ModeToggle />
      </div>
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile!
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}


export default OnboardingPage;
