"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
// import { env } from "@/env.mjs";
import { Link, Send, Share } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export default function ShareButton({ name, }: { post: string; name: string; }) {
  const { user } = useUser();
  const userName = user?.firstName ?? "Someone";
  const shareData = {
    title: "CyberRants",
    text: `${userName} sent a link to ${name}'s post on Skyneticstractions: Cyber Rant App`,
    // url: `${env.NEXT_PUBLIC_APP_URL}/cyberrant/${post}`,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Send className="w-[20px] h-[20px] mb-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // navigator.clipboard.writeText(shareData.url);
            toast.success("Copied to clipboard");
          }}
        >
          {" "}
          <Link className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.share(shareData);
          }}
        >
          {" "}
          <Share
            width={25}
            height={25}
            className="cursor-pointer object-contain text-neutral-700 dark:text-neutral-300"
          />
          Share Via...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
