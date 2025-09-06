"use client";

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
import { useDeleteColumn } from "@/lib/hooks/useColumns";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteColumnButton({ columnId }: { columnId: string }) {
  const deleteColumnMutation = useDeleteColumn();

  const handleDelete = async () => {
    try {
      await deleteColumnMutation.mutateAsync(columnId);
      if (deleteColumnMutation.isSuccess) {
        toast.success("Column deleted successfully");
      } else {
        toast.error("Failed to delete column. Please try again.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete column. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start h-8 px-2 font-normal text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete List
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this column? This will also delete
            all tasks within this column. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-red-500 text-background hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
