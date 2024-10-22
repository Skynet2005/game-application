// src/app/(dashboard)/(tensor-trunk)/(routes)/gallery/upload-button.tsx
"use client"
import { CldUploadButton } from 'next-cloudinary';
import { UploadResult } from '@/app/[locale]/(dashboard)/(routes)/tensor-trunk/components/upload';
import { Button } from '@/components/old/ui/button';
import { useRouter } from 'next/navigation';

export default function UploadButton() {
  const router = useRouter();

  return (
    <Button asChild>
      <CldUploadButton
        onUpload={(result: any) => {
          const myResult: UploadResult = result as UploadResult;
          if (myResult) {
            setTimeout(() => {
              router.refresh();
            }, 2000);
          }
        }}
        uploadPreset="vhvkq6am"
      >
        <div className="flex gap-2 rounded-xl bg-cyan-700 p-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-neutral-300">Upload</p>
        </div>
      </CldUploadButton>
    </Button>
  );
}
