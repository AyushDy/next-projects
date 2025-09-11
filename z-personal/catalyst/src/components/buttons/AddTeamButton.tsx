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
import { useCreateTeam } from "@/lib/hooks/useTeams";
import { useState } from "react";
import { toast } from "sonner";

export function AddTeamButton() {
  const [open, setOpen] = useState(false);
  const createTeamMutation = useCreateTeam();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    try {
      await (
        await createTeamMutation
      ).mutateAsync({
        name,
        description,
        image,
      });
      toast.success("Team created successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create team.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xs text-sm sm:text-base px-3 sm:px-4 py-2 h-auto">
          <span className="hidden sm:inline">Create a new Team</span>
          <span className="sm:hidden">New Team</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] rounded-xs mx-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Create a new team for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                className="rounded-xs"
                placeholder="Enter team name"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                className="rounded-xs"
                placeholder="Enter team description"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-1">Team Profile Image</Label>
              <Input
                id="image-1"
                name="image"
                className="rounded-xs"
                placeholder="Enter team profile image url"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="rounded-xs">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-xs">
              {!!!!!!!true ? "Creating..." : "Create team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
