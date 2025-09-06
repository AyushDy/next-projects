"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import {
  GET_BOARD_COLUMNS,
  CREATE_TASK,
  MOVE_TASK,
  SYNC_BOARD_COLUMNS,
  ADD_BOARD_COLUMN,
  REORDER_COLUMNS,
  DELETE_COLUMN,
} from "@/lib/grapgql/query";
import { Column } from "./useBoards";
import { Task } from "@prisma/client";

export type BoardWithRelations = {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  isArchived: boolean;
  columns?: Array<Column>;
  teams?: Array<{
    team: {
      name: string;
      image: string;
      teamLead: {
        name: string;
        id: string;
      };
    };
  }>;
};

export function useColumns(boardId: string) {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      const data = (await gqlClient.request(GET_BOARD_COLUMNS, {
        boardId,
      })) as {
        getBoardColumns: Column[];
      };
      return data.getBoardColumns;
    },
  });
}

export function useCreateBoardColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      boardId,
      order,
    }: {
      name: string;
      boardId: string;
      order: number;
    }) => {
      return gqlClient.request(ADD_BOARD_COLUMN, {
        name,
        boardId,
        order,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      columnId,
    }: {
      title: string;
      description?: string;
      columnId: string;
    }) => {
      return gqlClient.request(CREATE_TASK, {
        title,
        description,
        columnId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}

export function useSyncBoardColumns(boardId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newTasks,
      updatedTasks,
      columnChanges,
      deletedTasks,
    }: {
      newTasks: Array<Task>;
      updatedTasks: Array<{ id: string; updates: Partial<Task> }>;
      columnChanges: Array<{
        id: string;
        taskIds: Array<string>;
        order: number;
      }>;
      deletedTasks: Array<{ id: string; columnId: string }>;
    }) => {
      return gqlClient.request(SYNC_BOARD_COLUMNS, {
        newTasks,
        updatedTasks,
        columnChanges,
        deletedTasks,
      });
    },
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      }
    },
  });
}

export function useMoveTasks(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      toColumnId,
      newIndex,
      fromColumnId,
    }: {
      taskId: string;
      toColumnId: string;
      newIndex: number;
      fromColumnId: string;
    }) => {
      return gqlClient.request(MOVE_TASK, {
        taskId,
        toColumnId,
        newIndex,
        fromColumnId,
      });
    },
    onMutate: async ({ taskId, toColumnId, newIndex, fromColumnId }) => {
      await queryClient.cancelQueries({ queryKey: ["boards", boardId] });

      const previousData = queryClient.getQueryData<Column[]>([
        "boards",
        boardId,
      ]);
      if (previousData) {
        const newData = JSON.parse(JSON.stringify(previousData)) as Column[];

        const fromColumn = newData.find((col) => col.id === fromColumnId);
        const toColumn = newData.find((col) => col.id === toColumnId);

        if (fromColumn && toColumn) {
          const taskIndex = fromColumn.taskIds.indexOf(taskId);
          const task = fromColumn.tasks.find((t) => t.id === taskId);

          if (taskIndex !== -1 && task) {
            fromColumn.taskIds.splice(taskIndex, 1);
            fromColumn.tasks = fromColumn.tasks.filter((t) => t.id !== taskId);

            toColumn.taskIds.splice(newIndex, 0, taskId);
            toColumn.tasks.splice(newIndex, 0, task);
          }
        }
        queryClient.setQueryData(["boards", boardId], newData);
      }
      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["boards", boardId], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}

export function useReorderColumns(boardId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      columnOrders,
    }: {
      columnOrders: Array<{ id: string; order: number }>;
    }) => {
      return gqlClient.request(REORDER_COLUMNS, {
        columnOrders,
      });
    },
    onSuccess: () => {
      if (boardId) {
        queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      }
    },
  });
}

export function useDeleteColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (columnId: string) => {
      return gqlClient.request(DELETE_COLUMN, { columnId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
