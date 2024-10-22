'use client';

import { CldImage, CloudinaryUploadWidgetResults } from 'next-cloudinary';
// ... existing code ...
import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';

export type UploadResult = {
  info: { public_id: string };
  event: 'success';
};

export default function Upload() {
  const [imageId, setImageId] = useState('');

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.event === 'success' && result.info) {
      const info = result.info as { public_id: string };
      setImageId(info.public_id);
    }
  };

  return (
    <>
      <div className="flex flex-col align-center items-center justify-between border rounded-xl p-2">
        <CldUploadButton onUpload={onUpload} uploadPreset="vhvkq6am" />
        {imageId && (
          <CldImage
            width="500"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        )}
      </div>
    </>
  );
}
