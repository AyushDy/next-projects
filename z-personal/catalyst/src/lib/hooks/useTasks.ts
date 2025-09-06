"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import { CREATE_COMMENT, GET_COMMENTS_BY_TASK_ID, GET_TASK_BY_ID, UPDATE_TASK } from "@/lib/grapgql/query";
import { Task } from "./useBoards";


export type Comment = {
  id: string;
  content: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
};


export function useTask(taskId: string) {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      try {
        const data = (await gqlClient.request(GET_TASK_BY_ID, {
        id:taskId,
      })) as {
        getTaskById: Task;
      };
      return data.getTaskById;
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    },
  });
}

export function useUpdateTask(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      title,
      description,
    }: {
      taskId: string;
      title?: string;
      description?: string;
    }) => {
      const updates = {
        title,
        description,
      };
      return gqlClient.request(UPDATE_TASK, { taskId, updates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
}


export function useCommentsByTaskId(taskId: string) {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: async () => {
      try {
        const data = (await gqlClient.request(GET_COMMENTS_BY_TASK_ID, {
          taskId,
        })) as {
          getCommentsByTaskId: Comment[];
        };
        return data.getCommentsByTaskId;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  });
}


export function useCreateComment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      content,
    }: {
      taskId: string;
      content: string;
    }) => {
      return gqlClient.request(CREATE_COMMENT, { taskId, content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
    },
  });
}