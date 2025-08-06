"use client";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";

export default function AuthForm({ intercepted }: { intercepted: boolean }) {
  const [form, setForm] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex justify-center items-center w-full px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-md">

        <div className="relative bg-white/60 dark:bg-black/10 backdrop-blur-xl p-8 rounded-2xl border border-white/30 dark:border-gray-700/50 shadow-2xl shadow-black/10 dark:shadow-black/30">
          <div className="absolute inset-0 backdrop-blur-sm bg-white dark:bg-background border border-white/20 dark:border-white/10 rounded-2xl"></div>

          <div className="relative z-10">
            {form === "login" ? <LoginForm intercepted={true} /> : <SignupForm intercepted={true} />}


          {/*toggle form type*/}
            <div className="mt-6 text-center">
              <button
                onClick={() =>
                  setForm((prev) => (prev === "login" ? "signup" : "login"))
                }
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 group relative"
              >
                {form === "login"
                  ? "Create a new account."
                  : "Already have an account? Log in."}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}