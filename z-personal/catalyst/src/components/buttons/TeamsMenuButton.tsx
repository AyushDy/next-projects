"use client";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TeamsMenuButton({ teamId }: { teamId: string | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xs">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xs" align="end">
        <div className="p-1 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start h-8 px-2 font-normal rounded-xs"
          >
            Rename Team
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
