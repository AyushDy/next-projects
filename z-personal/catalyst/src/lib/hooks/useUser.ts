"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gqlClient from "@/lib/services/gql";
import { GET_CURRENT_USER, UPDATE_USER } from "../grapgql/query";
import { User } from "@prisma/client";
import { uploadProfileImage } from "@/lib/actions";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const data = (await gqlClient.request(GET_CURRENT_USER)) as {
          getCurrentUser: User;
        };
        return data.getCurrentUser;
      } catch (error) {
        console.error("Error in useCurrentUser hook:", error);
        throw error;
      }
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: {
      name?: string;
      email?: string;
      bio?: string;
      image?: string;
    }) => {
      return gqlClient.request(UPDATE_USER, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadProfileImage(formData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
