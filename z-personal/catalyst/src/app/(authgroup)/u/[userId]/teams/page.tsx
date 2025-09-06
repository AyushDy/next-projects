"use client";

import { AddTeamButton } from "@/components/buttons/AddTeamButton";
import TeamListItem from "@/components/cards/TeamListItem";
import TeamMemberList from "@/components/cards/TeamMemberList";
import { Team } from "@/components/ClientTeamsPage";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/LoadingSpinner";
import { useCurrentUserTeams } from "@/lib/hooks/useTeams";
import { useCurrentUser } from "@/lib/hooks/useUser";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: user, isPending: isPendingUser } = useCurrentUser();
  const { data: teams, isPending: isPendingTeams } = useCurrentUserTeams();
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (teams && teams.length > 0) {
      if (currentTeam) {
        const updatedCurrentTeam = teams.find(
          (team) => team.id === currentTeam.id
        );
        if (updatedCurrentTeam) {
          setCurrentTeam(updatedCurrentTeam);
        } else {
          setCurrentTeam(teams[0]);
        }
      } else {
        setCurrentTeam(teams[0]);
      }
    }
  }, [teams, currentTeam?.id]);

  if (isPendingUser || isPendingTeams) {
    return (
      <div className="h-4/5 w-4/5 flex items-center justify-center">
        <div className="flex gap-3">
          <Spinner size="md" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-20">
      <div className="flex justify-between font-sans mb-12">
        <h1 className="text-2xl font-bold">{user?.name}'s Teams</h1>
        <AddTeamButton />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          {teams?.map((team) => (
            <TeamListItem
              key={team.id}
              team={team}
              setTeam={setCurrentTeam}
              isActive={currentTeam?.id === team.id}
            />
          ))}
        </div>
        <div>
          <TeamMemberList currentTeam={currentTeam} />
        </div>
      </div>
    </div>
  );
}
