// src/app/(dashboard)/(tensor-trunk)/(routes)/gallery/search-form.tsx
'use client';
import { Button } from '@/components/old/ui/button';
import { Input } from '@/components/old/ui/input';
import { Label } from '@/components/old/ui/label';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchForm({ initialSearch }: { initialSearch: string }) {
  const [tagName, setTagName] = useState(initialSearch ?? '');
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <Label htmlFor="tag-name" className="text-right">
        Search By Tag
      </Label>
      <div className="flex gap-2 pb-10">
        <Input
          onChange={e => setTagName(e.currentTarget.value)}
          id="tag-name"
          value={tagName}
          className="rounded-xl bg-neutral-900 text-neutral-300"
        />
        <Button
          type="submit"
          className="rounded-xl border bg-cyan-700"
        >
          <p className="text-nuetral-300">Search</p>
        </Button>
      </div>
    </form>
  );
}
