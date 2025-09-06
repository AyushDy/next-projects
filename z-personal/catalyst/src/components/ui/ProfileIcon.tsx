
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "./avatar";
import { User } from "next-auth";
import { Button } from "./button";
import { Spinner } from "./LoadingSpinner";

export default function ProfileIcon({ user }:{ user: User | null }) {

  return (
    <>
      <div className="">
          <Avatar>
            <AvatarImage
              src={user?.image as string}
              alt="Profile Picture"
            />
            <AvatarFallback className="text-primary">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "P"}
            </AvatarFallback>
          </Avatar>
      </div>
    </>
  );
}
