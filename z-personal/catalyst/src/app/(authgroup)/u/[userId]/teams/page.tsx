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
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (teams && teams.length > 0) {
      if (currentTeamId) {
        const updatedCurrentTeam = teams.find(
          (team) => team.id === currentTeamId
        );
        if (updatedCurrentTeam) {
          setCurrentTeamId(updatedCurrentTeam.id);
        } else {
          setCurrentTeamId(teams[0].id);
        }
      } else {
        setCurrentTeamId(teams[0].id);
      }
    }
  }, [teams, currentTeamId]);

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
        <div className="flex flex-col max-h-90 overflow-y-auto thin-scrollbar">
          {teams?.map((team) => (
            <TeamListItem
              key={team.id}
              team={team}
              setTeamId={setCurrentTeamId}
              isActive={currentTeamId === team.id}
            />
          ))}
        </div>
        <div>
          {currentTeamId && <TeamMemberList currentTeamId={currentTeamId} />}
        </div>
      </div>
    </div>
  );
}
