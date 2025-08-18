
"use client";

import {
  createUser,
  getCurrentUser,
  LoginUser,
  logoutUser,
} from "@/actions/auth-actions";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/lib/Cart";
import { syncWithLocalCart } from "@/actions/cart-actions";

export type AuthContextType = {
  user: any;
  isLoggedin: boolean;
  loading: boolean;
  handleLogin: (obj: any) => Promise<any>;
  handleLogout: (obj: any) => Promise<any>;
  handleSignup: (obj: any) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function checkAuth() {
      const result = await getCurrentUser();
      if (result) {
        setUser(result);
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  async function handleSignup(obj: any): Promise<string> {
    setLoading(true);
    const result: any | string = await createUser(obj);
    if (typeof result === "string") return result;
    if (!result.email || !result.username || !result.role) {
      setLoading(false);
      return "Attempt failed, Try again.";
    }
    setUser(result);
    setIsLoggedIn(true);
    setLoading(false);
    return "Account Created Successfully.";
  }

  async function handleLogin(obj: any) {
    setLoading(true);
    const result = await LoginUser(obj);
    if (typeof result === "string") {
      setLoading(false);
      return result;
    }
    if (!result?.email || !result?.username || !result?.role) {
      setLoading(false);
      return "Login failed, Try again.";
    }
    setUser(result);
    setIsLoggedIn(true);
    setLoading(false);

    const localCart = getCartItems();

    if (localCart.length > 0) {
      await syncWithLocalCart(localCart);
      localStorage.removeItem("cartItems");
    }
    return "Login Successfull.";
  }

  async function handleLogout(obj: any) {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
      setLoading(false);

      sessionStorage.removeItem("guestCart");
      
      return { success: true, message: "Logout successfull." };
    } catch (error: any) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedin,
        loading,
        handleLogin,
        handleLogout,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
