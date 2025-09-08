"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProject } from "@/lib/hooks/useProject";
import { useCreateBoard } from "@/lib/hooks/useBoards";
import { useState } from "react";
import { toast } from "sonner";

export function AddBoardButton({ slug }: { slug: string }) {
  const { data: project, isLoading } = useProject(slug);
  const createBoard = useCreateBoard(slug);
  const [open, setOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const projectId = project?.id;
    const description = formData.get("description") as string;

    if (!name || !projectId) {
      toast.error("Name and project are required");
      return;
    }

    try {
      await createBoard.mutateAsync({
        name,
        projectId,
        description: description || undefined,
      });
      toast.success("Board created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error("Failed to create board");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xs">
          New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xs">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create board</DialogTitle>
            <DialogDescription>
              Create a new board for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Enter board name"
                required
                className="rounded-xs"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                placeholder="Enter board description"
                className="rounded-xs"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="rounded-xs">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={createBoard.isPending} className="rounded-xs">
              {createBoard.isPending ? "Creating..." : "Create board"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
