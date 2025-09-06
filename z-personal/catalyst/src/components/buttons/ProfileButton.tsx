"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import ProfileIcon from "../ui/ProfileIcon";
import { Spinner } from "../ui/LoadingSpinner";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { memo } from "react";
import { AuthContextType, useAuthContext } from "../context/AuthContextProvider";

export const ProfileButton = memo(function ProfileButton() {
  const authContext = useAuthContext() as AuthContextType;

  if (authContext?.status === "loading") {
    return (
      <div className="flex items-center justify-center h-full p-1">
        <Spinner size="md" />
      </div>
    );
  }

  if (authContext?.status === "unauthenticated") {
    return (
      <Link
        href={"/auth"}
        className="flex items-center justify-center h-full p-1"
      >
        <Button variant="outline" className="rounded-xs">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 border-none rounded-xs">
          <ProfileIcon user={authContext?.session?.user as User} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xs" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/u/${authContext?.session?.user.id}`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={`/u/${authContext?.session?.user.id}/settings`} className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href={`/u/${authContext?.session?.user.id}/teams`} className="w-full">
            Teams
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
