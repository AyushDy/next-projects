"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function page() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center space-y-15 px-24 py-10">
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <div className="flex items-center text-5xl text-primary font-semibold ">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          evFlow AI
        </div>

        <h1 className="font-sans text-5xl md:text-7xl font-bold text-center text-primary transition-all duration-300">
          Improve your code quality with{" "}
          <span className="text-primary/80">AI-powered </span>analysis
        </h1>
      </div>
      <Button
        size="lg"
        className="bg-primary text-background text-xl rounded-4xl p-8 px-4"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <div className="bg-background rounded-full p-1 flex items-center justify-center">
          <Image
            src="/icons/github.svg"
            alt="GitHub Logo"
            width={30}
            height={30}
          />
        </div>
        Sign In with GitHub
      </Button>
    </main>
  );
}
