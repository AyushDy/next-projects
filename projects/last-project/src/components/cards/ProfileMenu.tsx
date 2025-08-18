import { Button, DropdownMenu } from "@radix-ui/themes";
import ProfileAvatar from "./ProfileAvatar";
import { UserContext, UserContextType, UserWithoutPassword } from "@/contexts/UserContext";
import { useContext } from "react";

export default function ProfileMenu({ user }: { user: UserWithoutPassword }) {

  const {logout} = useContext(UserContext) as UserContextType;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" size={"2"}>
          <ProfileAvatar user={user} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="→" color="red" onClick={logout}>
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
