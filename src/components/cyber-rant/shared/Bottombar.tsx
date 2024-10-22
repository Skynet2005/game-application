// src/components/cyber-rant/shared/Bottombar.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Satisfy } from 'next/font/google';
import cn from 'clsx';

import { sidebarLinks } from '@/components/cyber-rant/constants/constants';

const font = Satisfy({ weight: '400', subsets: ['latin'] });

function Bottombar() {
  const pathname = usePathname();

  return (
    (<section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-rgba(16, 16, 18, 0.60) p-4 backdrop-blur-lg sm:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks.map(link => {
          const isActive =
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            (<Link
              href={link.route}
              key={link.label}
              className={cn(`hide-below-sm relative flex flex-col overflow-auto items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${isActive && ''}`, font.className)}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={40}
                height={40}
                className="object-cover"
              />
              <p className="hide-below-sm text-xs text-neutral-300 md:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>)
          );
        })}
      </div>
    </section>)
  );
}

export default Bottombar;
