
import { SearchResult } from "@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/page";
import Image from "next/image";

import type { JSX } from "react";

const MAX_COLUMNS = 4;

export function ImageGrid({ images, getImage }: { images: SearchResult[]; getImage: (imageData: SearchResult) => JSX.Element }) {
  const columns = Array.from({ length: MAX_COLUMNS }, (_, colIndex) =>
    images.filter((_, idx) => idx % MAX_COLUMNS === colIndex)
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((column, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          {column.map((imageData) => (
            getImage(imageData)
          ))}
        </div>
      ))}
    </div>
  );
}

function ImageComponent({ imageData }: { imageData: SearchResult }) {
  const imageUrl = `https://res.cloudinary.com/demo/image/upload/${imageData.public_id}.jpg`;

  return (
    <div className="image-container">
      <Image
        src={imageUrl}
        alt={"Image"}
        width={200}
        height={200}
        className="rounded-lg object-cover"
      />
      <div className="image-description">
        <p>{"No description available"}</p>
      </div>
    </div>
  );
}
