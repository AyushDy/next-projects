"use client";

import UserCard from "../cards/UserCard";
import { UserWithStats } from "../types/userTypes";

interface UsersGridProps {
  users: UserWithStats[];
  onDeleteUser: (userId: string) => Promise<void>;
}

export default function UsersGrid({ users, onDeleteUser }: UsersGridProps) {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDeleteUser} />
      ))}
    </div>
  );
}
