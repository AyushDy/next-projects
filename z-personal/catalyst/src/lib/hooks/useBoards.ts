"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import {
  GET_PROJECT_BOARDS_BY_SLUG,
  CREATE_BOARD,
  DELETE_BOARD,
  GET_BOARD_BY_ID,
  ADD_TEAM_TO_BOARD,
  UPDATE_BOARD,
} from "@/lib/grapgql/query";
import { toast } from "sonner";

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

export function useBoardById(boardId: string) {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const data = (await gqlClient.request(GET_BOARD_BY_ID, {
        boardId,
      })) as {
        getBoardById: BoardWithRelations;
      };
      return data.getBoardById;
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

export function useAddTeamToBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      teamId,
      boardId,
    }: {
      teamId: string;
      boardId: string;
    }) => {
      const res = (await gqlClient.request(ADD_TEAM_TO_BOARD, {
        teamId,
        boardId,
      })) as { addTeamToBoard: boolean };

      if (!res.addTeamToBoard) {
        throw new Error("Failed to add team to board");
      }

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Team added to board");
    },
    onError: (error) => {
      console.error("Error adding team to board:", error);
      toast.error("Failed to add team to board. Please try again.");
    }
  });
}

export function useUpdateBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (boardData: {
      name: string;
      description?: string;
    }) => {
      const res = (await gqlClient.request(UPDATE_BOARD, {
        boardId,
        name: boardData.name,
        description: boardData.description || undefined,
      })) as { updateBoard: boolean };

      if (!res.updateBoard) {
        throw new Error("Failed to update board");
      }
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      toast.success("Board updated successfully");
    },
    onError: (error) => {
      console.error("Error updating board:", error);
      toast.error("Failed to update board. Please try again.");
    }
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
  createdById: string;

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
