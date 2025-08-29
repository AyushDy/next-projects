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
    startTransition(async() => {
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
        }
        alert("user created successfully!");
      } catch (error) {}
    });
  }

  return (
    <Card className="w-full max-w-sm border-none">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter name..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleSignup}>
          {isPending ? "Creating..." : "Create Account"}
        </Button>
        <GoogleLogin />
      </CardFooter>
    </Card>
  );
}
