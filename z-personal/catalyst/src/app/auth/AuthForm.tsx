"use client";
import { LoginForm } from "@/components/forms/LoginForm";
import { SignupForm } from "@/components/forms/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export default function AuthForm() {
  const [form, setForm] = useState<"login" | "signup">("login");

  return (
    <Card className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
      {form === "login" ? <LoginForm /> : <SignupForm />}
      <CardFooter className="flex flex-col sm:flex-row justify-center">
        <Button
          variant="link"
          onClick={() => setForm(form === "login" ? "signup" : "login")}
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          {form === "login" ? "Create an account" : "Already have an account?"}
        </Button>
      </CardFooter>
    </Card>
  );
}
