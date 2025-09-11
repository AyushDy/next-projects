import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLogin from "../buttons/GoogleLogin";
import { useState, useTransition } from "react";
import { signupSchema } from "@/lib/zod";
import gqlClient from "@/lib/services/gql";
import { CREATE_USER } from "@/lib/grapgql/query";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");

  async function handleSignup() {
    startTransition(async () => {
      try {
        const parsed = signupSchema.safeParse({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (!parsed.success) {
          alert("failed creating user");
          return;
        }

        const res = (await gqlClient.request(CREATE_USER, parsed.data)) as {
          createUser: { id: string; name: string; email: string };
        };
        if (!res.createUser) {
          alert("Error creating user");
          console.error("Error creating user:", res);
        } else alert("user created successfully!");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    });
  }

  return (
    <Card className="w-full border-none">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your email below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm sm:text-base">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                className="rounded-xs h-10 sm:h-11 text-sm sm:text-base"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                className="rounded-xs h-10 sm:h-11 text-sm sm:text-base"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                className="rounded-xs h-10 sm:h-11 text-sm sm:text-base"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3 px-4 sm:px-6">
        <Button
          type="button"
          className="w-full rounded-xs h-10 sm:h-11 text-sm sm:text-base font-medium"
          onClick={handleSignup}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Account"}
        </Button>
        <GoogleLogin />
      </CardFooter>
    </Card>
  );
}
