"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useProjectForm } from "../hooks/useProjectForm";
import { Checkbox } from "../ui/checkbox";

export function NewProjectForm() {
  const {
    name,
    setName,
    slug,
    setSlug,
    description,
    setDescription,
    visibility,
    setVisibility,
    createBoard,
    setCreateBoard,
    createTeam,
    setCreateTeam,
    createProject,
    isPending,
  } = useProjectForm();

  return (
    <div className="max-w-3xl w-full mx-auto">
      <form className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-3">General</h2>

          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="owner">Owner *</Label>
              <Input id="owner" value="you" readOnly className="h-10" />
            </div>
            <span className="text-2xl font-light text-muted-foreground pb-2">
              /
            </span>
            <div className="flex-2 space-y-2">
              <Label htmlFor="name">Project name *</Label>
              <Input
                id="name"
                placeholder="my-awesome-project"
                className="h-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Project slug *</Label>
            <Input
              id="slug"
              placeholder="my-awesome-project"
              className="h-10"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              URL path for the project. Use lowercase letters, numbers, and
              hyphens.
            </p>
            <p className="text-xs text-muted-foreground">
              This will be used as the URL path for the project.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description..."
              className="h-10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-3">Configuration</h2>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div >
                <p className="font-medium">Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Who can see this project?
                </p>
              </div>
              <Select
                value={visibility}
                onValueChange={(value) =>
                  setVisibility(value as "PUBLIC" | "PRIVATE")
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="createBoard"
                checked={createBoard}
                onCheckedChange={(checked) => setCreateBoard(checked === true)}
              />
              <Label htmlFor="createBoard" className="cursor-pointer">
                Add default board
              </Label>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="createTeam"
                checked={createTeam && createBoard}
                onCheckedChange={(checked) =>
                  setCreateTeam(checked === true && createBoard)
                }
                disabled={!createBoard}
              />
              <Label
                htmlFor="createTeam"
                className={`cursor-pointer ${
                  !createBoard ? "text-muted-foreground" : ""
                }`}
              >
                Add default team {!createBoard && "(requires board)"}
              </Label>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 w-full flex justify-end mb-20">
          <Button
            onClick={createProject}
            disabled={isPending || !name.trim() || !slug.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 h-11"
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
