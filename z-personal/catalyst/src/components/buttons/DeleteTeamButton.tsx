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
import { useDeleteTeam } from "@/lib/hooks/useTeams";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteTeamButton({ teamId }: { teamId: string }) {
  const deleteTeamMutation = useDeleteTeam();

  const handleDelete = async () => {
    const res = await deleteTeamMutation.mutateAsync(teamId);
    if (res.deleteTeam) {
      toast.success("Team deleted successfully");
    } else {
      toast.error("Failed to delete team. Please try again.");
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
          Delete Team
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this team? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-red-500 text-background hover:text-white"
            onClick={handleDelete}
          >
            {deleteTeamMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
