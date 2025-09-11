import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import GoogleLogin from "../buttons/GoogleLogin";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    });
  }

  return (
    <Card className="w-full border-none">
      <form onSubmit={handleSubmit}>
        <CardHeader className="mb-2 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                className="rounded-xs h-10 sm:h-11 text-sm sm:text-base"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mb-2 sm:mb-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs sm:text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                className="rounded-xs h-10 sm:h-11 text-sm sm:text-base"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 px-4 sm:px-6">
          <Button
            type="submit"
            className="w-full rounded-xs h-10 sm:h-11 text-sm sm:text-base font-medium"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <GoogleLogin />
        </CardFooter>
      </form>
    </Card>
  );
}
