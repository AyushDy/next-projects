"use client";

import { createUser, loginUser, logoutUser } from "@/lib/auth/auth-utils";
import { UserType, UserWithIdType } from "@/lib/zod";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
  useTransition,
  useEffect,
} from "react";
import { getMe } from "@/lib/auth/auth-utils";
import { Company } from "@/lib/types";

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void | { success: boolean; message?: string }>;
  user: UserWithIdType | null;
  company: Company | null;
  setUser: (user: UserWithIdType | null) => void;
  signup: (
    userData: UserType
  ) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [company, setCompany] = useState(null);
  const [user, setUser] = useState<UserWithIdType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchUser() {
      const res = await getMe();
      if (res.success && "user" in res) {
        setUser(res.user);
        setCompany(res.company);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    fetchUser();
  }, []); 

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await loginUser(email, password);
    if (res.success && "user" in res) {
      setUser(res.user);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true, message: "Login successful" };
    }
    setLoading(false);
    return {
      success: false,
      message: "message" in res ? res.message : "Login failed",
    };
  };

  const signup = async (userData: UserType) => {
    setLoading(true);
    const res = await createUser(userData);
    if (res.success) {
      setUser(res.user);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true, message: "Signup successful" };
    }
    setLoading(false);
    return { success: false, message: res.message };
  };

  const logout = async () => {
    setLoading(true);
    const res = await logoutUser();
    if (res.success) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return { success: true, message: "Logout successful" };
    }
    setLoading(false);
    return { success: false, message: res.message || "Logout failed" };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        company,
        setUser,
        signup,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
