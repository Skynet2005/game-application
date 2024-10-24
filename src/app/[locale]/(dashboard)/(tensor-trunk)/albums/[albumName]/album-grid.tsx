"use client";

import { ImageGrid } from "@/components/tensor-trunk/image-grid";
import { CloudinaryImage } from "@/components/tensor-trunk/cloudinary-image";
import { SearchResult } from "@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/page";

export default function AlbumGrid({ images }: { images: SearchResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
          />
        );
      }}
    />
  );
}
