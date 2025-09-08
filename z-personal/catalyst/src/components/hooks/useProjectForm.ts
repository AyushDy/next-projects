import { CREATE_PROJECT, IS_SLUG_UNIQUE } from "@/lib/grapgql/query";
import gqlClient from "@/lib/services/gql";
import { projectSchema } from "@/lib/zod";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type useProjectType = {
  name: string;
  slug: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  setName: (name: string) => void;
  setSlug: (slug: string) => void;
  setDescription: (description: string) => void;
  setVisibility: (visibility: "PUBLIC" | "PRIVATE") => void;
  createProject: () => Promise<void>;
  isPending: boolean;
  isSlugUnique: boolean;
};

export function useProjectForm() {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PRIVATE");
  const [isPending, startTransition] = useTransition();
  const [createBoard, setCreateBoard] = useState<boolean>(true);
  const [createTeam, setCreateTeam] = useState<boolean>(false);
  const [isSlugUnique, setIsSlugUnique] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(()=>{
    const timerId = setTimeout(async()=>{
      if(!slug.trim()) return;
      const res = (await gqlClient.request(IS_SLUG_UNIQUE, { slug: slug.trim() })) as { isUniqueProjectSlug: boolean };
      setIsSlugUnique(res.isUniqueProjectSlug);
    }, 400);

    return () => clearTimeout(timerId);
  },[slug])

  async function createProject() {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (!slug.trim()) {
      toast.error("Project slug is required");
      return;
    }

    startTransition(async () => {
      try {
        const parsed = projectSchema.safeParse({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          visibility,
          createBoard,
          createTeam,
        });

        if (!parsed.success) {
          toast.error("Invalid project data");
          console.error("Validation errors:", parsed.error.format());
          return;
        }

        const res = (await gqlClient.request(CREATE_PROJECT, {
          ...parsed.data,
        })) as { createProject: boolean };

        if (!res.createProject) {
          toast.error("Failed to create project");
        } else {
          toast.success("Project created successfully!");
          router.push(`/${slug.trim()}`);
        }
      } catch (error) {
        console.error("Error creating project:", error);
        toast.error("An error occurred while creating the project");
      }
    });
  }

  return {
    name,
    setName,
    slug,
    setSlug,
    description,
    setDescription,
    visibility,
    setVisibility,
    createProject,
    isPending,
    createBoard,
    setCreateBoard,
    createTeam,
    setCreateTeam,
    isSlugUnique,
  };
}
