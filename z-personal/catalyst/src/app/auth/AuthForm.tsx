"use client";
import { LoginForm } from "@/components/forms/LoginForm";
import { SignupForm } from "@/components/forms/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export default function AuthForm(){
    const [form, setForm] = useState<"login" | "signup">("login");


    return (
        <Card className="max-w-96 w-full">
        {form === "login" ? (
            <LoginForm />
        ) : (
            <SignupForm />
        )}
        <CardFooter>
          <Button variant="link" onClick={() => setForm(form === "login" ? "signup" : "login")}>
            {form === "login" ? "Create an account" : "Already have an account?"}
          </Button>
        </CardFooter>
        </Card>
    )
}