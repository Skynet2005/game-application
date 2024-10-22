// src/components/landing/landing-navbar.tsx
'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="pl-6 pr-6 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-20 w-20 mr-4">
          <Image
            fill
            alt="Logo"
            src="/logo.png"
            sizes="(max-width: 600px) 60vw, 200px"
          />
        </div>
        <h1 className={cn('text-3xl font-bold text-white hover:text-sky-500/25 hover:bg-neutral-900/25', font.className,)}>
          Skyneticstractions
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded-full text-neutral-300 hover:text-sky-400/25 hover:bg-neutal-400/50">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
