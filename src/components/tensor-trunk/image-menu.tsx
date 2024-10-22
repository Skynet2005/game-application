import { useState } from 'react';
import Link from 'next/link';
import { Pencil as PencilIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { SearchResult } from '@/app/[locale]/(dashboard)/(tensor-trunk)//gallery/page';
import { AddToAlbumDialog } from './add-to-album-dialog';
import { Menu } from 'lucide-react';

export function ImageMenu({ image }: { image: SearchResult }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="absolute top-2 right-2 bg-neutral-900 rounded-xl">
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="w-8 h-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 bg-neutral-900">
          <DropdownMenuItem asChild>
            <AddToAlbumDialog image={image} />
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button variant="default" className="cursor-pointer text-center flex justify-start pl-4" asChild>
              <Link href={`/edit?publicId=${encodeURIComponent(image.public_id)}`} className="text-center">
                <PencilIcon className="mr-2 w-4 h-4" />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
