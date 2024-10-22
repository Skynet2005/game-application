"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { sideRawTools, Tool } from "@/app/[locale]/(dashboard)/(routes)/dashboard/components/constants";
import { FreeCounter } from "@/components/ui/free-counter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type SideTool = {
  label: string;
  route: string;
  href: string;
};

type SidebarProps = {
  apiLimitCount?: number;
  isPro?: boolean;
};

const SidebarMobile = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // State to handle section collapse
  const [collapsedSections, setCollapsedSections] = useState<{ [key: string]: boolean }>(
    Object.keys(sideRawTools).reduce((acc, category, index) => {
      acc[category] = index !== 0; // Collapse all except the first category
      return acc;
    }, {} as { [key: string]: boolean })
  );

  // Toggles visibility of sections
  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="fixed pt-10 pb-10 pl-2 pr-4 left-0 space-y-4 flex flex-col justify-between h-screen w-72 bg-neutral-900 text-white">
      <div className="space-y-1 pl-1 pr-1">
        {/* Organization switcher */}
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-2 justify-center w-full",
            },
          }}
        />
        {/* Tools and sections */}
        {Object.entries(sideRawTools).map(([category, tools]) => (
          <div key={category}>
            <button
              onClick={() => toggleSection(category)}
              className="text-sm font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-xl transition w-full text-left p-2"
            >
              <span className={cn(collapsedSections[category] ? "text-green-500" : "text-red-500", "font-bold text-lg")}>
                {collapsedSections[category] ? '+' : '-'}
              </span> {category}
            </button>
            {/* Section content */}
            {!collapsedSections[category] && (
              <div className="pl-2">
                {tools.map((tool: Tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={cn(
                      "text-sm group flex p-3 pl-2 pr-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-xl transition",
                      pathname === tool.href ? "text-white bg-white/10" : "text-zinc-400",
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <Image
                        alt={tool.label}
                        src={tool.route}
                        className={cn("h-5 w-5 mr-3 rounded-xl", tool.color)}
                        sizes="(max-width: 768px) 100vw"
                        width={100} height={100}
                      />
                      {tool.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Free Counter */}
      <div className="mt-10 px-6 rounded-xl pb-8">
        <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      {/* Logout */}
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push('/')}>
          <div className="flex cursor-pointer gap-4 p-8" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
            <Image src="/dashboard/logout.png" alt="logout" width={24} height={24} sizes="(max-width: 768px) 100vw, 48rem" />
            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only runs on client side
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="p-1" asChild={true}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="sidebar" className="p-0">
        <SidebarMobile isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
