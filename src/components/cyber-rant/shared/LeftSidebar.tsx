// src/components/cyber-rant/shared/LeftSidebar.tsx
'use client';
import { Satisfy } from 'next/font/google';
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import cn from 'clsx';

import { sidebarLinks } from '@/components/cyber-rant/constants/constants';

const font = Satisfy({ weight: '400', subsets: ['latin'] });

const LeftSidebar = () => {
  const pathname = usePathname() || '';
  const { userId } = useAuth();
  const isActivePath = (route: string) => pathname.includes(route) && route.length > 1 || pathname === route;

  return (
    <section className="hide-below-md hide-below-sm custom-scrollbar sticky top-0 flex h-screen max-w-[100px] flex-col justify-between overflow-y-auto border-r border-neutral-950 dark:border-neutral-200 pb-5 pt-[80px] rounded">
      {/* Logo Section */}
      <Link href="/dashboard" className="hide-full hide-below-sm flex w-full justify-center items-center pb-5 gap-4">
        <div className="text-2xl font-bold text-neutral-300 flex flex-col justify-center items-center">
          <Image
            src="/logo.png"
            alt="CyberRant Logo"
            width={70}
            height={70}
            priority
          />
        </div>
      </Link>
      {/* Sidebar Links */}
      <div className="hide-full hide-below-sm flex w-full flex-1 flex-col gap-6 px-6">
        <div className="">
          {/* Organization Switcher */}
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "w-[50px] py-2 px-2 justify-center text-transparent",
              },
            }}
          />
        </div>
        {/* Navigation Links */}
        {sidebarLinks.map(link => {
          const isActive = isActivePath(link.route);
          if (link.route === '/cyber-rant/profile') link.route = `${link.route}/${userId}`;
          return (
            <Link href={link.route} key={link.label}>
              <div className={cn(`hide-full hide-below-sm flex flex-col items-center justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-primary-500 '}`, font.className)}>
                <div className="w-14 h-14 relative">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={70}
                    height={70}
                  />
                </div>
                <p className="hide-full hide-below-sm text-sky-800 dark:text-neutral-300 text-xs">{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
