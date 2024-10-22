"use client"
import { ImageGrid } from '@/components/tensor-trunk/image-grid';
import { SearchResult } from './page';
import { CloudinaryImage } from '@/components/tensor-trunk/cloudinary-image';
import Tilt from 'react-parallax-tilt';

export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <Tilt>
            <CloudinaryImage
              key={imageData.public_id}
              imageData={imageData}
              alt="an image of something"
              width="400"
              height="300"
              style={{ width: '100%', height: '100%' }}
              className="rounded-lg"
            />
          </Tilt>
        );
      }}
    />
  );
}
