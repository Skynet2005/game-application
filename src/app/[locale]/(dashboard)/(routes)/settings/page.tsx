// app/(dashboard)/(routes)/settings/page.tsx
import Image from 'next/image';

import { Heading } from '@/components/ui/heading';
import { SubscriptionButton } from '@/components/ui/subscription-button';
import { checkSubscription } from '@/lib/stripe/subscription';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <>
      <div className={`absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal`} />
      <div className="h-full p-4 pt-[60px] space-y-2">
        <div className="border border-black bg-neutral-900/75 rounded-xl">
          <Heading
            title="Settings"
            description="Manage account settings!"
            icon={() => (
              <div className="bg-purple-700/10 text-white p-1 border rounded-xl">
                <Image
                  src="/dashboard/settingsSide.png"
                  alt="settings"
                  width={50}
                  height={50}
                />
              </div>
            )}
          />
        </div>
        <div className="px-4 lg:px-8 space-y-4">
          <div className="text-muted-foreground text-sm">
            {isPro ? 'You are currently on a Pro plan.' : 'You are currently on a free plan.'}
          </div>
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
