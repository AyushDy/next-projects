"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import AvatarCard, { UserListCardProps } from "../cards/AvatarCard";



export default function CollapsibleUsers({
  icon,
  label,
  users,
}: {
  icon: React.ReactNode;
  label: string;
  users: UserListCardProps[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger className="flex items-center justify-end w-full px-3 py-2 font-medium rounded-md ">
        <span className="flex items-center gap-2">
          {icon} {label}
        </span>
        <ChevronDownIcon
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </Collapsible.Trigger>

      <Collapsible.Content className="mt-1 pl-6 space-y-1">
        {users.map((user) => (
           <AvatarCard key={user.id} {...user} />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
