"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function GoogleLogin() {
  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
      prompt: "select_account",
    });
  };

  return (
    <Button type="button" className="w-full" onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
}
