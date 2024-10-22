'use client';

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/image-utils/uploadthing";
import "@uploadthing/react/styles.css";
import { create } from 'zustand';

// Define the Zustand store
interface FileUploadState {
  value: string;
  setValue: (url: string) => void;
}

const useFileUploadStore = create<FileUploadState>((set) => ({
  value: '',
  setValue: (url) => set({ value: url }),
}));

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ endpoint }: FileUploadProps) => {
  const { value, setValue } = useFileUploadStore();
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
          sizes="(max-width: 400px) 100px, (max-width: 900px) 150px, 300px"
        />
        <Button onClick={() => setValue("")} className="bg-red-950 text-neutral-950 dark:text-neutral-300 p-1 rounded-full absolute top-0 right-0 shadow-sm">
          <X className="h-4 w-4 bg-transparent text-neutral-300 " />
        </Button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md text-neutral-300 bg-neutral-500/10">
        <Image src="/pdf.png" alt="pdf" width={40} height={40} layout="responsive" />
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-sky-800 hover:underline"
        >
          {value}
        </Link>
        <Button onClick={() => setValue("")} className="bg-rose-500 text-neutral-950 p-1 rounded-full absolute -top-2 -right-2 shadow-sm">
          <X className="h-4 w-4 bg-neutral-300" />
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => { setValue(res?.[0].url); }}
      onUploadError={(error: Error) => { console.log(error); }}
    />
  );
}
