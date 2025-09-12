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
import Link from "next/link";
import ProfileIcon from "../reusables/ProfileIcon";
import { memo } from "react";
import { LogoutButton } from "./LogoutButton";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";


export const ProfileButton = memo(function ProfileButton() {
  const session = useSession();

  console.log("Session data:", session);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 border-none rounded-xs">
          <ProfileIcon user={session?.data?.user || null} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xs" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={``} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={``} className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href={``} className="w-full">
            Teams
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
