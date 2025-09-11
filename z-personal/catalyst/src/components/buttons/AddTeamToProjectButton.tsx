"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAddTeamToProject, useCurrentUserTeams } from "@/lib/hooks/useTeams";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContextProvider";

export function AddTeamToProjectButton({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const { data: teams } = useCurrentUserTeams();
  const addTeamToProjectMutation = useAddTeamToProject(projectSlug);
  const { session } = useAuthContext();

  async function handleAddTeamToProject(teamId: string) {
    addTeamToProjectMutation.mutateAsync(teamId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto rounded-xs">
          Add Team to Project
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xs p-3" align="start">
        {teams?.length ? (
          teams?.map((team) => (
            <DropdownMenuItem key={team.id}>
              <Button
                onClick={() => handleAddTeamToProject(team.id)}
                className="w-full justify-start h-8 px-2 font-normal rounded-none bg-background hover:bg-accent hover:text-accent-foreground text-primary"
              >
                {team.name}
              </Button>
            </DropdownMenuItem>
          ))
        ) : (
          <div>
            <p className="text-sm text-muted-foreground">No teams available</p>
            <Link href={`/u/${session?.user.id}/teams`}>
              <Button className="mt-2 w-full justify-center rounded-xs">
                Create new Team
              </Button>
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
