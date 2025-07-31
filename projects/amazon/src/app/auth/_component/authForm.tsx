"use client";

import LoginForm from "@/components/UI/forms/LoginForm";
import SignupForm from "@/components/UI/forms/SignupForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const [page, setPage] = useState<"signup" | "login">("login");
  const { isLoggedin } = useAuthContext() as { isLoggedin: boolean };
  const router = useRouter();

  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);

  function toggleForm() {
    setPage((prev) => {
      return prev === "login" ? "signup" : "login";
    });
  }

  return (
    <div className="ello bg-white text-center flex flex-col justify-center items-center p-3 rounded-lg w-1/3 border ">
      {page === "login" ? <LoginForm /> : <SignupForm />}
      <div>
        <button
          className="text-xs hover:cursor-pointer underline"
          onClick={toggleForm}
        >
          {page === "login"
            ? "Create a new Account"
            : "Login to existing account"}
        </button>
      </div>
    </div>
  );
}
