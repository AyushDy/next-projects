"use client";

import { signOut } from "next-auth/react";

export default function SwitchAccount() {
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/auth",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <p>
      This is your profile information. You can update your details here.
      <br />
      <span
        className="text-blue-500 underline cursor-pointer"
        onClick={handleLogout}
      >
        switch account{" "}
      </span>
    </p>
  );
}
