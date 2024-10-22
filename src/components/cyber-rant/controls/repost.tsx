"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MessageSquareDashed, Repeat2 } from "lucide-react";
// import { toast } from "react-hot-toast";

export default function Repost() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {" "}
        <Repeat2
          width={25}
          height={25}
          className="cursor-pointer object-contain text-sky-700 mb-4"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // toast({
            //   title: "Reposted",
            // });
          }}
        // disabled
        >
          {" "}
          <Repeat2
            width={25}
            height={25}
            className="cursor-pointer object-contain text-sky-700"
          />
          Repost
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {" "}
          <MessageSquareDashed
            width={25}
            height={25}
            className="cursor-pointer object-contain text-sky-700"
          />
          Quote
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
