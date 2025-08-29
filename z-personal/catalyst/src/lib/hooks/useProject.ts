import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import { DELETE_BOARD, DELETE_PROJECT, GET_PROJECT_BY_SLUG } from "@/lib/grapgql/query";
import { Project } from "@prisma/client";

async function fetchProject(slug: string) {
  const res = await gqlClient.request(GET_PROJECT_BY_SLUG, { slug }) as { getProjectBySlug: Project };
  return res.getProjectBySlug;
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProject(slug),
  });
}


export function useDeleteProject(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const res = (await gqlClient.request(DELETE_PROJECT, {
        slug,
      })) as { deleteProject: boolean };

      if (!res.deleteProject) {
        throw new Error("Failed to delete project");
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", slug] });
    },
  });
}