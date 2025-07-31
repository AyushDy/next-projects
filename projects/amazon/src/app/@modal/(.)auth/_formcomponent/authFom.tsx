"use client";

import LoginForm from "@/components/UI/forms/LoginForm";
import SignupForm from "@/components/UI/forms/SignupForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function AuthForm() {
  const [page, setPage] = useState<"signup" | "login">("login");
  const router = useRouter();
  const { isLoggedin } = useAuthContext() as { isLoggedin: boolean };

  if(isLoggedin){
    router.back();
  }

  function toggleForm() {
    setPage((prev) => {
      return prev === "login" ? "signup" : "login";
    });
  }

  return (
    <div className="bg-white text-center p-8 rounded-lg w-full max-w-md shadow-lg">
      {page === "login" ? <LoginForm /> : <SignupForm />}
      <div className="mt-4">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={toggleForm}
        >
          {page === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
