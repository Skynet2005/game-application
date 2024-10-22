"use client";
import { SearchResult } from '@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/page';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderPlus } from 'lucide-react';
import { useState } from 'react';
import { addImageToAlbum } from './actions';

export function AddToAlbumDialog({ image }: { image: SearchResult; }) {
  const [albumName, setAlbumName] = useState('');
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={newOpenState => { setOpen(newOpenState); if (!newOpenState) { handleClose(); } }}
    >
      <DialogTrigger>
        <Button variant="default">
          <FolderPlus className="mr-2 h-4 w-4" />
          <span>Add to Album</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>Type an album you want to move this image into</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Album</Label>
            <Input
              onChange={e => setAlbumName(e.currentTarget.value)}
              id="album-name"
              value={albumName}
              className="col-span-3 bg-neutral-700"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={async () => { handleClose(); await addImageToAlbum(image, albumName); }}
            type="submit"
            className="rounded bg-neutral-700"
          >
            Add to Album
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
