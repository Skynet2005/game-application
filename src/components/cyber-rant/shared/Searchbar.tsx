'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';

const DEBOUNCE_TIME = 300; // Delay time in milliseconds

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // This function pushes the new route based on search query and routeType.
  const navigateBasedOnSearch = useCallback(() => {
    const routePath = search ? `/cyber-rant/${routeType}?q=${search}` : `/cyber-rant/${routeType}`;
    router.push(routePath);
  }, [search, routeType, router]);

  // Debounce search query updates
  useEffect(() => {
    const delayDebounceFn = setTimeout(navigateBasedOnSearch, DEBOUNCE_TIME);
    return () => clearTimeout(delayDebounceFn);
  }, [navigateBasedOnSearch]);

  // Placeholder text based on routeType
  const placeholderText = routeType !== 'Search' ? 'Search CyberTribes' : 'Search Creators';

  return (
    <div className="flex gap-1 rounded-lg dark:bg-neutral-950 px-4 py-2">
      <Image
        src="/cyberrant/search.png"
        alt="search icon"
        width={50}
        height={50}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholderText}
        className="rant-gradient rounded-xl bg-neutral-800 text-base-regular text-neutral-950 dark:text-neutral-300 border-neutral-950 dark:border-sky-800 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 outline-none"
      />
    </div>
  );
}

export default Searchbar;
