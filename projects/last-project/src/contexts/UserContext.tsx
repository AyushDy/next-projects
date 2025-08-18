"use client";

import { LOG_OUT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { RoleType } from "@prisma/client";
import {  createContext, useState } from "react";

export type UserWithoutPassword = {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  username: string;
  role: RoleType
};

export type UserContextType = {
  user: UserWithoutPassword;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
  children,
  user
}: {
  children: React.ReactNode;
  user: UserWithoutPassword;
}) {

  async function logout(){
    try {
      await gqlClient.request(LOG_OUT);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return(
  <UserContext.Provider value={{ user, logout }}>
    {children}
  </UserContext.Provider>
  )
}
