"use client";

import { useProject, useUpdateProject } from "@/lib/hooks/useProject";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/LoadingSpinner";

export function ProjectSettingsForm({ slug }: { slug: string }) {
  const { data: project, isLoading } = useProject(slug);
  const updateProjectMutation = useUpdateProject(slug);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PRIVATE");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
      setVisibility(project.visibility || "PRIVATE");
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      await updateProjectMutation.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        visibility,
      });
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update project");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Spinner />
        </CardContent>
      </Card>
    );
  }

  if (!project) {
    return (
      <Card className="rounded-xs">
        <CardContent className="p-6">
          <p className="text-muted-foreground">Project not found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xs border-none bg-transparent">
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
              className="rounded-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description (optional)"
              className="resize-none rounded-xs"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={visibility}
              onValueChange={(value) =>
                setVisibility(value as "PUBLIC" | "PRIVATE")
              }
            >
              <SelectTrigger className="rounded-xs">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent className="rounded-xs">
                <SelectItem value="PRIVATE" className="rounded-xs">Private</SelectItem>
                <SelectItem value="PUBLIC" className="rounded-xs">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={updateProjectMutation.isPending}
            className="rounded-xs"
          >
            {updateProjectMutation.isPending ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
