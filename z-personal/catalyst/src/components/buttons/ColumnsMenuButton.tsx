"use client";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteColumnButton } from "./DeleteColumnButton";

export function ColumnsMenuButton({ columnId }: { columnId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="p-1 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start h-8 px-2 font-normal"
          >
            Rename Column
          </Button>
          <DeleteColumnButton columnId={columnId} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
