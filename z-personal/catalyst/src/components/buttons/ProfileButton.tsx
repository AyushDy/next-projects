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
import { useAuthContext } from "../context/AuthContextProvider";
import { useCurrentUser } from "@/lib/hooks/useUser";

export const ProfileButton = memo(function ProfileButton() {
  const { data : user, isPending} = useCurrentUser();
  const {status} = useAuthContext();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full p-1">
        <Spinner size="md" />
      </div>
    );
  }

  if (status === "unauthenticated") {
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
          <ProfileIcon user={user as User} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xs" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/u/${user?.id}`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={`/u/${user?.id}/settings`} className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href={`/u/${user?.id}/teams`} className="w-full">
            Teams
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
