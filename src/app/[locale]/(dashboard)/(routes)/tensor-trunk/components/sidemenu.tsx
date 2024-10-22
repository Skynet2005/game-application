import cloudinary from 'cloudinary';
import Image from 'next/image';
import Link from 'next/link';

import { Folder } from '@/app/[locale]/(dashboard)/(tensor-trunk)/albums/page';

import { Button } from '@/components/old/ui/button';

// Ensure cloudinary is configured with the cloud name and API key
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function SideMenu() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return (
    <main className="h-full w-[200] p-4 space-y-2">
      <div className="pt-12 pb-12 w-full">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold bordertracking-tight">
              Manage
            </h2>
            <div className="space-y-1">
              <Button asChild variant="outline" className="w-full p-2 m-2 justify-start flex gap-2 rounded-xl bg-cyan-700">
                <Link href="/gallery">
                  <Image src="/tensor-trunk/gallery.png" alt="Gallery" width={40} height={40} className="" />
                  Gallery
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full p-2 m-2 justify-start flex gap-2 rounded-xl bg-cyan-700">
                <Link href="/albums">
                  <Image src="/tensor-trunk/albums.png" alt="Albums" width={40} height={40} className="" />
                  Albums
                </Link>
              </Button>
              {folders.map((folder) => {
                console.log("Original:", folder.name);
                console.log("Decoded:", decodeURIComponent(folder.name));
                return (
                  <Button key={folder.name} asChild variant="ghost" className="w-full p-2 m-2 justify-start flex gap-2 rounded-xl bg-cyan-700/10">
                    <Link className="pl-8" href={`/albums/${folder.path}`}>
                      {decodeURIComponent(folder.name)}
                    </Link>
                  </Button>
                );
              })}
              <Button asChild variant="outline" className="w-full p-2 m-2 justify-start flex gap-2 rounded-xl bg-cyan-700">
                <Link href="/favorites">
                  <Image src="/tensor-trunk/gold-heart.png" alt="Gold-Heart" width={40} height={40} className="" />
                  Favorites
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
