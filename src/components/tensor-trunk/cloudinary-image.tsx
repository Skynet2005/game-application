"use client";

import { Heart } from "@/components/tensor-trunk/icons/heart";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState, useTransition } from "react";
import { FullHeart } from "@/components/tensor-trunk/icons/full-heart";
import { SearchResult } from "@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/page";
import { setAsFavoriteAction } from "@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/actions";
import { ImageMenu } from "./image-menu";

export function CloudinaryImage(props: { imageData: SearchResult; onUnheart?: (unheartedResource: SearchResult) => void; } & Omit<CldImageProps, "src">) {
  const [, startTransition] = useTransition(); // Fixed the useTransition hook to correctly destructure the startTransition function
  const { imageData, onUnheart } = props;
  const [isFavorited, setIsFavorited] = useState(imageData.tags.includes("favorite"));

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <FullHeart
          onClick={() => { onUnheart?.(imageData); setIsFavorited(false); startTransition(() => { setAsFavoriteAction(imageData.public_id, false); }); }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => { setIsFavorited(true); startTransition(() => { setAsFavoriteAction(imageData.public_id, true); }); }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
