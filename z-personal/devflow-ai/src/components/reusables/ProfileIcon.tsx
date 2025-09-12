import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
