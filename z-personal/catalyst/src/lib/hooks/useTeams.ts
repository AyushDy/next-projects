"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import {
  ADD_MEMBER_TO_TEAM,
  ADD_TEAM_TO_PROJECT,
  CREATE_TEAM,
  GET_CURRENT_USER_TEAMS,
  GET_TEAMS_BY_PROJECT,
} from "../grapgql/query";
import { Team } from "@/components/ClientTeamsPage";
import { toast } from "sonner";
import { use } from "react";

export function useTeams(slug: string) {
  return useQuery({
    queryKey: ["teams", slug],
    queryFn: async () => {
      try {
        const data = (await gqlClient.request(GET_TEAMS_BY_PROJECT, {
          slug,
        })) as {
          getTeamsForProject: Team[];
        };
        return data.getTeamsForProject;
      } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
      }
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}

export function useAddMemberToTeam(slug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      teamId,
      userId,
    }: {
      teamId: string;
      userId: string;
    }) => {
      return gqlClient.request(ADD_MEMBER_TO_TEAM, { teamId, userId });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["teams", slug],
        type: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["teams", slug] });

      await queryClient.refetchQueries({
        queryKey: ["currentUserTeams"],
        type: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["currentUserTeams"] });

      toast.success("Member added to team");
    },
    onError: (error) => {
      console.error("Error adding member to team:", error);
      toast.error("Failed to add member to team. Please try again.");
    },
  });
}

export function useCurrentUserTeams() {
  return useQuery({
    queryKey: ["currentUserTeams"],
    queryFn: async () => {
      try {
        const data = (await gqlClient.request(GET_CURRENT_USER_TEAMS)) as {
          getCurrentUserTeams: Team[];
        };
        return data.getCurrentUserTeams;
      } catch (error) {
        console.error("Error in useCurrentUserTeams hook:", error);
        throw error;
      }
    },
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}

export async function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamData: {
      name: string;
      description?: string;
      image?: string;
    }) => {
      return gqlClient.request(CREATE_TEAM, teamData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["currentUserTeams"],
        type: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["currentUserTeams"] });
    },
  });
}

export async function useAddTeamToProject(projectSlug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId: string) => {
      return gqlClient.request(ADD_TEAM_TO_PROJECT, { teamId, projectSlug });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", projectSlug] });
      toast.success("Team added to project");
    },
    onError: (error) => {
      console.error("Error adding team to project:", error);
      toast.error("Failed to add team to project. Please try again.");
    },
  });
}
