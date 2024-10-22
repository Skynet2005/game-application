import React from 'react';
import Image from 'next/image';

interface ImageMarkupProps {
  inputImageURL: string;
  outputImageURL: string;
}

const ImageMarkup: React.FC<ImageMarkupProps> = ({ inputImageURL, outputImageURL }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
    <div className="border border-neutral-800 rounded p-4 bg-white">
      <Image
        alt="img"
        className="border rounded"
        width={250}
        height={250}
        src={inputImageURL}
      />
      <Image alt="img" width={250} height={250} src={outputImageURL} />
    </div>
  </div>
);

export default ImageMarkup;
