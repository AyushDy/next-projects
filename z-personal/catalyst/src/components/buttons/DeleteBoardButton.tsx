"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBoard } from "@/lib/hooks/useBoards";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteBoardButton({ boardId, slug }: { boardId: string, slug: string }) {
    const deleteBoardMutation = useDeleteBoard(slug);

  const handleDelete = async () => {
    try {
      await deleteBoardMutation.mutateAsync(boardId);
      toast.success("Board deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete board. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="rounded-xs"> <Trash className="h-4 w-4" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this board? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-background rounded-xs hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
