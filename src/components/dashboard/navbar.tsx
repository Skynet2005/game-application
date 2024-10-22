import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import { cn } from "@/lib/utils";
import Sidebar from "./sidebar"; // Updated import statement
import { getApiLimitCount } from "@/lib/stripe/api-limit";
import { checkSubscription } from "@/lib/stripe/subscription";
import { ModeToggle } from "@/components/ui/mode-toggle";

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex fixed top-0 z-50 w-full items-center justify-between border border-neutral-950 border-solid bg-neutral-900 px-3 py-2">
      <div className="group flex flex-row w-full justify-between items center">
        <div className="left-0 text-neutral-100">
          {/* Sidebar Component */}
          <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
        <Link href='/dashboard' className='flex items-center gap-4 md:pl-4'>
          <Image src='/logo.png' alt='logo' width={28} height={28} />
          <h1 className={cn(
            "text-[2vw] md:text-2xl font-bold group[data-theme='light'] text-yellow-400 dark:text-neutral-100",
            poppins.className
          )}>
            Skyneticstractions!
          </h1>
        </Link>
        <div className="flex justify-center items-center gap-4 rounded-md">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
