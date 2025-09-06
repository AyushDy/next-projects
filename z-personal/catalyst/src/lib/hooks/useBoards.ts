"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import {
  GET_PROJECT_BOARDS_BY_SLUG,
  CREATE_BOARD,
  DELETE_BOARD,
} from "@/lib/grapgql/query";

export function useBoards(slug: string) {
  return useQuery({
    queryKey: ["boards", slug],
    queryFn: async () => {
      const data = (await gqlClient.request(GET_PROJECT_BOARDS_BY_SLUG, {
        slug,
      })) as {
        getProjectBoardsBySlug: BoardWithRelations[];
      };
      return data.getProjectBoardsBySlug;
    },
  });
}

export function useDeleteBoard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (boardId: string) => {
      const res = (await gqlClient.request(DELETE_BOARD, {
        boardId,
      })) as { deleteBoard: boolean };

      if (!res.deleteBoard) {
        throw new Error("Failed to delete board");
      }

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", slug] });
    },
  });
}

export function useCreateBoard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (boardData: {
      name: string;
      projectId: string;
      description?: string;
      teamId?: string;
    }) => {
      const res = (await gqlClient.request(CREATE_BOARD, {
        name: boardData.name,
        projectId: boardData.projectId,
        description: boardData.description || undefined,
        teamId: boardData.teamId || undefined,
      })) as { createBoard: boolean };

      if (!res.createBoard) {
        throw new Error("Failed to create board");
      }

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", slug] });
    },
  });
}

export type BoardWithRelations = {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;

  columns: Column[];

  teams: Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
    team: {
      id: string;
      name: string;
      image: string;
      description?: string;
      teamLead: {
        id: string;
        name?: string;
        image?: string;
      };
    };
  }>;
};

export type Column = {
  id: string;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  taskIds: string[];

  tasks: Array<Task>;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "BLOCKED";
  priority?: number;
  dueDate?: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;

  createdBy: {
    id: string;
    name?: string;
    image?: string;
  };

  assignees: Array<{
    id: string;
    role?: string;
    user?: {
      id: string;
      name?: string;
      image?: string;
    };
    team?: {
      id: string;
      name: string;
      image: string;
    };
  }>;
};
