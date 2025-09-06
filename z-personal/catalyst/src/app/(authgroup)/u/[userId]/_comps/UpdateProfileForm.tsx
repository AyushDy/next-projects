"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser, useUpdateUser } from "@/lib/hooks/useUser";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function UpdateProfile() {
  const { data: session, update } = useSession() as any;
  const { data: user, isLoading, error } = useCurrentUser();
  const updateUserMutation = useUpdateUser();

  console.log("Session data:", session);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  console.log("Component state:", { user, isLoading, error, formData });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserMutation.mutateAsync({ ...formData });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-10 bg-muted rounded w-4/5"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-10 bg-muted rounded w-4/5"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-10 bg-muted rounded w-4/5"></div>
          <div className="h-10 bg-primary/20 rounded w-fit"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load user data</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="mb-6 mt-3 rounded-xs w-4/5"
      />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="mb-6 mt-3 rounded-xs w-4/5"
      />
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        placeholder="About you..."
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        className="mb-6 mt-3 rounded-xs w-4/5 resize-none"
      />
      <Button
        type="submit"
        className="mt-4 w-fit rounded-xs active:scale-97"
        disabled={updateUserMutation.isPending}
      >
        {updateUserMutation.isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
