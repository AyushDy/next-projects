"use client";
import { UserRoundPlus, Search, UserPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import gqlClient from "@/lib/services/gql";
import { GET_USER_BY_EMAIL } from "@/lib/grapgql/query";
import { User } from "@prisma/client";
import ProfileIcon from "../ui/ProfileIcon";
import { useAddMemberToTeam } from "@/lib/hooks/useTeams";
import { Spinner } from "../ui/LoadingSpinner";
import { Team } from "../ClientTeamsPage";
import { useParams } from "next/navigation";

export function AddMembersButton({ team }: { team: Team | null }) {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const addMemberMutation = useAddMemberToTeam(
    slug as string,
    team ? team.id : ""
  );
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timerID = setTimeout(() => {
      getUserByEmail(email);
    }, 300);
    return () => clearTimeout(timerID);
  }, [email]);

  function getUserByEmail(email: string) {
    startTransition(async () => {
      try {
        const user = (await gqlClient.request(GET_USER_BY_EMAIL, {
          email,
        })) as {
          getUserByEmail: User | null;
        };
        setFoundUser(user.getUserByEmail);
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    });
  }

  async function handleAddUser() {
    if (foundUser && team) {
      try {
        await addMemberMutation.mutateAsync({
          userId: foundUser.id,
        });
        setEmail("");
        setFoundUser(null);
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto bg-background text-foreground dark:bg-foreground dark:text-background border-border dark:border-background rounded-xs transition-colors hover:bg-muted dark:hover:bg-muted-foreground"
          title="Add Member"
        >
          <UserPlus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-0 rounded-xs shadow-lg border-0 bg-background"
        align="start"
        sideOffset={8}
      >
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email address..."
              className="rounded-xs pl-9 pr-4 py-2 text-sm border-input focus:border-primary focus:ring-1 focus:ring-primary/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto rounded-xs">
          {foundUser ? (
            <div className="p-2">
              <div className="flex items-center justify-between p-3 rounded-xs hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ProfileIcon user={foundUser} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {foundUser.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {foundUser.email}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={handleAddUser}
                  disabled={
                    addMemberMutation.isPending ||
                    team?.members.some(
                      (member) => member.user.id === foundUser.id
                    )
                  }
                  className="rounded-md px-3 py-1 text-xs transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addMemberMutation.isPending ? (
                    <Spinner size="sm" />
                  ) : addMemberMutation.isSuccess ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <UserPlus className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          ) : email.trim() ? (
            <div className="p-4 text-center">
              {isPending ? (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No user found with that email
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="text-sm text-muted-foreground">
                Enter an email address to search for users
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
