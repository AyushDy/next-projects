"use client";

import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { useState, useTransition } from "react";
import { LogOut } from "lucide-react";
import Button from "@/components/UI/Button";
import Toast from "../loaders/ToastPortal";

export default function LogoutButton() {
  const [toasting, setToasting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [res, setRes] = useState<{ success: boolean; message?: string }>();
  const { logout } = useAuthContext() as {
    logout: () => Promise<void | { success: boolean; message?: string }>;
  };

  const handleLogout = async () => {
    startTransition(async () => {
      const res = await logout();
      setRes(res as { success: boolean; message?: string });
      if (res && res.success) {
        setMessage("Logged out successfully");
        setToasting(true);
        window.location.href = "/";
      } else {
        setMessage(res?.message || "Logout failed");
        setToasting(true);
      }
    });
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        disabled={isPending}
        variant="ghost"
        icon={LogOut}
        iconPosition="left"
        isLoading={isPending}
        loadingText="Logging out..."
        className="mr-5"
      >
        Logout
      </Button>
    </div>
  );
}
